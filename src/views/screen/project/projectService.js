import Http from "@/http";

class ProjectService {
  constructor() {
    this.http = new Http();
  }
    //获取项目列表

  adminGetProjectList(params){
    const method = 'admin/pj/getProjectList'
    return this.http.GET(method,params) 

  }  
    //获取具体项目信息
  getProjectById(id){
     const method = 'admin/pj/getProjectById'
     return this.http.GET(method,{projectId:id})   
  }
    //增加项目
  addProject(name){
     const method = 'admin/pj/addProject'
     return this.http.POST(method,{name:name})   
  }
   //更新项目
  updateProject(id,name){
      const method = 'admin/pj/updateProject'
      return this.http.POST(method,{id:id,name:name})
  }
  //更新项目状态
  updateProjectState(id,status){
     const method = 'admin/pj/updateProjectState'
     return this.http.POST(method,{id:id,status:status})   
  }
   //删除项目
  deleteProject(id){
    const method = 'admin/pj/deleteProject'
    return this.http.DELETE(method,{id:id})
  }
  //获取项目下数据
  getDataNumByProjectId(id){
    const method = 'admin/pj/getDataNumByProjectId'
    return this.http.GET(method,{projectId:id})
  }






  


}

export default ProjectService;