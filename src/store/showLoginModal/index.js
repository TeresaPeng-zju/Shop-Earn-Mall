export default{
    namespaced:true,
    state: {
        // 这个变量来控制模态窗口的显示和隐藏
        isShowLoginModal:false
    },
    getters: {
    },
    mutations: {
        chanIsShowLoginModal(state, payload){
            state.isShowLoginModal = payload
        }
    },
    actions: {
    },
}