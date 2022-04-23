<template>
    <div>
        <div style="text-align:center">CJY</div>
        <el-container>
            <el-aside style="width: auto">
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <tag></tag>
                <el-main style="padding-top:0px">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style  lang='less'  scoped>
    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  

</style>

<script>
import Aside from '../components/Aside.vue';
import Header from '../components/Header.vue';
import Home from '../views/home';
import Tag from '../components/Tag.vue'
export default {
    name: 'Main',
    components:{Aside,Header,Tag,Home},
    data() {
        return {
        
        }
    }
}
</script>