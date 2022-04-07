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
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px" @click="next">下一步</el-button>
    <!-- tabs标签页 -->

    <el-tabs tab-position="left" style="height: auto">
      <el-tab-pane label="基本信息">
        <!-- 用户管理的表单 -->
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
        >
          <el-form-item label="商品名称">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="formLabelAlign.num"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              v-model="value"
              :options="options"
              @change="handleChange"
            ></el-cascader>
          </el-form-item> </el-form
      ></el-tab-pane>
      <el-tab-pane label="商品参数">
        <div>热卖主机</div>

        <div class="checkboxcss">
          <el-checkbox checked label="6g,i5" border></el-checkbox>
          <el-checkbox checked label="7g,i6" border></el-checkbox>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
         
        >
          <el-form-item label="商品名称">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload></el-tab-pane
      >
      <el-tab-pane label="商品内容">
        <el-button type="primary">添加商品</el-button></el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  上传的数据

      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],

      // 级联的数据
      value: [],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
          ],
        },
      ],
      // 步骤条切换的值
      active: 0,
      //  用户管理的数据
      labelPosition: "top",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
        num: "",
      },
    };
  },
  methods: {
    next() {
      if (this.active++ > 5) this.active = 0;
    },
    // 上传的两个方法
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="less" scoped>
.addbox {
  background-color: white;
}
// 商品参数的样式
.checkboxcss {
  margin-top: 20px;
  .el-checkbox {
    margin-right: 0px;
  }
}
</style>