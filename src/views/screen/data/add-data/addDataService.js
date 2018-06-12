import Http from "@/http";

class AddDataService {
  constructor() {
    this.http = new Http();
  }
    //获取项目列表
  getCurrentProject(){
      const method = 'data/getCurrentProject'
      return this.http.GET(method)
  }

  addData(params){
    const method = 'data/addData'
    return this.http.POST(method,params)

  }


}

export default AddDataService;