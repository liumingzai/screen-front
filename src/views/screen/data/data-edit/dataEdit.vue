<template>
  <div class="data_edit">
    <div class="dtet_title">数据编辑</div>
    <div>
      <el-form :model='EditDataParams' ref="EditDataParams" label-width='85px'>

        <div style="width:300px">
          <el-form-item label='所属项目'>

               <el-input disabled v-model="EditDataParams.project"></el-input>

          </el-form-item>
        </div>  
        

        <div style="width:300px">
          <el-form-item label='数据名称'>
            <el-input v-model="EditDataParams.dataName"></el-input>
          </el-form-item>
        </div>

        <div style="width:300px">
           <el-form-item label='数据源类型'>
              <el-input disabled v-model="EditDataParams.dataSourceType"></el-input>

           </el-form-item>
        </div>  
        

      </el-form>

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

      <div class="data_save">
            <el-button type='primary' @click="updateData">保存数据</el-button>

      </div>

    </div>

  </div>

</template>

<script>
import DataEditService from './DataEditService'
var _DataEditService = new DataEditService()
//引入表格插件
import Handsontable from 'handsontable-pro/dist/handsontable.full.js'
var table = null

export default {
  name: "addData",
  data() {
    return {
        dataId:null,
        EditDataParams:{
          project:'',
          dataName:'',
          dataSourceType:''
        },
        tableData:[],
        tableCounter:0

    };
  },
  watch:{
      tableCounter(){
          this.drawTable()
      }  
  },
  methods: {
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
    updateData(){
        const updateDataParams = {
          id:this.dataId,
          dataName:this.EditDataParams.dataName,
          data:JSON.stringify(this.tableData)
        }
        _DataEditService.updateData(updateDataParams).then(data=>{
          console.log(data)
          if(data.code==2000){
            this.$message.success('更改数据成功')
            this.$router.push({name:'dataManage'})
          }else{
            this.$message.error(data.message)
          }
        }).catch(err=>{
          console.log(err)
          this.$message.error('网络错误')
        })  
    }
  },
  created() {
      this.dataId = this.$route.params.dataId;
      _DataEditService.getDataInfoById(this.dataId).then((data) => {
          console.log(data)
          if(data.code==2000){
            this.EditDataParams.project=data.data.projectName;
            this.EditDataParams.dataName=data.data.dataName;
            this.EditDataParams.dataSourceType=data.data.dataSourceType;
            this.tableData=JSON.parse(data.data.data)
            this.tableCounter=1
          }else{
            this.$message.error(data.message)
          }
      }).catch((err) => {
          console.log(err)
          this.$message.error('网络错误')
      });
     
  }
};
</script>

<style lang="scss">
.data_edit {
  .dtet_title {
    padding-bottom: 20px;
  }
  #hot-display-license-info{
          display: none
  }
  .wtHolder{
          height: auto!important;
  }
  .data_save{
    padding-top: 20px
  }
}

</style>
