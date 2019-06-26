<template>
    <div class="leave-message-container">
        <div class="leave-message-box">
            <p class="ipt">
                <span>用户名：</span>
                <input type="text" placeholder="请输入用户名" ref="user_name">
            </p>
            <p class="tar">
                <span>留言：</span>
                <textarea placeholder="请输入用户名" ref="user_message"></textarea>
            </p>
            <p class="btn">
                <button @click="addLeaveMessage">提交</button>
            </p>
        </div>
        <div class="leave-message-list">
            <div
                    class="leave-message-item"
                    v-for="item in messageList"
                    :key="item.id"
            >
                <p class="info">
                    <span class="name">{{item.name}}</span>
                    <span class="time">{{item.add_time | dateFormat}}</span>
                </p>
                <hr />
                <p class="content">{{item.content}}</p>
            </div>
            <p v-show="messageList.length === 0">赶快留言吧~~~~~</p>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                messageList: []
            }
        },
        created(){
            this.getLeaveMessage()
        },
        methods: {
            getLeaveMessage(){
                this.$http.get('api/getleavemessage')
                    .then(result => {
                        if(result.body.success){
                            this.messageList = result.body.messageList
                        } else{
                            Toast(result.body.mag)
                        }
                    })
                    .catch(err => {
                        Toast('留言信息获取失败！');
                        throw err
                    })
            },
            addLeaveMessage(){
                let ipt_val = this.$refs.user_name;
                let tar_val = this.$refs.user_message;
                let name = '';
                let content = '';
                if(!ipt_val.value.trim()){
                    name = '匿名用户'
                } else{
                    name = ipt_val.value.trim()
                }
                if(tar_val.value.trim()){
                    content = tar_val.value.trim()
                } else{
                    return Toast('评论内容不能为空');
                }
                this.$http.post('api/addleavemessage',{
                    name,
                    content
                }).then(result => {
                    if(result.body.success){
                        this.messageList = result.body.messageList;
                        this.$refs.user_name.value = '';
                        this.$refs.user_message.value = '';
                    } else{
                        Toast(result.body.msg);
                    }
                }).catch(err => {
                    Toast('提交评论失败');
                    throw err
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .leave-message-container{
        padding: 10px;
        .leave-message-box{
            padding: 20px 10px 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 0 6px rgba(0,0,0,.2);
            p{
                font-size: 16px;
                color: #333;
                input{
                    margin-bottom: 0;
                    font-size: 14px;
                }
                textarea{
                    height: 100px;
                    margin-bottom: 0;
                    font-size: 14px;
                }
                &.btn{
                    text-align: right;
                }
                span{
                    display: inline-block;
                    line-height: 30px;
                }
            }
        }
        .leave-message-list{
            margin-top: 20px;
            .leave-message-item{
                margin-bottom: 10px;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-shadow: 0 0 6px rgba(0,0,0,.2);
                .content{
                    margin-top: 20px;
                    color: #333;
                }
                .info{
                    display: flex;
                    justify-content: space-between;
                    .name{
                        color: #333;
                    }
                }
            }
        }
    }
</style>