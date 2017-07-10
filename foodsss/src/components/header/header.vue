<template>
	<div class="header">
		<div class="content-wrapper">
			<!-- 头像 -->
			<div class="avatar">
				<img width="64" height="64" v-bind:src="seller.avatar">
			</div>
			<div class="content">
				<!-- 店铺信息 -->
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="supports" @click="showDetial">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
				<div v-if="seller.supports" class="supports-count" @click="showDetial">
					<span class="count">{{seller.supports.length}}个</span>
					<i class="iconfont icon-jiantouyou"></i>
				</div>
			</div>
		</div>
		<!-- 公告 -->
		<div class="bulletin">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="iconfont icon-jiantouyou"></i>
		</div>
		<!-- 背景 -->
		<div class="background">
			<img :src="seller.avatar">
		</div>
		<!-- 弹出层 -->
		<transition name="fade">
			<div class="detail" v-if="detailShow">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<!-- 星星组件 -->
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<Vtitle tit="优惠信息"></Vtitle>
						<!-- 优惠列表 -->	
						<ul v-if="seller.supports" class="supports">
							<li class="supports-item" v-for="(v,k) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[k].type]"></span>
								<span class="text">{{seller.supports[k].description}}</span>
							</li>
						</ul>
						<Vtitle tit="商家公告"></Vtitle>
						<div class="bullrtin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<!-- 关闭钮 -->
				<div class="detail-close" @click="hideDetial">
					<i class="iconfont icon-guanbi"></i>
				</div>
			</div>
		</transition>
	</div><!-- header -->
</template>
<script type="text/javascript">
	import star from '../../components/stars/stars.vue'
	import Vtitle from '../../components/title/title.vue'
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data: function(){
			return {
				detailShow:false
			}
		},
		methods:{
			showDetial:function(){
				this.detailShow=true
			},
			hideDetial:function(){
				this.detailShow=false
			}
		},
		created: function(){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
		},
		components:{
			star,
			Vtitle
		}
	}
</script>
<style type="text/css" lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.header
	color:#fff
	position:relative
	overflow:hidden
	background-color:rgba(7,17,27,.4)
	.content-wrapper
		padding:24px
		display:flex
		.avatar
			img
				border-radius:2px
		.content
			flex:1
			padding-left:16px
			position: relative
			.title
				margin:2px 0 8px 0
				font-size:0
				.brand
					display:inline-block
					vertical-align:top
					width:30px
					height:18px
					bg-image('brand')
					background-size:30px 18px
					background-repeat:no-repeat
					border-radius:2px
				.name
					margin-left:6px
					font-size:16px
					line-height:18px
					font-weight:bold
			.description
				margin-bottom:8px
				font-size:12px
				line-height:12px
			.supports
				display:flex
				align-items: center
				.icon
					display:inline-block
					width:12px
					height:12px
					margin-right:4px
					background-size:12px
					background-repeat:no-repeat
					&.decrease
						bg-image('decrease_1')
					&.discount
						bg-image('discount_1')
					&.guarantee
						bg-image('guarantee_1')
					&.invoice
						bg-image('invoice_1')
					&.special
						bg-image('special_1')
				.text
					line-height:14px
					font-size:10px
					padding-top:2px
			.supports-count
				position: absolute
				right:0
				bottom:0
				padding-top:2px
				padding-left:9px
				padding-right:8px
				height:24px
				display:flex
				align-items:center
				border-radius:14px
				box-sizing:border-box
				background-color:rgba(0,0,0,.2)
				text-algin:center
				.count
					font-size:10px
				.icon-jiantouyou
					font-size:10px	
	.bulletin
		position:relative
		height:28px
		line-height:28px
		padding: 0 22px 0 12px
		white-space:nowrap
		overflow:hidden
		text-overflow:ellipsis
		background-color:rgba(7,17,27,0.2)
		.bulletin-title
			display:inline-block
			vertical-align:top
			margin-top:7px
			width:22px
			height:12px
			bg-image('bulletin')
			background-size:22px 12px
			background-repeat:no-repeat
		.bulletin-text
			vertical-align:top
			font-size:10px
			margin-left:4px
			margin-right:4px
		.icon-jiantouyou
			position:absolute
			font-size:10px
			right:12px
	.background
		img
			position:absolute
			left:0
			top:0
			width:100%
			height:100%
			z-index:-1
			filter:blur(10px)
	.detail
		position:fixed
		z-index:220
		top:0
		width:100%
		height:100%
		overflow:auto
		background-color:rgba(7,17,27,.8)
		&.fade-enter-active, &.fade-leave-active
			transition: all 1s ease     
		&.fade-enter, &.fade-leave-active
			opacity: 0
		.detail-wrapper
			min-height:100%
			width:100%
			.detail-main
				margin-top:64px
				padding-bottom:64px
				.name
					line-height:32px
					text-align:center
					font-size:16px
					font-weight:700
				.star-wrapper
					margin-top:18px
					padding:2px 0
					text-align:center
				.supports
					width:80%
					margin:0 auto
					.supports-item
						padding:0 12px
						margin-bottom:12px
						font-size:0
						display:flex
						&:last-child
							margin-bottom:0
						.icon
							display:inline-block
							width:16px
							height:16px
							margin-right:6px
							background-size:16px 16px
							background-repeat:no-repeat
							&.decrease
								bg-image('decrease_2')
							&.discount
								bg-image('discount_2')
							&.guarantee
								bg-image('guarantee_2')
							&.invoice
								bg-image('invoice_2')
							&.special
								bg-image('special_2')
						.text
							font-size:12px
							line-height:17px
				.bullrtin
					width:80%
					margin:0 auto
					.content
						padding:0 12px
						line-height:24px
						font-size:12px
						
		.detail-close
			position:relative
			width:32px
			height:32px
			margin:-64px auto 0 auto
			clear:both
			font-size:32px
			box-sizing:border-box
			padding-left:8px
				





















</style>