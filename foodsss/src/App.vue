<template>
	<div id="app">
		<div class="header-box">
			<!-- 头部组件 -->
			<Headers v-bind:seller="seller"></Headers>
			<!-- 选项卡 -->
			<div class="tab border-1px">
				<div class="tab-item">
					<router-link to='goods'>商品</router-link>
				</div>
				<div class="tab-item">
					<router-link to='ratings'>评价</router-link>
				</div>
				<div class="tab-item">
					<router-link to='seller'>商家</router-link>
				</div>
			</div>
		</div>
		<keep-alive>
			<router-view :seller="seller"></router-view>
		</keep-alive>
	</div>
</template>

<script type="text/javascript">
	//header组件	
	import Headers from './components/header/Header.vue';
	var ERR_OK=0;
	export default {
		data() {
			return {
				seller: {},
				ratings:{
					ratings:[]
				}
			}
		},
		created:function(){
			this.$http.get('/api/seller')
			.then(function(response){
				response = response.body
				if(response.errno === ERR_OK){
					this.seller = response.data;
				}
			})
		},
		components: {//注册组件
			Headers
		}
	}
  
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import './common/stylus/mixin.styl'
#app
	.tab
		display:flex
		height:40px
		line-height:40px
		z-index:200
		background-color:#fff
		border-1px(rgba(7,17,27,0.1))
		.tab-item
			flex:1
			text-align:center
			a
				display:block
				color:rgb(77,85,93)
			.router-link-active
				color:rgb(240,20,20)









</style>