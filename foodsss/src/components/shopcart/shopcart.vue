<template>
	<div class="shopcart">
		<!-- 底部购物车栏 -->
		<div class="content">
			<div class="content-left" @click="toggleList">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="iconfont icon-gouwuche3" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="num" v-if="totalCount > 0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalPrice>0}">¥ {{totalPrice}}</div>
				<div class="desc">另需配送费¥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" :class="ritClass" @click="pays">{{payDesc}}</div>
		</div>
		<div class="ball-container">
			<div v-for="ball in balls">
				<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
					<div class="ball" v-show="ball.show">
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
		</div>
		<!-- 购物车列表 -->
		<transition name="move">
			<div class="shopcart-list" v-show="listcart">
				<div class="list-header">
					<h1>购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li v-for="(val,k) in selectFood" >
							<span class="name">{{val.name}}</span>
							<div class="price"><small>¥</small>{{val.price*val.count}}</div>
							<div class="cart-wrapper">
								<cartcontrol :food="val"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<!-- 遮罩层 -->
		<transition name="fade">
			<div class="list-mask" v-show="listcart" @click="hidelist"></div>
		</transition>
	</div>
</template>
<script type="text/javascript">
	import Bscroll from 'better-scroll';
	import cartcontrol from '../cartcontrol/cartcontrol'
	export default {
		data(){
			return {
				balls: [
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					}
				],
				listShow:false,
				fold:true
			}
		},
		props: {
			selectFood: {
				type:Array,
				default() {
					return [];
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		methods:{
			toggleList() {
				if(!this.totalCount){
					return 
				}
				this.fold=!this.fold
			},
			empty() {
				this.selectFood.forEach((food) => {
					food.count= 0 
				})
			},
			hidelist() {
				this.fold = true
			},
			pays() {
				if(this.totalPrice<this.minPrice){
					return
				}else{
					alert('支付'+this.totalPrice+'元')
				}
			}	
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFood.forEach((food) => {
					total += food.price * food.count;
				})
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFood.forEach((food) => {
					count += food.count;
				})
				return count;
			},
			payDesc() {
				if(this.totalPrice === 0){
					return `¥ ${this.minPrice}元起送`;
				}else if(this.totalPrice<this.minPrice){
					let ddif = this.minPrice - this.totalPrice
					return `还差¥ ${ddif}元起送`
				}else{
					return '去结算';
				}
			},
			ritClass() {
				if(this.totalPrice < this.minPrice){
					return 'not-enough'
				}else{
					return 'enough'
				}
			},
			listcart() {
				if(!this.totalCount) {
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if(show){
					this.$nextTick(() => {
						if(!this.scroll){
							this.scroll = new Bscroll(this.$refs.listContent,{
								click:true
							})
						}else{
							this.scroll.refresh()
						}
						
					})
				}
				return show
			}
		},
		components:{
			cartcontrol
			
		}
	}
</script>
<style type="text/css" lang="stylus">
.shopcart
	position:fixed
	left:0
	bottom:0
	z-index:210
	width:100%
	height:48px
	.content
		display:flex
		background-color:#141d27
		.content-left
			flex:1
			display:flex
			.logo-wrapper
				display:flex
				background-color:#141d27
				position:relative
				top:-10px
				margin: 0 12px
				padding:6px
				width:56px
				height:56px
				box-sizing:border-box
				border-radius:50%
				.logo
					width:100%
					height:100%
					border-radius:50%
					background-color:#2b343c
					display:flex
					align-items:center
					justify-content: center;
					&.highlight
						background-color:rgb(0,160,220)
					.iconfont
						font-size:24px
						color:#80858a
						&.highlight
							color:#fff
				.num
					position:absolute
					top:0
					right:0
					width:24px
					height:16px
					line-height:18px
					text-align:center
					border-radius:16px
					font-size:9px
					font-weight:700
					color:#fff
					background-color:rgb(240,20,20)
					box-shadow:0 4px 8px 0 rgba(0,0,0,.4)
					
			.price
				margin-top:12px
				margin-bottom:24px
				line-height:24px
				padding-right:12px
				box-sizing:border-box
				color:rgba(255,255,255,.4)
				border-right:1px solid rgba(255,255,255,.1)
				font-size:16px
				font-weight:700
				&.highlight
					color:#fff
			.desc
				margin:12px 0 0 12px
				line-height:24px
				font-size:10px
				color:rgba(255,255,255,.4)	
		.content-right
			flex: 0 0 105px
			width:105px
			
			font-size:12px
			text-align:center
			line-height:24px
			padding-top:12px	
			&.not-enough
				background-color:#2b333b
				color:#979a9c
			&.enough
				background-color:#00b43c
				color:#fff
	.ball-container
		.ball
			position:fixed
			left:32px
			bottom:22px
			z-index:300
			&.drop-transiton
				transition: all .4s
				.inner
					width:16px
					height:16px
					border-radius:50%
					background-color:rgb(0,160,220)
					transition: all .4s
	.move-enter-active,.move-leave-active,.fade-enter-active,.fade-leave-active
		transition: all .6s ease
	.move-enter-active
		transform:translate3D(0,0,0)
	.move-leave-active
		transform:translate3D(0,258px,0)
	.move-enter
		transform:translate3D(0,258px,0)
	.fade-enter-active
		opacity:1
	.fade-leave-active
		opacity:0
	.fade-enter
		opacity:0
	.shopcart-list
		position:fixed
		left:0
		bottom:48px
		z-index:-1
		width:100%
		background-color:#fff
		.list-header
			height:40px
			padding:0 18px
			background-color:#f3f5f7
			display:flex
			align-items:center
			justify-content: space-between;
			border-bottom:1px solid #ccc	
			h1
				font-size:14px
				color:rgb(7,17,27)
				font-weight:200
			span
				font-size:12px
				color:rgb(0,160,220)	
		.list-content
			max-height:217px
			overflow:hidden
			ul
				padding:0 18px
				li
					height:48px
					display:flex
					align-items:center
					justify-content:space-between
					border-bottom:1px solid rgba(7,17,27,.1)
					span,div,div
						flex:1
						text-align:center
					span
						text-align:left
						font-size:14px
						color:rgb(7,17,27)
					.price
						text-align:right
						text-align:10px
						color:rgb(240,20,20)
					.cart-wrapper
						position:relative
						height:48px
						min-width:88px
						.cartcontrol
							position:absolute
							bottom:5px
	.list-mask
		width:100%
		height:100%
		position:fixed
		top:0
		left:0
		z-index:-2
		background-color:rgba(0,0,0,.5)
					








</style>