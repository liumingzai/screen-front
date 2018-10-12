<template>
  <div class="user_manage">
    <div class="usmg_title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/inno/ent' }">企业列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑企业</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div style="margin-top:20px;">
      <el-form :model="entForm" :rules="rules" ref="entForm" label-width="100px" class="demo-entForm">
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="entForm.name"></el-input>
        </el-form-item>
        <el-form-item label="注册资本" prop="regCapi">
          <el-input v-model="entForm.regCapi"></el-input>
        </el-form-item>
        <el-form-item label="成立时间">
          <el-form-item prop="foundDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="entForm.foundDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
          <el-form-item label="专利趋势" prop="patntTrend">
          <el-input v-model="entForm.patntTrend"></el-input>
        </el-form-item>
          <el-form-item label="专利类型" prop="patntType">
          <el-input v-model="entForm.patntType"></el-input>
        </el-form-item>
          <el-form-item label="涉诉案由" prop="caseReason">
          <el-input v-model="entForm.caseReason"></el-input>
        </el-form-item>
          <el-form-item label="涉诉趋势" prop="caseTrend">
          <el-input v-model="entForm.caseTrend"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
        <el-select v-model="entForm.priority" placeholder="请选择数据优先级">
          <el-option label="低" value="1"></el-option>
          <el-option label="中" value="2"></el-option>
          <el-option label="高" value="3"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="载体信息" prop="entity">
          <el-input v-model="entForm.entity"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('entForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import EntEditService from "./EntEditService";
var _EntEditService = new EntEditService();

  export default {
    data() {
      return {
        dataId:null,
        entForm: {
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
              name: this.entForm.name,
              regCapi: this.entForm.regCapi,
              foundDate: this.entForm.foundDate,
              patentTrend: this.entForm.patentTrend !== '' ? JSON.parse(entForm.patentTrend) : "[]",
              patentType: this.entForm.patentType !== '' ? JSON.parse(entForm.patentType) : "{}",
              caseReason: this.entForm.caseReason !== '' ? JSON.parse(entForm.caseReason) : "{}",
              caseTrend: this.entForm.caseTrend !== '' ? JSON.parse(entForm.caseTrend) : "{}",
              priority: this.entForm.priority,
              entity: this.entForm.entity !== '' ? JSON.parse(entForm.entity) : {}
            }
            _EntEditService.addEntData(params).then(data => {
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
          entId: this.entForm.entId,
          name: this.entForm.name,
          regCapi: this.entForm.regCapi,
          foundDate: this.entForm.foundDate,
          patentTrend: this.entForm.patentTrend !== '' ? entForm.patentTrend : "{}",
          patentType: this.entForm.patentType !== '' ? entForm.patentType : "{}",
          caseReason: this.entForm.caseReason !== '' ? entForm.caseReason : "{}",
          caseTrend: this.entForm.caseTrend !== '' ? entForm.caseTrend : "{}",
          priority: this.entForm.priority,
          entity: this.entForm.entity !== '' ? JSON.parse(entForm.entity) : {}
        }
        _EntEditService.updateEntData(params).then(data=>{
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
        _EntEditService.getEntDataById(this.dataId).then((data) => {
          console.log(data)
          if(data.code==2000){
          this.entForm.entId = data.data.entId;
            this.entForm.name = data.data.name;
            this.entForm.regCapi = data.data.regCapi;
            this.entForm.foundDate = data.data.foundDate;
            this.entForm.patentTrend = JSON.stringify(data.data.patentTrend);
            this.entForm.patentType = JSON.stringify(data.data.patentType);
            this.entForm.caseReason = JSON.stringify(data.data.caseReason);
            this.entForm.caseTrend = JSON.stringify(data.data.caseTrend);
            this.entForm.priority = data.data.priority;
            this.entForm.entity = JSON.stringify(data.data.entity);
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