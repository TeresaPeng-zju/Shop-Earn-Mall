export default {
    namespaced: true,
    state: {
        // isShowToast 来控制提示框的显示和隐藏
        isShowToast: false,
        // 提示文本
        msg:"",
        // 提示的图标
        // type的值为 success的时候表示成功
        // type的值为 warning的时候表示警告
        // type的值为 danger的时候表示失败
        type:""
    },
    getters: {
    },
    mutations: {
        chanIsShowToast(state, payload) {
            state.isShowToast = payload.isShow
            state.msg = payload.msg
            state.type = payload.type
        }
    },
    actions: {
        asyncChanIsShowToast({commit},payload){

            // 开启
            commit("chanIsShowToast", {
                isShow: true,
                msg: payload.msg,
                type: payload.type
            })

            // 关闭
            setTimeout(() => {
                commit("chanIsShowToast", {
                    isShow: false,
                    msg: payload.msg,
                    type: payload.type
                })
            }, 2000)
        }

    },
}

/*
封装Toast提示组件:
结构样式
显示和隐藏的变量放在Vuex中(isShowToast)
过渡效果(transition过渡组件 name属性,类)
msg和type 控制每一次调用时候文本和图标
定时器隐藏Toast组件
把定时器抽取到actions的方法中
两种调用Toast组件的方式 
    组件内部
        this.asyncChanIsShowToast({
            msg:"发送短信成功!",
            type:"success"
        });
    js文件中:
        import store from "@/store"
        store.dispatch("toastStatus/asyncChanIsShowToast", {
            msg: res_data.message,
            type: "danger"
        })
*/