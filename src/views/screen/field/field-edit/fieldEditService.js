import Http from "@/http";

class FieldEditService {
  constructor() {
    this.http = new Http();
  }

  //添加创新载体专利数据
  addFieldData(params){
    const method = 'innoField/addField'
    return this.http.POST(method,params)  

  }

  //获取ID对应数据信息
  getFieldDataById(id){
    const method = 'innoField/getFields'
    return this.http.GET(method,{fieldId :id})  
  }

  //更新数据
  updateFieldData(params){
    const method = 'innoField/updateField'
    return this.http.POST(method,params)
  }
}


export default FieldEditService;