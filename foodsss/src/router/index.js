import Vue from 'vue'
import Router from 'vue-router'
import Seller from '@/components/seller/seller.vue'
import Goods from '@/components/goods/goods.vue'
import Ratings from '@/components/ratings/ratings.vue'

Vue.use(Router)
export default new Router({
  routes: [
  	{
  		path:'/',
  		redirect:'/goods'
  	},
    {
      path: '/goods', //商品
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings', //评价
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',  //商家
      name: 'seller',
      component: Seller
    }
    
  ]
})






