<template>
  <div class="user_manage">
    <div class="usmg_title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/inno/entity' }">载体列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑载体</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div style="margin-top:20px;">
      <el-form :model="entityForm" :rules="rules" ref="entityForm" label-width="100px" class="demo-entityForm">
        <el-form-item label="载体名称" prop="name">
          <el-input v-model="entityForm.name"></el-input>
        </el-form-item>
        <el-form-item label="载体Logo" prop="logo">
          <el-upload 
            action="/innoEntity/uploadLogoPicture" 
            :beforeUpload="beforePicUpload" 
            :onError="uploadError" 
            :http-request='uploadPicFile' 
            :on-success='onSuccess' 
            :show-file-list="false">
            <!--<el-button size="small" type="primary">上传头像</el-button>-->
            <img v-if="entityForm.logo" :src="entityForm.logo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="载体地址" prop="address">
          <el-input v-model="entityForm.address"></el-input>
        </el-form-item>
        <el-form-item label="总投资" prop="investCount">
          <el-input v-model="entityForm.investCount"></el-input>
        </el-form-item>
        <el-form-item label="载体面积" prop="area">
          <el-input v-model="entityForm.area"></el-input>
        </el-form-item>
        <el-form-item label="入驻企业" prop="entCount">
          <el-input v-model="entityForm.entCount"></el-input>
        </el-form-item>
        <el-form-item label="办公人数" prop="personCount">
          <el-input v-model="entityForm.personCount"></el-input>
        </el-form-item>
        <el-form-item label="主导产业" prop="mainIndustry">
          <el-input v-model="entityForm.mainIndustry"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('entityForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
import EntityEditService from "./entityEditService";
var _EntityEditService = new EntityEditService();

  export default {
    data() {
      return {
        dataId:null,
        entityForm: {
          name: '',
          logo: '',
          address: '',
          investCount: '',
          area: '',
          entCount: '',
          personCount: '',
          mainIndustry: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入载体名称', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 针对field的json处理
            let params = {
              name: this.entityForm.name,
              logo: this.entityForm.logo,
              address: this.entityForm.address,
              investCount: this.entityForm.investCount,
              area: this.entityForm.area,
              entCount: this.entityForm.entCount,
              personCount: this.entityForm.personCount,
              mainIndustry: this.entityForm.mainIndustry !== '' ? this.entityForm.mainIndustry : "[]"
            }
            _EntityEditService.addEntityData(params).then(data => {
              if (data.code == 2000) {
                this.$message.success('添加数据成功');
                this.$router.push({name:'entity'});
              } else {
                return false;
              }
            });
          }
        });
      },
      updateData(){
        let params = {
          entityId: this.entityForm.entityId,
          name: this.entityForm.name,
          logo: this.entityForm.logo,
          address: this.entityForm.address,
          investCount: this.entityForm.investCount,
          area: this.entityForm.area,
          entCount: this.entityForm.entCount,
          personCount: this.entityForm.personCount,
          mainIndustry: this.entityForm.mainIndustry !== '' ? this.entityForm.mainIndustry : "[]"
        }
        _EntityEditService.updateEntityData(params).then(data=>{
          console.log(data)
          if(data.code==2000){
            this.$message.success('更改数据成功');
            this.$router.push({name:'entity'});
          }else{
            this.$message.error(data.message)
          }
        }).catch(err=>{
          console.log(err)
          this.$message.error('网络错误')
        })  
      },
      onSuccess(res, file, fileList) {
        console.log(fileList);
      },
      uploadPicFile(param) {
        //自定义文件上传
        var _this = this;
        var fd = new FormData();
        fd.append("upload", param.file);
        var xhr = new XMLHttpRequest();
        xhr.open("post", "http://192.168.1.151:90/screen-portal/innoEntity/uploadLogoPicture", true);
        xhr.send(fd);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            console.log(res);
            if (res.code == 2000) {
              _this.$message.success("上传文件成功");
              _this.entityForm.logo=res.data
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
      }
    },
    created(){
      this.dataId = this.$route.params.id;
      if (this.dataId) {
        _EntityEditService.getEntityDataById(this.dataId).then((data) => {
          console.log(data)
          if(data.code==2000){
          this.entityForm.entityId = data.data.entityId
          this.entityForm.name = data.data.name,
          this.entityForm.logo = data.data.logo,
          this.entityForm.address = data.data.address,
          this.entityForm.investCount = data.data.investCount,
          this.entityForm.area = data.data.area,
          this.entityForm.entCount = data.data.entCount,
          this.entityForm.personCount = data.data.personCount,
          this.entityForm.mainIndustry = data.data.mainIndustry;   
          }else{
            this.$message.error(data.message)
          }
        }).catch((err) => {
            console.log(err)
            this.$message.error('网络错误')
        });
      }
    }
  };
</script>