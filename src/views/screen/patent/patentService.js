import Http from "@/http";

class PatentService {
  constructor() {
    this.http = new Http();
  }

    //获取数据列表
  getDataList(params){
      const method = 'data/getDataList'
      return this.http.GET(method,params)  

  }

    //更新数据状态
  updateDataState(id,status){
      const method = 'data/updateDataState'
      return this.http.POST(method,{id:id,status:status}) 
  }

    //批量更新
  updateDatasState(ids,state){
    const method = 'data/updateDatasState'
    return this.http.POST(method,{ids:ids,state:state})
  }

    //删除数据
  deleteData(id){
     const method = 'data/deleteData'
     return this.http.DELETE(method,{dataId:id}) 
  }

   //批量删除
  deleteDatas(ids){
     const method = 'data/deleteDatas'
     return this.http.POST(method,{ids:ids}) 
  } 
  
  



}

export default PatentService;