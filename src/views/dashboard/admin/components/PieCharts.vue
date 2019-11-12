<template>
    <div ref="myCharts" :style="{ width: width, height: height }"></div>
</template>

<script>
    import echarts from 'echarts'
    import resize from '@/mixins/resize'
    import {getPieChartData} from '@/api/dashboard'

    require('echarts/theme/macarons'); // echarts theme
    export default {
        mixins: [resize],
        props: {
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '350px'
            }
        },
        data() {
            return {
                mycharts: null,
                piedata: {}
            }
        },
        mounted() {

            this.$nextTick().then(() => {
                getPieChartData().then(res=>{
                    this.piedata = res.data;
                    this.initEcharts()
                });
            })
        },
        methods: {
            initEcharts() {
                this.mycharts = echarts.init(this.$refs.myCharts, 'macarons');
                this._setOtion()
            },
            _setOtion() {
                this.mycharts.setOption({
                    title: {
                        text: '浏览量TOP5的国家',
                        left: '16'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        left: 'center',
                        bottom: '10',
                        data: this.piedata.country
                    },
                    series: [
                        {
                            name: '国家',
                            type: 'pie',
                            roseType: 'radius',
                            labelLine: {
                                show: true,
                                length: 5,
                            },
                            radius: [15, 120],
                            center: ['50%', '42%'],
                            data: this.piedata.list,
                            animationEasing: 'cubicInOut',
                            animationDuration: 2600
                        }
                    ]
                })
            }
        }
    }
</script>
<style></style>
