<template>
    <div class="navbar">

         <el-menu default-active="" class="el-menu-vertical-demo" 
         
        background-color="#4698CC" 
        active-text-color="#000" 
        text-color="#fff">

            <router-link to="/screen/data/dataManage">
                <el-menu-item index='dataManage'>
                    <!-- <i class="iconfont icon-tubiaofenxi"></i> -->
                    <span>数据管理</span>
                </el-menu-item>
            </router-link>

            

            <router-link to="/screen/data/addData">
                <el-menu-item index='addData'>
                    <!-- <i class="iconfont icon-iconset0358"></i> -->
                    <span>添加数据</span>
                </el-menu-item>
            </router-link>

           <router-link to="/screen/account/user" v-if="userType<3">
                <el-menu-item index='user'>
                    <!-- <i class="iconfont icon-iconset0358"></i> -->
                    <span>用户管理</span>
                </el-menu-item>
            </router-link>

            <router-link to="/screen/project" v-if="userType==1">
                <el-menu-item index='project'>
                    <!-- <i class="iconfont icon-iconset0358"></i> -->
                    <span>项目管理</span>
                </el-menu-item>
            </router-link>

            <router-link to="/screen/account/setting">
                <el-menu-item index='setting'>
                    <!-- <i class="iconfont icon-iconset0358"></i> -->
                    <span>账号设置</span>
                </el-menu-item>
            </router-link>

        </el-menu>



    </div>
</template>


<script>
export default {
    name:'navbar',
    data(){
        return {
           userType:null     
        }
    },
    created(){
        const userInfo = JSON.parse(localStorage.getItem('account')) 
        this.userType=userInfo.userType
    }
}
</script>

<style lang='scss'>

</style>


