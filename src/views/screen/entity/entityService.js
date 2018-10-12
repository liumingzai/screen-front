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

  //删除数据
  deleteEntityData(id){
    const method = 'innoEntity/deleteEntity'
    return this.http.DELETE(method,{patentId:id}) 
  }
}

export default EntityService;