<template>
   <div class="data_manage">
        <div class="dtmg_title">
          <span>数据列表({{totalPageData}})</span>

          <router-link to="/screen/data/addData">
              <el-button type='primary'>添加数据</el-button>
          </router-link>
          
        </div>

        <div class="search_form">
            <el-form :model='searchParams' ref='searchParams' :inline='true'>
                   <el-form-item label-width='80px' label='项目名称'>
                        <el-select v-model="searchParams.projectId" placeholder="全部" clearable>
                            <el-option 
                            v-for="item in projectList"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name">

                            </el-option>
                        </el-select>


                  </el-form-item> 

                  <el-form-item label='接口状态'>
                      <el-select v-model="searchParams.status" clearable placeholder="全部">
                            <el-option 
                            v-for="item in activeList"
                            :key="item.value"
                            :value="item.value"
                            :label="item.name">

                            </el-option>
                        </el-select>

                  </el-form-item>

                  <el-form-item label='搜索'>

                    <el-input v-model="searchParams.dataName" placeholder="数据名称"></el-input>
                  </el-form-item>

                   <el-button type='primary' @click="handleSearch">
                        查询  
                   </el-button> 

            </el-form>

        </div> 

        <div>
            <el-table
            :data="dataList"
            style="width: 100%"
            v-loading='loading'>
            <el-table-column
              prop="dataName"
              label="数据名称"
              width="">
            </el-table-column>
            <el-table-column
              prop="dataSourceType"
              label="数据源类型"
              width="">
            </el-table-column>
            <el-table-column
              prop="projectName"
              label="所属项目"
              width="">
            </el-table-column>
            <el-table-column
              prop="apiUrl"
              label="api接口链接"
              width="">
            </el-table-column>

            <el-table-column
              prop="createTime"
              label="上传时间"
              width="">
            </el-table-column>
            
            <el-table-column
              prop="userName"
              label="上传人"
              width="">
            </el-table-column>

            <el-table-column
              label="接口状态"
              width="">
              <template slot-scope="scope">
                <el-switch
                v-model="scope.row.status"
                active-value="Y"
                inactive-value="N"
                @change="handleUpdateState(scope.row)">
                
                </el-switch>
                <span v-show="scope.row.status=='Y'">启用</span>
                <span v-show="scope.row.status=='N'">停用</span>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="">
              <template slot-scope="scope">
                
                <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type='text' size='small' @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
             

          </el-table>

          <el-pagination
                background
                layout="prev, pager, next"
                :total='totalPageData'
                @current-change='handlePage'
                :current-page.sync='searchParams.pageNum'>
                
          </el-pagination>  

        </div>

  </div> 

</template>

<script>
import DataManageService from './dataManageService'
var _DataManageService = new DataManageService()

export default {
    name:'dataManage',
    data(){
      return {

          totalPageData:null,
          dataList:[],
          searchParams:{
              pageNum:1,
              dataName:'',
              status:'',
              projectId:''

          },
          projectList:[],
          activeList:[
            {name:'启用',value:'Y'},
            {name:'停用',value:'N'}
          ],
          loading:true
      }
    },
    methods:{
       //获取项目下拉列表
      getCurrentProject(){
          _DataManageService.getCurrentProject().then((data) => {
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
         //加载数据列表
      getDataList(){
          _DataManageService.getDataList(this.searchParams).then((data) => {
             console.log(data)
             if(data.code==2000){
               this.totalPageData = data.size
               this.dataList = data.data
               this.loading=false
             }else{
               this.$message.error(data.message)
             } 

          }).catch((err) => {
              console.log(data)
              this.$message.error('网络错误')
          });

      },
         //按条件搜索相关数据
      handleSearch(){
          this.searchParams.pageNum=1
          this.getDataList()
      },
         //跳转至相应数据页面
      handleEdit(row){
          this.$router.push({name:'DataEdit',params:{dataId:row.id}})
      },
         //更新数据状态
      handleUpdateState(row){
          console.log(row)
          _DataManageService.updateDataState(row.id,row.status).then((data) => {
              console.log(data)
              if(data.code==2000){
                this.$message.success('更新数据状态成功')
              }else{
                this.$message.error(data.message)
              }
          }).catch((err) => {
              console.log(err)
              this.$message.error('网络错误')
          });
      },  
        //删除该条数据
      handleDelete(row){

          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           _DataManageService.deleteData(row.id).then((data) => {
              console.log(data)
              if(data.code==2000){
                this.$message.success('删除数据成功')
                  this.totalPageData -= 1;
                  if (this.totalPageData / 10 <= 1) {
                    this.searchParams.pageNum = 1;
                  } else if (this.totalPageData / 10 == this.searchParams.pageNum - 1) {
                    this.searchParams.pageNum--;
                  } else {
                    this.searchParams.pageNum = this.searchParams.pageNum;
                  }
                this.getDataList()
              }
          }).catch((err) => {
            console.log(err)
            this.$message.error('网络错误')
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      },
        //分页处理
      handlePage(num){
        this.searchParams.pageNum=num
        this.getDataList()
      }
      

    },
    created(){
        this.getCurrentProject()
        this.getDataList()
    }
}
</script>

<style lang="scss">

  .data_manage{

      .dtmg_title{
        padding-bottom: 20px
        
      }

  }


</style>
