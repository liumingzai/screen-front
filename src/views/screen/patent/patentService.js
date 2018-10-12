import Http from "@/http";

class PatentService {
  constructor() {
    this.http = new Http();
  }

  //获取数据列表
  getDataList(params){
    const method = 'innoPatent/getPatents'
    return this.http.GET(method,params)  

  }

  //添加创新载体专利数据
  addPatentData(params){
    const method = 'innoPatent/addPatent'
    return this.http.POST(method,params)  

  }

  //获取ID对应数据信息
  getPatentDataById(id){
    const method = 'innoPatent/getPatentById'
    return this.http.GET(method,{patentId :id})  
  }

  //更新数据
  updatePatentData(params){
    const method = 'innoPatent/updatePatent'
    return this.http.POST(method,params)
  }

  //删除数据
  deletePatentData(id){
    const method = 'innoPatent/deletePatent'
    return this.http.DELETE(method,{patentId:id}) 
  }
}

export default PatentService;