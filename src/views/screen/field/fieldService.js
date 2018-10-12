import Http from "@/http";

class FieldService {
  constructor() {
    this.http = new Http();
  }

  //获取数据列表
  getDataList(params){
    const method = 'innoField/getFields'
    return this.http.GET(method,params)  

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

  //删除数据
  deleteFieldData(id){
    const method = 'innoField/deleteField'
    return this.http.DELETE(method,{patentId:id}) 
  }
}


export default FieldService;