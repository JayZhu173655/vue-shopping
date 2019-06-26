<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1'>
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" value= '1' @change="countChanged" ref="countNum"/>
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
                // 使用v-model双向数据绑定做不到跟着input框内容改变而改变
                // 所以还是使用ref获取DOM元素
                let countNum = this.$refs.countNum.value;
                this.$emit('getCount',parseInt(countNum))
            }
        },
        props: ['inventory'],
        watch: {
            inventory: function(newVal, oldVal){
                // 直接使用v-bind绑定传父组件传递来的值会出问题，因为父组件数据是异步的，传值的时候可能数据还没拿到
                // 使用watch监听数据变化可以解决这个问题
                mui('.mui-numbox').numbox().setOption('max',newVal)
            }
        }
    }
</script>

<style scoped lang="scss">
    .mui-numbox{
        height: 26px;
    }
</style>