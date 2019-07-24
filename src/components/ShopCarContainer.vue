<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner" v-for="(item,i) in goodslist" :key="item.id">
            <mt-switch
              v-model="$store.getters.getSelected[item.id]"
              @change="selectChanged(item.id,$store.getters.getSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path"  @click="getGoodsinfo(item.id)">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
                <!--id是删除store中的数据，i是索引，删除goodslist中的  -->
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{$store.getters.getGoodsCarPrice.count}}</span> 件，总价￥
              <span class="red">{{$store.getters.getGoodsCarPrice.amount}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
    <p>{{$store.getters.getSelected}},</p>
  </div>
</template>


<script>
import { Switch } from 'mint-ui'
import numbox from '../goodslist/shopcar_numberbox.vue'

export default {
  data() {
    return {
      goodslist: [],
      idArr: [],
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      // 获取store中的所以商品id
      this.$store.state.car.forEach(item => this.idArr.push(item.id))
      // 购物车中没有商品的直接返回
      if (this.idArr.length <= 0) {
        return;
      }
      this.$axios.get('/api/goods/getshopcarlist/' + this.idArr.join(',')).then((response) => {
        if (response.data.status === 0) {
          this.goodslist = response.data.message
        }
      })
    },
    remove(id, index) {
      // 根据传递的id删除
      this.goodslist.splice(index, 1)
      this.$store.commit('removeGoodsInfo', id)

    },
    selectChanged(gid,val) {
        this.$store.commit('updateGoodsSelect',{
        id:gid,
        select:val
      })
    },
    getGoodsinfo(id){
      this.$router.push({ name: "goodsinfo", params: { id } })
    }
  },
  components: {
    numbox
  }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;

  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    img {
      height: 60px;
      width: 60px;
    }
    h1 {
      font-size: 14px;
    }
    .info {
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
    }
  }
}
</style>

