<template>
  <div>
    <bhead firstMenu="商品管理" secondMenu="商品列表"></bhead>
    <div class="table-box">
      <!-- 搜索框 -->
        <div>
<el-input   style="width:30%"   placeholder="请输入内容"  class="input-with-select">   <el-button slot="append" icon="el-icon-search"></el-button>
</el-input>
<button @click="addgoods">添加商品</button>
        </div>
        <!-- 表格 -->
        <!-- 分页 -->
        <div>

        </div>

    </div>
  </div>
</template>

<script>
import bhead from "../../../components/bhead.vue";

export default {
  components: {
    bhead,
  },
  methods: {
    addgoods(){
      this.$router.push({
        name:"add"
      })
    }
  }
};
</script>

<style>
</style>