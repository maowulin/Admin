<template>
  <div id="create_join" style="width: 100%; height: 100%;"></div>
</template>

<script>
  require('echarts/theme/macarons')
  import echarts from 'echarts'
  import { coputedData } from '@/method'
  import { debounce } from '@/method'

  export default {
    props: ['createData', 'joinData'],
    data() {
      return {
        chart: null,
        autoResize: true
      }
    },
    created() {
      
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
      getDayTime() {
        let temp = []
        for(let i = 0;i < 24;i++){
            let hour = i < 10 ? '0' + i + ':00' : i + ':00';
            // let hour = i + ':00'
            hour.replace(/\s/, "")
            
            temp.push(hour)
        }
        return temp
      },

      getRandomData() {
        let temp = []
        for(let i = 0;i < 24;i++){
            let item = Math.random() * 100 - Math.random() * 50
            temp.push(Math.abs(item).toFixed(2))
        }
        return temp
      },

      getCreateData() {
        let temp = []
        let tempCreate = []

        for(let i = 0; i < this.createData.length; i++) {
          let list = this.createData[i]
          tempCreate.push(list.crate_time.substring(11, 16))
        }
        return coputedData(this.createData, tempCreate)
      },

      getJoinData() {
        let temp = []
        let tempJoin = []

        for(let i = 0; i < this.joinData.length; i++) {
          let list = this.joinData[i]
          tempJoin.push(list.join_time.substring(11, 16))
        }
        return coputedData(this.joinData, tempJoin)
      },

      option() {
        let tempMax = 0
        return {
          color: ['#66CCFF', '#CC6666', '#66CCCC', '#FF9999', '#CCFF99'],
          title: {
            text: '每日用户创建与加入房间对比',
            top: -5,
            left: 'center',
          },
          // grid.top需要根据容器高度调整
          grid: [{
            top: '11%',
            bottom: 0,
            left: '2%',
            right: '2%',
            height: '35%'
          }, {
            top: '51.5%',
            bottom: 0,
            left: '2%',
            right: '2%',
            height: '35%'
          }],
          tooltip: {
            trigger: 'axis',
            formatter: function(params){
              if(params instanceof Array){
                let idxMap = [{
                  text: '创建房间数',
                  data: []
                }, {
                  text: '加入房间数',
                  data: []
                }];
                let time = params[0].axisValue;
                for(let i = 0;i < params.length;i++){
                  let seriesIdx = params[i].seriesId.split(params[i].seriesId[0]);
                  idxMap[seriesIdx[2]].data.push({
                    marker: params[i].marker,
                    seriesName: params[i].seriesName,
                    data: params[i].data
                  });
                };
                
                return '<div>'
                  + '<time>' + time + '</time>'
                  + '<br />'
                  + idxMap.map(function(item){
                    return '<span>' + item.text + '</span>' + item.data.map(function(i_item){
                      return '<p style="margin: 0;padding: 0;">' + i_item.marker + i_item.seriesName + ': ' + i_item.data + '</p>';
                    }).join('')
                  }).join('')
                + '</div>'
              }
            }
          },
          axisPointer: {
            link: {
              xAxisIndex: 'all'
            }
          },
          legend: {
            data:['每日对比'],
            right: '20'
          },
          xAxis: [{
            type: 'category',
            gridIndex: 0,
            boundaryGap: false,
            axisLabel: {
              interval: 0
            },
            data: this.getDayTime
          }, {
            type: 'category',
            gridIndex: 1,
            position: 'top',
            boundaryGap: false,
            axisLabel: {
              show: false,
              interval: 0
            },
            data: this.getDayTime
          }],
          yAxis: [{
            name: '创建数',
            type: 'value',
            nameTextStyle: {
              fontSize: 14
            },
            min: 0,
            max: function(val) {
              tempMax = val.max
              return tempMax
            },
            gridIndex: 0,
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          }, {
            name: '加入数',
            type: 'value',
            nameTextStyle: {
              fontSize: 14
            },
            min: 0,
            max: function(val) {
              return tempMax
            },
            gridIndex: 1,
            inverse: true,
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          }],
          series: [
            {
              name:'',
              type:'line',
              data: this.getCreateData
            },
            {
              name:'',
              type:'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: this.getJoinData
            }
          ]
        }
      }
    },

    methods: {
      initChart() {
        const lineDiv = document.getElementById("create_join")
        this.chart = echarts.init(lineDiv, 'macarons')
        const opl = this.option
        this.chart.setOption(opl)
      }
    }
  }

</script>

<style>

</style>