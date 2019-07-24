<template>
  <div>

    <swiper :lunboList="lunboList" :isfull="true"></swiper>

<!-- 六宫格 -->
<ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newsList">
		                    <img src="../img/menu1(1).png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoList">
		                    <img src="../img/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <img src="../img/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../img/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../img/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../img/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 


  </div>
</template>

<script>
import MintUI from 'mint-ui'
import swiper from '../news/sub/swipe.vue'

export default{
  data(){
    return {
      lunboList:[]
    }
  },
  created(){
    this.getLunBo();
  },
  methods:{
    getLunBo(){
      this.$axios.get("/api/getlunbo").then((response)=>{
        if(response.data.status === 0){
          this.lunboList = response.data.message
          console.log('加载轮播图成功')
        }else{
          Toast('加载轮播图失败')
        }
      })
    }
  },
  components:{
    swiper
  }
}

</script>

<style lang="scss" scoped>
// .mint-swipe {
//   height: 200px;
// }
// .mint-swipe .mint-swipe-item:nth-child(1){
//   background-color: pink;
// }
// .mint-swipe .mint-swipe-item:nth-child(2){
//   background-color: skyblue;
// }
// .mint-swipe .mint-swipe-item:nth-child(3){
//   background-color: lightgreen;
// }
.mint-swipe{
  height: 200px;
  .mint-swipe-item{
    img{
      width: 100%;
      height: 100%;
    }
  }
}

.mui-grid-view.mui-grid-9{
  background-color: #fff;
  img{
    width: 45px;
    height: 45px;
  }
  .mui-media-body{
    font-size: 12px;
  }
}

</style>