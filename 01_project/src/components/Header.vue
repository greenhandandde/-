<template>
    <header>
        <div class="one-content" >
            <el-button class="el-button-icon-menu" @click="handelMeal" type="primary" icon="el-icon-menu" size="mini"></el-button>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="el-crumbs">
                <el-breadcrumb-item  v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="img-content">
            <el-dropdown trigger="click" size="mini" placement="top-end" popper-append-to-body="false">
                <span>
                    <img class="userImg" :src="userImg">
                </span>
                <el-dropdown-menu  slot="dropdown" >
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>

            </el-dropdown>
        </div>
    </header>
</template>

<script>
import { Collapse } from "element-ui"
import { mapState } from 'vuex'


export default ({
    name: 'Header',
    components:{},
    data() {
        return {
            userImg: require("../assets/images/User.png")
        }
    },
    methods:{
        handelMeal(){
            this.$store.commit('collapseMenu')
        },
        logOut() {
            this.$store.commit('clearToken')
            this.$store.commit('clearMenu')
            this.$router.push('/login')
        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabsList
        })
    }
})
</script>


<style lang="less" scoped>
    header{
        width: 100%;
    }
    .one-content{
        width: 400px;
        position: relative;
        left: -9px;
       .el-button--mini{
            margin: 16px;
        }
        .el-button-icon-menu{
            position: absolute;
            top: 0;
            left: 0;
        }
        .el-crumbs{
            position: absolute;
            top: 22px;
            left: 80px;
        }
    }
    .img-content{
        text-align: right;
        height: 30px;
        position: absolute;
        top: 35px;
        left: 96%;
        .userImg{
            border-radius: 50px;
        }
    }
    .el-dropdown-menu {
        width: 70px;
        top: 83px !important;
        left: 96% !important;
    }
</style>