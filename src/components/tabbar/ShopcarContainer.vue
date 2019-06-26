<template>
    <div class="shop-car-container">
        <!--购物车页面商品展示区-->
        <div class="shop-car-good-list">
            <div class="mui-card" v-for="(item, index) in shopCarList" :key="item.id">
                <div class="mui-card-content">
                    <mt-switch
                            v-model="$store.getters.getGoodsSelected[item.id]"
                            @change="changeSelected(item.id, $store.getters.getGoodsSelected[item.id])"
                    ></mt-switch>
                    <img :src="item.img" alt="image">
                    <div class="shop-car-good-details">
                        <h3>{{item.title}}</h3>
                        <div>
                            <span class="price">￥{{item.salePrice}}</span>
                            <ShopCarNumBox :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></ShopCarNumBox>
                            <span class="delete" @click="delGoodsInfo(item.id, index)">删除</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--购物车页面商品结算区-->
        <!--当shopCarList里面没有商品时，计算组件隐藏，有商品才出现-->
        <div class="mui-card shop-car-good-account" v-show="shopCarList.length > 0">
            <div class="mui-card-content">
                <div class="amount">
                    <p>总计（不含运费）</p>
                    <p>已勾选商品<span>{{$store.getters.getGoodsSelectedNum}}</span>件，总价：<span>￥{{$store.getters.getAmount}}</span></p>
                </div>
                <button type="button" class="mui-btn mui-btn-danger">去结算</button>
            </div>
        </div>
        <div class="shop-car-good-no" v-show="shopCarList.length === 0">购物车空空如也!快去添加吧！</div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import ShopCarNumBox from '../subcomponents/ShopCarNumBox.vue';
    export default {
        data(){
            return {
                shopCarList: []
            }
        },
        created(){
            this.getShopCarList()
        },
       components: {
           ShopCarNumBox
       },
        methods: {
            getShopCarList(){
                // 获取购物车商品的所有id
                let idArr = [];
                this.$store.state.shopCar.forEach(item => idArr.push(item.id));
                // 判断shopCar是否为空，为空则不发送数据请求，不为空再发送数据请求
                if(idArr.length){
                    this.$http.get('api/getshopcarlist/' + idArr.join(','))
                        .then(result => {
                            if(result.body.success){
                                this.shopCarList = result.body.shopCarList
                            } else{
                                Toast("购物车商品信息获取失败！")
                            }
                        })
                        .catch(err => {
                            Toast("购物车商品信息获取失败！");
                            throw err
                        })

                }
            },
            delGoodsInfo(id, index){
                console.log(this.shopCarList);
                this.shopCarList.splice(index, 1);
                this.$store.commit('deleteGoodsInfo', id)

            },
            changeSelected(id, status){
                this.$store.commit('changeGoodSelected',{id,selected: status})
            }
        }
    }
</script>

<style scoped lang="scss">
    .shop-car-container{
        .shop-car-good-list{
            min-height: 106px;
            .mui-card{
                padding: 20px 10px;
                background-color: #f5f5f5;
                .mui-card-content{
                    display: flex;
                    align-items: center;
                    img{
                        height: 60px;
                    }
                    .shop-car-good-details{
                        h3{
                            font-size: 16px;
                            line-height: 30px;
                        }
                        .price{
                            margin-right: 4px;
                            font-weight: bold;
                            color: red;
                        }
                        .delete{
                            margin-left: 4px;
                            color: #26a2ff;
                        }
                    }
                }
            }
        }
        .shop-car-good-account{
            padding: 20px 10px;
            background-color: #f5f5f5;
            .mui-card-content{
                display: flex;
                justify-content: space-between;
                align-items: center;
                button{
                    height: 40px;
                }
                .amount{
                    p{
                        font-size: 16px;
                        span{
                            font-size: 18px;
                            font-weight: bold;
                            color: red;
                        }
                    }
                }
            }
        }
        .shop-car-good-no{
            width: 100%;
            height: 100%;
            text-align: center;
            color: #666;
        }
    }
</style>