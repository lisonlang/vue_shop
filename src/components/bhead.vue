<template>

  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{name: 'welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{firstMenu}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{secondMenu}}</el-breadcrumb-item>
 
  </el-breadcrumb>
 
</template>

<script>
export default {
   name:"bhead",
   
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