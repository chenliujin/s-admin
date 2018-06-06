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
    }
  },
  data() {
    return {
      chart: null
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

      price_distribute({}).then(response => {
        var result = response.data

        var yAxisData = []
        var data1 = []
        var data2 = []

        for (var price in result) {
          yAxisData.push(result[price].price)
          data1.push(result[price].buy)
          data2.push(-result[price].sale)
        }

        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['支出', '收入']
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
              name: '收入',
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
              name: '支出',
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
