<template>
  <div id="app">
    
    <TopBar :key="topKeyValue"></TopBar>
    <Header></Header>
    <router-view />
    <Footer></Footer>
    <!-- 登录模态窗口 -->
    <Login v-show="isShowLoginModal"></Login>
    
    <!-- 提示组件 -->
    <transition name="fade">
      <Toast v-show="isShowToast"></Toast>
    </transition>
   
  </div>
</template>
<script>

import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import TopBar from "@/components/TopBar.vue";
import Login from "@/components/Login.vue";
import Toast from "@/components/Toast.vue";
import { mapState } from "vuex";
export default {
  data(){
    return{
      topKeyValue:1
    }
  },
  watch:{
    "$route.path":{
      handler(newVal,oldVal){
        console.log(newVal,oldVal);
        // 我们利用key属性的特点, key的值一变化,组件就会发生重载
        this.topKeyValue++

      }
    }
  },
  components: {
    TopBar,
    Header,
    Footer,
    Login,
    Toast,
  },
  computed: {
    ...mapState({
      isShowLoginModal: (state) => state.showLoginModal.isShowLoginModal,
      isShowToast: (state) => state.toastStatus.isShowToast,
    }),
  },
  async created() {
    /*
      axios.get("http://kumanxuan1.f3322.net:8881/cms/products/recommend").then(res=>{
        console.log(res)
      })
      上面这样写有弊端:
        1 不便于接口管理
        2 请求头写哪里?
        3 容易出现回调地狱


        await 后面一般加promise对象

        function XxxAPI(){
          return new Promise((resolve,reject)=>{

            resolve(xxx)
          })
        }

        let res = await XxxAPI()
        xxxxxx

      */

  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// 进场时候的开始状态   同时也是 离场的结束状态
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// 设置指定要过渡的属性
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

// 进场时候的结束状态
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
