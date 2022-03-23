<template>
<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{firstMenu}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{secondMenu}}</el-breadcrumb-item>
 
  </el-breadcrumb>
  </div>
</template>

<script>
export default {
   name:"bhead",
    mounted () {
        console.log(this.firstMenu);
    },
  props: {
    firstMenu: {
      type: String,
    },

    secondMenu: {
      type: String,
    },
  },
};
</script>

<style>
</style>