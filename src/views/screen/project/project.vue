<template>
    <div class="project_manage">
        <div class="project_title">
          <span>项目列表({{totalPageData}})</span>

          <el-button type='primary' @click="openAddDialog">创建项目</el-button>
          
        </div>

        <div class="search_form">
            <el-form :model='searchParams' ref='searchParams' :inline='true'>
                    

                  <el-form-item label='搜索'>
                      <el-input v-model="searchParams.name" placeholder="项目名称"></el-input>
                  </el-form-item>

                  <el-form-item label='项目状态'>
                      <el-select v-model="searchParams.status" clearable placeholder="全部">
                            <el-option 
                            v-for="item in activeList"
                            :key="item.value"
                            :value="item.value"
                            :label="item.name">

                            </el-option>
                        </el-select>

                  </el-form-item>

                  <el-button type='primary' @click="handleSearch">
                        查询  
                  </el-button> 

            </el-form>

        </div> 

        <div>
            <el-table
            :data="projectList"
            style="width: 100%"
            v-loading='loading'>
            <el-table-column
              prop="name"
              label="项目名称"
              width="">
            </el-table-column>
         
            <el-table-column
              prop="entryDatetime"
              label="创建时间"
              width="">
            </el-table-column>
            
            <el-table-column
              label="项目状态"
              width="">
              <template slot-scope="scope">
                  <el-switch
                  v-model="scope.row.active"
                  active-value='Y'
                  inactive-value='N'
                  @change="updateProjectState(scope.row)">

                  </el-switch>
                  <span v-show="scope.row.active=='Y'">启用</span>
                  <span v-show="scope.row.active=='N'">停用</span>
              </template>

            </el-table-column>

            <el-table-column
              label="操作"
              width="">
              <template slot-scope="scope">
                
                <el-button type="text" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
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

        <el-dialog title="创建项目" 
        :visible.sync="projectVisible" 
        :before-close="handleProjectClose" 
        width="300px">
          <el-form>

            <div style="width:250px">
              <el-form-item label='项目名称' label-width='70px'>
                 <el-input v-model="name" placeholder="项目名称"></el-input>
              </el-form-item> 

              <el-form-item label-width='60px'>
                 <el-button type='primary' size='small' @click="addProject" v-show="idEdit==false">确定</el-button>
                 <el-button type='primary' size='small' @click="handleEdit" v-show="idEdit==true">保存</el-button>
                 <el-button size='small' @click="projectVisible=false">取消</el-button>
              </el-form-item>
               
                
            </div>
          </el-form>
            
          
       </el-dialog>

  </div> 
 

</template>

<script>
import momment from 'moment';
import ProjectService from './projectService';
var _ProjectService = new ProjectService()
export default {
    name:'project',
    data(){
      return {
         totalPageData:0,
         searchParams:{
           pageNum:1,
           name:'',
           status:''
         },
         projectList:[],
         loading:false,
         name:'',
         id:'',
         projectVisible:false,
         idEdit:false,
         activeList:[
            {name:'启用',value:'Y'},
            {name:'停用',value:'N'}
          ],
         dataNum:0 
      }
    },
    methods:{
         //获取项目列表
        getProjectList(){
            _ProjectService.adminGetProjectList(this.searchParams).then((data) => {
                console.log(data)
                if(data.code==2000){
                  this.totalPageData=data.size
                  this.projectList=data.data.map(item=>{
                  const entryDatetime = momment(item.entryDatetime).format('YYYY-MM-DD')
                  return {
                    ...item,
                    entryDatetime:entryDatetime
                  }
                })
              }else{
                this.$message.error(data.message)
              }
                
            }).catch(err=> {
                console.log(err)
                this.$message.error('网络错误')
            });
        },
           //搜索相关条件项目
        handleSearch(){
            this.searchParams.pageNum = 1;
            this.getProjectList()
        },
          //打开新增弹窗
        openAddDialog(){
            this.name='';
            this.idEdit=false;
            this.projectVisible = true  
        },
        //新增项目
        addProject(){
            _ProjectService.addProject(this.name).then((data) => {
                console.log(data)
                if(data.code==2000){
                  this.$message.success('添加项目成功')
                  this.projectVisible=false;
                  this.getProjectList()
                }else{
                  this.$message.error(data.message)
                }
            }).catch((err) => {
                console.log(err)
                this.$message.error('网络错误')
            });
       },
         //关闭弹窗
       handleProjectClose(){
          this.projectVisible = false
       },
         //编辑项目
       handleEdit(){
          _ProjectService.updateProject(this.id,this.name).then((data) => {
              console.log(data)
              if(data.code==2000){
                this.$message.success('更新项目成功')
                this.getProjectList();
                this.projectVisible=false
              }else{
                this.$message.error(data.message)
              }
          }).catch((err) => {
            console.log(err)
            this.$message.error('网络错误')
          });
       },
         //打开编辑弹窗
       openEditDialog(row){
          console.log(row)
          this.name=row.name;
          this.id=row.id;
          this.idEdit=true;
          this.projectVisible = true 
       },
       //更新项目状态
       updateProjectState(row){
         console.log(row)
          _ProjectService.updateProjectState(row.id,row.active).then((data) => {
              console.log(data)
              if(data.code==2000){
                this.$message.success('更新项目状态成功')
              }else{
                this.$message.error(data.message)
              }
          }).catch((err) => {
            console.log(err)
            this.$message.error('网络错误')
          });
       },
       handleDelete(row){
           console.log(row)
            _ProjectService.getDataNumByProjectId(row.id).then((data) => {
              console.log(data)
              if(data.code==2000){
                this.dataNum=data.data
              }else{
                this.$message.error(data.message)
              }
            }).catch((err) => {
               this.$message.error('网络错误')  
            }).then(()=>{

              this.$confirm(`该项目下共有${this.dataNum}条数据, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                _ProjectService.deleteProject(row.id).then((data) => {
                    console.log(data)
                    if(data.code==2000){
                      this.$message.success('删除项目成功')
                        this.totalPageData -= 1;
                        if (this.totalPageData / 10 <= 1) {
                          this.searchParams.pageNum = 1;
                        } else if (this.totalPageData / 10 == this.searchParams.pageNum - 1) {
                          this.searchParams.pageNum--;
                        } else {
                          this.searchParams.pageNum = this.searchParams.pageNum;
                        }
                      this.getProjectList()
                    }else{
                      this.$message.error(data.message)
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

           })
 
       },
         //分页处理
       handlePage(num){
          this.searchParams.num = num;
          this.getProjectList()
       }
    },
    created(){
        this.getProjectList()
        
    }
}
</script>

<style lang="scss">
    .project_manage{
        .project_title{
          padding-bottom: 20px
        }
    }
</style>
