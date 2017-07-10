<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(v,k) in goods" class="menu-item border-1px" :class="{'current':currentIndex===k}" @click="selectMenu(k,$event)">
					<span class="text"><span v-show="v.type>0" class="icon" :class="classMap[v.type]"></span>{{v.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="(v,k) in goods" class="foodListHook">
					<h1 class="titles">{{v.name}}</h1>
					<ul>
						<li @click="selectFood(s,$event)" v-for="(s,n) in v.foods" class="food-item border-1px" >
							<div class="icon">
								<img :src="s.icon">
							</div>
							<div class="content">
								<h2 class="name">{{s.name}}</h2>
								<p class="desc">{{s.description}}</p>
								<div class="extra">
									<span class="count">月售{{s.sellCount}}份</span><span>好评率{{s.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">¥{{s.price}}</span>
									<span class="old" v-show="s.oldPrice">{{s.oldPrice}}</span>
								</div>
								<cartcontrol :food="s"></cartcontrol>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart ref="shopcart" :select-food="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
		<food :food="selectedFoods" ref="food"></food>
	</div>
</template>
<script type="text/javascript">
import Bscroll from 'better-scroll';
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'
	const ERR_OK = 0 ;

	export default {
		props: {
			seller:{
				type:Object
			}
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFoods:{}
			}
		},
		created(){
			var _this=this;
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			this.$http.get('/api/goods')
			.then(function (response) {
				response=response.body;
				if(response.errno === ERR_OK){
					this.goods=response.data
					this.$nextTick(() => {
						this.initScollr()
						this.calculateHeight();
					});
				}
			})
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
						return i
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count){
							foods.push(food)
						}
					})
				})
				return foods
			}
		},
		methods: {
			initScollr() {
				this.menuScroll = new Bscroll(this.$refs.menuWrapper,{
					click:true
				});
				this.foodScroll = new Bscroll(this.$refs.foodWrapper,{
					click:true,
					probeType: 3
				});
				this.foodScroll.on('scroll',(pos) => {
					this.scrollY=Math.abs(Math.round(pos.y))
				})
			},
			//计算商品每一类的高度	
			calculateHeight() {
				let foodList = document.querySelectorAll('.foodListHook');
				let height = 0;
				this.listHeight.push(height)
				for(var i=0;i<foodList.length;i++){
					let item=foodList[i];
					height+=item.clientHeight;
					this.listHeight.push(height)
					
				}
			},
			// 侧栏菜单
			selectMenu(index,event) {
				if(!event._constructed){ //解决点击PC会触发俩次的问题
					return
				}
				let foodList = document.querySelectorAll('.foodListHook');
				let el=foodList[index];
				this.foodScroll.scrollToElement(el, 300)		
			},
			selectFood(food,event) {
				if(!event._constructed){
					return
				}
				this.selectedFoods = food
				this.$refs.food.show()
			}
		},
		components: {
			shopcart,
			cartcontrol,
			food
		}
	}
</script>
<style type="text/css" lang="stylus" scoped>

@import '../../common/stylus/mixin.styl'
.goods
	display:flex
	position:absolute
	top:182px
	bottom:46px
	width:100%
	overflow:hidden
	.menu-wrapper
		flex:0 0 80px
		width:80px
		background-color:#f3f5f7
		.menu-item
			padding:0 12px
			display: table
			height:54px
			width:56px
			line-height:14px
			border-1px(rgba(7,17,27,.1))
			&:last-child
				border-none()
			&.current
				position:relative
				margin-top:-1px
				background-color:#fff
				font-weight:700
				.text
					border-none()
			.icon
				display:inline-block
				width:12px
				height:12px
				margin-right:2px
				background-size:12px
				background-repeat:no-repeat
				&.decrease
					bg-image('decrease_3')
				&.discount
					bg-image('discount_3')
				&.guarantee
					bg-image('guarantee_3')
				&.invoice
					bg-image('invoice_3')
				&.special
					bg-image('special_3')
			.text
				display:table-cell
				width:56px
				vertical-align:middle
				font-size:12px
	.foods-wrapper
		flex:1
		.titles
			padding-left:14px
			height:26px
			line-height:26px
			border-left:2px solid #d9dde1
			background-color:#f3f5f7
			color:rgb(147,153,159)
			font-size:12px
			font-weight:500
		.food-item
			display: flex
			margin: 18px
			padding-bottom:18px
			border-1px(rgba(7,17,27,.1))
			&:last-child
				border-none()
				margin-bottom:0
			.icon
				width:57px
				height:57px
				margin-right:10px
				img
					width:100%
			.content
				flex:1
				position: relative
				.name
					margin:2px 0 8px 0
					font-szie:14px
					color:rgb(7,17,27)
					line-height:14px
				.desc,.extra
					margin-bottom:8px
					font-size:10px
					color:rgb(147,153,159)
					line-height:14px
				.extra
					.count
						margin-right:12px
				.price
					font-weight:700px
					line-height:24px
					.now
						margin-right:8px
						font-size:14px
						color:#f01414
					.old
						text-decoration:line-through
						font-size:10px
						color:rgb(147,153,159)
					
			
			
			

	







</style>