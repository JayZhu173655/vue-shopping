// 项目入口文件、
import Vue from 'vue';
// 按需导入mint-ui组件
import {
    Header,
} from 'mint-ui';
// 引入根组件App
import App from './App.vue'
// 引入mui组件样式
import './lib/mui/css/mui.css';
// 注册mint-ui组件到Vue
Vue.component(Header.name, Header);

let vm = new Vue({
    el: '#app',
    render: c => c(App)
});


/*
*   创建好目录结构和文件
*   使用git创建本地仓储：git init初始化本地仓储
*   git status展示所有文件的状态
*   未被跟踪的需要添加：git add .
*/