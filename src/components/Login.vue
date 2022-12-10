<template>
  <div class="login-modal">
    <div class="mask" @click="close"></div>
    <div class="login-box">
      <span @click="close" class="close"
        ><img src="../assets/img/close.png" alt=""
      /></span>
      <ul class="title">
        <li :class="isShowForm ? 'active' : ''" @click="isShowForm = true">
          手机号码登录
        </li>
        <li class="shu">|</li>
        <li :class="!isShowForm ? 'active' : ''" @click="wxLoginClick">
          微信扫码登录
        </li>
      </ul>
      <div class="body">
        <div class="form" v-show="isShowForm">
          <div class="input-group">
            <input type="text" placeholder="请输入手机号" v-model="userPhone" />
          </div>
          <div class="input-group">
            <slide-verify
              :l="42"
              :r="20"
              :w="355"
              :h="140"
              @success="onSuccess"
              @fail="onFail"
              @refresh="onRefresh"
              :style="{ width: '100%' }"
              class="slide-box"
              ref="slideBlock"
              :slider-text="msg"
            ></slide-verify>
          </div>

          <div class="input-group">
            <input
              type="text"
              placeholder="请输入验证码"
              v-model="userSMSCode"
            />
            <div class="btn getSMSCode-btn">
              <span v-show="!isShowCount" @click="getSMSCode">获取验证码</span>
              <span v-show="isShowCount">{{ count }} s</span>
            </div>
          </div>
          <div class="btn" @click="toLogin">登录</div>
        </div>
        <div id="weixin" class="wx-qrcode" v-show="!isShowForm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { validatePhoneNumber } from "@/utils";
import { SendSMSAPI, PhoneReginAPI, BindPhoneAPI } from "@/request/api";
export default {
  data() {
    return {
      // 是否展示表单盒子
      isShowForm: true,
      // 滑块验证码文本
      msg: "向右滑动",
      //userPhone 用户输入的手机号
      userPhone: "15918796216",
      //userSMSCode 用户输入的短信验证码
      userSMSCode: "",
      // 是否展示倒计时数字的变量
      isShowCount: false,
      // 用来做倒计时的数字
      count: 60,
      // 倒计时数字的最大值
      maxCount: 60,
    };
  },
  methods: {
    ...mapMutations({
      chanIsShowLoginModal: "showLoginModal/chanIsShowLoginModal",
      chanIsLogined: "loginStatus/chanIsLogined",
    }),
    ...mapActions({
      asyncChanIsShowToast:"toastStatus/asyncChanIsShowToast",
      asyncChanUserInfo:"userInfo/asyncChanUserInfo"
    }),
    wxLoginClick(){
      // 当前样式的处理
      this.isShowForm = false;

      // 请求一个微信的二维码
      let _this = this;
      new WxLogin({
          id: "weixin",
          appid: "wx67cfaf9e3ad31a0d",  // 这个appid要填死
          scope: "snsapi_login",
          // 扫码成功后重定向的接口
          redirect_uri: "https://sc.wolfcode.cn/cms/wechatUsers/shop/PC",
          // state填写编码后的url
          state: encodeURIComponent(window.btoa("http://127.0.0.1:8080" + _this.$route.path)),
          // 调用样式文件
          href: "data:text/css;base64,Lyogd3hsb2dpbi5jc3MgKi8NCi5pbXBvd2VyQm94IC50aXRsZSwgLmltcG93ZXJCb3ggLmluZm97DQogIGRpc3BsYXk6IG5vbmU7DQp9DQo=",
      });
    },
    close() {
      this.chanIsShowLoginModal(false);
    },
    // 拼图成功
    onSuccess(times) {
      let ms = (times / 1000).toFixed(1);
      this.msg = "login success, 耗时 " + ms + "s";
    },
    // 拼图失败
    onFail() {
      this.onRefresh(); // 重新刷新拼图
    },
    // 拼图刷新
    onRefresh() {
      this.msg = "再试一次";
    },
    countDown() {
      // 倒计时的方法

      // 倒计时就是把count每一秒减1
      let timer = setInterval(() => {
        this.count--;

        // this.count 不要小于0 , 等于0的时候,就:
        // 1 关闭定时器  2 重新展示"获取验证码"的文字   3 这个数字要重新改成最大值
        if (this.count === 0) {
          clearInterval(timer);
          this.isShowCount = false;
          this.count = this.maxCount;
        }
      }, 1000);
    },
    verifyFn() {
      // 1 手机号码验证
      // 如果不通过手机号的验证,就return
      // /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      // 正则.test(用户输入的手机号)
      // if(!validatePhoneNumber(用户输入的手机号)){
      if (!validatePhoneNumber(this.userPhone)) {
        this.asyncChanIsShowToast({
            msg:"请输入正确的手机号!",
            type:"warning"
        });
        return false;
      }
      // 2 滑块验证码的验证
      // if (this.msg === "向右滑动" || this.msg === "再试一次") {
      
      //   this.asyncChanIsShowToast({
      //       msg:"请滑动拼图至正确位置!",
      //       type:"warning"
      //   });
      //   return false;
      // }

      return true;
    },
    async getSMSCode() {
      // 点击 获取验证码按钮的方法

      // 1 手机号码验证
      // 2 滑块验证码的验证
      // verifyFn() 方法内部返回false的时候,说明验证不过关,this.verifyFn()的结果就是false, 并且要在这里return
      if (!this.verifyFn()) return;

      // 3 请求发送验证码   倒计时
      /*
            SendSMSAPI({
                phone:this.userPhone.trim()
            }).then(res=>{
                if(res.code==0){
                    alert("发送短信成功");
                    // 展示倒计时的数字
                    this.isShowCount=true;
                    // 调用倒计时
                    this.countDown();
                }else{
                    // 提示用户,失败的原因是什么
                    alert(res.message);
                }
            }).catch(err=>{

            })
            
            */

      // 发起发送验证码的请求
      let res = await SendSMSAPI({
        phone: this.userPhone.trim(),
      });
      // if(res==false)return;
      if (!res) return;
      // 成功之后执行的代码
      console.log(res);
      // alert("发送短信成功");
      this.asyncChanIsShowToast({
          msg:"发送短信成功!",
          type:"success"
      });
      // 展示倒计时的数字
      this.isShowCount = true;
      // 调用倒计时
      this.countDown();

      // if(res.code==0){
      //     alert("发送短信成功");
      //     // 展示倒计时的数字
      //     this.isShowCount=true;
      //     // 调用倒计时
      //     this.countDown();
      // }else{
      //     // 提示用户,失败的原因是什么
      //     alert(res.message);
      // }
    },
    async toLogin() {
      // 点击登录按钮的方法
      // 1 手机号码验证
      // 2 滑块验证码的验证
      // verifyFn() 方法内部返回false的时候,说明验证不过关,this.verifyFn()的结果就是false, 并且要在这里return
      if (!this.verifyFn()) return;

      // 3 短信验证码不能为空
      if (!this.userSMSCode.trim()) {
        this.asyncChanIsShowToast({
            msg:"请输入正确的短信验证码!",
            type:"warning"
        });
        return;
      }

      let uuid = localStorage.getItem("uuid")
      let res = null;
      if(uuid){
          // 手机绑定微信的请求
          res = await BindPhoneAPI({
            phone: this.userPhone.trim(),
            verifyCode: this.userSMSCode.trim(),
            uuid
          })
      }else{
          // 发起登录请求 
          res = await PhoneReginAPI({
            phone: this.userPhone.trim(),
            verifyCode: this.userSMSCode.trim(),
          });
      }
      
      if (!res) return;
      console.log(res);
      // 登录成功的业务逻:
      // 1 提示用户登录成功
      this.asyncChanIsShowToast({
          msg:"登录成功!",
          type:"success"
      });
      
      // 2 关闭登录窗口
      this.close();
      // 3 保存token到localStorage
      localStorage.setItem("x-auth-token", res["x-auth-token"]);
      // 4 登录状态的切换 (用户的头像,昵称,购物车按钮,数量等)
      this.chanIsLogined(true);

      // 5 清除浏览器上的code, 清除localStorage中的uuid
      if(uuid){
        localStorage.removeItem("uuid")
        this.$router.push(this.$route.path)
      }

      //!!! 登录成功也要获取用户信息
      this.asyncChanUserInfo()

    },
  },
};
</script>
 
