<template>
    <div class="container">
        <!--顶部Header 开始-->
        <mt-header fixed title="梦幻商店"></mt-header>
        <!--顶部Header 结束-->
        <!--中间主体Main展示区 根据路由展示不同内容 开始-->
        <p>主题内容</p>
        <!--中间主体Main展示区 根据路由展示不同内容 开始-->
        <!--底部Tab-bar 开始-->
        <nav class="mui-bar mui-bar-tab">
            <a class="mui-tab-item mui-active" href="#tabbar">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </a>
            <a class="mui-tab-item" href="#tabbar-with-chat">
                <span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">消息</span>
            </a>
            <a class="mui-tab-item" href="#tabbar-with-contact">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">通讯录</span>
            </a>
            <a class="mui-tab-item" href="#tabbar-with-map">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </a>
        </nav>
        <!--底部Tab-bar 结束-->
    </div>
</template>
<script>
    export default {

    }
</script>
<style scoped lang="scss">
    .container{
        padding-top: 40px;
    }
</style>