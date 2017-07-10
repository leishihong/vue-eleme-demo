<template>
	<div class="seller" ref="sellerwrapper">
		<div class="seller-content">
			<div class="overview">
				<h1 class="titlex">{{seller.name}}</h1>
				<div class="desc border-1px">
					<star :size="36" :score="seller.score"></star>
					<span class="texts">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span>{{seller.minPrice}}</span><small>元</small>
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span>{{seller.deliveryPrice}}</span><small>元</small>
						</div>
					</li>
					<li class="block noborder">
						<h2>平均配送时间</h2>
						<div class="content">
							<span>{{seller.deliveryTime}}</span><small>分钟</small>
						</div>
					</li>
				</ul>
				<div class="const" @click="isConst($event)">
					<span class="iconfont icon-xin2" :class="{'reds':favorite}"></span>
					<p>{{texts}}</p>
				</div>
			</div>
			<split></split>
			<div class="bulletin" v-show="seller.bulletin">
				<h1 class="titlee">公告与活动</h1>
				<p class="text">{{seller.bulletin}}</p>
			</div>
			<ul class="supports">
				<li v-for="(supports,index) in seller.supports">
					<span class="icon" :class="classMap[seller.supports[index].type]"></span>
					<span class="tex">{{supports.description}}</span>
				</li>
			</ul>
		</div>
	</div>	
</template>
<script type="text/javascript">
	import star from '../stars/stars'
	import split from '../split/split'
	import {saveToLocal,loadFromLocal} from '../../common/js/store.js'
	import Bscroll from 'better-scroll'
	
	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data () {
			return {
				favorite:(() => {
					return loadFromLocal(this.seller.id,'favorite',false)
				})(),
				texts:'已收藏'
			}
		},
		components: {
			star,
			split
		},
		created: function(){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			this.$nextTick(() => {
				this.scroll = new Bscroll(this.$refs.sellerwrapper,{
					click:true
				})
			})
		},
		methods: {
			isConst(event) {
				if(!event._constructed){
					return 
				}
				this.favorite=!this.favorite
				this.favorite?this.texts="已收藏":this.texts="收藏"
				saveToLocal(this.seller.id,'favorite',this.favorite)
			}
		}
	}
</script>
<style type="text/css" lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.seller
	position: absolute
	top:182px
	bottom:0
	left:0
	width:100%
	overflow:hidden
	.seller-content
		.overview
			padding:18px 18px 0 18px 
			position:relative
			.titlex
				font-szie:14px
				margin-bottom:8px
				line-height:14px
				color:rgb(7,17,27)
			.desc
				display:flex
				align-items:center
				padding-bottom:18px
				border-1px(rgba(7,17,27,.1))
				.texts
					margin-left:8px
					margin-right:12px
				.text,.texts
					font-size:10px
					color:rgb(77,85,93)
			.remark
				padding:18px 0
				display:flex
				li
					flex:1
					text-align:center
					border-right:1px solid #ccc
					h2
						font-size:10px
						line-height:10px
						margin-bottom:6px
						font-weight:200
						color:rgb(147,153,159)
					.content
						span
							font-size:24px
							line-height:24px
							color:rgb(7,17,27)
						small
							font-szie:12px
						
				.noborder
					border:none
			.const
				position:absolute
				right:18px
				top:18px
				text-align:center
				width: 40px
				span
					display:block
					font-size:24px
					margin-bottom:4px
					color:rgb(77,85,93)
					&.reds
						color:rgb(240,20,20)
				p
					font-size:10px
					color:rgb(77,85,93)
		.bulletin
			padding:18px
			.titlee
				font-szie:14px
				margin-bottom:8px
			.text
				padding:0 12px
				font-size:12px
				line-height:24px
				color:rgb(240,20,20)
		.supports
			padding:0 18px
			li
				height:48px
				line-height:48px
				display:flex
				align-items:center
				border-top:1px solid rgba(7,17,27,.1)
				.icon
					width:16px
					height:16px
					display:inline-block
					margin-right:6px
					background-size:16px
					background-repeat:no-repeat
					&.decrease
						background-image:url('decrease_3@3x.png')
					&.discount
						background-image:url('discount_3@3x.png')
					&.guarantee
						background-image:url('guarantee_3@3x.png')
					&.invoice
						background-image:url('invoice_3@3x.png')
					&.special
						background-image:url('special_3@3x.png')
				.tex
					font-size:12px
					color:rgb(7,17,27)
					line-height:16px
				
				
				













</style>