<style lang = "less" scoped>
.login-modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .login-box {
    width: 555px;
    height: 423px;
    background: url("../assets/img/login-box-bg.png");
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    .close {
      position: absolute;
      right: 60px;
      top: 15px;
      cursor: pointer;
    }

    .title {
      display: flex;
      justify-content: center;
      padding-top: 40px;
      font-size: 18px;
      color: #999;
      cursor: pointer;
      .shu {
        margin: -2px 10px 0;
        cursor: auto;
      }
      .active {
        color: #000;
      }
    }
    .body {
      width: 355px;
      margin: 0 auto;
      padding-top: 30px;

      .form {
        .input-group {
          display: flex;
          margin-bottom: 20px;
          input {
            flex: 1;
            border: 1px solid #e4e7eb;
            text-indent: 10px;
            height: 48px;
          }
          .btn {
            margin-left: 10px;
            padding: 0 10px;
          }
        }
        .btn {
          height: 50px;
          line-height: 50px;
          background-color: #0a328e;
          text-align: center;
          cursor: pointer;
          color: #fff;
        }
      }
    }
  }
}

.getSMSCode-btn {
  width: 80px;
}

/deep/.slide-box {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  canvas {
    position: absolute;
    left: 0;
    top: -120px;
    display: none;
    width: 100%;
    box-sizing: border-box;
  }
  .slide-verify-block {
    width: 85px;
    height: 136px;
  }
  .slide-verify-refresh-icon {
    top: -120px;
    display: none;
  }
  &:hover {
    canvas {
      display: block;
    }
    .slide-verify-refresh-icon {
      display: block;
    }
  }

  .slide-verify-slider {
    box-sizing: border-box;
    margin-top: 0;
  }
}

.wx-qrcode{
  display:flex;
  justify-content: center;
  margin-top: -10px;
}
</style>