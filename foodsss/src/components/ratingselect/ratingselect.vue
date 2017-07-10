<template>
<!-- 全部 满意 不满意 组件-->
<div class="ratingselect">
	<div class="rating-type border-1px">
		<span @click="select(2,$event)" class="block positive" :class="{'active':selectType.selectType===2}">{{desc.all}}<small class="count">{{ratings.length}}</small></span>
		<span @click="select(0,$event)" class="block positive"  :class="{'active':selectType.selectType===0}">{{desc.positive}}<small class="count"></small></span>
		<span @click="select(1,$event)" class="block negative"  :class="{'active':selectType.selectType===1}">{{desc.negative}}<small class="count">20</small></span>
	</div>
	<div @click="toggleContent($event)" class="switch" :class="{'on':onlyContent.onlyContent}">
		<span class="iconfont icon-duihao6" ></span>
		<span class="text">只看内容的评价</span>
	</div>
</div>
</template>
<script type="text/javascript">
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default {
		props :{
			ratings:{//评论详情
				type:Array,
				default(){
					return [];
				}
			},
			selectType: {//默认显示全部评价
				type:Object,
				default:ALL
			},
			onlyContent: {//默认显示所有内容
				type:Object,
				default: false
			},
			desc: {//默认三个字段
				type:Object,
				default(){
					return {
						all:'全部',
						positive:'满意',
						negative:'不满意'
					}
				}
			}
		},
		methods:{
			select(type,event){
				if(!event._constructed){ //解决点击PC会触发俩次的问题
					return
				}
				this.selectType.selectType=type
			},
			toggleContent(event){
				if(!event._constructed){
					return
				}
				this.onlyContent.onlyContent = !this.onlyContent.onlyContent
			}
		}
	}
</script>
<style type="text/css" lang="stylus">
@import '../../common/stylus/mixin.styl'
.ratingselect
	.rating-type
		padding: 18px 0
		margin: 0 18px
		display:flex
		border-1px(rgba(7,17,27,.1))
		.block
			padding: 8px 12px
			margin-right:8px
			border-radius:1px
			color:rgb(77,85,93)
			font-size:12px
			&.active
				color:#fff
			.count
				margin-left:2px
				font-size:8px
			&.positive
				background-color:rgba(0,160,220,.2)
				&.active
					background-color:rgb(0,160,220)
			&.negative
				background-color:rgba(77,85,93,.2)
				&.active
					background-color:rgb(77,85,93)
	.switch
		padding:12px 18px
		line-height:24px
		border-bottom:1px solid rgba(7,17,27,.1)
		color:rgb(147,153,159)
		display:flex
		align-times:center
		&.on
			.iconfont
				color:#00c850
		.iconfont 
			font-szie:24px
			margin-right:4px
			margin-top:1px
		.text
			font-size:12px
		















	
</style>