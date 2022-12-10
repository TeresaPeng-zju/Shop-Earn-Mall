<template>
    <div class="header wrap">
        <h1>
            <img src="../assets/img/indexLogo.6f8ac4f0.png" alt="">
        </h1>
        <div class="nav">
            <ul>    
                <li @click="$router.push('/home')" :class="$route.path==='/home'?'active':''">首页</li>                                                        
                <li @click="$router.push('/goods')" :class="$route.path==='/goods'?'active':''">全部商品</li>
                <li @click="$router.push('/user')" :class="$route.path==='/user'?'active':''">个人中心</li>
                <li @click="$router.push('/order')" :class="$route.path==='/order'?'active':''">我的订单</li>
                <li @click="$router.push('/free')" :class="$route.path==='/free'?'active':''">专属福利</li>
            </ul>
        </div>
        <div class="search">
            <input type="text" placeholder="请输入要搜索的商品">
            <span><img width="19" height="17" src="../assets/img/search.png" alt=""></span>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

 
        }
    }
}
</script>
 
<style lang = "less" scoped>
    .header{
        height: 118px;
        /* background-color: skyblue; */
        display: flex;
        justify-content: space-between;
        align-items: center;

        .nav ul{
            display: flex;
            width: 500px;
            justify-content: space-between;
            
            li{
                cursor: pointer;
            }
            li.active{
                color:#0A328E;
                font-weight: 700;
            }
        }
        
        .search{
            display: flex;
            input{
                width: 214px;
                height: 38px;
                border: 1px solid #DEDEDE;
                border-radius: 20px 0px 0px 20px;
                text-indent: 15px;
            }
            span{
                width: 50px;
                height: 40px;
                background: #0A328E;
                border-radius: 0px 20px 20px 0px;
                display:flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>