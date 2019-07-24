import Vue from '../node_modules/vue/dist/vue.js'
import app from './app.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import VueRouter from 'vue-router'
//导入做自己的router模块
import router from './router.js'
// 缩略图
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import Vuex from 'vuex'
Vue.use(Vuex)

// 实现购物车持久化
let car = JSON.parse(localStorage.getItem('car') || '[]')

const store = new Vuex.Store({
  state: {
    car: car //购物车中商品的数据用数组存储起来
  },
  mutations: {
    addToCar(state, goodsinfo) {
      // 点击加入购物车吧商品信息保存到storecar上
      let flag = false
      // 要是购物车中已存在的商品，则数量+1
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      if (!flag) {
        state.car.push(goodsinfo)
      }
      //当更新car后，放到localStorage
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 购物车中的信息更新到store中
    updateGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
        }
      })
      // 当修改好的数据保存到本地
      localStorage.setItem('car', JSON.stringify(state.car))
    },
   //更新商品的勾选状态
    updateGoodsSelect(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.select = info.select
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeGoodsInfo(state, id) {
      // 根据id 从store购物车中删除
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    // 得到购物车中的数量
    getAllCount(state) {
      let c = 0
      state.car.forEach(item => {
        c += parseInt(item.count)
      })
      return c
    },
    getGoodsCount(state) {
      let o = {}
      state.car.forEach(item => {
        // 以键值循环一个新的数组 [ id:count]
        o[item.id] = item.count
      })
      return o
    },
    getSelected(state) {
      let s = {}
      state.car.forEach(item => {
        s[item.id] = item.select
      })
      return s
    },
    // 计算总价
    getGoodsCarPrice(state) {
      let p = {
        count: 0, //勾选的数量
        amount: 0 //勾选的总价
      }
      state.car.forEach(item => {
        if (item.select == true) {
          p.count += item.count
          p.amount += item.count * item.price
        }
      })
      return p
    }
  }
})


import axios from 'axios'
Vue.prototype.$axios =  axios.create({
  baseURL: 'http://www.liulongbin.top:3005',
  timeout: 1000,
});
Vue.use(MintUI)
Vue.use(VueRouter)
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    toolbar: false,
    navbar: false
  }
})

// 导入是时间插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})


let vm = new Vue({
  el: '#app',
  render: h => h(app),
  router,
  store
})
