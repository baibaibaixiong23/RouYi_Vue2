<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="预支规则名称" prop="advanceRuleName">
        <el-input
          v-model="queryParams.advanceRuleName"
          placeholder="请输入预支规则名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规则状态" prop="isStatus">
        <el-select v-model="queryParams.isStatus" placeholder="请选择规则状态" clearable>
          <el-option
            v-for="dict in dict.type.is_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['advanceRule:advanceRule:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['advanceRule:advanceRule:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['advanceRule:advanceRule:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['advanceRule:advanceRule:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="advanceRuleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="预支规则名称" align="center" prop="advanceRuleName" />
      <el-table-column label="规则:USDT大于" align="center" prop="usdtGt" />
      <el-table-column label="规则:USDT小于" align="center" prop="usdtLt" />
      <el-table-column label="规则:TRX大于" align="center" prop="trxGt" />
      <el-table-column label="规则:TRX小于" align="center" prop="trxLt" />
      <el-table-column label="规则:是否需要登录" align="center" prop="isLogin">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.is_base" :value="scope.row.isLogin"/>
        </template>
      </el-table-column>
      <el-table-column label="规则:账户创建时间至少几天前" align="center" prop="addressCreateTime" />
      <el-table-column label="预支:单次预支金额" align="center" prop="singleNum" >
        <template slot-scope="scope">
          {{scope.row.singleNum/1000000 }}
        </template>
      </el-table-column>
      <el-table-column label="预支:每日限制次数" align="center" prop="everydayNum" />
      <el-table-column label="规则状态" align="center" prop="isStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.is_status" :value="scope.row.isStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['advanceRule:advanceRule:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['advanceRule:advanceRule:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改预支规则对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="预支规则名称" prop="advanceRuleName">
          <el-input v-model="form.advanceRuleName" placeholder="请输入预支规则名称" />
        </el-form-item>
        <el-form-item label="规则:USDT大于" prop="usdtGt">
          <el-input v-model="form.usdtGt" placeholder="请输入规则:USDT大于" />
        </el-form-item>
        <el-form-item label="规则:USDT小于" prop="usdtLt">
          <el-input v-model="form.usdtLt" placeholder="请输入规则:USDT小于" />
        </el-form-item>
        <el-form-item label="规则:TRX大于" prop="trxGt">
          <el-input v-model="form.trxGt" placeholder="请输入规则:TRX大于" />
        </el-form-item>
        <el-form-item label="规则:TRX小于" prop="trxLt">
          <el-input v-model="form.trxLt" placeholder="请输入规则:TRX小于" />
        </el-form-item>
        <el-form-item label="规则:是否需要登录" prop="isLogin">
          <el-select v-model="form.isLogin" placeholder="请选择规则:是否需要登录">
            <el-option
              v-for="dict in dict.type.is_base"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则:账户创建时间至少几天前" prop="addressCreateTime">
          <el-input v-model="form.addressCreateTime" placeholder="请输入规则:账户创建时间至少几天前" />
        </el-form-item>
        <el-form-item label="预支:单次预支金额" prop="singleNum">
          <el-input v-model="form.singleNum" placeholder="请输入预支:单次预支金额" >
          </el-input>
        </el-form-item>
        <el-form-item label="预支:每日限制次数" prop="everydayNum">
          <el-input v-model="form.everydayNum" placeholder="请输入预支:每日限制次数" />
        </el-form-item>
        <el-form-item label="规则状态" prop="isStatus">
          <el-radio-group v-model="form.isStatus">
            <el-radio
              v-for="dict in dict.type.is_status"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listAdvanceRule, getAdvanceRule, delAdvanceRule, addAdvanceRule, updateAdvanceRule } from "@/api/advanceRule/advanceRule";

export default {
  name: "AdvanceRule",
  dicts: ['is_status', 'is_base'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 预支规则表格数据
      advanceRuleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        advanceRuleName: null,
        isStatus: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询预支规则列表 */
    getList() {
      this.loading = true;
      listAdvanceRule(this.queryParams).then(response => {
        this.advanceRuleList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        advanceRuleName: null,
        usdtGt: null,
        usdtLt: null,
        trxGt: null,
        trxLt: null,
        isLogin: null,
        addressCreateTime: null,
        singleNum: null,
        everydayNum: null,
        isStatus: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加预支规则";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAdvanceRule(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改预支规则";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAdvanceRule(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAdvanceRule(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除预支规则编号为"' + ids + '"的数据项？').then(function() {
        return delAdvanceRule(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('advanceRule/advanceRule/export', {
        ...this.queryParams
      }, `advanceRule_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
