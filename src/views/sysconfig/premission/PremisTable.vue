<template>
  <el-table
    fit
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      :selectable="isChecked"
      width="55">
    </el-table-column>
    <el-table-column
      sortable
      label="申请时间"
      prop="apply_for_date">
    </el-table-column>
    <el-table-column
      label="提现金额"
      sortable
      prop="sum">
    </el-table-column>
    <el-table-column
      label="用户绰号"
      sortable
      prop="userName">
    </el-table-column>
    <el-table-column
      label="用户手机号"
      sortable
      prop="phone">
    </el-table-column>
    <el-table-column
      label="审核状态"
      sortable
      prop="status">
      <template slot-scope="scope">
        <div>
          <span v-if="scope.row.status === 0">等待审核</span>
          <span v-else-if="scope.row.status === 1">已通过</span>
          <span v-else>已拒绝</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="审核人"
      sortable
      prop="approver">
    </el-table-column>
  </el-table>
</template>