<template>
  <div
    class="lineCharts"
    :style="{ width: width, height: height }"
    ref="myCharts"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/mixins/resize'
require('echarts/theme/macarons')
// import { getLineData } from '@/api/dashboard'
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
    },
    lineChartData: {
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
    lineChartData: {
      deep: true,
      handler(val) {
        this._setOption(val.value, val.date)
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
      this.mycharts = echarts.init(this.$refs.myCharts, 'macarons')
      if (Object.keys(this.lineChartData).length > 0) {
        this._setOption(this.lineChartData.value, this.lineChartData.date)
      }
    },
    _setOption(value = [], date = []) {
      this.mycharts.setOption({
        title: {
          text: '最近7天浏览量趋势',
          left: '16'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              background: '#6a7985'
            }
          }
        },
        legend: {
          data: ['浏览量']
        },
        grid: {
          left: '20',
          right: '50',
          bottom: '3',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: date
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '浏览量',
            type: 'line',
            // areaStyle: {
            //   color: '#f4516c',
            //   opacity: 0.3
            // },
            itemStyle: {
              color: '#f4516c'
            },
            lineStyle: {
              color: '#f4516c'
            },
            smooth: true,
            data: value,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
  }
}
</script>
<style></style>
