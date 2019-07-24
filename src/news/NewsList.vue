<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media"  v-for="(item,i) in NewsList" :key="i">
        <router-link :to="'/home/newsinfo/'+item.id" >
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间:{{item.add_time|dateFormat}}</span>
              <span>点击了:{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import MintUI from 'mint-ui'
export default {
  data() {
    return {
      NewsList: []
    }
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$axios.get('/api/getnewslist').then((response) => {
        if (response.data.status === 0) {
          this.NewsList = response.data.message
        } else {
          Toast('获取新闻失败')
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
