import Http from "@/http";

class EntEditService {
  constructor() {
    this.http = new Http();
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

}

export default EntEditService;