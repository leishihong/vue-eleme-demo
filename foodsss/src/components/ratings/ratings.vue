<template>
	<div class="ratings" ref="ratingswrapper">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="titles">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="titles">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<small class="small">{{seller.serviceScore}}</small>
					</div>
					<div class="score-wrapper">
						<span class="titles">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<small class="small">{{seller.foodScore}}</small>
					</div>
					<div class="score-wrapper">
						<span class="titles">送达时间</span>
						<small class="time">{{seller.deliveryTime}}分钟</small>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
			<div class="ratings-wrapper">
				<ul>
					<li v-for="(rating,index) in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px">
						<div class="avatars">
							<img width="28" height="28" :src="rating.avatar">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" >
								<span :class="{'iconfont icon-support':rating.rateType===0,'iconfont icon-cai':rating.rateType===1}"></span>
								<span class="hot" v-for="(recommend,index) in rating.recommend" v-show="rating.recommend && rating.recommend.length">{{recommend}}</span>
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>	
</template>
<script type="text/javascript">
	import star from '../stars/stars'
	import split from '../split/split'
	import Bscroll from 'better-scroll'
	import ratingselect from '../ratingselect/ratingselect'
	import {formatDate} from '../../common/js/date.js'
	const ALL = 2;
	const ERR_OK = 0;
	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				selectType:{
					selectType:ALL
				},
				onlyContent:{
					onlyContent:false
				},
				ratings:[]
			}
		},
		created(){
			this.$http.get('/api/ratings')
				.then((response) => {
					response = response.body;
					if(response.errno === ERR_OK){
						this.ratings = response.data
						this.$nextTick(() => {
							console.log(this.$refs.ratingswrapper)
							this.scroll = new Bscroll(this.$refs.ratingswrapper,{
								click:true
							})
						})
					}
				})
		},
		filters: {
			formatDate(time) {
				var date = new Date(time)
				return formatDate(date,'yyyy-MM-dd hh:mm')
			}
		},
		methods:{
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
			star,
			split,
			ratingselect
		}
	}
</script>
<style type="text/css" lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.ratings
	position:absolute
	top:182px
	bottom:0
	left:0
	width:100%
	overflow:hidden
	.overview
		display:flex
		padding:18px 0
		.overview-left
			flex:0 0 137px
			width:137px
			text-align:center
			border-right:1px solid rgba(7,17,17,.1)
			@media only screen and (max-width:320px)
				flex:0 0 120px
				width:120px
			.score
				font-size:24px
				margin-bottom:6px
				color:rgb(255,153,0)
				line-height:28px
			.titles
				font-szie:12px
				color:rgb(0,0,0,.1)
				margin-bottom:6px
			.rank
				font-size:10px
				color:rgb(7,17,27)
				line-height:10px
				padding-bottom:6px
		.overview-right
			flex:1
			padding-left:24px
			padding-top:8px
			@media only screen and (max-width:320px)
				padding-left:6px
			.score-wrapper
				display:flex
				margin-bottom:8px
				align-items:center
				.titles
					margin-right:12px
					font-size:12px
					@media only screen and (max-width:320px)
						margin-right:6px
				.small
					font-size:10px
					margin-left:10px
					color:rgb(255,153,0)
				.time
					color:rgb(147,153,159)
					font-size:12px
	.ratings-wrapper
		padding:0 18px
		.rating-item
			display:flex
			padding:18px 0
			border-1px(rgba(147,153,159,.2))
			.avatars
				flex:0 0 28px
				width:28px
				margin-right:12px
				img
					border-radius:50%
			.content
				flex:1
				position:relative
				.name
					font-size:10px
					color:rgb(7,17,27)
					line-height:12px
					margin-bottom:4px
				.star-wrapper
					display:flex
					align-items:center
					line-height:8px
					margin-bottom:6px
					.delivery
						font-size:10px
						margin-left:6px
						color:rgb(147,153,159)
				.text
					font-size:12px
					color:rgb(7,17,27)
					line-height:18px
					margin-bottom:8px
				.recommend
					display:flex
					flex-wrap:wrap
					.icon-support
						color:rgb(0,160,220)
					.icon-cai
						color:rgb(183,187,191)
					.hot
						font-size:10px
						padding:0 6px
						height:16px
						display:block
						line-height:18px
						margin-left:8px
						margin-bottom:6px
						border-radius:2px
						border:1px solid rgba(7,17,27,.1)
				.time
					position:absolute
					right:0
					top:0
					color:rgb(147,153,159)
					font-size:10px
					



</style>