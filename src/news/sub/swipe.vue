<template>
  <div>
    <!-- 谁使用此轮播组件，就传值lunboList -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,i) in lunboList" :key="i">
        <img :src="item.img"  :class="{'full':isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>


<script>
export default {
  // 组件传值
  props:['lunboList',"isfull"]

}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 170px;
  .mint-swipe-item {
    text-align: center;
    img {
      height: 100%;
    }
  }
}
.full{
  width: 100%;
}
</style>
