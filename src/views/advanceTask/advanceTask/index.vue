<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="类型" prop="advanceType">
        <el-select v-model="queryParams.advanceType" placeholder="请选择预支类型" clearable>
          <el-option
            v-for="dict in dict.type.advance_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="目标地址" prop="toAddress">
        <el-input
          v-model="queryParams.toAddress"
          placeholder="请输入目标地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务地址" prop="fromAddress">
        <el-input
          v-model="queryParams.fromAddress"
          placeholder="请输入任务地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易单号" prop="advanceId">
        <el-input
          v-model="queryParams.advanceId"
          placeholder="请输入交易单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="isStatus">
        <el-select v-model="queryParams.isStatus" placeholder="请选择预支状态" clearable>
          <el-option
            v-for="dict in dict.type.advance_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="生成时间" prop="comeTime">
        <el-date-picker clearable
          v-model="queryParams.comeTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择任务生成时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="goTime">
        <el-input
          v-model="queryParams.goTime"
          placeholder="请输入任务结束时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="归还状态" prop="isReturnStatus">
        <el-select v-model="queryParams.isReturnStatus" placeholder="请选择归还状态" clearable>
          <el-option
            v-for="dict in dict.type.is_return_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['advanceTask:advanceTask:add']"
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
          v-hasPermi="['advanceTask:advanceTask:edit']"
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
          v-hasPermi="['advanceTask:advanceTask:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['advanceTask:advanceTask:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="advanceTaskList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="类型" align="center" prop="advanceType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.advance_type" :value="scope.row.advanceType"/>
        </template>
      </el-table-column>
      <el-table-column label="目标地址" align="center" prop="toAddress" />
      <el-table-column label="任务金额" align="center" prop="taskMoney">
        <template slot-scope="scope">
          {{scope.row.taskMoney/1000000 }}
        </template>
      </el-table-column>
      <el-table-column label="任务地址" align="center" prop="fromAddress" />
      <el-table-column label="交易单号" align="center" prop="advanceId" />
      <el-table-column label="状态" align="center" prop="isStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.advance_status" :value="scope.row.isStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="生成时间" align="center" prop="comeTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.comeTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="goTime" />
      <el-table-column label="归还状态" align="center" prop="isReturnStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.is_return_status" :value="scope.row.isReturnStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="用户id" align="center" prop="userId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['advanceTask:advanceTask:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['advanceTask:advanceTask:remove']"
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

    <!-- 添加或修改预支任务对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listAdvanceTask, getAdvanceTask, delAdvanceTask, addAdvanceTask, updateAdvanceTask } from "@/api/advanceTask/advanceTask";

export default {
  name: "AdvanceTask",
  dicts: ['advance_type', 'advance_status', 'is_return_status'],
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
      // 预支任务表格数据
      advanceTaskList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        advanceType: null,
        toAddress: null,
        fromAddress: null,
        advanceId: null,
        isStatus: null,
        comeTime: null,
        goTime: null,
        isReturnStatus: null,
        userId: null
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
    /** 查询预支任务列表 */
    getList() {
      this.loading = true;
      listAdvanceTask(this.queryParams).then(response => {
        this.advanceTaskList = response.rows;
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
        advanceType: null,
        toAddress: null,
        taskMoney: null,
        fromAddress: null,
        fromKey: null,
        advanceId: null,
        isStatus: null,
        comeTime: null,
        goTime: null,
        isReturnStatus: null,
        userId: null
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
      this.title = "添加预支任务";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAdvanceTask(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改预支任务";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAdvanceTask(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAdvanceTask(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除预支任务编号为"' + ids + '"的数据项？').then(function() {
        return delAdvanceTask(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('advanceTask/advanceTask/export', {
        ...this.queryParams
      }, `advanceTask_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
