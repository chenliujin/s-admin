<template>
  <div class='chart-container'>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.stock_code')" v-model="listQuery.stock_code"></el-input>

      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.status" :placeholder="$t('table.status')">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <div class="chart" :id="id" :style="{height:height,width:width}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import waves from '@/directive/waves' // 水波纹指令
import { price_distribute } from '@/api/price_distribute'

const statusOptions = [
  { key: '0', display_name: '未对账' },
  { key: '1', display_name: '已对账' }
]

export default {
  directives: {
    waves
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      id: 'chart',
      chart: null,
      statusOptions,
      listQuery: {
        stock_code: '002167',
        status: null
      }
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    handleFilter() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null

      this.initChart()
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      price_distribute(this.listQuery).then(response => {
        var result = response.data

        var yAxisData = []
        var data1 = []
        var data2 = []

        for (var price in result) {
          yAxisData.push(result[price].price)
          data1.push(-result[price].S)
          data2.push(-result[price].B)
        }

        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['证券买入', '证券卖出']
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
              axisTick: { show: false },
              data: yAxisData
            }
          ],
          series: [
            {
              name: '证券卖出',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true
                }
              },
              data: data1
            },
            {
              name: '证券买入',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: data2
            }
          ]
        })
      })
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  padding:20px;
  width: 100%;
  height:85vh;
}
</style>

