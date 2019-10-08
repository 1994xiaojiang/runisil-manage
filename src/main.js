import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/element.js'
import '@/style/index.scss' // glob scss
import Router from 'vue-router'

Vue.use(Router);
Vue.config.productionTip = false;

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
