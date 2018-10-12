<template>
  <div class="user_manage">
    <div class="usmg_title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/inno/patent' }">专利列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑专利</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div style="margin-top:20px;">
      <el-form :model="patentForm" :rules="rules" ref="patentForm" label-width="100px" class="demo-roleForm">
        <el-form-item label="专利名称" prop="name">
          <el-input v-model="patentForm.name"></el-input>
        </el-form-item>
        <el-form-item label="申请人" prop="owner">
          <el-input v-model="patentForm.owner"></el-input>
        </el-form-item>
        <el-form-item label="申请时间" required>
          <el-form-item prop="appDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="patentForm.appDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="领域ID" prop="field">
          <el-input v-model="patentForm.field"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('patentForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
import PatentService from "../PatentService";
var _PatentService = new PatentService();

  export default {
    data() {
      return {
        dataId:null,
        patentForm: {
          name: '',
          owner: '',
          appDate: '',
          field: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入专利名称', trigger: 'blur' }
          ],
          owner: [
            { required: true, message: '请输入申请人', trigger: 'blur' }
          ],
          appDate: [
            { type: 'date', required: true, message: '请选择申请日期', trigger: 'change' }
          ],
          field: [
            { required: true, message: '请选择领域', trigger: 'blur' }
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
              name: this.patentForm.name,
              owner: this.patentForm.owner,
              appDate: this.patentForm.appDate,
              field: this.patentForm.field !== '' ? JSON.parse(this.patentForm.field) : {}
            }
            _PatentService.addPatentData(params).then(data => {
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
          patentId: this.patentForm.patentId,
          name: this.patentForm.name,
          owner: this.patentForm.owner,
          appDate: this.patentForm.appDate,
          field: this.patentForm.field !== '' ? JSON.parse(this.patentForm.field) : {}
        }
        _PatentService.updatePatentData(params).then(data=>{
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
        _PatentService.getPatentDataById(this.dataId).then((data) => {
          console.log(data)
          if(data.code==2000){
            this.patentForm.patentId = data.data.patentId,
            this.patentForm.name=data.data.name;
            this.patentForm.owner=data.data.owner;
            this.patentForm.appDate=data.data.appDate;
            this.patentForm.field=JSON.stringify(data.data.field)
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