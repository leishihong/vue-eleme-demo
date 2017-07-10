import Vue from 'vue'	//引入vue框架
import App from './App.vue'		//引入模板
import router from './router'	//路由
import VueResource from 'vue-resource'	//数据请求
import './common/stylus/index.styl' //公共样式

Vue.use(router)
Vue.use(VueResource)

new Vue({
	el:'#app',
	router,
	template:'<app/>',
	data:{
		eventHub: new Vue()
	},
	components:{
		App
	}
})