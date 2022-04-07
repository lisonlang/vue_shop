<template>
  <div>
    <!-- 添加分类按钮 -->
    <div><el-button type="primary">添加分类</el-button></div>
    <!-- 表格 -->
    <tree-table
      class="treeTable"
      :data="cateList"
      :columns="columns"
      :selection-type="false"
      :expand-type="false"
      index-text="#"
      :show-row-hover="false"
      show-index
      border
    >
      <!-- 是否有效 -->
      <template slot="isOk" slot-scope="scope">
        <i
          class="el-icon-success"
          style="color: lightgreen"
          v-if="scope.row.cat_deleted === false"
        ></i>
      </template>
      <!-- 排序 -->
      <template slot="order" slot-scope="scope">
        <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
        <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1"
          >二级</el-tag
        >
        <el-tag size="mini" type="warning" v-else>三级</el-tag>
      </template>
      <!-- 操作 -->
      <template slot="opt" slot-scope="scope">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="showEditCateDialog(scope.row.cat_id)"
          >编辑</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="removeCate(scope.row.cat_id)"
          >删除</el-button
        >
      </template>
    </tree-table>
  </div>
</template>

<script>
import {request} from "../../../network/request";
export default {
  mounted() {
   this. getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await request({
        url: "/categories",
        method: "get",
        params: this.query,
      });
   this.cateList=res.data.result;
    },
  },
  data() {
    return {
      query: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
    //   表格数据
cateList:[],
      // 为table指定列的定义
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          // 当前列 自定义模板
          type: "template",
          template: "isOk",
        },
        {
          label: "排序",
          // 当前列 自定义模板
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          // 当前列 自定义模板
          type: "template",
          template: "opt",
        },
      ],
    };
  },
};
</script>

<style>
</style>