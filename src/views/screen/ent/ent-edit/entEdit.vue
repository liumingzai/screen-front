<template>
  <div class="user_manage">
    <div class="usmg_title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/inno/ent' }">企业列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑企业</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div style="margin-top:20px;">
      <el-form :model="entsForm" :rules="rules" ref="entsForm" label-width="100px" class="demo-entsForm">
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="entsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="注册资本" prop="regCapi">
          <el-input v-model="entsForm.regCapi"></el-input>
        </el-form-item>
        <el-form-item label="成立时间">
          <el-form-item prop="foundDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="entsForm.foundDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
          <el-form-item label="专利趋势" prop="patentTrend">
          <el-input v-model="entsForm.patentTrend"></el-input>
        </el-form-item>
          <el-form-item label="专利类型" prop="patentType">
          <el-input v-model="entsForm.patentType"></el-input>
        </el-form-item>
          <el-form-item label="涉诉案由" prop="caseReason">
          <el-input v-model="entsForm.caseReason"></el-input>
        </el-form-item>
          <el-form-item label="涉诉趋势" prop="caseTrend">
          <el-input v-model="entsForm.caseTrend"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-select v-model="entsForm.priority" placeholder="请选择数据优先级">
            <el-option label="低" value="1"></el-option>
            <el-option label="中" value="2"></el-option>
            <el-option label="高" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="载体信息" prop="entity">
          <el-input v-model="entsForm.entity"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('entsForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import EntEditService from "./entsEditService";
var _EntEditService = new EntEditService();

  export default {
    data() {
      return {
        dataId:null,
        entsForm: {
          name: '',
          regCapi: '',
          foundDate: '',
          patentTrend: '',
          patentType: '',
          caseReason: '',
          caseTrend: '',
          priority: '',
          entity: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入企业名称', trigger: 'blur' }
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
              name: this.entsForm.name,
              regCapi: this.entsForm.regCapi,
              foundDate: this.entsForm.foundDate,
              patentTrend: this.entsForm.patentTrend !== '' ? entsForm.patentTrend : "[]",
              patentType: this.entsForm.patentType !== '' ? entsForm.patentType : "{}",
              caseReason: this.entsForm.caseReason !== '' ? entsForm.caseReason : "{}",
              caseTrend: this.entsForm.caseTrend !== '' ? entsForm.caseTrend : "{}",
              priority: this.entsForm.priority,
              entity: this.entsForm.entity !== '' ? JSON.parse(entsForm.entity) : {}
            }
            _EntEditService.addEntData(params).then(data => {
              if (data.code == 2000) {
                this.$message.success('添加数据成功');
                this.$router.push({name:'ent'});
              } else {
                return false;
              }
            });
          }
        });
      },
      updateData(){
        let params = {
          entId: this.entsForm.entId,
          name: this.entsForm.name,
          regCapi: this.entsForm.regCapi,
          foundDate: this.entsForm.foundDate,
          patentTrend: this.entsForm.patentTrend !== '' ? entsForm.patentTrend : "[]",
          patentType: this.entsForm.patentType !== '' ? entsForm.patentType : "{}",
          caseReason: this.entsForm.caseReason !== '' ? entsForm.caseReason : "{}",
          caseTrend: this.entsForm.caseTrend !== '' ? entsForm.caseTrend : "{}",
          priority: this.entsForm.priority,
          entity: this.entsForm.entity !== '' ? JSON.parse(entsForm.entity) : {}
        }
        _EntEditService.updateEntData(params).then(data=>{
          console.log(data)
          if(data.code==2000){
            this.$message.success('更改数据成功');
            this.$router.push({name:'ent'}).next();
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
        _EntEditService.getEntDataById(this.dataId).then((data) => {
          console.log(data)
          if(data.code==2000){
            this.entsForm.entId = data.data.entId;
            this.entsForm.name = data.data.name;
            this.entsForm.regCapi = data.data.regCapi;
            this.entsForm.foundDate = data.data.foundDate;
            this.entsForm.patentTrend = data.data.patentTrend;
            this.entsForm.patentType = data.data.patentType;
            this.entsForm.caseReason = data.data.caseReason;
            this.entsForm.caseTrend = data.data.caseTrend;
            this.entsForm.priority = data.data.priority;
            this.entsForm.entity = JSON.stringify(data.data.entity);
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