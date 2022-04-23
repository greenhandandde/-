import Vue from "vue"
import VueRouter from 'vue-router'
import Main from '../src/views/Main.vue'
import Home from '../src/views/home/index.vue'
import User from '../src/views/user/index.vue'
import Mall from '../src/views/mall/index.vue'
import Login from '../src/views/login/login.vue'
import pageOne from '../src/views/other/pageOne.vue'
import pageTwo from '../src/views/other/pageTwo.vue'
Vue.use(VueRouter)

const routes=[
    {
        path:'/',
        name:Main,
        component:Main,
        redirect:'/home',
        children:[
            {
                path:'/home',
                name:'home',
                component:Home,
            },
            {
                path:'/user',
                name:'user',
                component:User,
            },
            {
                path:'/mall',
                name:'mall',
                component:Mall,
            },
            {
                path:'/page1',
                name:'page1',
                component:pageOne,
            },
            {
                path:'/page2',
                name:'page2',
                component:pageTwo,
            },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:Login
    }
    
]

export default new VueRouter({
    mode:'history',
    routes,
})
