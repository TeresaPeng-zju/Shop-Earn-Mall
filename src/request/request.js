// 书写请求拦截器 和 响应拦截器
import axios from "axios";
import store from "@/store"


// 创建axios实例  (instance)
const instance = axios.create({
    baseURL:"http://kumanxuan1.f3322.net:8881/cms",
    timeout:5000
})

// 请求拦截器
instance.interceptors.request.use(config=>{
    // 什么时候执行这个函数?   发送请求之前
    // config是什么?  记录了本地请求的相关信息的一个对象
    // 这个函数能用来做什么?  做一些请求之前的操作(例如:添加请求头,例如token)

    let token = localStorage.getItem("x-auth-token")
    if (token){
        config.headers["x-auth-token"] = token
    }
 
    // console.log("执行了 请求拦截器的代码", config);
    return config
},err=>{
    return Promise.reject(err)
});


// 响应拦截器
instance.interceptors.response.use(res => {
    // 什么时候执行这个函数?   在接收到后端服务器的响应之后,进入到组件内部的then方法之前执行这里的代码
    // res是什么?     res是axios封装好的一个响应对象
    // res.data就是后端服务器返回给我们的数据
    // 这个函数能用来做什么?   做一些数据的统一处理

    // 统一处理响应码不为0的情况
    let res_data = res.data
    let arr = [0,400,407];
    // res_data.code != 0 && res_data.code != 400 && res_data.code != 407 说明res_data.code 不能在arr里面
    if (!arr.includes(res_data.code)){   // 不为0说明业务失败
        // 提示用户, 操作失败
        // alert(res_data.message);
        store.dispatch("toastStatus/asyncChanIsShowToast", {
            msg: res_data.message,
            type: "danger"
        })
        return false
    }

    
    // console.log("执行了 响应拦截器 的代码", res);
    return res_data  // return 后面的这个值被组件中的请求的then方法的res接收
}, err => {
    // 相当于在组件中,发送请求之后的catch方法
    // console.log(err);
    store.dispatch("toastStatus/asyncChanIsShowToast", {
        msg: err,
        type: "danger"
    })
    // 直接抛出异常, 看见红色警告
    return Promise.reject(err)
});



export default instance