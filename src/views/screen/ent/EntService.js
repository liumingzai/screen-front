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

  //获取ID对应数据信息
  getEntDataById(id){
    const method = 'innoEnt/getEntById'
    return this.http.GET(method,{entId :id})  
  }

  //添加数据
  addEntData(params){
    const method = 'innoEnt/addEnt'
    return this.http.POST(method,params)  
  }

  //更新数据
  updateEntData(params){
    const method = 'innoEnt/updateEnt'
    return this.http.POST(method,params)
  }

  //删除数据
  deletePatentData(id){
    const method = 'innoEnt/deleteEnt'
    return this.http.DELETE(method,{patentId:id}) 
  }

}

export default EntService;