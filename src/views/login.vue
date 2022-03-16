<template>
  <div class="body-box">
    <div class="login-box">
      <!-- 圆形图案 -->
      <div class="circle-box">
        <img src="../assets/logo.png" alt=""  />
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"

      >
        <el-form-item label="" prop="userName">
          <el-input
            v-model="ruleForm.userName"
            autocomplete="off"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="button-box">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (value.toString().length < 3 || value.toString().length > 10) {
          callback(new Error("长度为3到10个字符"));
        }
        callback();
      }
    };

    return {
      ruleForm: {
        pass: "",
        userName: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        userName: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.body-box {
  width: 100vw;
  height: 100vh;
  background-color: #5dbe8a;
  position: relative;
  .login-box {
    box-sizing: border-box;
    width: 450px;
    height: 300px;
    background-color: white;
    padding: 100px 15px 0px 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // 圆形图案
    .circle-box {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-color: #eeeeee;
      position: absolute;
      left: 50%;
      transform: translatex(-50%);
      top: -21%;
      box-sizing: border-box;
      border: 10px solid white;
      overflow: hidden;
      box-shadow: 0 0 10px #ddd;
      img{
       width:100%;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
      }
    }
    .button-box {
      box-sizing: border-box;
      padding-top: 10px;
      text-align: right;
    }
  }
}
</style>