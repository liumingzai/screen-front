import Http from "@/http";

class EntService {
  constructor() {
    this.http = new Http();
  }

    //获取数据列表
  getDataList(params){
      const method = 'innoEnt/getEnts'
      return this.http.GET(method,params)  
  }

    //删除数据
  deleteData(id){
     const method = 'innoEnt/deleteEnt'
     return this.http.DELETE(method,{entId:id}) 
  }

}

export default EntService;