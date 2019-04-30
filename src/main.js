import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import routes from './routers.js'
import store from './vuex/index.js'
import * as types from './vuex/mutation-types'
import { AjaxPlugin } from 'vux'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.use(AjaxPlugin)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  mode: 'history',
  routes
})

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function(to, from ,next) {
	if ( localStorage.getItem("openid") === 'undefined' ){
		localStorage.clear()
	}
	if ( localStorage.getItem("openid") === null && to.query.code === undefined){
	 	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4046698f09250bd7&redirect_uri=http://jfd.04wu.com&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
	} else if( localStorage.getItem("openid") === null && to.query.code !== undefined){
	 	next()
	}else{
		next()
	}
	// store.commit(types.SHOW_LOADING, true)
    // store.dispatch('showLoading')
	// const toIndex = history.getItem(to.path)
	// const fromIndex = history.getItem(from.path)

	// if(toIndex) {
	// 	if(toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
	// 		store.commit('UPDATE_DIRECTION', {direction: 'forward'})
	// 	}else{
	// 		store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
	// 	}
	// }else{
	// 	++historyCount

	// 	history.setItem('count', historyCount)
	// 	to.path !== '/' && history.setItem(to.path, historyCount)
	// 	store.commit('UPDATE_DIRECTION', {direction: 'forward'})
	// }

	// if(/\/http/.test(to.path)) {
	// 	let url = tp.path.split('http')[1]
	// 	window.location.href = `http${url}`
	// }else{
	// }
})

router.afterEach(function (to) {
  // store.commit(types.HIDE_LOADING, false)
  // store.dispatch('hideLoading')
  // ga && ga('set', 'page', to.fullPath)
  // ga && ga('send', 'pageview')
})



FastClick.attach(document.body)


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
