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
          <el-button type="primary" @click="submitForm('entityForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
import EntityService from "../EntityService";
var _EntityService = new EntityService();

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
              mainIndustry: this.entityForm.mainIndustry !== '' ? JSON.parse(this.entityForm.mainIndustry) : {}
            }
            _EntityService.addEntityData(params).then(data => {
              if (data.code == 2000) {
                this.$message.success('添加数据成功');
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
          mainIndustry: this.entityForm.mainIndustry !== '' ? JSON.parse(this.entityForm.mainIndustry) : "[]"
        }
        _EntityService.updateEntityData(params).then(data=>{
          console.log(data)
          if(data.code==2000){
            this.$message.success('更改数据成功')
            this.$router.push({name:'patentList'})
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
        _EntityService.getEntityDataById(this.dataId).then((data) => {
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
          this.entityForm.mainIndustry = JSON.stringify(data.data.mainIndustry);   
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