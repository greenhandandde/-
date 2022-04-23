<template>
    <el-row  >
        <el-col :span="8"><div class="grid-content bg-purple" ></div>
            <el-card class="box-card" shadow="hover" style="margin-top:25px;">
                <div slot="header" class="clearfix">
                    <img :src="userImg" style="height:170px;border-radius:50%">
                    <div class="userinfo">
                        <span style="font-size:40px">用户名</span>
                        <p>管理员</p>
                    </div>
                </div>
                <div  class="text item">
                    <p>上次登录时间:<span>   111</span></p>
                    <p>上次登录地点:<span>   111</span></p>
                </div>
            </el-card>
            <el-card style="position:relative; top:20px">
                <el-table
                :data="tableData"
                height="350px"
                border
                style="width: 100%">
                    <el-table-column
                    v-for="(value,index) in tableLabel"
                    :key="index"
                    :prop="index"
                    :label="value"
                    width="180">
                    </el-table-column>
                    
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" class="hidden-md-and-down" :xs="10">
            <div class="num" style="display:flex; margin: 20px 0 0 30px; ">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex', padding : 0,}" style="margin:10px">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}" style="width:60px;"></i>
                    <div style="width:200px;margin:0  0 0 20px; font-size:2px ">
                        <p class="num-1">￥{{item.value}}</p>
                        <p class="txt">￥{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height:270px;margin-top:25px;margin-left:25px">
                <div style=" height:280px" ref="echarts"></div>
            </el-card>
            <div class="graph" >
                <el-card style="height:300px;width:520px;margin-top:25px">
                    <div style="height:300px;" ref="userEcharts"></div>
                </el-card>
                <el-card style="height:300px;width:520px;margin-top:25px">
                    <div style="height:300px;" ref="videoEcharts"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import {getHome} from '../../../api/data.js'
import * as echarts  from 'echarts'

export default ({
    name: 'User',
    components:{},
    data() {
        return {
            userImg: require("../../assets/images/User.png"),
            tableData:[
                {
                    name: 'oppo',
                    todayBuy: 500,
                    monthBuy: 3500,
                    totalBuy: 22000
                },
                {
                    name: 'vivo',
                    todayBuy: 300,
                    monthBuy: 2200,
                    totalBuy: 24000
                },
                {
                    name: '苹果',
                    todayBuy: 800,
                    monthBuy: 4500,
                    totalBuy: 65000
                },
                {
                    name: '小米',
                    todayBuy: 1200,
                    monthBuy: 6500,
                    totalBuy: 45000
                },
                {
                    name: '三星',
                    todayBuy: 300,
                    monthBuy: 2000,
                    totalBuy: 34000
                },
                {
                    name: '魅族',
                    todayBuy: 350,
                    monthBuy: 3000,
                    totalBuy: 22000
                }
            ],
            tableLabel:{
                name:'课程',
                totalBuy:'今日购买',
                monthBuy:'本月购买',
                totalBuy:'总购买'
            },
            countData:[
                 {
                    name: '今日支付订单',
                    value: 500,
                    icon: 'success',
                    color: "#2ec7c9"
                },
                {
                    name: '今日收藏订单',
                    value: 300,
                    icon: 'star-on',
                    color: '#Ffb980'
                },
                {
                    name: '今日未支付订单',
                    value: 800,
                    icon: 's-goods',
                    color: '#5ab1ef'
                },
                {
                    name: '本月支付订单',
                    value: 1200,
                    icon: 'success',
                    color: '#2ec7c9'
                },
                {
                    name: '本月收藏订单',
                    value: 300,
                    icon: 'star-on',
                    color: '#Ffb980'
                },
                {
                    name: '本月未支付订单',
                    value: 350,
                    icon: 's-goods',
                    color: '#5ab1ef'
                }
            ]
        }
    },
    mounted(){
        getHome().then(res => {
            const {code,data} = res
            if(code === 20000){
                this.tableData = data.tableData;
                const order = data.orderData;
                const xData = order.date;
                const keyArray = Object.keys(order.data[0]);
                const series = []
                keyArray.forEach(key => {
                    series.push({
                        name: key,
                        data: order.data.map(item => item[key]),
                        type: 'line'
                    })
                })
                const option = {
                    xAxis: {
                        data:xData
                    },
                    yAxis: {},
                    legend: {
                        data:keyArray
                    },
                    series
                }
                const E = echarts.init(this.$refs.echarts)
                E.setOption(option)

                //柱状图
                const userOption = {
                    legend: {
                        // 图例文字颜色
                        textStyle: {
                        color: "#333",
                        },
                    },
                    grid: {
                        left: "20%",
                    },
                    // 提示框
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        type: "category", // 类目轴
                        data: data.userData.map(item => item.date),
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                        axisLabel: {
                            interval: 0,
                            color: "#333",
                        },
                    },
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    lor: "#17b3a3",
                                },
                            },
                        },
                    ],
                    color: ["#2ec7c9", "#b6a2de"],
                    series: [
                        {
                            name:'新增用户',
                            data:data.userData.map(item => item.new),
                            type:'bar'
                        },
                        {
                            name:'活跃用户',
                            data:data.userData.map(item => item.active),
                            type:'bar'
                        }
                    ],
                }
                //绑定Dom并初始化和 传入配置项渲染
                echarts.init(this.$refs.userEcharts).setOption(userOption)
            
                //饼状图
                const videoOption = {
                    tooltip: {
                         trigger: "item",
                    },
                    color: [
                        "#0f78f4",
                        "#dd536b",
                        "#9462e5",
                        "#a6a6a6",
                        "#e1bb22",
                        "#39c362",
                        "#3ed1cf",
                    ],
                    series: [
                        {
                            data:data.videoData,
                            type:'pie'
                        }
                    ],
                }
                echarts.init(this.$refs.videoEcharts).setOption(videoOption)
            }
        })
    }
})
</script>


<style lang="less" scoped>
    el-row{
        min-width: 1703px !important;
    }
    .clearfix{
        position: relative;
    }
    .userinfo{
        display: inline-block;
        margin: 50px auto;
        position: absolute;
        top:-5%;
        left: 51%;
    }
    .text span{
        margin: 0 0 0 20px;
    }
    .icon{
        text-align: center;
        line-height: 65px;
        font-size: 30px;
    }
    .num{
        flex-wrap:wrap;
    }
    .num-1{
        font-size: 30px;
        margin: 0;
    }
    .graph{
        display:flex;
        justify-content: space-around;
        margin-left:25px
    }
</style>