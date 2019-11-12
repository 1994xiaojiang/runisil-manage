<template>
  <div class="tableShow">
    <el-table
      :data="tableData"
      border
      style="width: 96%;box-shadow: 0 0 10px #e2e2e2;height: 390px;">
      <el-table-column prop="id" label="ID#" width="180"></el-table-column>
      <el-table-column prop="ip" label="IP地址"></el-table-column>
      <el-table-column prop="country" label="国家"></el-table-column>
      <el-table-column prop="statytime" label="停留时长（毫秒/ms）"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    }
  }
}
</script>
<style>
  .tableShow {

  }
</style>
