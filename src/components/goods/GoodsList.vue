<template>
    <div class="goods-list">
        <transition-group name="fade" tag="div" class="goods-list-container">
            <div
                    class="goods-item"
                    v-for="item in goodsList"
                    :key="item.id"
                    @click="goDetail(item.id)"
            >
                <img :src="item.url" alt="goods">
                <h2 class="goods-item-title">{{item.title}}</h2>
                <div class="goods-item-info">
                    <p class="goods-item-price">
                        <span class="price-sale">￥{{item.salePrice}}</span>
                        <span class="price-normal">￥{{item.normalPrice}}</span>
                    </p>
                    <p class="goods-item-sell">
                        <span>热卖中</span>
                        <span>剩余{{item.inventory}}件</span>
                    </p>
                </div>
            </div>
        </transition-group>
        <mt-button
                type="danger"
                size="large"
                plain
                @click="getMoreGoods"
                v-show="goodsList.length > 0"
        >加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                pageIndex: 1,
                goodsList: []
            }
        },
        created(){
            this.getGoodsList()
        },
        methods: {
            getGoodsList(){
                this.$http.get('api/getgoods?pageindex=' + this.pageIndex)
                    .then(result => {
                        if(result.body.success){
                            if(result.body.goodsList.length){
                                this.goodsList = this.goodsList.concat(result.body.goodsList)
                            } else{
                                Toast('没有更多商品了');
                            }
                        }
                    })
                    .catch(err => {
                        Toast('获取商品信息失败！');
                        throw err
                    })
            },
            getMoreGoods(){
                this.pageIndex = this.pageIndex + 1;
                this.getGoodsList()
            },
            goDetail(id){
                /*
                *   使用JS的形式进行路由导航
                *   vue实例对象中的$route和$router区别
                *       this.$route是路由参数对象，所有路由中的参数params/jquery都属于它
                *       this.$router是路由导航对象，使用它可以方便的使用JS代码实现路由的前进、后退、跳转到新的URL地址
                *    vue-router中的编程式导航
                *       1、this.$router.push("路径")
                *       2、this.$router.push({path: "路径"})
                *       3、this.$router.push({name:"路由规则名称",params:{userId: "动态路由id"}})
                *       4、this.$router.push({path:"路径",query:{userName: "查询字段"}})
                *    this.$router.go(1)、 this.$router.forward()前进等于原生window.history.forward()
                *    this.$router.go(-1)、 this.$router.back()后退等于原生window.history.back()
                */
                // this.$router.push('/home/goodsinfo/' + id)
                // this.$router.push({path: "/home/goodsinfo/" + id})
                this.$router.push({name:"goDetail",params:{id: id}})
                // this.$router.push({path:"/home/goodsinfo/" + id,query:{userName: "查询字段"}})
            }
        }
    }
</script>

<style scoped lang="scss">
    .goods-list{
        .goods-list-container{
            display: flex;
            padding: 0 10px 10px;
            flex-wrap: wrap;
            justify-content: space-between;
            .goods-item{
                display: flex;
                width: 49%;
                min-height: 263px;
                margin: 5px 0;
                flex-direction: column;
                justify-content: space-between;
                border: 1px solid #ccc;
                box-shadow: 0 0 3px rgba(0,0,0,.2);
                img{
                    width: 100%;
                }
                .goods-item-title{
                    font-size: 12px;
                    color: #333;
                }
                .goods-item-info{
                    margin: 1px;
                    background-color: rgba(0,0,0,.1);
                    .goods-item-price{
                        margin: 0;
                        line-height: 30px;
                        font-size: 12px;
                        .price-sale{
                            font-size: 13px;
                            color: #f00;
                        }
                        .price-normal{
                            margin-left: 10px;
                            text-decoration: line-through;
                        }
                    }
                    .goods-item-sell{
                        display: flex;
                        justify-content: space-between;
                        margin: 0;
                        font-size: 12px;
                    }
                }
            }
        }
    }
    .fade-enter,
    .fade-leave-to{
        opacity: 0;
        transform: translateY(300px)
    }
    .fade-enter-active,
    .fade-leave-active{
        transition: all .6s linear;
    }
    .fade-leave-active{
        position: absolute;
    }
    .fade-move{
        transition: all .6s linear;
    }
</style>