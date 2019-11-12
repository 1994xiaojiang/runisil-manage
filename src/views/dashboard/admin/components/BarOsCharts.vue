<template>
    <div ref="myCharts" :style="{ width: width, height: height }"></div>
</template>

<script>
    import echarts from 'echarts'
    import resize from '@/mixins/resize'

    require('echarts/theme/macarons');

    export default {
        mixins: [resize],
        props: {
            width: {
                type: String,
                default: '98%'
            },
            height: {
                type: String,
                default: '350px'
            },
            barOsData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                mycharts: null
            }
        },
        watch: {
            barOsData: {
                deep: true,
                handler(val) {
                    this._setOption(val)
                }
            }
        },
        mounted() {
            this.$nextTick().then(() => {
                this.initEcharts()
            })
        },
        methods: {
            initEcharts() {
                this.mycharts = echarts.init(this.$refs.myCharts, 'macarons');
                this._setOption(this.barOsData);
            },
            _setOption(obj) {
                this.mycharts.setOption({
                    title: {
                        text: '操作系统TOP10',
                        subtext: '浏览量TOP10操作系统'
                    },
                    color: ['#db356e'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '操作系统',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                })
            }
        }
    }
</script>
