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
import Patent from "@/views/screen/patent/patent-list/patentList"
import PatentEdit from "@/views/screen/patent/patent-edit/patentEdit"
import Entity from "@/views/screen/entity/entity-list/entityList"
import EntityEdit from "@/views/screen/entity/entity-edit/entityEdit"
import Field from "@/views/screen/field/field-list/fieldList"
import FieldEdit from "@/views/screen/field/field-edit/fieldEdit"
import Ent from "@/views/screen/ent/ent-list/entList"
import EntEdit from "@/views/screen/ent/ent-edit/entEdit"

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
    },{
      path: "/inno",
      name: "inno",
      component: Screen,
      children: [
        {
          path:'entity',
          name:'entity',
          component:Layout,
          children:[
            {path:'/',name:'entity',component:Entity}, 
            {path: 'edit/:id?', name:'entityEdit', component:EntityEdit }
          ]
        },
        {
          path:'ent',
          name:'ent',
          component:Layout,
          children:[
            {path:'/',name:'ent',component:Ent}, 
            {path: 'edit/:id?', name:'entEdit', component:EntEdit }
          ]
        },
        {
          path:'field',
          name:'field',
          component:Layout,
          children:[
            {path:'/',name:'field',component:Field}, 
            {path: 'edit/:id?', name:'fieldEdit', component:FieldEdit }
          ]
        },
        {
          path:'patent',
          name:'patent',
          component:Layout,
          children:[
            {path:'/',name:'patent',component:Patent}, 
            {path: 'edit/:id?', name:'patentEdit', component:PatentEdit }
          ]
        }
      ]
    }
  ]
});
