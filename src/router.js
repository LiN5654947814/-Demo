import VueRouter from 'vue-router'
import HomContainer from './components/HomContainer.vue'
import MemberContainer from './components/MemberContainer.vue'
import ShopCarContainer from './components/ShopCarContainer.vue'
import SearchContainer from './components/SearchContainer.vue'
import NewsList from './news/NewsList.vue'
import NewsInfo from './news/NewsInfo.vue'
import PhotoList from './photos/photoList.vue'
import PhotoInfo from './photos/photoinfo.vue'
import GoodsList from './goodslist/GoodsList.vue'
import GoodsInfo from './goodslist/GoodsInfo.vue'
import GoodsDesc from './goodslist/GoodsDesc.vue'
import GoodsComment from './goodslist/GoodsComment.vue'


let router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomContainer },
    { path: '/member', component: MemberContainer },
    { path: '/car', component: ShopCarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newsList', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photoList', component: PhotoList },
    { path: '/home/photoList/photoinfo:id', component: PhotoInfo },
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodslist/goodsinfo:id', component: GoodsInfo ,name:'goodsinfo'},
    { path: '/home/goodsdesc:id', component: GoodsDesc, name: 'goodsdesc' },
    { path: '/home/goodscomment:id', component: GoodsComment, name: 'goodscomment' },
    
    
    
  ],
  linkActiveClass: 'mui-active'
})

export default router
