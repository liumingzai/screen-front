import Http from "@/http";

class EntityService {
  constructor() {
    this.http = new Http();
  }

    //获取数据列表
  getDataList(params){
      const method = 'innoEntity/getEntitys'
      return this.http.GET(method,params)  
  }

    //删除数据
  deleteData(id){
     const method = 'innoEntity/deleteEntity'
     return this.http.DELETE(method,{entityId:id}) 
  }
}

export default EntityService;