import Vue from 'vue';
import App from './App';
Vue.config.productionTip = false;
App.mpType = 'app'
const app = new Vue(App);
app.$mount();

Vue.prototype.$opt = () => {
  var pages = getCurrentPages(); //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象 
  return currentPage.options //当前页面url
}

import fly from './utils/fly';
Vue.prototype.$fly = fly;
Vue.prototype.globalData = fly.globalData;
