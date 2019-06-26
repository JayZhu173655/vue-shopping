<template>
    <div class="search-container">
        <div class="search-box">
            <input type="text" placeholder="搜索" ref="ipt" @keyup.enter="findGoods">
            <span class="mui-icon mui-icon-search" @click="getSearchGoodsList"></span>
        </div>
        <hr />
        <transition-group name="fade" tag="div" class="search-goods">
            <div
                    class="goods-item"
                    v-for="item in searchGoodsList"
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
        <div class="search-none" v-show="searchGoodsList.length === 0">暂时没有商品要展示</div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                searchGoodsList: []
            }
        },
        created(){

        },
        methods: {
            getSearchGoodsList(){
                let str = this.$refs.ipt.value;
                this.$http.get('api/getsearchgoods?keywords=' + str)
                    .then(result => {
                        console.log(result.body);
                        if(result.body.success){
                            if(result.body.searchGoodsList.length){
                                this.searchGoodsList = result.body.searchGoodsList;
                            } else{
                                Toast('没有您要查询的商品！')
                            }
                            this.$refs.ipt.value = ''
                        } else{
                            Toast(result.body.msg)
                        }
                    })
                    .catch(err => {
                        Toast('查询数据出错！')
                    })
            },
            goDetail(id){
                this.$router.push({name:"goDetail",params:{id: id}})
            },
            findGoods(){
                this.getSearchGoodsList();
            }
        }
    }
</script>

<style scoped lang="scss">
    .search-container{
        .search-box{
            display: flex;
            align-items: center;
            border: 10px solid #d9d9d9;
            input{
                margin-bottom: 0;
                border: 0;
            }
        }
        .search-goods{
            display: flex;
            padding: 0 10px;
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
        .search-none{
            text-align: center;
            line-height: 100px;
            color: #666;
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