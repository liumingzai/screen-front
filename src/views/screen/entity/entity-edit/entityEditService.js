import Http from "@/http";

class EntityEditService {
  constructor() {
    this.http = new Http();
  }

  //添加创新载体专利数据
  addEntityData(params){
    const method = 'innoEntity/addEntity'
    return this.http.POST(method,params)  

  }

  //获取ID对应数据信息
  getEntityDataById(id){
    const method = 'innoEntity/getEntitys'
    return this.http.GET(method,{entityId :id})  
  }

  //更新数据
  updateEntityData(params){
    const method = 'innoEntity/updateEntity'
    return this.http.POST(method,params)
  }
}

export default EntityEditService;