<template>
  <div class="login">

    <div class="loginContainer">
       <div style="padding-left:65px;padding-bottom:20px">普奥可视化大屏数据管理系统</div>
      <el-form :model='loginParams' ref='loginParams' label-width='80px'>
        <el-form-item label='用户名'>
          <el-input v-model="loginParams.authentication"></el-input>
        </el-form-item>

        <el-form-item label='密码'>
          <el-input type='password' v-model="loginParams.password"></el-input>
        </el-form-item>

        <el-form-item label-width='140px'>
          <el-button type='primary' @click="handleLogin">Login</el-button>
        </el-form-item>

      </el-form>

    </div>

  </div>

</template>

<script>
import LoginService from "./loginService";
var _LoginService = new LoginService();
export default {
  name: "login",
  data() {
    return {
      loginParams: {
        authentication: "",
        password: ""
      }
    };
  },
  methods: {
    handleLogin() {
      const username = this.loginParams.authentication;
      const password = this.loginParams.password;
      _LoginService
        .loginByPassword(username, password)
        .then(data => {
          console.log(data);
          if (data.code == 2000) {
            this.$message.success("登录成功");
            const typeList = [1, 2]; // 1管理员 2普通用户
            const idList = data.data.roles.map(item => item.id);
            let userType = null; // 1-管理员，2-普通用户
            const typeNames = ["管理员", "普通用户"];
            // 暂时的业务，用户和角色都是1对1
            if (idList.length === 1 && typeList.indexOf(idList[0]) > -1) {
              userType = typeList.indexOf(idList[0]) + 1;
            }
            const loginData = {
              username: data.data.username,
              uid: data.data.uid,
              roles: data.data.roles,
              phone: data.data.phone,
              email: data.data.email,
              logo: data.data.headPic,
              userType,
              typeName: typeNames[userType - 1],
              state: data.data.state ? "有效" : "无效",
              id: data.data.id
            };

            localStorage.setItem("account", JSON.stringify(loginData));
            this.$router.push('/screen/data/dataManage');
          } else {
            this.$message.error(data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("网络错误");
        });
    }
  },
  created() {}
};
</script>

<style lang="scss">
.login {
  padding-top: 100px;
  background: #f0f2f5;
  height: 100%;
  .loginContainer {
    width: 300px;
    margin: 0 auto;
  }
}
</style>
