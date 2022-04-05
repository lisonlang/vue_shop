<template>
  <div>
    <Bhead firstMenu="权限管理" secondMenu="角色列表"></Bhead>
    <!-- 表格包裹的区域 -->
    <div class="table-box">
      <el-button type="primary" @click=" flagaddRole=true">添加角色</el-button>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="expand">
          <!-- 表格张凯区域 -->
          <template slot-scope="props">
            <el-row type="flex" align="middle">
              <el-col :span="5">
                <el-tag class="tagbutton" closable @close="handleClose(tag)"
                  >标签一</el-tag
                >
              </el-col>
              <el-col :span="19">
                <el-row class="show">
                  <el-col :span="8">
                    <el-tag class="tagbutton" closable>标签一</el-tag>
                  </el-col>
                  <el-col :span="16">
                    <el-tag class="tagbutton" closable>标签一</el-tag>
                  </el-col>
                </el-row>
                <el-row class="show">
                  <el-col :span="8">
                    <el-tag class="tagbutton" closable>标签一</el-tag></el-col
                  >
                  <el-col :span="16">
                    <el-tag class="tagbutton" closable>标签一</el-tag></el-col
                  >
                </el-row>
                <el-row class="show">
                  <el-col :span="8">
                    <el-tag class="tagbutton" closable>标签一</el-tag></el-col
                  >
                  <el-col :span="16">
                    <el-tag class="tagbutton" closable>标签一</el-tag></el-col
                  >
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column label="角色名称" prop="id"> </el-table-column>
        <el-table-column label="角色描述" prop="name"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="flagChangeRole = true"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="open">删除</el-button>
            <el-button size="mini" @click="editaccess = true" type="warning"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分配权限的弹框 -->
    <el-dialog title="分配权限" :visible.sync="editaccess">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 编辑的弹框 -->
    <el-dialog title="修改角色" :visible.sync="flagChangeRole">
      <el-form :model="role">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="role.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="role.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flagChangeRole = false">取 消</el-button>
        <el-button type="primary" @click="flagChangeRole = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 添加角色的弹框 -->
    <el-dialog title="添加角色" :visible.sync="flagaddRole">
      <el-form :model="addrole">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="addrole.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="addrole.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flagaddRole = false">取 消</el-button>
        <el-button type="primary" @click="flagaddRole = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Bhead from "../../../components/bhead.vue";
export default {
  components: {
    Bhead,
  },
  methods: {
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  data() {
    return {
      // 修改角色的数据
      role: {
        name: "",
        desc: "",
      },
      // 添加角色的数据
      addrole: {
        name: "",
        desc: "",
      },
      // 添加角色弹框的标识符
      flagaddRole: false,

      // 修改角色弹框的标识符
      flagChangeRole: false,
      // 控制分配权限是否显示的标识符
      editaccess: false,
      //  树形组件的数据
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 表格的数据
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.table-box {
  background-color: #fff;
  padding: 20px;
  // 调整表格与按钮距离
  .el-table {
    margin-top: 20px;
  }
  // 张开区域的边框
  .el-col {
    & > .show {
      border-bottom: 1px solid #ebeef5;
      // padding: 10px;
      // 控制边框与tag
      .el-tag {
        margin-bottom: 10px;
        margin-top: 10px;
      }
      &:last-child {
        border-bottom: 0px solid #ebeef5;
      }
    }
  }
}

// ele提供的样式
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>