<template>
  <div class="goodsdesc-container">
    <h3>{{info.title}}</h3>

    <hr>

    <div class="content" v-html="info.content">

    </div>
  </div>
</template>


<script>
export default {
  data(){
    return{
      info:[]
    }
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc(){
      this.$axios.get('/api/goods/getdesc/'+this.$route.params.id).then((response)=>{
        if(response.data.status === 0){
          this.info = response.data.message[0]
        }
      })
    }
  },
}
</script>


<style lang="scss">
.goodsdesc-container{

  h3{
    font-size: 16px;
    color: #226aff;
     text-align: center;
     margin: 10px;
  }
  .content{
    img{
      width: 100%;
    }
  }
}
</style>
