<template>
    <div class="comment-container">
        <h4>发表评论：</h4>
        <textarea placeholder="请输入评论内容(200字)" maxlength="200" v-model="msg"></textarea>
        <mt-button class='comment-btn' type="primary" size="large" @click="submitComment">发表评论</mt-button>
        <div class="cmt-list">
            <transition-group name="add">
                <div
                        class="cmt-item"
                        v-for="(item, index) in commentsList"
                        :key="item.id"
                >
                    <div class="cmt-title">
                        <p>
                            <span>第{{index + 1}}楼</span>
                            <span>用户：{{item.user_name}}</span>
                            <span>发表时间：{{item.add_time}}</span>
                        </p>
                    </div>
                    <div class="cmt-body">
                        <p>{{item.content}}</p>
                    </div>
                    <hr />
                </div>
            </transition-group>
        </div>
        <mt-button
                type="danger"
                size="large"
                plain @click="getMoreComments"
                v-show="commentsList.length > 0"
        >加载更多</mt-button>
    </div>
</template>

<script>
    /*
    *   这是评论的子组件，是一个公共的子组件
    *   先创建一个单独的评论组件模板
    *   然后在需要的组件中去引用
    *   在引用的组件中在components属性中导入引入的评论组件，注册为自己的子组件
    *   将注册的评论组件的名称以标签形式在页面中引用就可以了
    *
    */
    import {Toast} from 'mint-ui';
    export default {
        data: function(){
            return {
                pageIndex: 1,
                commentsList: [],
                commentsListLength: 0,
                msg: ''
            }
        },
        created(){
            this.getComments()
        },
        methods: {
            getComments(){
                /*
                // 这是获取本地json数据后根据请求参数手动分页
                this.$http.get('api/getcomments/' + this.id + '.json?pageindex=' + this.pageIndex)
                    .then(result => {
                        if(result.ok){
                            this.commentsListLength = result.body.commentsList.length;
                            let max = this.pageIndex * 3 > this.commentsListLength ? this.commentsListLength : this.pageIndex * 3;
                            this.conmentsList = result.body.commentsList.filter((item, index) => index < max);
                        }
                    })
                    .catch(err => {
                        Toast('获取评论数据失败');
                        throw err;
                    })
                    */
                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex)
                    .then(result => {
                        if(result.ok){
                            this.commentsList = this.commentsList.concat(result.body.commentsList)
                        }
                    })
                    .catch(err => {
                        Toast('获取评论数据失败');
                        throw err;
                    })
            },
            getMoreComments(){
                this.pageIndex++;
                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex)
                    .then(result => {
                        if(result.ok){
                            /*
                            // 手动实现的分页 获取所有评论
                            let difference = result.body.commentsList.length - this.pageIndex * 3;
                            if(difference >= -3){
                                let max = this.pageIndex * 3 > this.commentsListLength ? this.commentsListLength : this.pageIndex * 3;
                                this.conmentsList = result.body.commentsList.filter((item, index) => index < max);
                            } else{
                                Toast('没有更多评论了');
                            }
                            */
                            if(result.body.commentsList.length){
                                this.commentsList = this.commentsList.concat(result.body.commentsList)
                            }else{
                                Toast('没有更过评论了！');
                            }
                        }
                    })
                    .catch(err => {
                        Toast('获取评论数据失败');
                        throw err;
                    })
            },
            submitComment(){
                if(!this.msg.trim()){
                    Toast('评论内容不能为空！')
                } else{
                    this.$http.post('api/submitcomment/' + this.id, {
                        content: this.msg.trim()
                    })
                        .then(result => {
                            if(result.body.success){
                                this.getComments()
                            }
                            this.msg = '';
                            Toast(result.body.msg)
                        })
                }
            }
        },
        props: ['id']
    }
    /*
    *   parseInt()丢弃小数部分，对于数字开始字符串可以获取其中的数字
    *   parseFloat()获取数字开始的字符串，并保留小数部分
    *   Math.floor() 向下取整
    *   Math.ceil() 向上取整
    *   Math.round() 四舍五入
    *
    */
</script>

<style scoped lang="scss">
    /*去掉scoped可以解决图片不完全展示*/
    .comment-container{
        padding: 20px 0;
        h4{
            color: #555;
        }
        button{
            &.comment-btn{
                background-color: #26a2ff;
            }
        }
        textarea{
            height: 85px;
            font-size: 14px;
        }
        .cmt-list{
            padding-top: 20px;
            .cmt-item{
                .cmt-title{
                    p{
                        line-height: 30px;
                        font-size: 12px;
                        text-indent: 1em;
                        color: #fff;
                        background-color: rgba(0,0,0,.5);
                    }
                }
                .cmt-body{
                    p{
                        text-indent: 2em;
                        font-size: 14px;
                    }
                }
            }
        }
    }
    .add-enter,
    .add-leave-to{
        opacity: 0;
        transform: translateY(100px)
    }
    .add-leave-active,
    .add-enter-active{
        transition: all .6s linear;
    }
</style>