import Http from "@/http";

class DataManageService {
  constructor() {
    this.http = new Http();
  }
    //获取项目列表
  getCurrentProject(){
      const method = 'data/getCurrentProject'
      return this.http.GET(method)
  }

    //获取数据列表
  getDataList(params){
      const method = 'data/getDataList'
      return this.http.GET(method,params)  

  }

    //更新用户状态
  updateDataState(id,status){
      const method = 'data/updateDataState'
      return this.http.POST(method,{id:id,status:status}) 
  }


    //删除数据
  deleteData(id){
     const method = 'data/deleteData'
     return this.http.DELETE(method,{dataId:id}) 
  }


}

export default DataManageService;