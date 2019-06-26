<template>
    <div>
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a
                        v-for="item in categoryList"
                        :key="item.id"
                        :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']"
                        @tap="getPhotosList(item.id)"
                >
                    {{item.title}}
                </a>
            </div>
        </div>
        <ul>
            <router-link
                    v-for="item in imgList"
                    tag="li"
                    :to="'/home/photoinfo/' + item.id"
                    :key="item.id"
            >
                <img v-lazy="item.url">
                <div class="info">
                    <h3 class="info-title">{{item.title}}</h3>
                    <div class="info-content">{{item.summary}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    document.addEventListener('touchmove', function(){}, { passive: false });
    // 关于mui中跟js操作相关的需要引入mui的js文件
    import mui from '../../lib/mui/js/mui.js';
    import {Toast} from 'mint-ui';

    export default {
        data(){
            return {
                categoryList : [],
                imgList: []
            }
        },
        created(){
            this.getAllCategory();
            this.getPhotosList(0)
        },
        mounted(){
            // 组件挂载之后，然后初始化一下就行了
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getAllCategory(){
                this.$http.get('api/getcategory')
                    .then(result => {
                        if(result.ok){
                            result.body.categoryList.unshift({id: 0, title: '全部'});
                            this.categoryList = result.body.categoryList;
                        }
                    })
                    .catch(err => {
                        if(err){
                            Toast("请求category数据失败!")
                        }
                    })
            },
            getPhotosList(id){
                this.$http.get('api/getphotos/' + id)
                    .then(result => {
                        if(result.ok){
                            this.imgList = result.body.photoList
                        } else{
                            Toast("图片数据请求失败！")
                        }

                    })
                    .catch(err => {
                        if(err){
                            Toast("图片数据请求失败！")
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    *{
        /*去除顶部滑块的报错*/
        touch-action: pan-y;
    }
    /*解决category点击向上移动bug*/
    .mui-segmented-control.mui-segmented-control-inverted .mui-control-item{
        border-bottom: 2px solid transparent;
    }
    .mui-scroll-wrapper{
        z-index: 0;
    }
    ul{
        padding: 10px;
        li{
            position: relative;
            list-style-type: none;
            background-color: #ccc;
            margin-bottom: 10px;
            text-align: center;
            box-shadow: 0 0 8px rgba(0,0,0, .3);
            img[lazy=loading]{
                width: 40px;
                height: 300px;
                margin: auto;
            }
            img{
                width: 100%;
                vertical-align: middle;
            }
            .info{
                position: absolute;
                overflow: hidden;
                width: 100%;
                height: 88px;
                left: 0;
                bottom: 0;
                text-align: left;
                color: #ddd;
                background-color: rgba(0,0,0,0.5);
                .info-title{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                }
                .info-content{
                    font-size: 12px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }


</style>