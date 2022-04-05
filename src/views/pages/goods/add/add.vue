<template>
  <div class="addbox">
    <el-alert
      title="添加商品信息"
      type="info"
      center
      :closable="false"
      show-icon
    >
    </el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px" @click="next">下一步</el-button>
<!-- tabs标签页 -->

<el-tabs tab-position="left" style="height: auto;">

    <el-tab-pane label="用户管理">
      <!-- 用户管理的表单 -->
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="名称">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-input v-model="formLabelAlign.region"></el-input>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input v-model="formLabelAlign.type"></el-input>
  </el-form-item>
</el-form></el-tab-pane>
    <el-tab-pane label="配置管理">2</el-tab-pane>
    <el-tab-pane label="角色管理">3</el-tab-pane>
    <el-tab-pane label="定时任务补偿">4</el-tab-pane>
  </el-tabs>

  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      //  用户管理的数据
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
  },
};
</script>

<style lang="less" scoped>
.addbox{
background-color: white;
}
       
</style>