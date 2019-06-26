<template>
    <div class="member-container">
        <div class="member-header">
            <h1 class="title">VIP</h1>
            <p class="description">COMELY OF MEMBER CENTER</p>
            <p class="member-center"><span></span>会员中心<span></span></p>
            <p class="join-us">梦幻商店会员招募中……</p>
        </div>
        <div class="member-desc">
            <div class="title">
                <h2>如何成为会员<span>(会员自动升级制度)</span></h2>
                <p>HOW TO BECOME A MEMBER</p>
            </div>
            <div class="line"></div>
            <div class="chart">
                <div class="chart1"></div>
                <p>购物满1000元即可成为普通会员</p>
                <div class="chart2"></div>
                <p>购物满3000元即可成为高级会员</p>
                <div class="chart3"></div>
                <p>购物满6000元即可成为VIP会员</p>
                <div class="chart4"></div>
                <p>购物满10000元即可成为至尊VIP</p>
                <span>注意：会员无需手动注册，消费满足一定的标准即可自动转化不同等级会员。</span>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入echarts库
    const echarts = require('echarts/lib/echarts');
    // 引入折线图
    require('echarts/lib/chart/pie');
    export default {
        mounted(){
            const myChart1 = echarts.init(document.getElementsByClassName('chart1')[0]);
            const myChart2 = echarts.init(document.getElementsByClassName('chart2')[0]);
            const myChart3 = echarts.init(document.getElementsByClassName('chart3')[0]);
            const myChart4 = echarts.init(document.getElementsByClassName('chart4')[0]);
            myChart1.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'会员等级',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:70},
                            {value:30, name:'最低消费'}
                        ]
                    }
                ]
            });
            myChart2.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'会员等级',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:60},
                            {value:40, name:'最低消费'}
                        ]
                    }
                ]
            });
            myChart3.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'会员等级',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:40},
                            {value:60, name:'最低消费'}
                        ]
                    }
                ]
            });
            myChart4.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'会员等级',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:10},
                            {value:90, name:'最低消费'}
                        ]
                    }
                ]
            })
        }
    }
</script>

<style scoped lang="scss">
    .member-container{
        .member-header{
            padding: 30px 0;
            text-align: center;
            background: -webkit-radial-gradient(#626262, #292929);
            background: -o-radial-gradient(#626262, #292929);
            background: -moz-radial-gradient(#626262, #292929);
            background: radial-gradient(#626262, #292929);
            .title{
                color: #eee;
            }
            p{
                margin: 0;
            }
            .description{
                color: #ddd;
            }
            .member-center{
                color: #ddd;
                span{
                    display: inline-block;
                    height: 1px;
                    width: 70px;
                    margin: 0 8px;
                    vertical-align: middle;
                    background-color: #ddd;
                }
            }
            .join-us{
                margin-top: 40px;
                color: #ddd;
            }
        }
        .member-desc{
            padding: 0 20px;
            background-color: #f5f5f5;
            .title{
                color: #555;
                h2{
                    font-size: 18px;
                    span{
                        font-size: 12px;
                    }
                }
                p{
                    font-size: 12px;
                }
            }
            .line{
                height: 1px;
                border-bottom: 1px dashed #333;
            }
            .chart{
                padding-bottom: 20px;
                .chart1,.chart2,.chart3,.chart4{
                    width: 200px;
                    height:200px;
                    margin: 0 auto;
                }
                p{
                    text-align: center;
                }
                span{
                    font-size: 12px;
                    color: #aaa;
                }
            }
        }
    }
</style>