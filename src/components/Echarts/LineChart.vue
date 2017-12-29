<template>
	<div id="lineCharts" style="width: 100%; height: 500px;"></div>
</template>

<script>
	import echarts from 'echarts'
	
	export default {
		props: [ 'chartsData', 'tableData', "chartTitle", "chartUnit"],
		data() {
			return {
				chart: null
			}
		},
		mounted() {
			this.initCharts();
		},
		beforeDestroy() {
			if (!this.chart) {
	      return
	    }
	    this.chart.dispose();
	    this.chart = null;
		},
		computed: {
			legendData: function() {
				let tempArray = [];
				for(let i = 0; i < this.chartsData.length; i++) {
					if(this.chartsData[i].isChart) {
						tempArray.push(this.chartsData[i].label);
					}
				}
				return tempArray;
			},
			
			seriesData: function() {
				let tempArray = [];
				for(let i = 0; i < this.chartsData.length; i++) {
					let list = this.chartsData[i];
					let tempData = [];
					if(list.isChart) {
						for(let j = 0; j < this.tableData.length; j++) {
							let item = this.tableData[j];
							tempData.push(item[list.prop]);
						}
						
						let tempObj = {
		          name: list.label,
		          type: list.chartType,
		          smooth: true,
		          symbol: 'circle',
		          symbolSize: 5,
		          showSymbol: false,
		          lineStyle: {
		            normal: {
		              width: 1
		            }
		          },
		          areaStyle: {
		            normal: {
		              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                offset: 0,
		                color: list.areaColor1
		              }, {
		                offset: 0.8,
		                color: list.areaColor2
		              }], false),
		              shadowColor: 'rgba(0, 0, 0, 0.1)',
		              shadowBlur: 10
		            }
		          },
		          itemStyle: {
		            normal: {
		              color: list.itemColor1,
		              borderColor: list.itemColor2,
		              borderWidth: 12
		            }
		          },
		          data: tempData
		        }
					
						tempArray.push(tempObj);
					}
				}
				return tempArray;
			},
			
			xAxisData: function() {
				let tempArray = [];
				for(let i = 0; i < this.tableData.length; i++) {
					let list = this.tableData[i];
					tempArray.push(list.datetime);
				}
				
				return tempArray;
			},
			
			optiVal: function() {
				return {
	        backgroundColor: '#394056',
	        title: {
	          text: this.chartTitle,
	          textStyle: {
	            fontWeight: 'normal',
	            fontSize: 16,
	            color: '#F1F1F3'
	          },
	          left: '1%'
	        },
	        tooltip: {
	          trigger: 'axis',
	          axisPointer: {
	            lineStyle: {
	              color: '#57617B'
	            }
	          }
	        },
	        legend: {
	          icon: 'rect',
	          itemWidth: 14,
	          itemHeight: 5,
	          itemGap: 13,
	          data: this.legendData,
	          right: '4%',
	          textStyle: {
	            fontSize: 12,
	            color: '#F1F1F3'
	          }
	        },
	        grid: {
	          left: '3%',
	          right: '4%',
	          bottom: '3%',
	          containLabel: true
	        },
	        xAxis: [{
	          type: 'category',
	          boundaryGap: false,
	          axisLine: {
	            lineStyle: {
	              color: '#57617B'
	            }
	          },
	          data: this.xAxisData
	        }],
	        yAxis: [{
	          type: 'value',
	          name: this.chartUnit,
	          axisTick: {
	            show: false
	          },
	          axisLine: {
	            lineStyle: {
	              color: '#57617B'
	            }
	          },
	          axisLabel: {
	            margin: 10,
	            textStyle: {
	              fontSize: 14
	            }
	          },
	          splitLine: {
	            lineStyle: {
	              color: '#57617B'
	            }
	          }
	        }],
	        series: this.seriesData
	      }
			}
		},
		watch: {
			tableData() {
				this.chart.setOption(this.optiVal);
			}
		},
		methods: {
			initCharts() {
				this.chart = echarts.init(document.getElementById('lineCharts'));
				this.chart.setOption(this.optiVal);
				console.log(this.optiVal);
			}
		}
	}
</script>

<style>
	
</style>