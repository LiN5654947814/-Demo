<template>
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="numbox"
    >
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'

export default {


  mounted() {
    mui(".mui-numbox").numbox()
    this.countChanged()
  },
  methods: {
    countChanged() {
      // 文本框变化就调用
      this.$emit('getCount', parseInt(this.$refs.numbox.value))
    }
  },
  props: ['max'],
  watch: {
    'max': function (newVal, oldVal) {
      mui(".mui-numbox").numbox().setOption('max', newVal)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
