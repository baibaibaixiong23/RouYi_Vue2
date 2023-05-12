<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务类型" prop="taskType">
        <el-select v-model="queryParams.taskType" placeholder="请选择任务类型" clearable>
          <el-option
            v-for="dict in dict.type.transition_task_type"
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
      <el-form-item label="任务地址" prop="formAddress">
        <el-input
          v-model="queryParams.formAddress"
          placeholder="请输入任务地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生成单号" prop="comeTransaction">
        <el-input
          v-model="queryParams.comeTransaction"
          placeholder="请输入生成任务的交易单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生成时间" prop="comeTime">
        <el-date-picker clearable
          v-model="queryParams.comeTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择生成任务的交易时间戳">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="任务状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择任务状态" clearable>
          <el-option
            v-for="dict in dict.type.transition_task_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建单号" prop="goTransaction">
        <el-input
          v-model="queryParams.goTransaction"
          placeholder="请输入任务创建的交易单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="goTime">
        <el-date-picker clearable
          v-model="queryParams.goTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择任务创建的交易时间戳">
        </el-date-picker>
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
          v-hasPermi="['TransitionTask:TransitionTask:add']"
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
          v-hasPermi="['TransitionTask:TransitionTask:edit']"
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
          v-hasPermi="['TransitionTask:TransitionTask:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['TransitionTask:TransitionTask:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="TransitionTaskList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="任务类型" align="center" prop="taskType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.transition_task_type" :value="scope.row.taskType"/>
        </template>
      </el-table-column>
      <el-table-column label="目标地址" align="center" prop="toAddress" />
      <el-table-column label="任务金额" align="center" prop="taskMoney" />
      <el-table-column label="任务地址" align="center" prop="formAddress" />
      <el-table-column label="消耗TRX" align="center" prop="expendTrx" />
      <el-table-column label="生成任务的交易单号" align="center" prop="comeTransaction" />
      <el-table-column label="生成任务的交易时间戳" align="center" prop="comeTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.comeTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.transition_task_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="任务创建的交易单号" align="center" prop="goTransaction" />
      <el-table-column label="任务创建的交易时间戳" align="center" prop="goTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.goTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createdTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updatedTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updatedTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['TransitionTask:TransitionTask:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['TransitionTask:TransitionTask:remove']"
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

    <!-- 添加或修改兑换任务记录对话框 -->
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
import { listTransitionTask, getTransitionTask, delTransitionTask, addTransitionTask, updateTransitionTask } from "@/api/TransitionTask/TransitionTask";

export default {
  name: "TransitionTask",
  dicts: ['transition_task_type', 'transition_task_status'],
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
      // 兑换任务记录表格数据
      TransitionTaskList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        taskType: null,
        toAddress: null,
        formAddress: null,
        comeTransaction: null,
        comeTime: null,
        status: null,
        goTransaction: null,
        goTime: null,
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
    /** 查询兑换任务记录列表 */
    getList() {
      this.loading = true;
      listTransitionTask(this.queryParams).then(response => {
        this.TransitionTaskList = response.rows;
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
        taskType: null,
        toAddress: null,
        taskMoney: null,
        formAddress: null,
        formKey: null,
        expendTrx: null,
        comeTransaction: null,
        comeTime: null,
        status: null,
        goTransaction: null,
        goTime: null,
        createdTime: null,
        updatedTime: null
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
      this.title = "添加兑换任务记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTransitionTask(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改兑换任务记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTransitionTask(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTransitionTask(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除兑换任务记录编号为"' + ids + '"的数据项？').then(function() {
        return delTransitionTask(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('TransitionTask/TransitionTask/export', {
        ...this.queryParams
      }, `TransitionTask_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
