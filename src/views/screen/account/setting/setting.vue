<template>
  <div class="setting">
     <div class="st_box">
      <div class="st_box_chd">
        <img :src="logo" alt="" style="width:100px;height:100px;border-radius:50%">
      </div>
      <div class="st_box_chd">

        <el-upload action="/common/uploadHeadPicture"
        :beforeUpload="beforePicUpload" 
        :onError="uploadError" 
        :http-request='uploadPicFile' 
        :on-success='onSuccess' 
        :show-file-list="false" 
        :file-list="fileList">
           <el-button size="small" type="primary">上传头像</el-button>
        </el-upload>

      </div>

      <div class="st_box_chd">
        用户名:{{username}}
      </div>

      <div class="st_box_chd">
        用户类型:{{typeName}}
      </div>

      <div class="st_box_chd">
        手机号:{{phone}}
      </div>

      <div class="st_box_chd">
        <span>密码:</span>
        <el-button type='text' @click="openPsdForm">修改密码</el-button>
      </div>

      <div style="width:200px">
       <el-form size='mini' :model="psdParams" label-width='55px' v-show="updatePsdVisible">
          <el-form-item label='旧密码'>
            <el-input v-model="psdParams.oldPassword" type='password'></el-input>
          </el-form-item>
          <el-form-item label='新密码'>
            <el-input v-model="psdParams.newPassword" type='password'></el-input>
          </el-form-item>
          <el-button type='primary' size='small' @click="updatePsd">确定</el-button>
          <el-button size='small' @click="updatePsdVisible=false">取消</el-button>
        </el-form>

      </div>
     
     
    </div> 
      
  </div>

</template>

<script>
import SettingService from './settingService'
import Http from '../../../../http.js';
var _SettingService = new SettingService() 
var _app = new Http();

import axios from 'axios'
export default {
  name: "setting",
  data() {
    return {
      id:'',
      logo: "",
      username: "",
      typeName: "",
      phone: "",
      fileList:[],
      psdParams:{
        oldPassword:"",
        newPassword:""
      },
      updatePsdVisible:false
    }
  },
  methods: {
      //上传头像
    onSuccess(res, file, fileList) {
      console.log(fileList);
    },
    uploadPicFile(param) {
      //自定义文件上传
      // debugger
      var _this = this;
      var fileObj = param.file;
      var FileController = param.action;
      var form = new FormData();
      form.append("upload", fileObj);
      form.append('accountId',this.id)
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open("post", FileController, true);
      xhr.send(form);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const res = JSON.parse(xhr.response);
          console.log(res);
          if (res.code == 2000) {
            _this.$message.success("上传文件成功");
            _this.logo=res.message
            let userInfo = JSON.parse(localStorage.getItem('account'));
            userInfo={
              ...userInfo,
              logo:res.message
            }
            localStorage.setItem('account',JSON.stringify(userInfo))
           
          } else {
            _this.$message.error(res.message);
          }
        } else {
          _this.$message.error("网络错误");
        }
      };
    },
    beforePicUpload(file) {
      console.log(file)
      if(file.type!='image/png' && file.type!='image/jpeg'){
        this.$message.error("图片只能为jpg或png格式")
         return false
      }

      if(file.size/1024/1024>2){
        this.$message.error('图片大小不超过2M')
        return false
      }

      return true
    },
    uploadError(response, file, fileList) {
      console.log(response);
      console.log(fileList);
    },
    openPsdForm(){
        this.psdParams={
        oldPassword:"",
        newPassword:""
        },
        this.updatePsdVisible=true
    },
      //修改密码
    updatePsd(){
        _SettingService.updatePassword(this.psdParams.oldPassword,this.psdParams.newPassword)
        .then((data) => {
          console.log(data)
          if(data.code==2000){
            this.$message.success('修改密码成功，请重新登录')
            localStorage.removeItem('account')
            this.$router.push('/')
          }else{
            this.$message.error(data.message)
          } 
        }).catch((err) => {
          console.log(err)
        });
    }
  },
  created() {
    const userInfo = JSON.parse(localStorage.getItem("account"));
    this.id = userInfo.id;
    this.logo = userInfo.logo;
    this.username = userInfo.username;
    this.typeName = userInfo.typeName;
    this.phone = userInfo.phone;

   
  }
};
</script>

<style lang="scss">
.setting {
  .st_box {
    width: 300px;
    margin: 100px auto 0 auto;
    .st_box_chd{
      margin-top: 20px
    }
  }
}
</style>


