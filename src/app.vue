<template>
  <div class="app-container">
    <!-- 顶部Header区域 -->
    <mt-header fixed title="新日暮里" style="font-size:20px;">
      <span slot="left" @click="goBack">
        <mt-button icon="back" v-show="flag">返回</mt-button>
      </span>
    </mt-header>

    <!-- 中间路由router-view -->

    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部table区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item1">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/member" class="mui-tab-item1">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link to="/car" class="mui-tab-item1">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="search" class="mui-tab-item1">
        <span class="mui-icon mui-icon-gear"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>

export default {
  data() {
    return {
      flag: false
    }
  },
  created() {
    this.flag = this.$route.path === '/home'?false:true
  },
  methods: {
    goBack() {

      this.$router.go(-1)
    }
  },
  // 监听url
  watch: {
    '$route.path': function (newVal) {
      if (newVal === '/home') {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  }
}

</script>


<style scoped>
.app-container {
  margin-top: 40px;
  padding-bottom: 100px;
  /* 切换时 下一个组件会加入到当前页面，要去掉X轴上的溢出内容，保持下方的导航 */
  overflow-x: hidden;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

.v-leave-active {
  position: absolute;
}

.mui-bar-tab .mui-tab-item1.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item1 {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item1 .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item1 .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>