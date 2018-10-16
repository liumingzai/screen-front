<template>
  <div class="user_manage">
    <div class="usmg_title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/inno/field' }">领域列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑领域</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div style="margin-top:20px;">
      <el-form :model="fieldForm" :rules="rules" ref="fieldForm" label-width="100px" class="demo-fieldForm">
        <el-form-item label="领域名称" prop="name">
          <el-input v-model="fieldForm.name"></el-input>
        </el-form-item>
        <el-form-item label="申请人TOP10" prop="patentOwner">
          <el-input v-model="fieldForm.patentOwner"></el-input>
        </el-form-item>
        <el-form-item label="专利类型分析" prop="patentCateOwner">
          <el-input v-model="fieldForm.patentCateOwner"></el-input>
        </el-form-item>
        <el-form-item label="专利类型" prop="patentTypeOwner">
          <el-input v-model="fieldForm.patentTypeOwner"></el-input>
        </el-form-item>
        <el-form-item label="专利类型分布" prop="patentType">
          <el-input v-model="fieldForm.patentType"></el-input>
        </el-form-item>
        <el-form-item label="专利区域分布" prop="patentProvince">
          <el-input v-model="fieldForm.patentProvince"></el-input>
        </el-form-item>
        <el-form-item label="各省专利" prop="patentTypeProvince">
          <el-input v-model="fieldForm.patentTypeProvince"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('fieldForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
import FieldEditService from "./fieldEditService";
var _FieldEditService = new FieldEditService();

  export default {
    data() {
      return {
        dataId:null,
        fieldForm: {
          name: '',
          logo: '',
          patentOwner: '',
          patentCateOwner: '',
          patentTypeOwner: '',
          patentType: '',
          patentProvince: '',
          patentTypeProvince: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入领域名称', trigger: 'blur' }
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
              name: this.fieldForm.name,
              logo: this.fieldForm.logo,
              patentOwner: this.fieldForm.patentOwner !== '' ? this.fieldForm.patentOwner : "{}",
              patentCateOwner: this.fieldForm.patentCateOwner !== '' ? this.fieldForm.patentCateOwner : "{}",
              patentTypeOwner: this.fieldForm.patentTypeOwner !== '' ? this.fieldForm.patentTypeOwner : "[]",
              patentType: this.fieldForm.patentType !== '' ? this.fieldForm.patentType : "[]",
              patentProvince: this.fieldForm.patentProvince !== '' ? this.fieldForm.patentProvince : "{}",
              patentTypeProvince: this.fieldForm.patentTypeProvince !== '' ? this.fieldForm.patentTypeProvince : "[]"
            }
            _FieldEditService.addFieldData(params).then(data => {
              if (data.code == 2000) {
                this.$message.success('添加数据成功');
                this.$router.push({name:'field'});
              } else {
                return false;
              }
            });
          }
        });
      },
      updateData(){
        let params = {
          fieldId: this.fieldForm.fieldId,
          name: this.fieldForm.name,
          logo: this.fieldForm.logo,
          patentOwner: this.fieldForm.patentOwner !== '' ? this.fieldForm.patentOwner : "{}",
          patentCateOwner: this.fieldForm.patentCateOwner !== '' ? this.fieldForm.patentCateOwner : "{}",
          patentTypeOwner: this.fieldForm.patentTypeOwner !== '' ? this.fieldForm.patentTypeOwner : "[]",
          patentType: this.fieldForm.patentType !== '' ? this.fieldForm.patentType : "[]",
          patentProvince: this.fieldForm.patentProvince !== '' ? this.fieldForm.patentProvince : "{}",
          patentTypeProvince: this.fieldForm.patentTypeProvince !== '' ? this.fieldForm.patentTypeProvince : "[]"
        }
        _FieldEditService.updateFieldData(params).then(data=>{
          console.log(data)
          if(data.code==2000){
            this.$message.success('更改数据成功');
            this.$router.push({name:'field'});
          }else{
            this.$message.error(data.message)
          }
        }).catch(err=>{
          console.log(err)
          this.$message.error('网络错误')
        })  
      }
    },
    created(){
      this.dataId = this.$route.params.id;
      if (this.dataId) {
        _FieldEditService.getFieldDataById(this.dataId).then((data) => {
          if(data.code==2000){
            this.fieldForm.fieldId = data.data.fieldId;
            this.fieldForm.name = data.data.name;
            this.fieldForm.logo = data.data.logo;
            this.fieldForm.patentOwner = data.data.patentOwner;
            this.fieldForm.patentCateOwner = data.data.patentCateOwner;
            this.fieldForm.patentTypeOwner = data.data.patentTypeOwner;
            this.fieldForm.patentType = data.data.patentType;
            this.fieldForm.patentProvince = data.data.patentProvince;
            this.fieldForm.patentTypeProvince = data.data.patentTypeProvince;    
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