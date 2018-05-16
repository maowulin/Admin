<template>
  <div id="longin-city" style="width: 100%; height: 100%;"></div>
</template>

<script>
  require('echarts/theme/macarons')
  require('echarts/map/js/china')
  import echarts from 'echarts'
  import { loginCity } from '@/api/query'

  export default {
    props: ['charData'],
    data() {
      return {
        typeIndex: 1,
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {

    },
    computed: {
      provice: function () {
        let tempArray = []
        for (let i = 0; i < this.charData.length; i++) {
          let list = this.charData[i]
          if (i > 3) {
            if (list.city === '黑龙') {
              list.city = '黑龙江'
            } else if (list.city === '内蒙') {
              list.city = '内蒙古'
            }
            tempArray.push(list.city)
          }
        }
        return tempArray
      },
      userNum: function () {
        let tempArray = []
        let count = 0
        for (let i = 0; i < this.charData.length; i++) {
          let list = this.charData[i]
          if (i > 3) {
            // android， ios， 总数
            tempArray[count] = [list.android, list.ios, list.total]
            count++
          }
        }
        return tempArray
      },
      pieData: function () {
        let tempArray = []
        for (let i = 0; i < this.provice.length; i++) {
          tempArray.push({
            'name': this.provice[i],
            'value': [{
              'name': 'Android',
              'value': this.userNum[i][0]
            },
            {
              'name': 'Ios',
              'value': this.userNum[i][1]
            }]
          })
        }
        return tempArray
      },
      geoCoordMap: function () {
        return {
          '上海': [121.472644, 31.231706],
          '云南': [102.712251, 24.040609],
          '内蒙古': [111.670801, 40.818311],
          '北京': [116.405285, 39.904989],
          // '台湾': [121.509062, 25.044332],
          '吉林': [125.3245, 43.886841],
          '四川': [103.065735, 30.659462],
          '天津': [119.190182, 39.125596],
          '宁夏': [106.278179, 38.46637],
          '安徽': [117.283042, 31.86119],
          '山东': [118.000923, 36.675807],
          '山西': [112.049248, 37.057014],
          '广东': [113.280637, 23.125178],
          '广西': [108.320004, 22.82402],
          '新疆': [87.617733, 43.792818],
          '江苏': [119.467413, 33.741544],
          '江西': [115.892151, 28.676493],
          '河北': [114.802461, 37.745474],
          '河南': [113.665412, 33.757975],
          '浙江': [120.153576, 29.287459],
          '海南': [110.33119, 20.031971],
          '湖北': [113.298572, 30.984355],
          '湖南': [112.12279, 28.19409],
          // '澳门': [113.54909, 22.198951],
          '甘肃': [103.823557, 36.058039],
          '福建': [119.306239, 26.075302],
          '西藏': [91.132212, 29.660361],
          '贵州': [106.713478, 26.578343],
          '辽宁': [123.029096, 41.396767],
          '重庆': [106.504962, 29.933155],
          '陕西': [108.948024, 34.263161],
          '青海': [100.578916, 36.623178],
          '香港':  [114.173355,  22.320048],
          '黑龙江': [126.642464, 46.756967],
          '未知': [145.029096, 41.396767]
        }
      },
      tooltipData: function() {
        let tempArray = []
        for (let i = 0; i < this.provice.length; i++) {
          tempArray.push({
            'name': this.provice[i],
            'Android': this.userNum[i][0],
            'Ios': this.userNum[i][1]
          })
        }
        return tempArray
      },
      otherPieData: function() {
        let tempArray = []
        let android = 0
        let ios = 0
        let total = 0
        for (let i = 0; i < this.charData.length; i++) {
          let list = this.charData[i]
          if (i <= 3) {
            android += list.android
            ios += list.ios
            total += list.total
          }
        }
        tempArray[0] = {name: 'Android', value: android, visualMap: false}
        tempArray[1] = {name: 'IOS', value: ios, visualMap: false}
        return tempArray
      },
      // 变换地图数据格式
      convertMapDta: function () {
        let tempArray = []

        for (let i = 0; i < this.provice.length; i++) {
          tempArray.push({
            'name': this.provice[i],
            'value': this.userNum[i][2]
          })
        }
        return tempArray
      },
      /* 指定图表的配置项和数据:pie*/
      option: function () {
        const tempTooltipData = this.tooltipData
        return {
          title: {
            text: '用户登陆地点统计',
            left: 'center',
            textStyle: {
              color: 'black'
            }
          },
          legend: {
            data: ['Android', 'IOS'],
            orient: 'vertical',
            top: '10%',
            left: 'left',
            zlevel: 4
          },
          toolbox: {
            feature: {
              saveAsImage: {
                pixelRatio: 5
              }
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              let tooltipHtml = ''
              if (typeof(params.value)[2] == "undefined") {
                for(let i = 0; i < tempTooltipData.length; i++) {
                  let list = tempTooltipData[i]
                  if(params.name === list.name) {
                    tooltipHtml = `${params.name}：${params.value}
                                  </br>
                                  Android：${list.Android}(${((list.Android/params.value)*100).toFixed(2)})%
                                  </br>
                                  IOS：${list.Ios}(${((list.Ios/params.value)*100).toFixed(2)})%`
                  }
                }
              }else {
                tooltipHtml = `${params.name}：${params.value}`
              }
              return tooltipHtml
            }
          },
          visualMap: {
            type: 'continuous',
            show: true,
            min: 0,
            max: 10000,
            left: 'left',
            top: 'bottom',
            text: ['高 ', '低 '], // 文本，默认为数值文本
            calculable: true,
            // seriesIndex: [0],
            inRange: {
              // color: ['#3B5077', '#031525'] // 蓝黑
              // color: ['#ffc0cb', '#800080'] // 红紫
              // color: ['#3C3B3F', '#605C3C'] // 黑绿
              // color:['#3C3B3F','#EE2C2C']//黑红
              color: ['lightskyblue', 'yellow', 'orangered']
              // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
              // color: ['#23074d', '#cc5333'] // 紫红
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#1488CC', '#2B32B2'] // 浅蓝
              // color: ['#00467F', '#A5CC82'] // 蓝绿
            }
          },
          series: [{
            name: 'chinaMap',
            type: 'map',
            mapType: 'china',
            roam: true,

            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: true
              }
            },
            geo: {
              show: true,
              map: 'china',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#3B5077',
                },
                emphasis: {
                  areaColor: '#2B91B7',
                }
              }
            },

            data: this.convertMapDta,
            zlevel: 3
          }]
        }
      }
    },
    methods: {
      initChart() {
        const charDiv = document.getElementById("longin-city")
        this.chart = echarts.init(charDiv, 'macarons')
        this.chart.setOption(this.option, true)
        
        // this.addPie()
        this.addOtherPie()
        this.chart.setOption(this.option, true)

        // let _that = this
        // this.chart.on('georoam', function(params){
        //   _that.addOtherPie()
        //   _that.resetPie(params, _that.typeIndex)
        // })

        // this.chart.on('datarangeselected', function(params) {
        //   _that.addOtherPie()
        //   _that.resetPie(params, _that.typeIndex)
        // })
      },
      resetPie(params, typeIndex) {
        let op = this.chart.getOption()
        let ops = op.series
        ops.forEach((v, i) => {
          if (i > 0) {
            let geoCoord = this.geoCoordMap[v.name]
            let p = this.chart.convertToPixel({
              seriesIndex: 0
            }, geoCoord)
            v.center = p
            if (params != 0 && params.zoom) {
              v.radius = v.radius * params.zoom;
            }
            if (params != 0 && params.selected) {
              let rangeFirstNumber = params.selected[0]
              let rangeSecondNumber = params.selected[1]
              let pd = v.data[typeIndex].value
              if (pd < rangeFirstNumber || pd > rangeSecondNumber) {
                v.itemStyle.normal.opacity = 0
              } else {
                v.itemStyle.normal.opacity = 1
              }
            }
          }
        })
        
        this.chart.setOption(op, true)
      },
      addPie() {
        let op = this.chart.getOption()
        let sd = this.option.series
        for (let i = 0; i < this.pieData.length; i++) {
          let randomValue = 12
          let radius = randomValue
          let geoCoord = this.geoCoordMap[this.pieData[i].name]
          if (geoCoord) {
            let list = this.pieData[i].value
            for(let j = 0; j < list.length; j++) {
              list[j].visualMap = false
            }
            
            let p = this.chart.convertToPixel({
              seriesIndex: 0
            }, geoCoord)
            sd.push({
              name: this.pieData[i].name,
              type: 'pie',
              radius: radius,
              center: p,
              data: list,
              zlevel: 4,
              tooltip: {
                formatter: '{a}<br/>{b}: {c} ({d}%)'
              },
              label: {
                normal: {
                  show: false,
                },
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                opacity: 0.2
              }
            })
          }
        }
        return sd
      },
      addOtherPie() {
        let pix = this.chart.convertToPixel({
          seriesIndex: 0
        }, [145.029096, 41.396767])
        
        let tempObj = {
          name: '未知',
          type: 'pie',
          // roseType: 'radius',
          tooltip: {
            formatter: function (params) {
              return params.seriesName + "<br/>" + params.name + " : " + params.value
            }
          },
          radius: 50,
          center: pix,
          data: this.otherPieData,
          zlevel: 4,
          tooltip: {
            formatter: '{a}<br/>{b}: {c} ({d}%)'
          },
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            opacity: 0.2
          }
        }
        this.option.series.push(tempObj)
      }
    }
  }
</script>

<style>
</style>