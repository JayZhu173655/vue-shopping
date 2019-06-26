<template>
    <div class="goods-desc">
        <h2 class="goods-desc-title">{{goodsCon.title}}</h2>
        <div class="goods-desc-content" v-html="goodsCon.content"></div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                id: this.$route.params.id,
                goodsCon:{}
            }
        },
        created(){
            this.getGoodsInfo(this.id)
        },
        methods:{
            getGoodsInfo(id){
                this.$http.get('api/getgoodsdesc/' + id)
                    .then(result => {
                        if(result.body.success){
                            this.goodsCon = result.body.goodsInfo[0]
                        } else{
                            Toast('获取商品描述失败！')
                        }
                    })
                    .catch(err => {
                        Toast('获取商品描述失败！');
                        throw err
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .goods-desc{
        padding: 0 10px;
        .goods-desc-title{
            padding: 20px 0;
            text-align: center;
            font-size: 20px;
        }
        .goods-desc-content{
            padding-top: 20px;
            border-top: 2px solid #ccc;
            /deep/ h2{
                font-size: 16px;
            }
            /deep/ img{
                width: 100%;
            }
        }
    }
</style>