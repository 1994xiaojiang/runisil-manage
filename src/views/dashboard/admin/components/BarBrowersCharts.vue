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
            barBrowserData: {
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
            barBrowserData: {
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
                this._setOption(this.barBrowserData)
            },
            _setOption(obj) {
                this.mycharts.setOption({
                    title: {
                        text: '浏览器TOP10',
                        subtext: '浏览量TOP10浏览器'
                    },
                    color: ['#00d5db'],
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
                            type: 'value'
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: obj.browser,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    series: [
                        {
                            name: '浏览器',
                            type: 'bar',
                            barWidth: '30%',
                            data: obj.browserCount
                        }
                    ]
                })
            }
        }
    }
</script>
