<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="sutitle">
      <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
      <span>点击次数：{{photoinfo.click}}</span>
    </p>
    <hr>
    <!-- 缩略图 -->
    <viewer :images="list" style="text-align:center;">
      <img v-for="(item,i) in list " :src="item.src" :key="i" width="90%">

    </viewer>



    <div class="content" v-html="photoinfo.content"></div>

    <!-- 评论子组件 -->
    <comm :id="this.id"></comm>
  </div>
</template>

<script>
//导入评论组件
import comm from '../news/sub/comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      // 缩略图
      list:[]
    }
  },
  created() {
    this.getPhotoInfo()
    this.getThumbs()
    console.log(this.list)
  },
  methods: {
    getPhotoInfo() {
      this.$axios.get('/api/getimageInfo/' + this.id).then((response) => {
        if (response.data.status == 0) {
          this.photoinfo = response.data.message[0]
        }
      })
    },
    getThumbs(){
      this.$axios.get('/api/getthumimages/'+this.id).then((response)=>{
        if(response.data.status === 0){
          response.data.message.forEach(item=>{
            item.w  = 600
            item.h = 400
          })
          this.list = response.data.message
        }
      })
    }
  },
  components: {
    'comm': comm
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .sutitle {
    display: flex;
    font-size: 13px;
    justify-content: space-between;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>

