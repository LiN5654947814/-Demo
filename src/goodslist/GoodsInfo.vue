<template>
  <div>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <div class="mui-content">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <swiper :lunboList="lunboList" :isfull="false"></swiper>
          </div>
        </div>
      </div>
      <div class="mui-card">
        <div class="mui-card-header">{{goodsinfo.title}}</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p class="price">
              市场价：
              <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：
              <span class="now_price">￥{{goodsinfo.sell_price}}</span>
            </p>
            <p class="number">
              购买数量：
              <numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
            </p>
            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            </p>
          </div>
        </div>
      </div>
      <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>商品货号：{{goodsinfo.goods_no}}</p>
            <p>库存情况：{{goodsinfo.stock_quantity}}</p>
            <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
          </div>
        </div>
        <div class="mui-card-footer">
          <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from '../news/sub/swipe.vue'
import numbox from '../news/sub/goodInfo_numbox.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunboList: [],
      goodsinfo: {},
      ballFlag: false,
      selectedCount: 0,//保存用户选择商品
    }
  },
  created() {
    this.getLunbo(),
      this.getGoodsInfo()
  },
  methods: {
    getLunbo() {
      this.$axios.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then((response) => {
        if (response.data.status === 0) {
          // 轮播图里面的图片SRC是img，因此要追加一个img属性
          response.data.message.forEach(item => {
            item.img = item.src
          });
          this.lunboList = response.data.message
        }
      })
    },
    getGoodsInfo() {
      this.$axios.get('/api/goods/getinfo/' + this.id).then((response) => {
        if (response.data.status === 0) {
          this.goodsinfo = response.data.message[0];
        }
      })
    },
    goDesc(id) {
      this.$router.push({ name: 'goodsdesc', params: { id: this.id } })
    },
    goComment(id) {
      this.$router.push({ name: 'goodscomment', params: { id: this.id } })
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        select: true
      }
      // 调用Vuex store中的加入购物车方法
      this.$store.commit('addToCar', goodsinfo)

    },
    beforeEnter(el) {
      el.style.transform = 'translate(0,0)'

    },
    enter(el, done) {
      el.offsetWidth
      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      // 获取徽标在页面中的位置
      const badgePosition = document.getElementById('badge').getBoundingClientRect()

      const xDist = badgePosition.left - ballPosition.left

      const yDist = badgePosition.top - ballPosition.top


      el.offsetWidth
      el.style.transform = `translate(${xDist}px,${yDist}px)`
      el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)'
      done()
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount(count) {
      // 当子组件把选中的数量传递给父组件时候，把选中的值保存到data上
      this.selectedCount = count;
      console.log('父组件拿到的值-----' + this.selectedCount)
    }

  },
  components: {
    swiper,
    numbox
  }
}
</script>


<style lang="scss" scoped>
.now_price {
  color: red;
  font-weight: bold;
}

.mui-card-footer {
  display: block;
  button {
    margin: 10px 0;
  }
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 99;
  left: 146px;
  top: 390px;
}
</style>
