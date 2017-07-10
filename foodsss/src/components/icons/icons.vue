<template>
	<div class="icons" :class="posit">
		<span class="icons-item" :class="iconType"></span>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			
			posit:''
		},
		computed: {
			iconType(){
				return this.classMap[this.datas]
			}
		},
		created: function(){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
		}	
	}
</script>
<style type="text/css" lang="stylus">

@import '../../common/stylus/mixin.styl'
.icons
	font-size:0
	.headers
		.icons-item
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
	.details
		.icons-item
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

	// .1@2_1@3
	// 	display:inline-block
	// 	width:12px
	// 	height:12px
	// 	margin-right:4px
	// 	background-size:12px
	// 	background-repeat:no-repeat
	// 	&.decrease
	// 		bg-image('decrease_1')
	// 	&.discount
	// 		bg-image('discount_1')
	// 	&.guarantee
	// 		bg-image('guarantee_1')
	// 	&.invoice
	// 		bg-image('invoice_1')
	// 	&.special
	// 		bg-image('special_1')


</style>