// 这个文件,专门用来统一管理接口
import instance from "./request";
import qs from "qs"

// 发起精品推荐和热门商品请求
export const JingPinAPI = () => instance.get("/products/recommend");
export const HotAPI = () => instance.get("/products/hot");

// 发起发送验证码的请求
export const SendSMSAPI = (params) => instance.post("/sendSMS", qs.stringify(params));

// 发起手机号验证登录请求(含注册)
export const PhoneReginAPI = (params) => instance.post("/phoneRegin", qs.stringify(params));


// 发起微信扫码登录请求 
export const WeixinLoginAPI = (params) => instance.post("/wechatUsers/PCLogin", qs.stringify(params));

// 手机绑定微信的请求
export const BindPhoneAPI = (params) => instance.post("/wechatUsers/binding", qs.stringify(params));

// 请求用户信息

export const GetUserInfoAPI = () => instance.get("/shop/userProfiles");
// console.log(JSON.stringify({ aa: 10, bb: 20 }));
// console.log(qs.stringify({ aa: 10, bb: 20 }));
// aa=10&bb=20