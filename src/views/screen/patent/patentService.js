import Http from "@/http";

class PatentService {
  constructor() {
    this.http = new Http();
  }

    //获取数据列表
  getDataList(params){
      const method = 'InnoPatent/getPatents'
      return this.http.GET(method,params)  

  }

    //删除数据
  deleteData(id){
     const method = 'InnoPatent/deletePatent'
     return this.http.DELETE(method,{patentId:id}) 
  }
}

export default PatentService;