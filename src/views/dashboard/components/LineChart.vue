<template>
  <div :id="lineId" style="width: 100%; height: 100%;"></div>
</template>

<script>
require('echarts/theme/macarons')
import echarts from 'echarts'
import { debounce } from '@/method'

export default {
  props: ['chartData', 'lineConf', 'lineId'],
  data() {
    return {
      chart: null,
      isResver: false,
      autoResize: true
    }
  },
  mounted() {
    this.initChart()

    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  computed: {
    legend: function() {
      let tempArray = []

      for (let i = 0; i < this.lineConf.length; i++) {
        let list = this.lineConf[i]
        if (list.isChart) {
          tempArray.push(list.label)
        }
      }
      return tempArray
    },
    xAxis: function() {
      let tempArray = []
      for (let j = 0; j < this.chartData.length; j++) {
        tempArray.push(this.chartData[j].time)
      }

      if (parseInt(tempArray[0].replace(/\-/g, '')) > parseInt(tempArray[1].replace(/\-/g, ''))) {
        tempArray.reverse()
        this.isResver = true
      }

      return tempArray
    },
    series: function() {
      let tempArray = []
      for (let i = 0; i < this.lineConf.length; i++) {

        let list = this.lineConf[i]
        let tempData = []
        if (list.isChart) {
          for (let j = 0; j < this.chartData.length; j++) {
            let item = this.chartData[j]
            tempData.push(item[list.prop])
          }
        }

        if (this.isResver) {
          tempData.reverse()
        }

        let tempObject = {
          name: list.label,
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: list.lineColor,
              lineStyle: {
                color: list.lineColor,
                width: 2
              },
              areaStyle: {
                color: list.renderColor
              }
            }
          },
          animationDuration: 2800,
          data: tempData
        }

        tempArray.push(tempObject)
      }

      return tempArray
    },

    optionVal: function() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        legend: {
          data: this.legend
        },
        xAxis: {
          data: this.xAxis,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: this.series
      }
    }
  },
  methods: {
    initChart() {
      const lineDiv = document.getElementById(this.lineId)
      this.chart = echarts.init(lineDiv, 'macarons')
      const opl = this.optionVal
      this.chart.setOption(opl)
    }
  }
}
</script>

<style>

</style>