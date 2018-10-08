<template>
  <div class="user_manage">
    <div class="usmg_title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/inno/patent' }">专利列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑专利</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-form :model="patentForm" :rules="rules" ref="patentForm" label-width="100px" class="demo-roleForm">
        <el-form-item label="专利名称" prop="name">
          <el-input v-model="patentForm.name"></el-input>
        </el-form-item>
       <el-form-item label="申请人" prop="owner">
          <el-input v-model="patentForm.owner"></el-input>
        </el-form-item>
        <el-form-item label="申请时间" required>
          <el-form-item prop="app_date">
            <el-date-picker type="date" placeholder="选择日期" v-model="patentForm.app_date" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="领域ID" prop="resource">
          <el-select v-model="patentForm.field_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('patentForm')">立即创建</el-button>
          <el-button @click="resetForm('patentForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
import PatentService from "./PatentService";
var _PatentService = new PatentService();
  export default {
    data() {
      return {
        patentForm: {
          name: '',
          owner: '',
          app_date: '',
          field_id: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入专利名称', trigger: 'blur' }
          ],
          owner: [
            { required: true, message: '请输入申请人', trigger: 'blur' }
          ],
          app_date: [
            { type: 'date', required: true, message: '请选择申请日期', trigger: 'change' }
          ],
          field_id: [
            { required: true, message: '请选择领域', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // _PatentService
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>