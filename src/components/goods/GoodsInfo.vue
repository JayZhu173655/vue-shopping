<template>
    <div class="goods-detail">
        <!--添加购物车效果中的移动小球-->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <span class="move-ball" v-show="show" ref="ball"></span>
        </transition>
        <!--商品图片展示-->
        <div class="mui-card">
            <div class="mui-card-content">
                <Swipe :list="photosList" :isFull="false"></Swipe>
            </div>
        </div>
        <!--商品购买-->
        <div class="mui-card">
            <div class="mui-card-header">
                <h3>{{goodsInfo.title}}</h3>
            </div>
            <div class="mui-card-content mui-card-content-detail">
                <p class="price">
                    <span class="price-list">市场价：￥{{goodsInfo.normalPrice}}</span>
                    <span class="price-sell">销售价价：￥{{goodsInfo.salePrice}}</span>
                </p>
                <div class="quantity">
                    购买数量：
                    <GoodsInfoNumBox @getCount="getSelectorNum" :inventory="goodsInfo.inventory"></GoodsInfoNumBox>
                </div>
                <p class="shopping">
                    <a>
                        <button type="button" class="mui-btn mui-btn-primary" size="large">立即购买</button>
                    </a>
                    <a>
                        <button type="button" class="mui-btn mui-btn-danger" @click="addToShopCar">加入购物车</button>
                    </a>
                </p>
            </div>
        </div>
        <!--商品详细信息-->
        <div class="mui-card">
            <div class="mui-card-header">
                <h3>商品参数</h3>
            </div>
            <div class="mui-card-content mui-card-content-detail">
                <p>商品货号： {{goodsInfo.goods_num}}</p>
                <p>库存情况： {{goodsInfo.inventory}}件</p>
                <p>上架时间：{{goodsInfo.add_time}}</p>
            </div>
            <div class="mui-card-footer">
                <p>
                    <mt-button
                            type="primary"
                            size="large"
                            plain
                            @click="goDesc(id)"
                    >图文介绍</mt-button>
                </p>
                <p>
                    <mt-button
                            type="danger"
                            size="large"
                            plain
                            @click="goCom(id)"
                    >商品评论</mt-button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    //引入了轮播组件
    import Swipe from '../subcomponents/Swipe.vue';
    import GoodsInfoNumBox from '../subcomponents/GoodsInfoNumBox.vue';
    export default {
        data(){
            return {
                id: this.$route.params.id,
                photosList: [],
                goodsInfo: {},
                show: false,
                selectorNum: 1
            }
        },
        created(){
            this.getSwipePhoto();
            this.getGoodsInfo();
        },
        methods: {
            getSwipePhoto(){
                this.$http.get('api/getgoodsphoto/' + this.id)
                    .then(result => {
                        if(result.body.success){
                            this.photosList = result.body.photosList;
                        } else{
                            Toast("获取商品图片列表失败！")
                        }
                    })
                    .catch(err => {
                        Toast("获取商品图片列表失败！");
                        throw err
                    })
            },
            getGoodsInfo(){
                this.$http.get('api/getgoodsinfo/' + this.id)
                    .then(result => {
                        if(result.body.success){
                            this.goodsInfo = result.body.goodsInfo[0];
                        } else{
                            Toast("获取商品信息失败！");
                        }
                    })
                    .catch(err => {
                        Toast("获取商品信息失败！");
                        throw err
                    })
            },
            goCom(id){
                // 编程式导航
                this.$router.push({name: 'goComment', params:{id}});
            },
            goDesc(id){
                this.$router.push({name: 'goDescription', params:{id}});
            },
            addToShopCar(){
                this.show = !this.show;
                // 拼接要保存到store中的商品的相关数据
                const goodsInfo = {
                    id: this.id,
                    count: this.selectorNum,
                    price: this.goodsInfo.salePrice,
                    selected: true
                };
                this.$store.commit('addToShopCar', goodsInfo)
            },
            beforeEnter(el){
                el.style.transform = 'translate(0,0)'
            },
            enter(el,done){
                /*
                *   解决不同屏幕下的小球飞入购物车位置错误的bug
                *   DomObject.getBoundingClientRect()
                *   返回值是一个 DOMRect 对象，这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合,
                *   即：是与该元素相关的CSS 边框集合 。
                *   DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。
                *   除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
                */
                // console.log(el.getBoundingClientRect());
                // console.log(el.getClientRects()[0]);
                // console.log(document.getElementsByClassName('mui-badge-shop-car')[0]);

                // console.log(this.$refs.ball);
                /*
                // 这里根据不同屏幕的差值找到的规律，可以解决上述问题
                let distanceY = screen.availHeight - el.offsetTop + document.documentElement.scrollTop - 30;
                let distanceX = screen.availWidth - el.offsetLeft - screen.availWidth / 4 -38;
                */
                let shopCar = document.getElementsByClassName('mui-badge-shop-car')[0];
                //let ball = el;
                // 这里可以使用el也可以使用ref
                let ball = this.$refs.ball;
                let distanceY = shopCar.getBoundingClientRect().y - ball.getBoundingClientRect().y;
                let distanceX = shopCar.getBoundingClientRect().x - ball.getBoundingClientRect().x;
                el.offsetWidth;
                el.style.transform = `translate(${distanceX}px,${distanceY}px)`;
                el.style.transition = 'all .6s cubic-bezier(.06,-0.4,.83,.67)';
                done()
            },
            afterEnter(el){
                this.show = !this.show;
            },
            getSelectorNum(count){
                this.selectorNum = count;
            }
        },
        components: {
            Swipe,
            GoodsInfoNumBox
        }
    }
</script>

<style scoped lang="scss">
    .goods-detail{
        padding: 10px 0;
        background-color: rgba(0,0,0,.1);
        .move-ball{
            position: absolute;
            top: 361px;
            left: 154px;
            width: 18px;
            height: 18px;
            transform: translate(0,0);
            border-radius: 50%;
            background-color: red;
            z-index: 99;
        }
        .mui-card{
            box-shadow: 0 0 6px rgba(0, 0, 0, .3);
            .mui-card-header{
                h3{
                    font-size: 16px;
                }
            }
            .mui-card-content{
                &.mui-card-content-detail{
                    padding-left: 18px;
                }
                .price{
                    padding-top: 10px;
                    font-size: 12px;
                    .price-list{
                        text-decoration: line-through;
                    }
                    .price-sell{
                        margin-left: 10px;
                    }
                }
                .quantity{

                }
                .shopping{
                    padding: 20px 0;
                }
            }
            .mui-card-footer{
                flex-direction: column;
                p{
                    width: 100%;
                }
            }
        }
    }
    /*下面样式解决轮播图在商品页面的展示样式，不影响首页轮播样式*/
    /*
        也可以动态给定类名，父组件用一个布尔值传递给子组件，子组件根据父组件传的值确定是否给类名，这需要在轮播组件中设置
    */
    /*
    .goods-detail /deep/ .mint-swipe .mint-swipe-items-wrap .mint-swipe-item{
        text-align: center;
        background-color: #f5f5f5;
    }
    .goods-detail /deep/ .mint-swipe .mint-swipe-items-wrap .mint-swipe-item img{
        width: auto;
    }
    */
</style>