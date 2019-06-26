<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1'>
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" :value= 'initCount' @change="countChanged" ref="countNum" disabled/>
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.js';
    export default {
        data(){
            return {

            }
        },
        mounted(){
            mui('.mui-numbox').numbox();
        },
        methods: {
            countChanged(){
                this.$store.commit('updateGoodsInfo',{
                    id: this.goodsId,
                    count: this.$refs.countNum.value
                })
            }
        },
        props: ['initCount', 'goodsId']
    }
</script>

<style scoped lang="scss">
    .mui-numbox{
        height: 26px;
    }
</style>