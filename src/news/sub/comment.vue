<template>
  <div>
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入120个字" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postMsg">发表评论</mt-button>

    <div class="cmt-list" v-for="(item,i) in commentlist" :key="i">
      <div class="cmt-item">
        <div
          class="cmt-title"
        >第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{ item.add_time|dateFormat}}</div>
        <div class="cmt-body">{{item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      commentlist: [],
      pageindex: 1,
      msg: ''
    }
  },
  created() {
    this.getCommentList();
  },
  methods: {
    getCommentList() {
      this.$axios.get('/api/getcomments/' + this.id + '?pageindex=' + this.pageindex)
        .then((response) => {
          if (response.data.status === 0) {
            // 
            this.commentlist = this.commentlist.concat(response.data.message)
          } else {
            Toast('获取评论失败')
          }
        })
    },
    getMore() {
      this.pageindex++;
      this.getCommentList()
    },
    postMsg() {
      if (this.msg.trim().length === 0) {
        return Toast('评论不能为空');
      }
      // 第二个参数是交给服务器的数据对象
      this.$axios.post('/api/postcomment/' + this.id, {
        content: this.msg.trim()
      }).then((response) => {
        if (response.data.status === 0) {
          Toast('发表成功')
          let cmt = {
            user_name: '匿名用户',
            add_time: Date.now(),
            content: this.msg.trim()
          }
          this.commentlist.unshift(cmt)
          this.msg = ''
        }
      }).catch((err) => {
        console.log(err)
      })
      this.getCommentList()
    }

  },
  props: ['id'],
}
</script>



<style lang="scss" scoped>
.cmt-list {
  margin-top: 10px;
  .cmt-item {
    font-size: 13px;
    .cmt-title {
      line-height: 30px;
      background-color: #ccc;
    }
    .cmt-body {
      line-height: 30px;
      text-indent: 2em;
    }
  }
}
</style>
