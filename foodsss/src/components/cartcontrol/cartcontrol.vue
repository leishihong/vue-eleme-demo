<template>
	<!-- 架入购物车按钮 组件 -->
	<div class="cartcontrol">
		<!-- 减量 -->
		<transition name="move">
			<div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
				<i class="iconfont icon-jianhao2 inner"></i>
			</div>
		</transition>	
		<!-- 数量 -->
		<div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
		<!-- 增量 -->
		<div class="cart-add" @click.stop.prevent="addCart">
			<i class="iconfont icon-jiahao1"></i>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	export default {
		props: {
			food:{
				type:Object
			}
		},
		created() {
			
		},
		methods: {
			addCart(event) {
				if(!event._constructed){
					return
				}
				if(!this.food.count){
					Vue.set(this.food,'count',1);
				}else{
					this.food.count++;
				}
				// this.$root.eventHub.$emit('cart.add',event.target)
			},
			decreaseCart(event){
				if(!event._constructed){
					return
				}
				if(this.food.count){
					this.food.count--;
				}
			}

		}
	}
</script>
<style type="text/css" lang="stylus">
.cartcontrol
	display:flex
	position:absolute
	right:0
	bottom:-6px
	.move-enter-active,.move-leave-active
		transition: all .5s linear
	.move-enter-active
		transform:translate3d(0,0,0)
		opacity:1
	.move-leave-active
		transform:translate3d(24px,0,0)
		opacity:0
	.move-enter
		opacity:0
		transform:translate3d(24px,0,0)
	.cart-decrease
		display:inline-block
		padding:6px
		i
			font-size:24px
			color:#00a0dc
	.cart-count
		min-width:16px
		text-align:center
		line-height:35px
		color:rgb(147,153,159)
	.cart-add
		display:inline-block
		padding:6px
		i
			font-size:24px
			color:#00a0dc
		

</style>