<template>
  <div>
    <comm :id="this.id"></comm>
  </div>
</template>


<script>
import comm from '../news/sub/comment.vue'


export default {
  data(){
    return{
      id:this.$route.params.id
    }
  },
  components: {
    comm
  }
}
</script>


<style lang="scss" scoped>
</style>
