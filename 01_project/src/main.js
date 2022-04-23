import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import routers from 'vue-router';
import router from '../router/index.js';
import Home from './views/Main.vue';
import store from '../store/store';
import Http from 'axios';
import '../api/mock.js'

Vue.config.productionTip = false;
Vue.use(ElementUi)
Vue.use(routers)
Vue.prototype.$http = Http; 

router.beforeEach((to, from, next) => {
    store.commit("getToken")
    const token = store.state.user.token
    // console.log(token )
    if(!token && to.name !== 'login') {
        next({ name: 'login' })
    }else {
        next()  
    }
})



new Vue({
  routers,
  router,
  store,
  components:{Home,App},
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
