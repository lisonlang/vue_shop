<template>
  <el-container>
    <!-- 头部 -->
    <el-header class="head-box">
      <div>
        <el-avatar :size="50" :src="userUrl"></el-avatar>
        <span> 电商后台管理系统</span>
      </div>
      <button>退出</button>
    </el-header>
    <!-- 导航与切换区域 -->
    <el-container>
      <!-- 导航栏 -->
      <el-aside :width="isCollapse ? '65px' : '202px'">
        <!-- ele-ui引入的导航 -->
        <!-- 自定义按钮 -->
        <div @click="isCollapse = !isCollapse" class="show">|||</div>

        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 0px">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#303133"
          text-color="white"
          active-text-color="#409EFF"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-magic-stick"></i>
              <span slot="title">欢迎光临</span>
            </template>
            <!-- 这种写法还是有问题先这样写着 -->
            <el-menu-item :index="{ name: `welcome` }">
              <i class="el-icon-menu"></i>welcome</el-menu-item
            >
          </el-submenu>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">用户管理</span>
            </template>

            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>用户列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>角色列表</el-menu-item
            >
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>权限列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-shopping-bag-2"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>商品列表</el-menu-item
            >
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>分类参数</el-menu-item
            >
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>商品分类</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>订单列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>数据报表</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 切换区域 -->
      <el-main class="box"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import userUrl from "../assets/manager.jpg";
import axios from "axios";
export default {
  data() {
    return {
      isCollapse: true,
      userUrl,
    };
  },
  mounted() {
    axios
      .get("https://lianghj.top:8888/api/private/v1/menus")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped lang="less">
// 导航与切换区域

ele-ui引入的导航 .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
// 按钮
.show {
  color: white;
  text-align: center;
  font-size: 10px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  background-color: #4a5064;
}
// 顶栏样式
.head-box {
  padding-left: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    img,
    span {
      vertical-align: middle;
    }
  }
  button {
    height: 30px;
  }
}
</style>