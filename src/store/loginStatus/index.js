export default {
    namespaced: true,
    state: {
        // 这个变量来表示用户登录状态
        isLogined: false
    },
    getters: {
    },
    mutations: {
        chanIsLogined(state, payload) {
            state.isLogined = payload
        }
    },
    actions: {
    },
}