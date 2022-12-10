<template>
    <div class="toast">
        <!--
            // type的值为 success的时候表示成功
            // type的值为 warning的时候表示警告
            // type的值为 danger的时候表示失败

            type==='danger' iconfont icon-toast-shibai_huaban 表示失败
            type==='warning'  iconfont icon-toast-jinggao 表示警告
            其他情况   iconfont icon-toast_chenggong
        -->


        <!-- <i :class="type==='danger'? 'iconfont icon-toast-shibai_huaban':
            (type==='warning'? 'iconfont icon-toast-jinggao':'iconfont icon-toast_chenggong')
        "></i> -->
       <i class="iconfont" :class="type==='danger'? 'icon-toast-shibai_huaban':
            (type==='warning'? 'icon-toast-jinggao':'icon-toast_chenggong')"></i>
        <span>{{msg}}</span>
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    data () {
        return {

 
        }
    },
    computed:{
        ...mapState({
            msg:state=>state.toastStatus.msg,
            type:state=>state.toastStatus.type,
        })
    }
}
</script>
 
<style lang = "less" scoped>
    .toast{
        position: fixed;
        left:50%;
        top:0px;
        transform: translate(-50%,0);
        background-color: #fff;
        border-radius: 10px;
        padding: 10px 20px;
        font-size: 18px;
        box-shadow: 0 0 10px #fff;
        i{
            margin-right: 10px;
            font-size: 20px;
        }
    }

    .icon-toast_chenggong{
        color:green;
    }

    .icon-toast-jinggao{
        color:gold;
    }
    .icon-toast-shibai_huaban{
        color:red;
    }
</style>