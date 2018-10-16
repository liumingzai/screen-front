import Http from "@/http";

class PatentListService {
  constructor() {
    this.http = new Http();
  }

  //获取数据列表
  getDataList(params){
    const method = 'innoPatent/getPatents'
    return this.http.GET(method,params)  

  }

  //删除数据
  deletePatentData(id){
    const method = 'innoPatent/deletePatent'
    return this.http.DELETE(method,{patentId:id}) 
  }
}

export default PatentListService;