<template>
    <!--轮播图组件单离-->
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in list" :key="item.id ? item.id : item.img">
            <router-link :to="item.url ? item.url : ''">
                <img :class="{full: isFull}" :src= 'item.img' alt="image" :data-url="item.img + 1">
            </router-link>
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    export default {
        props: ["list", "isFull"]
    }
</script>

<style scoped lang="scss">
    .mint-swipe{
        height: 200px;
        .mint-swipe-items-wrap{
            .mint-swipe-item{
                text-align: center;
                background-color: #f5f5f5;
                img{
                    height: 100%;
                    &.full{
                        width: 100%;
                    }
                }
            }
        }
        .mint-swipe-indicators{
            .mint-swipe-indicator{
                &.is-active{
                    background-color: #f5f5f5!important;
                }
            }
        }
    }
</style>