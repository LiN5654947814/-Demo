<template>
  <div class="newsInfo">
    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
      <span>点击了：{{newsinfo.click}}次</span>
    </p>
    <hr>
    <div class="content" v-html="newsinfo.content"></div>

    <comm :id="this.id"></comm>
  </div>
</template>

<script>
// 导入子组件
import comm from './sub/comment.vue'
import MintUI from 'mint-ui'
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: []
    }
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$axios.get('/api/getnew/' + this.id).then((response) => {
        if (response.data.status === 0) {
          this.newsinfo = response.data.message[0]
        } else {
          Toast('获取新闻失败')
        }
      })
    }
  },
  // 注册子组件
  components:{
    'comm':comm
  }

}
</script>


<style lang="scss" scoped>
.newsInfo {
  padding: 5px;
  .title {
    font-size: 16px;
    color: red;
    text-align: center;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
}
</style>
