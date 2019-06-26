<template>
    <ul class="mui-table-view">
        <li
                class="mui-table-view-cell mui-media"
                v-for="item in newsList"
                :key="item.id"
        >
            <router-link :to="item.url + item.id">
                <img class="mui-media-object mui-pull-left" :src="item.img">
                <div class="mui-media-body">
                    <h3 class="mui-ellipsis">{{item.title}}</h3>
                    <p>
                        <span>发表时间：{{item.add_time}}</span>
                        <span>点击：{{item.click}}次</span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        data: function(){
            return {
                newsList: []
            }
        },
        created(){
            this.getNewsList()
        },
        methods: {
            getNewsList(){
                this.$http.get('api/newslist')
                    .then(result => {
                        if(result.ok){
                            this.newsList = result.body.newsList;
                        }
                    })
                    .catch(err => {
                        if(err){
                            Toast({
                                message: '新闻列表数据请求失败！',
                                position: 'middle',
                                duration: 2000
                            })
                        }
                    });
            }
        }
    }
</script>

<style scoped lang="scss">
    .mui-table-view{
        .mui-table-view-cell.mui-media{
            .mui-media-body{
                h3{
                    font-size: 14px;
                }
                p{
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #26a2ff;
                    span{

                    }
                }
            }
        }
    }
</style>