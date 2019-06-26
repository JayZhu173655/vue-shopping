<template>
    <div>
        <div
                class="newsinfo-container"
                v-for="item in details"
                :key="item.id"
        >
            <h3 class="title">{{item.title}}</h3>
            <p class="subtitle">
                <span>发表时间：{{item.add_time}}</span>
                <span>点击次数：{{item.click}}次</span>
            </p>
            <hr />
            <div class="content" v-html="item.content"></div>
            <hr />
            <Comment-box :id="id"></Comment-box>
        </div>
    </div>
</template>

<script>
    import Comment from '../subcomponents/Comment.vue';

    // 引入jQuery
    import $ from 'jquery';

    export default {
        data: function(){
            // 把URL地址中传递过来的id值，挂载到data上，方便以后调用
            return {
                id: this.$route.params.id,
                details: []
            }
        },
        created(){
            this.getNewsDetail()
        },
        updated(){
            $('.content img').css({
                width: '100%'
            });
            $('.content p').css({
                color: '#333',
                'line-height': '30px'
            })
        },
        methods: {
            getNewsDetail(){
                this.$http.get('api/newsdetails/'+ this.id)
                    .then(result => {
                        if(result.ok){
                            this.details = result.body.details;
                        }
                    })
            }
        },
        components:{
            "Comment-box": Comment
        }
    }
</script>

<style scoped lang="scss">
    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            line-height: 30px;
            color: #333;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            color: #666;
        }
        .content{
            padding: 20px 0;
        }
        /*
            v-html渲染的富文本，无法在样式表中修改样式
            为什么修改不了样式？
                如果标签在template中先写出来，那么在样式表中可以修改
                是vue编译规范，未在虚拟DOM中渲染的元素，无法修改样式
            解决方法：
                1、在updated生命周期函数中，js动态配置样式
                2、可以去掉样式表中的scoped属性
                    scoped属性导致css仅对当前组件生效，（用css3属性选择器+生成的随机属性实现的）
                    而html绑定渲染出的内容可以理解为子组件的内容，子组件不会被加上对应的属性，所以
                    不会应用css
                    这种方法会导致局部样式污染全局样式
                3、写样式时添加 >>> 在元素前
                    sass中无法正确解析 >>>可以使用 /deep/ 就可以了，而且必须写在最外层
        */
    }
    /*
    .newsinfo-container /deep/ .content{
        img{
            width: 100%;
        }
    }*/
</style>