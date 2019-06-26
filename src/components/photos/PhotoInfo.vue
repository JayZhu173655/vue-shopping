<template>
    <div class="photo-info">
        <!--顶部标题-->
        <h2 class="photo-info-title">{{photoInfo.title}}</h2>
        <p class="photo-info-subtitle">
            <span>发表时间：{{photoInfo.add_time}}</span>
            <span>点击：{{photoInfo.click}}次</span>
        </p>
        <hr />
        <!--图片展示-->
        <div class="photo-info-preview">
            <!--<vue-preview :slides="thumbnailList"></vue-preview>-->
            <vue-preview
                    :list="thumbnailList"
                    :thumbImageStyle="{width: '100px', margin: '10px', boxShadow: '0 0 6px rgba(0,0,0,.4)'}"
                    :previewBoxStyle="{border: '1px solid #eee'}"
                    :tapToClose="true"
            />
        </div>
        <!--内容区-->
        <div class="photo-info-content">{{photoInfo.content}}</div>
        <hr />
        <!--评论区，直接引用评论组件-->
        <Comment :id="id"></Comment>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    /*
    // 这是比较老的vue缩略图
    import VuePreview from 'vue-preview';
    Vue.use(VuePreview);
    //需要配合组件标签使用
    <!--<vue-preview :slides="thumbnailList"></vue-preview>-->
    */
    /*
    import VuePreview from 'vue2-preview';
    Vue.use(VuePreview);
    // 这是配合组件内的标签使用的，这个比较简单
    <vue-preview
            :list="thumbnailList"
            :thumbImageStyle="{width: '100px', margin: '10px', boxShadow: '0 0 6px rgba(0,0,0,.4)'}"
            :previewBoxStyle="{border: '1px solid #eee'}"
            :tapToClose="true"
    />
    */
    // 引入评论组件
    import Comment from '../subcomponents/Comment.vue';

    export default {
        data(){
            return {
                id: this.$route.params.id,
                photoInfo: {},
                thumbnailList: []
            }
        },
        created(){
            this.getPhotoInfo();
            this.getThumbnail()
        },
        methods: {
            getPhotoInfo(){
                this.$http.get('api/getphotoinfo/' + this.id)
                    .then(result => {
                        if(result.body.success){
                            this.photoInfo = result.body.photoInfo;
                        } else{
                            Toast('请求图片详情信息失败！')
                        }
                    })
                    .catch(err => {
                        throw err
                    })
            },
            getThumbnail(){
                // 获取展示图片
                // 当.then内部使用了数组的遍历方法，回调函数是普通函数，则回调函数内的this不指向这个vue实例
                // 建议用箭头函数或者再最外层使用变量接收this，内部不使用this而使用这个变量
                this.$http.get('api/getthumbnail/' + this.id)
                    .then(result => {
                        if(result.body.success){
                            result.body.thumbnailList.forEach(item => {
                                /*
                                this.thumbnailList.push({
                                    src: item.url,
                                    msrc: item.url,
                                    w: 300,
                                    h: 200
                                })
                                */
                                this.thumbnailList.push({
                                    src: item.url,
                                    w: 300,
                                    h: 200
                                })
                            })
                        } else{
                            Toast('图片请求失败！')
                        }
                    })
                    .catch(err => {
                        throw err
                    })
            }
        },
        components: {
            Comment
        }
    }
</script>

<style scoped lang="scss">
    .photo-info{
        padding: 0 4px;
        .photo-info-title{
            padding: 20px 0;
            text-align: center;
            font-size: 16px;
            line-height: 30px;
            color: #555;
        }
        .photo-info-subtitle{
            display: flex;
            justify-content: space-between;
            span{
                font-size: 12px;
            }
        }
        .photo-info-content{
            line-height: 30px;
            font-size: 14px;
            color: #666;
        }
        /*
        // 这是修复vue-preview的样式的
        .photo-info-preview /deep/ img{
            width: 100px;
            margin: 10px;
            box-shadow: 0 0 4px rgba(0,0,0,.4);
        }
        .photo-info-preview /deep/ figure{
            display: inline-block;
            margin: 0;
        }
        */
    }
</style>