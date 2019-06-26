import Vue from 'vue';
import VueRouter from 'vue-router';

// vue-router需要手动安装下
Vue.use(VueRouter);

// 导入路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import NewsList from './components/news/NewsList.vue';
import NewsInfo from './components/news/NewsInfo.vue';
import PhotoList from './components/photos/PhotoList.vue';
import PhotoInfo from './components/photos/PhotoInfo.vue';
import GoodsList from './components/goods/GoodsList.vue';
import GoodsInfo from './components/goods/GoodsInfo.vue';
import GoodsDesc from './components/goods/GoodsDesc.vue';
import GoodsCom from './components/goods/GoodsCom.vue';
import LeaveMessage from './components/message/LeaveMessage.vue';
import ConnectUs from './components/connectus/ConnectUs.vue';
import Video from './components/video/Video.vue';



// 创建路由
const router = new VueRouter({
    routes: [
        // 配置路由规则
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: HomeContainer
        },
        {
            path: '/member',
            component: MemberContainer
        },
        {
            path: '/shopcar',
            component: ShopcarContainer
        },
        {
            path: '/search',
            component: SearchContainer
        },
        {
            path: '/home/newslist',
            component: NewsList
        },
        {
            path: '/home/newsinfo/:id',
            component: NewsInfo
        },
        {
            path: '/home/photolist',
            component: PhotoList
        },{
            path: '/home/photoinfo/:id',
            component: PhotoInfo
        },
        {
            path: '/home/goodslist',
            component: GoodsList
        },
        {
            path: '/home/goodsinfo/:id',
            component: GoodsInfo,
            name:"goDetail"
        },
        {
            path: '/home/goodsdesc/:id',
            component: GoodsDesc,
            name:"goDescription"
        },
        {
            path: '/home/goodscom/:id',
            component: GoodsCom,
            name:"goComment"
        },
        {
            path: '/home/leavemessage',
            component: LeaveMessage
        },
        {
            path: '/home/connectus',
            component: ConnectUs
        },
        {
            path: '/home/video',
            component: Video
        }
    ],
    // 覆盖默认的路由高亮的类，默认的类为：router-link-active
    linkActiveClass: 'mui-active'
});
export default router;