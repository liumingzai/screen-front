import Http from "@/http";

class UserService {
  constructor() {
    this.http = new Http();
  }
    //获取用户列表
  getAccountList(params){
      const method = 'admin/um/getAccountList'
      return this.http.GET(method,params)
  }
     //获取项目列表   
  getProjectList(){
      const method = 'common/getAllProject'
      return this.http.GET(method)
  }
     //增加用户   
  addAccount(params){
      const method = 'admin/um/addAccount'
      return this.http.POST(method,params) 


  }
      //更新用户信息  
  updateAccount(params){
      const method = 'admin/um/updateAccount'
      return this.http.PUT(method,params)
  }
      //更新用户状态
  updateAccountState(id,state){
      const method = 'admin/um/updateAccountState'
      return this.http.POST(method,{id:id,state:state})
  }
     //删除用户

  deleteAccount(id){
      const method = 'admin/um/deleteAccount'
      return this.http.DELETE(method,{id:id})
  }

  


}

export default UserService;