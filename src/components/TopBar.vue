<template>
  <div class="top-bar">
    <div class="wrap">
      <div class="l">欢迎来到叩丁狼积分商城</div>
      <div class="r">
        <ul>
          <li @click="hdClick">
            <img width="26" :src="userInfo.headImg" alt="" />
            用户名：{{userInfo.nickName}}
          </li>
          <li>我的积分：{{userInfo.coin}}</li>
          <li>获取积分</li>
          <li>叩丁狼官网</li>
          <li v-show="!isLogined" class="login-btn" @click="showModal">登录</li>
          <li v-show="isLogined" class="cart-btn">
            <img src="../assets/img/cart.png" alt="" />
            <span>购物车</span>
            <b>{{cartTotal}}</b>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { WeixinLoginAPI, GetUserInfoAPI } from "@/request/api";
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  // 监听路由变化
  // watch:{
  //     "$route.path":{
  //         handler(newVal,oldVal){
  //             console.log(newVal,oldVal);

  //             // 判断有没有token
  //             let mytoken = localStorage.getItem("x-auth-token");
  //             // if(mytoken){
  //             //     this.chanIsLogined(true);
  //             // }else{
  //             //     this.chanIsLogined(false);
  //             // }
                // 更新用户的登录状态
  //             this.chanIsLogined(Boolean(mytoken))
  //         }
  //     }
  // },
  created() {
    // 重载执行了created
    setTimeout(async () => {
      // console.log(this.$route.query.code);
      let mycode = this.$route.query.code;
      if (mycode) {
        // 发起微信扫码登录请求
        let res = await WeixinLoginAPI({
          code: mycode,
        });
        console.log(res);

        if (res.code == 0) {
          // 登录成功的逻辑
          this.asyncChanIsShowToast({
            msg: "登录成功!",
            type: "success",
          });

          // 保存token到localStorage
          localStorage.setItem("x-auth-token", res["x-auth-token"]);
          // 登录状态的切换 (用户的头像,昵称,购物车按钮,数量等)
          this.chanIsLogined(true);

          // 清除浏览器上的code
          this.$router.push(this.$route.path);

          //!!! 登录成功也要获取用户信息
          this.asyncChanUserInfo()
        } else if (res.code == 400) {
          // code过期的逻辑:
          // 1 提示用户进行 请重新进行扫码登录
          this.asyncChanIsShowToast({
            msg: "请重新扫码登录!",
            type: "warning",
          });
          // 2 弹出登录框(打开登录的模态窗口)
          this.chanIsShowLoginModal(true);
        } else if (res.code == 407) {
          // 返回407说明: 用户扫码的这个微信, 在这个网站上没有绑定手机号
          // 我们需要: 让用户绑定手机到扫码的这个微信上
          // 1 弹出提示框, 提示用户, 手机号登录进行绑定微信号
          this.asyncChanIsShowToast({
            msg: "请进行手机号登录绑定扫码的微信!",
            type: "danger",
          });
          // 2 弹出登录框(打开登录的模态窗口)
          this.chanIsShowLoginModal(true);
          // 3 保存uuid(待会用户输入手机点击登录按钮的时候,发送登录请求需要携带uuid)
          localStorage.setItem("uuid", res.uuid);
        }
      } else {
        // 没有code的情况

        // 判断有没有token,来改变用户的登录状态
        let mytoken = localStorage.getItem("x-auth-token");
        // if(mytoken){
        //     this.chanIsLogined(true);
        // }else{
        //     this.chanIsLogined(false);
        // }
        this.chanIsLogined(Boolean(mytoken));

        if(mytoken){
            // 请求登录的用户的信息
            this.asyncChanUserInfo()
        
        }else{
            // 初始化用户信息
            // 修改vuex中的cartTotal和userInfo属性变回初始值
            this.initUserInfo()

        }
        

      }
    }, 100);
  },
  computed: {
    ...mapState({
      isLogined: (state) => state.loginStatus.isLogined,
      cartTotal: (state) => state.userInfo.cartTotal,
      userInfo: (state) => state.userInfo.userInfo

    }),
  },
  methods: {
    ...mapMutations({
      chanIsShowLoginModal: "showLoginModal/chanIsShowLoginModal",
      chanIsLogined: "loginStatus/chanIsLogined",
      initUserInfo:"userInfo/initUserInfo"
    }),
    ...mapActions({
      asyncChanIsShowToast: "toastStatus/asyncChanIsShowToast",
      asyncChanUserInfo:"userInfo/asyncChanUserInfo"

    }),
    showModal() {
      this.chanIsShowLoginModal(true);
    },
    hdClick() {
      // 封装函数或者组件的时候,要遵循, 调用方越简单越好
      this.asyncChanIsShowToast({
        msg: "登录成功!!!!",
        type: "success",
      });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.top-bar {
  height: 40px;
  background: #242b39;

  /*字体相关的样式*/
  font-size: 14px;
  font-family: SourceHanSansSC;
  font-weight: 300;
  color: #fffefe;
  line-height: 40px;
  .wrap {
    display: flex;
    height: 40px;
    /* background-color: skyblue; */
    justify-content: space-between;

    ul {
      display: flex;
      li {
        display: flex;
        align-items: center;
        margin-left: 20px;
        img {
          border-radius: 50%;
          margin-right: 5px;
        }

        /* & 表示 既是li又有login-btn这个类 */
        &.login-btn {
          width: 124px;
          height: 40px;
          background: #0a328e;
          justify-content: center;
          cursor: pointer;
        }
      }
    }
  }
}

.cart-btn {
  width: 124px;
  height: 40px;
  background: #0a328e;
  cursor: pointer;

  justify-content: center;
  b {
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    background: #fd604d;
    border-radius: 11px;
    margin-left: 6px;
  }
}
</style>