<template>
  <div class="mui-numbox" data-numbox-min="1" style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      @change="countChanged"
      ref="numbox"
      style="wdith:25px"
      readonly
    >
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../lib/mui/js/mui.js'

export default {
  data(){
    return{
    }
  },


  mounted() {
    mui(".mui-numbox").numbox()
    this.countChanged()
  },
  methods: {
    countChanged() {
      // 覆盖之前购物车中某商品的信息
      this.$store.commit('updateGoodsInfo',{
        id:this.goodsId,
        count:this.$refs.numbox.value,
      })
    }
  },
  props:['initcount','goodsId']

}
</script>


<style lang="scss" scoped>
</style>
