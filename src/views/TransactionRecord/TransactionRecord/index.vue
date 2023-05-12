<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="转账单号" prop="transactionId">
        <el-input
          v-model="queryParams.transactionId"
          placeholder="请输入转账单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="币种" prop="symbol">
        <el-select v-model="queryParams.symbol" placeholder="请选择币种" clearable>
          <el-option
            v-for="dict in dict.type.money_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="中转地址" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入中转地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="币名" prop="nameSymbol">
        <el-input
          v-model="queryParams.nameSymbol"
          placeholder="请输入币名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="转账时间" prop="blockTimestamp">
        <el-date-picker clearable
          v-model="queryParams.blockTimestamp"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择转账时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="入款地址" prop="fromAddress">
        <el-input
          v-model="queryParams.fromAddress"
          placeholder="请输入入款地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款地址" prop="toAddress">
        <el-input
          v-model="queryParams.toAddress"
          placeholder="请输入收款地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择交易类型" clearable>
          <el-option
            v-for="dict in dict.type.transaction_type"
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
          v-hasPermi="['TransactionRecord:TransactionRecord:add']"
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
          v-hasPermi="['TransactionRecord:TransactionRecord:edit']"
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
          v-hasPermi="['TransactionRecord:TransactionRecord:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['TransactionRecord:TransactionRecord:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="TransactionRecordList" @selection-change="handleSelectionChange" :default-sort = "{prop: 'blockTimestamp', order: 'descending'}">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="${comment}" align="center" prop="id" /> -->
      <el-table-column label="转账单号" align="center" prop="transactionId" />
      <el-table-column label="币种" align="center" prop="symbol">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.money_type" :value="scope.row.symbol"/>
        </template>
      </el-table-column>
      <el-table-column label="TRC20合约地址" align="center" prop="address" />
      <!-- <el-table-column label="小数点" align="center" prop="decimals" /> -->
      <el-table-column label="币名" align="center" prop="nameSymbol" />
      <el-table-column label="转账时间" align="center" prop="blockTimestamp" width="180" sortable>
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.blockTimestamp) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入款地址" align="center" prop="fromAddress" />
      <el-table-column label="收款地址" align="center" prop="toAddress" />
      <el-table-column label="交易类型" align="center" prop="type">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.transaction_type" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="交易金额" align="center" prop="moneyValue" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['TransactionRecord:TransactionRecord:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['TransactionRecord:TransactionRecord:remove']"
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

    <!-- 添加或修改TransactionRecord对话框 -->
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
import { listTransactionRecord, getTransactionRecord, delTransactionRecord, addTransactionRecord, updateTransactionRecord } from "@/api/TransactionRecord/TransactionRecord";

export default {
  name: "TransactionRecord",
  dicts: ['transaction_type', 'money_type'],
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
      // TransactionRecord表格数据
      TransactionRecordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        transactionId: null,
        symbol: null,
        address: null,
        nameSymbol: null,
        blockTimestamp: null,
        fromAddress: null,
        toAddress: null,
        type: null,
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
    /** 查询TransactionRecord列表 */
    getList() {
      this.loading = true;
      listTransactionRecord(this.queryParams).then(response => {
        this.TransactionRecordList = response.rows;
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
        transactionId: null,
        symbol: null,
        address: null,
        decimals: null,
        nameSymbol: null,
        blockTimestamp: null,
        fromAddress: null,
        toAddress: null,
        type: null,
        moneyValue: null
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
      this.title = "添加TransactionRecord";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTransactionRecord(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改TransactionRecord";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTransactionRecord(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTransactionRecord(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除TransactionRecord编号为"' + ids + '"的数据项？').then(function() {
        return delTransactionRecord(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('TransactionRecord/TransactionRecord/export', {
        ...this.queryParams
      }, `TransactionRecord_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
