
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

//导入网络请求的包
import { $http } from '@escook/request-miniprogram'

uni.$http=$http

//全局配置接口
$http.baseUrl='https://www.uinav.com'

//请求拦截器
$http.beforeRequest = function (options) {
  uni.showLoading({
  	title:'数据加载中'
  })
  console.log(store)
  //判断当前是否有权限的接口
  if(options.url.indexOf('/my/')!==-1){
	  options.header={
		  Authorization:'Bearer'+store.state.m_user.token,
		 
	  }
	   console.log('Bearer'+''+store.state.m_user.token)
  }
}

// 请求完成之后做一些事情响应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}

//封装弹框的方法,用到的地方直接uni.$showMsg（）
uni.$showMsg=function(title='数据请求失败',duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}





Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif