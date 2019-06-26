<template>
    <div class="video-container">
        <div
                class="video-item"
                v-for="item in videoList"
                :key="item.id"
        >
            <div class="video">
                <video
                        :src="item.src"
                        controls
                        :poster="item.img"
                ></video>
            </div>
            <p class="title">{{item.title}}</p>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                videoList: []
            }
        },
        created(){
            this.getVideoList()
        },
        methods: {
            getVideoList(){
                this.$http.get('api/getvideo')
                    .then(result => {
                        if(result.body.success){
                            this.videoList = result.body.videoList
                        } else{
                            Toast(result.body.msg)
                        }
                    })
                    .catch(err => {
                        Toast("获取视频列表失败！");
                        throw err
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .video-container{
        padding: 10px;
        .video-item{
            margin: 10px 0;
            border-radius: 4px;
            border: 1px solid #ccc;
            .video{
                padding-top: 10px;
                padding-bottom: 10px;
                text-align: center;
                background-color: rgba(0,0,0,.2);
                video{
                    width: 300px;
                }
            }
            .title{
                margin-top: 10px;
                text-indent: 1em;
                line-height: 30px;
                font-size: 16px;
            }
        }
    }
</style>