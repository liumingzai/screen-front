import Http from "@/http";

class EntListService {
  constructor() {
    this.http = new Http();
  }

   //获取数据列表
   getDataList(params){
    const method = 'innoEnt/getEnts'
    return this.http.GET(method,params)  
  }

  //删除数据
  deleteEntData(id){
    const method = 'innoEnt/deleteEnt'
    return this.http.DELETE(method,{entId:id}) 
  }

}

export default EntListService;