<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import { price_distribute } from '@/api/price_distribute'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    stock_code: {
      type: String,
      default: '002167'
    }
  },
  data() {
    console.log(this.stock_code)
    return {
      chart: null,
      listQuery: {
        stock_code: this.stock_code
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
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      price_distribute(this.listQuery).then(response => {
        var result = response.data

        var yAxisData = []
        var data1 = []
        var data2 = []

        for (var price in result) {
          yAxisData.push(result[price].price)
          data1.push(-result[price].sale)
          data2.push(-result[price].buy)
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
