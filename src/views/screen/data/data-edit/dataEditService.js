import Http from "@/http";

class DataEditService {
  constructor() {
    this.http = new Http();
  }
    //获取项目列表
  getCurrentProject(){
      const method = 'data/getCurrentProject'
      return this.http.GET(method)
  }
    //获取ID对应数据信息
  getDataInfoById(id){
      const method = 'data/getDataInfoById'
      return this.http.GET(method,{dataId:id})  
  }
    //更新数据
  updateData(params){
      const method = 'data/updateData'
      return this.http.POST(method,params)
  }
  


}

export default DataEditService;