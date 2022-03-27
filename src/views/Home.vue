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
          <el-submenu
            v-for="(item, index) in menu"
            :key="item.id"
            :index="index.toString()"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{ item.authName }}</span>
            </template>

            <el-menu-item
              v-for="childrenItem in item.children"
              :key="childrenItem.id"
              :index="`/home/${childrenItem.path}`"
            >
              <i class="el-icon-menu"></i
              >{{ childrenItem.authName }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 切换区域 -->
      <el-main class="box"> <router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import userUrl from "../assets/manager.jpg";
import { request } from "../network/request";
export default {
  data() {
    return {
      isCollapse: true,
      userUrl,
      // 面包屑中的值
      firstMenu: "",
      secondMenu: "",
      // 菜单的数据
      menu: "",
    };
  },
  mounted() {
    // axios
    //   .get("https://lianghj.top:8888/api/private/v1/menus")
    request({ url: "/menus", method: "get" })
      .then((res) => {
        this.menu = res.data.data;
        // console.log(this.menu);
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