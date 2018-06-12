import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home";
import Layout from "@/components/layout/layout";
import Login from "@/views/screen/login/login";
import Screen from "@/components/home";

import DataManage from "@/views/screen/data/data-manage/dataManage";
import AddData from "@/views/screen/data/add-data/addData";
import User from "@/views/screen/account/user/user";
import Setting from "@/views/screen/account/setting/setting";
import Project from "@/views/screen/project/project";
import DataEdit from "@/views/screen/data/data-edit/dataEdit";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect:'/login'
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/screen",
      name: "screen",
      component: Screen,
      children: [
        {
          path: "account",
          name: "account",
          component: Layout,
          children: [
            { path: "user", name: "user", component: User },
            { path: "setting", name: "setting", component: Setting }
          ]
        },
        {
          path:'data',
          name:'data',
          component:Layout,
          children:[
            {path:'DataManage',name:'dataManage',component:DataManage},
            {path:'AddData',name:'AddData',component:AddData},
            {path:'DataEdit/:dataId',name:'DataEdit',component:DataEdit}
          ]
        },
        {
          path:'project',
          name:'project',
          component:Layout,
          children:[
            {path:'/',name:'project',component:Project} 
          ]
        }
      ]
    }
  ]
});
