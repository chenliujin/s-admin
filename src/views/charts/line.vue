<template>
  <div class='chart-container'>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="stock_code">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <chart height='100%' width='100%' :stock_code="stock_code"></chart>
  </div>
</template>

<script>
import Chart from '@/components/Charts/bar-negative'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'lineChart',
  components: { Chart },
  directives: {
    waves
  },
  data() {
    return {
      stock_code: '002167'
    }
  },
  methods: {
    handleFilter() {
      console.log(this.stock_code)
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

