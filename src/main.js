// 项目入口文件、
import Vue from 'vue';
// 导入格式化时间插件moment.js
import moment from 'moment';
// 引入default-passive-events解决警告问题
// Added non-passive event listener to a scroll-blocking 'touchmove' event. Consider marking event handler as 'passive' to make the page more responsive.
// 引入滑动会报错
//import 'default-passive-events';
// 引入根组件App
// 导入router
import router from './router.js'
// 注册vuex
import Vuex from 'vuex';
Vue.use(Vuex);
//初始化购物车数据
let shopCarArr = JSON.parse(localStorage.getItem('shopCarList') ? localStorage.getItem('shopCarList') : '[]');
let store = new Vuex.Store({
    state: {
        // 组件调用store中的state数据： this.$store.state.xxx
        // 点击加入购物车需要的信息{id: '商品id', count: '购买数量'，price: '商品单价', selected: '布尔值'}
        shopCar: shopCarArr
    },
    mutations: {
        // 组件调用store中的mutations中的方法修改state中的数据： this.$store.commit('xxx', 参数)
        addToShopCar(state, data){
            // 点击加入购物车按钮，把商品相关信息保存到store上的state中去
            // 如果购物车中，之前就已经有了这个对应的商品，那么，只需要更新数量
            // 如果购物车里没有找到对应商品，则直接把数据放入state中的对应项中
            let flag = false;

            state.shopCar.some(item => {
                if(item.id === data.id){
                    item.count += parseInt(data.count);
                    flag = true;
                    return true
                }
            });
            if(!flag){
                state.shopCar.push(data)
            }
            // 把购物车相关数据存储到本地中
            localStorage.setItem('shopCarList', JSON.stringify(state.shopCar));
        },
        updateGoodsInfo(state,data){
            // 购物车页面修改商品数量
            state.shopCar.some(item => {
                if(item.id == data.id){
                    item.count = parseInt(data.count);
                    return true
                }
            });
            localStorage.setItem('shopCarList', JSON.stringify(state.shopCar));

        },
        deleteGoodsInfo(state, id){
            /*
            // 可以使用数组的splice方法
            let arrList = [];
            state.shopCar.forEach(item => {
                if(item.id !== id){
                    arrList.push(item)
                }
            });
            state.shopCar = arrList;
            */
            state.shopCar.forEach((item, index) => {
                if(item.id === id){
                    state.shopCar.splice(index, 1)
                }
            });
            localStorage.setItem('shopCarList', JSON.stringify(state.shopCar));
        },
        changeGoodSelected(state,data){
            console.log(data);
            state.shopCar.some(item => {
                if(item.id === data.id){
                    item.selected = data.selected
                }
                return true
            });
            localStorage.setItem('shopCarList', JSON.stringify(state.shopCar));
        }
    },
    getters: {
        // 使用getter调用state中的数据：this.$store.getters.xxx
        calcGoodsCount(state){
            let goodsList = state.shopCar;
            let goodsCount = 0;
            goodsList.forEach(item => {
                goodsCount += parseInt(item.count)
            });
            return goodsCount;
        },
        getGoodsCount(state){
            let goodsCount = {};
            state.shopCar.forEach(item => {
                goodsCount[item.id] = item.count
            });
            return goodsCount;
        },
        getGoodsSelected(state){
            let goodsSelector = {};
            state.shopCar.forEach(item => {
                goodsSelector[item.id] = item.selected
            });
            return goodsSelector;
        },
        getGoodsSelectedNum(state){
            let result = 0;
            state.shopCar.forEach(item => {
                if(item.selected){
                    result += item.count;
                }
            });
            return result
        },
        getAmount(state){
            let result = 0;
            state.shopCar.forEach(item => {
                if(item.selected){
                    result += item.count * item.price;
                }
            });
            return result
        }
    }
});
// 导入vue-resource
import VueResource from 'vue-resource';
import App from './App.vue'
// 引入mui组件样式
import './lib/mui/css/mui.css';
import './lib/mui/css/mui-icons-extra.css'
/*
// 按需导入mint-ui组件 图片懒加载有问题
import {
    Header,
    Swipe,
    SwipeItem,
    Button,
    Lazyload
} from 'mint-ui';
// 注册mint-ui组件到Vue
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
//mint-ui图片懒加载
Vue.use(Lazyload);
*/
import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css'
// 使用vue2-preview
import VuePreview from 'vue2-preview';
Vue.use(VuePreview);
// 安装vue-resource
Vue.use(VueResource);
// 设置请求的根路径
Vue.http.options.root = 'http://localhost:3003';

//console.log(moment(new Date()).format("YYYY-MM-DD hh:mm:ss"));
// 定义全局的过滤器 全局插值表达式{{}}和v-bind中都可用
Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:MM:SS'){
    return moment(dataStr).format(pattern)
});

// 全局设置vue-resource中post以表单数据格式组织形式提交
Vue.http.options.emulateJSON = true;

let vm = new Vue({
    el: '#app',
    render: c => c(App),
    router,
    store
});


/*
*   创建好目录结构和文件
*   使用git创建本地仓储：git init初始化本地仓储
*   git status展示所有文件的状态
*   未被跟踪的需要添加到追踪区：git add .
*   然后提交到本地仓储：git commit -m "提交的消息"
*   提交时的消息一定要用双引号
*   然后推送到github： git push -u origin master
*/