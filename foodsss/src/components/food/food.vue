<template>
	<!-- 商品详情页 -->
	<transition>
	<div class="food" v-show="showFlag" ref="food">
		<div class="foodcontent">
			<div class="image-header">
				<img :src="food.image">
				<div class="back" @click="hideShow">
					<i class="iconfont icon-zuoyoujiantou-copy-copy-copy-copy"></i>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span>月售{{food.sellCount}}份</span>
					<span>好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">¥{{food.price}}</span>
					<span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
				</div>
				<div class="cartcontrol-wrapper">
					<cartcontrol :food="food"></cartcontrol>
				</div>
				<div @click.stop.prevent="addFirst($event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
			</div>
			<split  v-show="food.info"></split>
			<div class="info" v-show="food.info">
				<h1 class="title">商品信息</h1>
				<p class="text">{{food.info}}</p>
			</div>
			<split></split>
			<!-- 评价 -->
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
			</div>
			<div class="rating-wrapper">
				<!-- 判断当前商品有没有评论信息 -->
				<ul v-show="food.ratings && food.ratings.length">
					<li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,key) in food.ratings" class="rating-item border-1px" >
						<!-- 评论用户 -->
						<div class="user">
							<span class="name">{{rating.username}}</span>
							<img class="avatar" width="12" height="12" :src="rating.avatar">
						</div>
						<!-- 评论时间 -->
						<div class="time">
							{{rating.rateTime}}
						</div>
						<!-- 只看内容的评论 -->
						<p class="text">
							<span :class="{'iconfont icon-support':rating.rateType===0,'iconfont icon-cai':rating.rateType===1}"></span>
							<span class="txt">
								{{rating.text}}
							</span>
						</p>
					</li>
				</ul>
			</div>
			<div class="no-rating" v-show="!food.ratings || !food.ratings.length"></div>
		</div>
	</div>
	</transition>
	
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import Bscroll from 'better-scroll'
	import cartcontrol from '../cartcontrol/cartcontrol'
	import split from '../split/split'
	import ratingselect from '../ratingselect/ratingselect'

	const ALL = 2;
	export default {
		props: {
			food: {
				
			}
		},
		data (){
			return {
				showFlag:false,
				selectType:{
					selectType:ALL
				},
				onlyContent:{
					onlyContent:true
				},
				desc:{
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				}
			}
		},
		methods:{
			show () {	//每次显示详情页的时候初始化
				this.showFlag = true;
				this.selectType.selectType = ALL;
				this.onlyContent.onlyContent = false;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new Bscroll(this.$refs.food,{
							click:true
						})
					}else{
						this.scroll.refresh();
					}
				})
			},
			hideShow () {
				this.showFlag = false;
			},
			addFirst (event) {
				if(!event._constructed){ //解决点击PC会触发俩次的问题
					return
				}
				Vue.set(this.food,'count',1)
			},
			needShow(type,text){
				if(this.onlyContent.onlyContent && !text){
					return false
				}
				if(this.selectType.selectType === ALL){
					return true
				}else{
					return type===this.selectType.selectType
				}
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		}
	}
</script>
<style type="text/css" lang="stylus">
@import '../../common/stylus/mixin.styl'
.food
	position:fixed
	left:0
	top:0
	bottom:48px
	z-index:200
	width:100%
	background-color:#fff
	
	.image-header
		position:relative
		width:100%
		height:0
		padding-top:100%
		img
			position:absolute
			left:0
			top:0
			width:100%
			height:100%
		.back
			position:absolute
			top:10px
			left:0
			.iconfont
				display:bloack
				padding:6px
				font-size:24px
				color:#fff
	.content
		padding:18px
		position:relative
		.title
			font-size:14px
			font-weight:700
			color:rgb(7,17,27)
			line-height:14px
			margin-bottom:8px
		.detail
			font-size:10px
			color:rgb(147,153,159)
			line-height:20px
			margin-bottom:18px
		.price
			.now
				font-size:14px
				font-weight:700
				color:rgb(240,20,20)
				line-hieght:24px
			.old
				font-size:10px
				font-weight:700
				color:rgb(147,153,159)
		.cartcontrol-wrapper
			position:absolute
			right:12px
			bottom:18px
		.buy
			position:absolute
			right:18px
			bottom:19px
			z-index:10
			height:24px
			line-height:24px
			padding:0 12px
			box-sizing:border-box
			font-size:10px
			border-radius:12px
			color:#fff
			background-color:rgb(0,160,220)
	.info
		padding:18px
		.title
			line-height:14px
			margin-bottom:6px
			font-size:14px
			color:rgb(7,17,27)
		.text
			line-height:24px
			padding:0 8px
			font-size:12px
			color:rgb(77,85,93)
	.rating
		padding-top:18px
		.title
			line-height:14px
			margin-left:18px
			font-size:14px
			color:rgb(7,17,27)
	.rating-wrapper
		padding:0 18px
		.rating-item
			position:relative
			padding:16px 0
			border-1px(rgba(7,17,27,.1))
			.user
				position:absolute
				right:0
				top:16px
				display:flex
				align-items:center
				.name
					font-size:10px
					color:rgb(147,153,159)
					margin-right:6px
				.avatar
					border-radius:50%
			.time
				margin-bottom:6px
				line-height:12px
				font-size:10px
				color:rgb(147,153,159)
			.text
				line-height:16px
				display:flex
				align-items:center
				.icon-support
					font-size:10px
					margin-right:4px
					color:rgb(0,160,200)
				.icon-cai
					font-size:10px
					margin-right:4px
					color:rgb(147,153,159)
				.txt
					font-size:12px
					
				
				


















</style>