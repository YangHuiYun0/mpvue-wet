<template>
  <div>
    <wxs module="filter" src="../../filters/filters.wxs"></wxs>
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

      <div class="userinfo-nickname">
        <common-guide :text="userInfo.nickName"></common-guide>
      </div>
    </div>
    <div class="test-sass">
      <div class="test-cel">
        <div>{{ filter.phoneMask('15606902472') }} 模拟过滤器效果 添加掩码</div>
      </div>
      <div class="test-cel"><van-button type="info" @click="handleClick">Toast提示</van-button></div>
      <div class="test-cel"><van-button type="primary" @click="handleLoadingClick">Loading提示</van-button></div>
      <div class="test-cel">
        <van-button type="primary" @click="bindViewTap('push')">非底部导航页的跳转$router.push</van-button>
      </div>
      <div class="test-cel">
        <van-button type="primary" @click="bindViewTap('replace')">底部导航页的跳转需配置isTab</van-button>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <common-guide :text="motto"></common-guide>
      </div>
    </div>

    <child-component></child-component>

    <div class="counter-warp">
      <p>Vuex使用：{{ vuexUserInfo.count }}</p>
      <p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
      </p>
    </div>

  </div>
</template>

<script>
import commonGuide from '@/components/commonGuide'
import childComponent from './components/childComponent'
import { Login } from '@/api/service'

export default {
  data () {
    return {
      motto: '公共组件使用范例',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },
  components: {
    commonGuide,
    childComponent
  },
  computed: {
    vuexUserInfo () {
      return this.$store.state.user
    }
  },
  methods: {
    increment () {
      let result = this.vuexUserInfo.count + 1
      this.$store.commit('user/setData', {storeKey: 'count', storeValue: result})
    },
    decrement () {
      let result = this.vuexUserInfo.count - 1
      this.$store.commit('user/setData', {storeKey: 'count', storeValue: result})
    },
    handleClick () {
      global.Toast('测试长度，测试长度，测试长度，测试长度，测试长度，测试长度，测试长度，测试长度，测试长度')
    },
    handleLoadingClick () {
      global.showLoading()
      setTimeout(() => {
        global.showLoading(false)
      }, 2000)
    },
    bindViewTap (type) {
      if (type === 'push') {
        // 非底部导航页的跳转
        // this.$router.push('/pages/test/main') // 不带参
        this.$router.push({ path: '/pages/test/main', query: { id: 1 } }) // 带参
      } else {
        // 底部导航页面的跳转
        this.$router.push({path: '/pages/logs/main', isTab: true})
      }
    }
  },

  created () {
    Login.AccountLogin().then(res => {

    })
    // let app = getApp()
  }
}
</script>

<style scoped lang="scss">
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.test-sass{}

.test-cel{
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 10rpx 0;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 30rpx;
}
.counter-warp {
  text-align: center;
  margin-top: 30rpx;
}
</style>
