import { GetUserInfoAPI} from "@/request/api"
export default {
    namespaced: true,
    state: {
        // 购物车数量
        cartTotal: 0,
        userInfo:{
            // 用户昵称
            nickName: '游客!',
            // 头像链接
            headImg: require("../../assets/img/userImg.f8bbec5e.png"),
            // 积分
            coin:"--"
        }
    },
    getters: {
    },
    mutations: {
       chanUserInfo(state,payload){
            state.cartTotal = payload.cartTotal;
            state.userInfo = payload.userInfo;
       },
       initUserInfo(state){

            state.cartTotal = 0;
            state.userInfo={
                // 用户昵称
                nickName: '游客!',
                // 头像链接
                headImg: require("../../assets/img/userImg.f8bbec5e.png"),
                // 积分
                coin:"--"
            }
       }
    },
    actions: {
        async asyncChanUserInfo({commit}){
            // 做请求登录用户的信息
            let res = await GetUserInfoAPI()
            console.log("用户信息：", res);    

            // commit("chanUserInfo",{
            //     cartTotal: res.data.cartTotal,
            //     userInfo: res.data.userInfo,
            // })
            commit("chanUserInfo", res.data)

        }
    },
}