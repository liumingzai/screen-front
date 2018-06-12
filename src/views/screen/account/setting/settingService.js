import Http from "@/http";

class SettingService {
  constructor() {
    this.http = new Http();
  }
  
  //更改密码
  updatePassword(oldPsd,newPsd){
      const method = 'common/updatePassword'
      return this.http.POST(method,{oldPassword:btoa(oldPsd),newPassword:btoa(newPsd)},{ isFormData: true })
  }

  


}

export default SettingService;