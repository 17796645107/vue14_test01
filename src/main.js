// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import {store} from "./store/store"
import VueCookies from 'vue-cookies'
// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//element-ui 过度动画
import 'element-ui/lib/theme-chalk/base.css';
//element-ui 折叠展开
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueCookies);
Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition)

new Vue({
  router,
  store:store,
  el: '#app',
  components: { App },
  template: '<App/>'
})
