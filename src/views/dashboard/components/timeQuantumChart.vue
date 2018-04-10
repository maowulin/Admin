<template>
  <div :id="lineId" style="width: 100%; height: 100%;"></div>
</template>

<script>
require('echarts/theme/macarons')
import echarts from 'echarts'
import { debounce } from '@/method'

export default {
  props: ['lineConf', 'chartData', 'lineId'],
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
      for(let obj in this.chartData) {
        tempArray.push(obj)
      }
      return tempArray
    },
    xAxis: function() {
      return ['00:00~2:00', '02:00~4:00', '04:00~6:00', '06:00~8:00', '08:00~10:00', '10:00~12:00', '12:00~14:00', '14:00~16:00', '16:00~18:00', '18:00~20:00', '20:00~22:00', '22:00~00:00']
    },
    computedData: function() {
      let tempArray = [] 

      for(let i = 0; i < this.legend.length; i++) {
        this.lineConf[i].label = this.legend[i]
      }

      return this.lineConf
    },
    computedChartData: function() {
      let tempArray = {}
      let tempData = {}
      for(let j = 0; j < this.legend.length; j++) {
          let item = this.legend[j]
          let tempObj = {}
          tempObj[item] = []

          let tempVal = {}
          tempVal[item] = []

          tempArray[item] = []
          tempData[item] = []

          for(let t = 0; t < this.chartData[item].length; t++) {
            let group = this.chartData[item][t]
            let time = group.time.substring(11, 16)
            tempObj[item].push(time)
          }

          for(let t = 0; t < this.chartData[item].length; t++) {
            let group = this.chartData[item][t]
            let value = group.new_user
            tempVal[item].push(value)
          }
          
          if(tempObj[item].includes("00:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "00:00"
            })
            tempArray[item][0] = tempVal[item][index]
          }else {
            tempArray[item][0] = 0
          }

          if(tempObj[item].includes("01:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "01:00"
            })
            tempArray[item][1] = tempVal[item][index]
          }else {
            tempArray[item][1] = 0
          }

          if(tempObj[item].includes("02:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "02:00"
            })
            tempArray[item][2] = tempVal[item][index]
          }else {
            tempArray[item][2] = 0
          }

          if(tempObj[item].includes("03:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "03:00"
            })
            tempArray[item][3] = tempVal[item][index]
          }else {
            tempArray[item][3] = 0
          }

          if(tempObj[item].includes("04:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "04:00"
            })
            tempArray[item][4] = tempVal[item][index]
          }else {
            tempArray[item][4] = 0
          }

          if(tempObj[item].includes("05:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "05:00"
            })
            tempArray[item][5] = tempVal[item][index]
          }else {
            tempArray[item][5] = 0
          }

          if(tempObj[item].includes("06:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "06:00"
            })
            tempArray[item][6] = tempVal[item][index]
          }else {
            tempArray[item][6] = 0
          }

          if(tempObj[item].includes("07:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "07:00"
            })
            tempArray[item][7] = tempVal[item][index]
          }else {
            tempArray[item][7] = 0
          }

          if(tempObj[item].includes("08:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "08:00"
            })
            tempArray[item][8] = tempVal[item][index]
          }else {
            tempArray[item][8] = 0
          }

          if(tempObj[item].includes("09:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "09:00"
            })
            tempArray[item][9] = tempVal[item][index]
          }else {
            tempArray[item][9] = 0
          }

          if(tempObj[item].includes("10:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "10:00"
            })
            tempArray[item][10] = tempVal[item][index]
          }else {
            tempArray[item][10] = 0
          }

          if(tempObj[item].includes("11:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "11:00"
            })
            tempArray[item][11] = tempVal[item][index]
          }else {
            tempArray[item][11] = 0
          }

          if(tempObj[item].includes("12:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "12:00"
            })
            tempArray[item][12] = tempVal[item][index]
          }else {
            tempArray[item][12] = 0
          }

          if(tempObj[item].includes("13:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "13:00"
            })
            tempArray[item][13] = tempVal[item][index]
          }else {
            tempArray[item][13] = 0
          }

          if(tempObj[item].includes("14:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "14:00"
            })
            tempArray[item][14] = tempVal[item][index]
          }else {
            tempArray[item][14] = 0
          }

          if(tempObj[item].includes("15:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "15:00"
            })
            tempArray[item][15] = tempVal[item][index]
          }else {
            tempArray[item][15] = 0
          }

          if(tempObj[item].includes("16:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "16:00"
            })
            tempArray[item][16] = tempVal[item][index]
          }else {
            tempArray[item][16] = 0
          }

          if(tempObj[item].includes("17:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "17:00"
            })
            tempArray[item][17] = tempVal[item][index]
          }else {
            tempArray[item][17] = 0
          }

          if(tempObj[item].includes("18:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "18:00"
            })
            tempArray[item][18] = tempVal[item][index]
          }else {
            tempArray[item][18] = 0
          }

          if(tempObj[item].includes("19:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "19:00"
            })
            tempArray[item][19] = tempVal[item][index]
          }else {
            tempArray[item][19] = 0
          }

          if(tempObj[item].includes("20:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "20:00"
            })
            tempArray[item][20] = tempVal[item][index]
          }else {
            tempArray[item][20] = 0
          }

          if(tempObj[item].includes("21:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "21:00"
            })
            tempArray[item][21] = tempVal[item][index]
          }else {
            tempArray[item][21] = 0
          }

          if(tempObj[item].includes("22:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "22:00"
            })
            tempArray[item][22] = tempVal[item][index]
          }else {
            tempArray[item][22] = 0
          }

          if(tempObj[item].includes("23:00")) {
            let index = tempObj[item].findIndex((val, index, arr) => {
              return val === "23:00"
            })
            tempArray[item][23] = tempVal[item][index]
          }else {
            tempArray[item][23] = 0
          }

          tempData[item][0] = tempArray[item][0] + tempArray[item][1]
          tempData[item][1] = tempArray[item][2] + tempArray[item][3]
          tempData[item][2] = tempArray[item][4] + tempArray[item][5]
          tempData[item][3] = tempArray[item][6] + tempArray[item][7]
          tempData[item][4] = tempArray[item][8] + tempArray[item][9]
          tempData[item][5] = tempArray[item][10] + tempArray[item][11]
          tempData[item][6] = tempArray[item][12] + tempArray[item][13]
          tempData[item][7] = tempArray[item][14] + tempArray[item][15]
          tempData[item][8] = tempArray[item][16] + tempArray[item][17]
          tempData[item][9] = tempArray[item][18] + tempArray[item][19]
          tempData[item][10] = tempArray[item][20] + tempArray[item][21]
          tempData[item][11] = tempArray[item][22] + tempArray[item][23]
        }
      return tempData
    },
    series: function() {
      let tempArray = []
      for (let i = 0; i < this.computedData.length; i++) {

        let list = this.lineConf[i]
        let tempData = this.computedChartData[list.label]

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

    selected: function() {
      let tempObj = {}
      for(let i = 0; i < this.lineConf.length; i++) {
        let list = this.lineConf[i]
        if(list.isChart) {
          let label = list.label
          if(list.defaultShow) {
            tempObj[label] = true
          }else {
            tempObj[label] = false
          }
        }
      }
      return tempObj
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
          data: this.legend,
          selected: this.selected
        },
        xAxis: {
          data: this.xAxis,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 20,
          right: 20,
          bottom: 20,
          top: 50,
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