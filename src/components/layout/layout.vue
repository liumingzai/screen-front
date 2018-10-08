<template>
      <div class="layout" style="height:100%">
          <el-container class="lyt_parent">
            <el-header class="lyt_top">
                <div style="float:left;padding-top:15px">
                    
                    <span>大屏数据管理中心</span>
                </div>
                <!-- <div style="float:right;padding-top:15px;over-flow:hidden">
                    <img :src="logo" alt="" style="float:left;width:30px;height:30px;border-radius:50%">
                    <span style="float:left;padding-left:10px;padding-top:5px"> {{username}} </span>
                    <span style="float:left;padding-left:40px;padding-top:4px" @click="logout">退出</span>
                </div> -->
            </el-header>
            <el-container class="lyt_bottom">
                <el-aside width="200px" style="background:#4698CC">
                    <Navbar></Navbar>
                </el-aside>
                <el-main>
                    <router-view></router-view>    

                </el-main>
            </el-container>
        </el-container>

      </div>  
</template>

<script>
import Navbar from '@/components/navbar/navbar'
export default {
    name:'layout',
    data(){
        return {
        //    logo:'',
        //    username:''     
        }
    },
    components:{
        Navbar
    },
    methods:{
        // logout(){
        //     localStorage.removeItem('account')
        //     this.$router.push('/')
        // }    
    },
    created(){
        // const userInfo = JSON.parse(localStorage.getItem('account'))
        // this.logo = userInfo.logo;
        // this.username = userInfo.username     
    }
}
</script>

<style lang='scss'>
    .layout{
        .lyt_top{
            background:cornflowerblue
            
        }
        .lyt_parent{
            height: 100%;
            display: flex;
            flex-direction: column
        }
        .lyt_bottom{
            flex: 1
        }
        .el-main{
           background: #EEF4FD
        }

    }


</style>
