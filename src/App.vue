<template>
    <div class="container">
        <!--顶部Header 开始-->
        <mt-header fixed title="爱买不买商店">
            <!--这里的返回按钮在首页应该隐藏，在非首页才显示，可以直接用v-show="$route.path !== '/home'"-->
            <!--也可以使用watch监听路由改变-->
            <span @click="goBack" slot="left" v-show="display">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>
        <!--顶部Header 结束-->
        <!--中间主体Main展示区 根据路由展示不同内容 开始-->
        <transition name="main">
            <router-view></router-view>
        </transition>
        <!--中间主体Main展示区 根据路由展示不同内容 开始-->
        <!--底部Tab-bar 开始-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-bug" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-bug" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-bug" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge mui-badge-shop-car">{{this.$store.getters.calcGoodsCount}}</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-bug" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
        <!--底部Tab-bar 结束-->
    </div>
</template>
<script>

    export default {
        data(){
            return {
                shopCarCount: 0,
                display: true
            }
        },
        created(){
            // 这是防止刚进入页面时，首页也是显示的bug
            if(this.$route.path === '/home'){
                this.display = false
            } else{
                this.display = true
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            }
        },
        watch: {
            "$route.path": function(newVal){
                if(newVal === '/home'){
                    this.display = false
                } else{
                    this.display = true
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    *{
        /*去除顶部滑块的报错*/
        touch-action: pan-y;
    }
    .container{
        overflow-x: hidden;
        padding-top: 40px;
        padding-bottom: 50px;
        background-color: #fff;
    }
    .main-enter{
        opacity: 0;
        transform: translateX(100%)
    }
    .main-leave-to{
        opacity: 0;
        transform: translateX(-100%)
    }
    .main-enter-active,
    .main-leave-active{
        transition: all .6s linear;
    }
    .main-move{
        transition: all .6s linear;
    }
    .main-leave-active{
        position: absolute;
    }
    /*解决mui引用js导致的tabbar无法点击 .mui-tab-item-bug这个类导致的*/
    .mui-bar-tab .mui-tab-item-bug.mui-active {
        color: #007aff;
    }
    .mui-bar-tab .mui-tab-item-bug {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }
    .mui-bar-tab .mui-tab-item-bug .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item-bug .mui-icon ~ .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .mint-header{
        z-index: 1;
    }
</style>