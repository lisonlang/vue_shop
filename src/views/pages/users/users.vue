<template>
  <div>
    <Bhead firstMenu="用户管理" secondMenu="用户列表"></Bhead>
    <!-- 切换的区域 -->
    <div class="table-box">
      <!-- 搜索 -->
      <div class="input-box">
        <el-input
          placeholder="请输入内容"
          class="input-with-select"
          v-model="queryinfo.query"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="finduser"
          ></el-button>
        </el-input>
        <el-button type="primary" @click="showadd = true">用户添加</el-button>
      </div>

      <!-- 表格 -->
      <div>
        <el-table :data="tableData" border style="width: 100%" stripe>
          <el-table-column type="index" label="#"> </el-table-column>

          <el-table-column prop="username" label="姓名"> </el-table-column>

          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.value"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <!-- 表格按钮 -->
          <el-table-column
            align="center"
            label="操作"
            header-align="left"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="edituser(scope.row)"
                size="mini"
              ></el-button>
              <!-- 删除 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deluser(scope.row.id)"
                size="mini"
              ></el-button>
              <!-- 分配角色按钮 -->
              <el-button
                type="warning"
                icon="el-icon-setting"
                @click="showroleinfo(scope.row)"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryinfo.pagenum"
          :page-sizes="[5, 9, 13, 15]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 修改用户信息对话框 -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            v-model="form.username"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除信息的对话框 -->
    <el-dialog title="永久删除该用户" :visible.sync="delinfo" width="30%">
      <span>此操作将永久删除该文件, 是否继续?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delinfo = false">取 消</el-button>
        <el-button type="primary" @click="truedel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="roleinfo" width="50%">
      <span
        ><div>当前的用户 : {{ userinfo.username}}</div>
        <div>当前的角色 : {{ userinfo.role_name }}</div>
        <div>
          分配新角色 ：
          <el-select v-model="roleid" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select></div
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleinfo = false">取 消</el-button>
        <el-button type="primary" @click="surerole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="showadd"
      @close="addDislogClosed"
    >
      <el-form :model="addForm" ref="addFormRef" >
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input autocomplete="off" v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input autocomplete="off" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input autocomplete="off" v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
          <el-input autocomplete="off" v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showadd = false">取 消</el-button>
        <el-button type="primary" @click="addway()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Bhead from "../../../components/bhead.vue";
import { request } from "../../../network/request";
export default {
  components: {
    Bhead,
  },
  mounted() {
    // 引入用户数据

    this.getuserinfo();
  },
  methods: {
    // 监听添加用户的对话框关闭事件
    addDislogClosed() {
    
      this.$refs.addFormRef.resetFields();
    },
    // 添加用户的方法
    addway() {
      request({
        method: "post",
        url: "/users",
        data: this.addForm,
      })
        .then((res) => {
          if (res.data.meta.status === 201) {
            this.showadd = false;
            this.getuserinfo();
            //   this.addForm = {
            //   username: "",
            //   password: "",
            //   email: "",
            //   mobile: "",
            // };
            return this.$message.success("恭喜你，添加成功");
          
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 编辑用户角色的弹框
    showroleinfo(value) {
      this.roleinfo = true;
this.userinfo=value;
      // this.roleuser = value.username;
      // this.role = value.role_name;
      // 选中的id
      // this.id = value.id;
      //  获取角色列表
      request({
        url: "/roles",
        method: "get",
      })
        .then((res) => {
          console.log(res.data.data);
          if (res.data.meta.status === 200) {
            this.$message({
              message: "恭喜你，这是一条成功消息",
              type: "success",
            });

            this.options = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 确认修改角色的方法
    surerole() {
      this.roleinfo = false;
      request({
        url: `/users/${this.userinfo.id}/role`,
        method: "put",
        data: {
          rid: this.roleid,
        },
      })
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.getuserinfo();
            this.roleid = "";
          }
        })
        .catch(() => {});
    },

    // 搜索用户的方法
    finduser() {
      this.getuserinfo();
    },
    // 得到用户数据的方法
    async getuserinfo() {
      const { data: res } = await request({
        url: "/users",
        method: "get",
        params: this.queryinfo,
      });
      if (res.meta.status === 200) {
        this.$message.success("获取用户列表成功!");
        this.tableData = res.data.users;
        this.total = res.data.total;
        this.queryinfo.pagenum = res.data.pagenum;
      } else {
        this.$message.error("获取用户列表失败!");
      }
      // .then((res) => {
      //   // 获取表格数据
      //   this.tableData = res.data.data.users;
      //   // 获取总计录数
      //   this.total = res.data.data.total;
      //   // 获取当前页
      //   this.queryinfo.pagenum = res.data.data.pagenum;
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    },
    //  分页的方法
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryinfo.pagesize = val;

      this.getuserinfo();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.queryinfo.pagenum = val;

      this.getuserinfo();
    },
    //确定修改用户的方法
    sureEdit() {
      this.dialogFormVisible = false;
      request({
        url: `/users/${this.form.id}`,
        method: "put",
        data: {
          email: this.form.email,
          mobile: this.form.mobile,
        },
      })
        .then((res) => {
          if (res.data.meta.status === 200) {
            // console.log("进来了吗");
            // console.log(res.data);
            this.getuserinfo();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 编辑用户框回显的方法
    edituser(value) {
      this.dialogFormVisible = true;
      // console.log(value);
    
      this.form =value
    },
    // 删除用户的方法
    deluser(id) {
      this.delinfo = true;
      this.id = id;
    },
    truedel() {
      this.delinfo = false;
      request({
        url: `/users/${this.id}`,

        method: "delete",
      })
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.$message({
              message: "恭喜你，删除成功消息",
              type: "success",
            });
            if (this.tableData.length === 1) {
              --this.queryinfo.pagenum;
            }
            if (this.queryinfo.pagenum < 1) {
              this.queryinfo.pagenum = 1;
            }
            this.getuserinfo();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      
      // 显示添加用户的对话框
      showadd: false,
      // 添加用户的数据对象
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 角色id
      roleid: "",
      // 要编辑角色的用户名
      // roleuser: "",
      // role: "",
      // 要编辑角色的用户信息
userinfo:{},
      // input: "",
      // select的角色数据
      options: [],
      // 选中用户的id
      id: "",

      value: "",
      // 弹出框label的宽度
      formLabelWidth: "80px",
      // 访问对话框的值
      roleinfo: false,
      delinfo: false,
      dialogFormVisible: false,
      // 当前页的值
      // currentPage4: 1,
      // 每页条数
      // pagesize: 5,
      // 用户信息
      //  表格数据
      tableData: [],
      // 总记录数
      total: 0,
      // 修改表单的值
      form: {
      },
      // 获取用户列表的参数对象
      queryinfo: {
        // 搜索框的值
        query: "",
        // 当前页的值
        pagenum: 1,
        // 每页条数
        pagesize: 5,
      },
    };
  },
};
</script>

<style lang="less" scoped>
.input-with-select {
  width: 30%;
}

.table-box {
  background-color: #fff;

  padding: 20px;
  .input-box {
    padding-bottom: 10px;
  }
  .block {
    padding-top: 10px;
  }
}
</style>