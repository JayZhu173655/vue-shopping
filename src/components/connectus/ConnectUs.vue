<template>
    <div class="connect-us-container">
        <div class="connect-us-tel connect-us-item">
            <span class="mui-icon mui-icon-phone connect-us-icon"></span>
            <p>
                <span>联系电话</span>
                <span>电话：01011010101 传真：010-10101010</span>
            </p>
        </div>
        <div class="connect-us-qq connect-us-item">
            <span class="mui-icon mui-icon-qq connect-us-icon"></span>
            <p>
                <span>QQ号</span>
                <span>010101010</span>
            </p>
        </div>
        <div class="connect-us-email connect-us-item">
            <span class="mui-icon mui-icon-email connect-us-icon"></span>
            <p>
                <span>邮箱</span>
                <span>xxxx@xxx.com</span>
            </p>
        </div>
        <div class="connect-us-wechat connect-us-item">
            <span class="mui-icon mui-icon-weixin connect-us-icon"></span>
            <p>
                <span>微信公众号</span>
                <span>XXXXXXX</span>
            </p>
        </div>
        <div class="connect-us-weibo connect-us-item">
            <span class="mui-icon mui-icon-weibo connect-us-icon"></span>
            <p>
                <span>微博</span>
                <span>XXXXXXXXX</span>
            </p>
        </div>
        <div class="connect-us-location connect-us-item">
            <span class="mui-icon mui-icon-location connect-us-icon"></span>
            <p>
                <span>公司地址</span>
                <span>上海市浦东新区唐镇</span>
            </p>
        </div>
        <div id="connect-us-map" >
            <baidu-map
                    :center="center"
                    :zoom="zoom"
                    @ready="handelMap"
                    class="bm-view"
                    ak="9NQtU1P2g88cVrLcHQXxglm1ajUxHWwz"
            >
                <bm-marker
                        :position="{lng: 121.662, lat: 31.214}"
                        :dragging="true"
                ></bm-marker>
            </baidu-map>
        </div>
    </div>
</template>

<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
    import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue';
    export default {
        data(){
            return {
                center: {lng: 0, lat: 0},
                zoom: 3
            }
        },
        components: {
            BaiduMap,
            BmMarker
        },
        methods: {
            handelMap({BMap, map}){
                this.center.lng = 121.662;
                this.center.lat = 31.214;
                this.zoom = 15
            }
        }
    }
</script>

<style scoped lang="scss">
    .connect-us-container{
        padding: 20px;
        .connect-us-item{
            display: flex;
            margin-bottom: 10px;
            align-items: center;
            .connect-us-icon{
                color: #26a2ff;
            }
            p{
                display: flex;
                margin-left: 16px;
                flex-direction: column;
                :nth-child(1){
                    margin-bottom: 10px;
                    font-size: 16px;
                    color: #333;
                }
            }
        }
        #connect-us-map{
            margin-top: 30px;
            .bm-view{
                width: 300px;
                height: 300px;
                margin: 0 auto;
            }
        }
    }
</style>