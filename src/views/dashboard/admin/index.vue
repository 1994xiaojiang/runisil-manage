<template>
  <div class="dashbord">
    <!-- cardlist -->
    <el-row class="infoCrads">
      <el-col :span="6">
        <div class="cardItem">
          <div class="cardItem_txt">
            <count-to
              class="cardItem_p0 color-green1"
              :startVal="startVal"
              :endVal="allvistors"
              :duration="2000"
            ></count-to>
            <p class="cardItem_p1">总访客数</p>
          </div>
          <div class="cardItem_icon">
            <i class="el-icon-user color-green1"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="cardItem">
          <div class="cardItem_txt">
            <count-to
              class="cardItem_p0 color-blue"
              :startVal="startVal"
              :endVal="vistors"
              :duration="2000"
            ></count-to>
            <p class="cardItem_p1">今日访客数</p>
          </div>
          <div class="cardItem_icon">
            <i class="el-icon-s-comment color-blue"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="cardItem">
          <div class="cardItem_txt">
            <count-to
              class="cardItem_p0 color-red"
              :startVal="startVal"
              :endVal="allpv"
              :duration="2000"
            ></count-to>
            <p class="cardItem_p1">总浏览量</p>
          </div>
          <div class="cardItem_icon">
            <i class="el-icon-view color-red"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="cardItem">
          <div class="cardItem_txt">
            <count-to
              class="cardItem_p0 color-green2"
              :startVal="startVal"
              :endVal="pv"
              :duration="2000"
            ></count-to>
            <p class="cardItem_p1">今日浏览量</p>
          </div>
          <div class="cardItem_icon">
            <i class="el-icon-wallet color-green2"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- end -->
    <!-- lineEcharts -->
    <line-charts class="lCharts" :lineChartData="lineChartData"></line-charts>
    <!-- end -->
    <!-- table and pie -->
    <el-row class="tableChart">
      <el-col :span="16">
        <table-show :tableData="tableData" class="tableShow"></table-show>
      </el-col>
      <el-col :span="8">
        <pie-charts class="pieCharts"></pie-charts>
      </el-col>
    </el-row>
    <!-- end -->
    <!-- bar chart -->
    <bar-charts class="barCharts" :barData="barData"></bar-charts>
    <!-- end -->
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import LineCharts from './components/LineCharts'
import PieCharts from './components/PieCharts'
import TableShow from './components/TableShow'
import BarCharts from './components/BarCharts'
import {
  getCardsData,
  getTableData,
  getLineData,
  getBarData
} from '@/api/dashboard'
export default {
  data() {
    return {
      startVal: 0,
      allvistors: 0,
      vistors: 0,
      allpv: 0,
      pv: 0,
      tableData: [],
      lineChartData: {},
      barData: {}
    }
  },
  mounted() {
    this._getAllData()
  },
  components: {
    CountTo,
    LineCharts,
    PieCharts,
    TableShow,
    BarCharts
  },
  methods: {
    _getAllData() {
        getCardsData().then(res=>{
          if("SUCCESS" === res.status){
            this.allpv = res.data.allPv;
            this.pv = res.data.pv;
            this.allvistors = res.data.allUv;
            this.vistors = res.data.uv;
          }
        });
      getBarData().then(res=>{
        if("SUCCESS" === res.status){
          this.lineChartData = res.data;
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
$mgTop: 30px;
@mixin shadow {
  box-shadow: 0 0 10px #e2e2e2;
}
.color-green1 {
  color: #40c9c6 !important;
}
.color-blue {
  color: #36a3f7 !important;
}
.color-red {
  color: #f4516c !important;
}
.color-green2 {
  color: #34bfa3 !important;
}
.dashbord {
  background-color: #f0f3f4;
}
.infoCrads {
  margin: 0 -20px 0 -20px;
  .el-col {
    padding: 0 20px;
    .cardItem {
      height: 108px;
      background: #fff;
    }
  }
}
.cardItem {
  color: #666;
  @include shadow();
  .cardItem_txt {
    float: left;
    margin: 26px 0 0 20px;
    .cardItem_p0 {
      font-size: 20px;
      font-weight: bold;
    }
    .cardItem_p1 {
      font-size: 16px;
    }
  }
  .cardItem_icon {
    float: right;
    margin: 24px 20px 0 0;
    i {
      font-size: 55px;
    }
  }
}
.lCharts {
  background: #fff;
  margin-top: $mgTop;
  padding: 30px 0;
  @include shadow();
}
.barCharts {
  background: #fff;
  margin-top: $mgTop;
  padding: 30px 0;
  @include shadow();
}
.pieCharts {
  background: #fff;
  padding: 20px 0;
  @include shadow();
}
.tableChart {
  margin-top: $mgTop;
}
</style>
