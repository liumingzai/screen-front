<template>
   <div class="add_data">
      <div class="adta_title">
          添加数据
      </div>

      <div>
          <el-form :model='addDataParams' ref="addDataParams" label-width='85px'>
            
             <el-form-item label='所属项目'>

                <el-select v-model="addDataParams.project">
                    <el-option 
                    v-for="item in projectList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name">

                    </el-option>
                </el-select>

             </el-form-item>

             <div style="width:300px">
               <el-form-item label='数据名称'>
                   <el-input v-model="addDataParams.dataName"></el-input>
               </el-form-item>
             </div> 
             

             <el-form-item label='数据源类型'>
                <el-select v-model="addDataParams.dataSourceType" @change="handleTypeChange">
                    <el-option 
                    v-for="item in dataSourceTypeList"
                    :key="item"
                    :value="item"
                    :label="item">

                    </el-option>
                </el-select>

             </el-form-item>

             <el-form-item label='上传文件' v-show="uploadCsvisible">
                  <el-upload action="http://192.168.1.151:90/screen-portal/data/uploadDataCsv" 
                  :beforeUpload="beforeCsvUpload" 
                  :onError="uploadError" 
                  :http-request='uploadCsvFile' 
                  :on-success='onSuccess'
                  :show-file-list="false"
                  :file-list="fileList">
                    <el-button size="small" type="primary">选择csv文件</el-button>
                  </el-upload>

             </el-form-item>   
            
          </el-form> 

           

      </div>

      <div class="data_table">
          <div class="dtb_title" style="padding-bottom:10px">
               数据编辑
          </div>
          <div id="dataContainer"></div>
          <div style="padding-top:10px">
             <el-tag>
               Tips:该表格可编辑,更多操作请右键查看菜单栏
             </el-tag>
          </div>

      </div>

      <div class="adta_footer">
         <el-button type='primary' @click="addData">保存数据</el-button>
      </div>

   </div> 

</template>

<script>
import AddDataService from './addDataService'
var _AddDataService = new AddDataService()
//引入表格插件
import Handsontable from 'handsontable-pro/dist/handsontable.full.js'
var table = null

export default {
    name:'addData',
    data(){
      return {
         addDataParams:{
            project:'',
            dataName:'',
            dataSourceType:'静态数据',

         },
         projectList:[],
         dataSourceTypeList:['静态数据','csv文件'],
         tableData:[
           ["","","","",""],
           ["","","","",""],
           ["","","","",""],
           ["","","","",""]
         ],
         uploadCsvisible:false,
         fileList:[]

      }
    },
    methods:{
          //获取项目下拉列表
      getCurrentProject(){
          _AddDataService.getCurrentProject().then((data) => {
              console.log(data)
              if(data.code==2000){
                  this.projectList= data.data.map(item=>{
                    return {
                      id:item.id,
                      name:item.name
                    }
                  })
              }else{
                this.$message.error(data.message)
              }
          }).catch((err) => {
              console.log(err)
              this.$message.error('网络错误')
          });
      },
        //绘制表格
      drawTable(){
        table = new Handsontable(document.getElementById('dataContainer'),{
          data:this.tableData,
          colHeaders: true,
          contextMenu:true,
          contextMenu:{
            items:{
              'row_below':{
                name:'增加一行'
              },
              'col_right':{
                name:'增加一列'
              },
              'remove_row':{
                name:'删除当前行'
              },
              'remove_col':{
                name:'删除当前列'
              }
            }
          }
        })
      },
      //增加数据
      addData(){
         let project = this.addDataParams.project;
         const pjArr = this.projectList
         for(var i=0; i<pjArr.length; i++){
           if(project==pjArr[i].id){
             project={id:pjArr[i].id,name:pjArr[i].name}
             break
           }
         }
         const addDataParams = {
           ...this.addDataParams,
           project:project,
           data:JSON.stringify(this.tableData)   
         }
         _AddDataService.addData(addDataParams).then((data) => {
           console.log(data)
           if(data.code==2000){
             this.$message.success('添加数据成功')
             this.$router.push({name:'dataManage'})
           }else{
             this.$message.error(data.message)
           }
         }).catch((err) => {
           console.log(err)
           this.$message.error('网络错误')
         });  

      },
        //监听数据源类型变化
      handleTypeChange(val){
          console.log(val)
          if(val=='静态数据'){
            this.uploadCsvisible=false
            this.tableData=[
           ["","","","",""],
           ["","","","",""],
           ["","","","",""],
           ["","","","",""]
          ]
            table.destroy();
            this.drawTable()
          }else{
            this.uploadCsvisible=true
          }
      },
        //上传csv文件
      onSuccess(res, file, fileList) {
         console.log(fileList);
      },
      uploadCsvFile(param) {
      //自定义文件上传
      // debugger
      var _this = this;
      var fileObj = param.file;
      var FileController = param.action;
      var form = new FormData();
      form.append("upload", fileObj);
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open("post", FileController, true);
      xhr.send(form);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          
          const res=JSON.parse(xhr.response);
          console.log(res);
          if(res.code==2000){
              _this.$message.success('上传文件成功');
              _this.tableData=res.data;
              table.destroy()
              _this.drawTable()
               
          }else{
            _this.$message.error(res.message)
          }
        }else{
          _this.$message.error('网络错误')
        }
      };
    },
    beforeCsvUpload(file) {
      // console.log(file);
      // console.log(file.name)
      const arr=file.name.split('.')
      console.log(arr)
      console.log(arr[arr.length-1]!='csv')
      if(arr[arr.length-1]!='csv'){
        this.$message.error('只能上传csv文件')
      }
      
      return arr[arr.length-1]=='csv'
    },
    uploadError(response, file, fileList) {
      console.log(response);
      console.log(fileList);
    }   
    },
    created(){
        this.getCurrentProject()
    },
    mounted(){
      this.drawTable()
    }
}
</script>

<style lang="scss">
    .add_data{
        .adta_title{
          padding-bottom: 20px
        };
        .adta_footer{
          padding-top: 20px
        }
        #hot-display-license-info{
          display: none
        }
        .wtHolder{
          height: auto!important;
        }
    }


</style>
