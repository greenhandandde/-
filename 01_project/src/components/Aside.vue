<template>
    <el-col :span="12" :style="width">
    <el-menu background-color="#535464" text-color="#fff" :collapse="isCollapse">
        <h6 style="width:115px;margin: 20px auto; font-size:14px; color=#fff" :style="widthTitle">{{isCollapse? "后台" : "后台管理系统"}}</h6>
        <el-menu-item @click="clickMenu(item)" v-for="(item,index) in noChildren" :key='index' :index="item.path">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <el-submenu index="1" v-for="item in hasChildren" :key='item.path'>
            <template slot="title" >
            <i class="el-icon-location"></i>
            <span  >{{item.label}}</span>
            </template>
            <el-menu-item-group  style="cursor:pointer; text-color=#fff" v-for="item in item.children" :key='item.path'>
                <div @click="clickMenu(item)" style="width:115px;margin: 0px 42px 10px 42px; font-size:14px;" active-text-color="#fff">{{item.label}}</div>
            </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </el-col>

</template>

<script>
import  asideData from'../assets/MockData.json'
    export default {
        data() {
            return {
                menu:[]
            };
        },
        computed:{
            noChildren(){
                return this.asyncMenu.filter(item => !item.children)
            },
            hasChildren(){
                return this.asyncMenu.filter(item => item.children)
            },
            isCollapse() {
                return this.$store.state.tab.isCollapse
            },
            width(){
                if(this.$store.state.tab.isCollapse){
                    return "width:65px";
                }
            },
            widthTitle(){
                if(this.$store.state.tab.isCollapse){
                    return "width:30px";
                }
            },
            asyncMenu() {
                return this.$store.state.tab.menu
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            clickMenu(item){
                this.$router.push({
                    name:item.name,
                })
                this.$store.commit('selectMenu',item)
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-col{
        width: 200px;
    }
    .el-menu{
        height: 100vh;
        border: 2px solid rgb(116, 113, 113);
    }
    .el-menu-item.is-disabled{
            opacity:1;
    }
    h6{
        color:#fff;
    }
    div{
        color:#fff
    }
    
</style>