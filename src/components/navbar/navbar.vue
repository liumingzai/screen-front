<template>
    <div class="navbar">

         <el-menu default-active="" class="el-menu-vertical-demo" 
         
        background-color="#4698CC" 
        active-text-color="#000" 
        text-color="#fff">

        <!-- 
            <router-link to="/screen/data/dataManage">
                <el-menu-item index='dataManage'>
                    <span>数据管理</span>
                </el-menu-item>
            </router-link>

            <router-link to="/screen/data/addData">
                <el-menu-item index='addData'>
                    <span>添加数据</span>
                </el-menu-item>
            </router-link>

           <router-link to="/screen/account/user" v-if="userType<3">
                <el-menu-item index='user'>
                    <span>用户管理</span>
                </el-menu-item>
            </router-link>

            <router-link to="/screen/project" v-if="userType==1">
                <el-menu-item index='project'>
                    <span>项目管理</span>
                </el-menu-item>
            </router-link>

            <router-link to="/screen/account/setting">
                <el-menu-item index='setting'>
                    <span>账号设置</span>
                </el-menu-item>
            </router-link>
             -->

            <router-link to="/inno/entity">
                <el-menu-item index='entity'>
                    <!-- <i class="iconfont icon-tubiaofenxi"></i> -->
                    <span>创新载体</span>
                </el-menu-item>
            </router-link>

            <router-link to="/inno/ent">
                <el-menu-item index='ent'>
                    <!-- <i class="iconfont icon-tubiaofenxi"></i> -->
                    <span>创新企业</span>
                </el-menu-item>
            </router-link>

            <router-link to="/inno/field">
                <el-menu-item index='field'>
                    <!-- <i class="iconfont icon-tubiaofenxi"></i> -->
                    <span>创新领域</span>
                </el-menu-item>
            </router-link>

            <router-link to="/inno/patent">
                <el-menu-item index='patent'>
                    <!-- <i class="iconfont icon-tubiaofenxi"></i> -->
                    <span>创新专利</span>
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
        //    userType:null     
        }
    },
    created(){
        // const userInfo = JSON.parse(localStorage.getItem('account')) 
        // this.userType=userInfo.userType
    }
}
</script>

<style lang='scss'>

</style>


