<template>
    <div>
        <!--轮播图mint-ui 开始-->
        <Swipe :list="swipeList" :isFull="true"></Swipe>
        <!--轮播图 结束-->
        <!--商品导航 开始-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li
                    class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
                    v-for="item in navList"
                    :key="item.key"
            >
                <router-link :to="item.url">
                    <img :src="item.img" alt="图标">
                    <div class="mui-media-body">{{item.title}}</div>
                </router-link>
            </li>
        </ul>
        <!--商品导航 结束-->
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    // 引入轮播组件
    import Swipe from '../subcomponents/Swipe.vue';
    export default {
        data: function(){
            return {
                swipeList: [],
                navList: [],
            }
        },
        created(){
            this.getSwipe();
        },
        methods: {
            getSwipe(){
                // 获取轮播图数据的方法
                this.$http.get('api/swipe')
                    .then( result => {
                        if(result.ok){
                            this.swipeList = result.body.swipeList;
                        }
                    })
                    .catch(err => {
                        if(err){
                            Toast({
                                message: '轮播数据请求失败！',
                                position: 'middle',
                                duration: 2000
                            })
                        }
                    });
                // 获取导航菜单数据的方法
                this.$http.get('api/nav')
                    .then( result => {
                        if(result.ok){
                            this.navList = result.body.navList;
                        }
                    })
                    .catch(err => {
                        if(err){
                            Toast({
                                message: '菜单数据请求失败！',
                                position: 'middle',
                                duration: 2000
                            })
                        }
                    })
            }
        },
        components: {
            Swipe
        }
    }
</script>

<style scoped lang="scss">

    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        .mui-table-view-cell{
            border: none;
            img{
                width: 60px;
                height: 60px;
            }
            .mui-media-body{
                font-size: 14px;
            }
        }
    }

</style>