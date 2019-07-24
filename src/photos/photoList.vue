<template>
  <div>
    <!-- 滚动条 -->
    <div id="slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div
          class="mui-scroll"
          style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;"
        >
          <a
            :class="['mui-control-item',item.id==0 ? 'mui-active':'']"
            v-for="item in cates"
            :key="item.id"
            @click="getCatePhoto(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <ul class="photo-list">
      <router-link :to="'/home/photoList/photoinfo'+item.id" v-for="item in photolist" :key="item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h3 class="info-title">{{item.title}}</h3>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link >
    </ul>
  </div>
</template>


<script>
import mui from '../lib/mui/js/mui.js'
import { Toast } from "mint-ui";
// mui('.mui-scroll-wrapper').scroll({
//   deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
// });


export default {
  data() {
    return {
      cates: [],
      photolist: [],
    }
  },
  created() {
    this.getAllCategory();
    this.getCatePhoto(0);
  },
  mounted() {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005
    });
  },
  methods: {
    // 得到图片分类
    getAllCategory() {
      this.$axios.get('/api/getimgcategory').then((response) => {
        if (response.data.status === 0) {
          response.data.message.unshift({ title: '全部', id: 0 })
          this.cates = response.data.message
        } else {
          Toast('获取图片失败')
        }
      })
    },
    getCatePhoto(cateId) {
      this.$axios.get('/api/getimages/' + cateId).then((response) => {
        if (response.data.status == 0) {
          this.photolist = response.data.message
        }
      })
    }
  },
}



</script>


<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list{
  list-style: none;
  padding: 0;
  margin: 0;
  padding:10px;
  padding-bottom: 0;
  li{
    background-color: #ccc;
    text-align: center;
    margin-bottom: 5px;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"]{
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info{
      position: absolute;
      bottom: 0;
      color:white;
      text-align: left;
      background-color: rgba(0,0,0,0.4);
      max-height: 84px;
      .info-title{
        font-size: 14px;
      }
      .info-body{
        font-size: 13px;
      }
    }
  }
}
</style>
