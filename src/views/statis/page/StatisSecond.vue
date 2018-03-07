<template>
	<div v-loading="loading">
		<div class="user_head2">
	    <el-button @click="getCvs">导出cvs</el-button>
	    <el-button @click="isChart">{{buttonText}}</el-button>
			<el-button type="primary" class="back-button" @click="back">返回</el-button>
			
	    <paging :total="totalRecords" v-on:getSize="getBasiedSize" v-on:getPage="getBasiedPage"></paging>
			
		</div>
    
    <div v-if="chartShow" class="chart-bord">
    	<line-chart v-for="item in chartsGroup" class="line-chart" :key="item.group" :charts-id="item.id" :chart-title="item.chartTitle" :chart-unit="item.hcartUnit" :charts-data="item.items" :table-data="tableData" ></line-chart>
    </div>
		
    <div v-else>
    	<egrid class="egrid"
	  		fit 
	  		highlight-current-row
	  		:key="key"
	      :data="tableData"
	      :columns="columns"
	      :columns-schema="columnsSchema"
	      :columns-props="columnsProps"
	      :column-type="columnType">
	    </egrid>
    </div>
	</div>
</template>

<script>
	import Paging from '@/components/Paging'
	import LineChart from '@/components/Echarts/LineChart'
	import { getStatis, getStatisSecCvs } from '@/api/statis'
	import { getDate } from '@/method'

	const GuideHtml = {
		template: `<span>0.88</span>`
	}

	export default {
		components: {
			Paging,
			LineChart
		},
		props: ['columns', 'chartGroup', 'reUrl', 'reType', 'cvsUrl', 'columnsHandler', 'requestData'],
	  data() {
	    return {
	    	presentDate: '',
	      tableData: [],
	      totalRecords: 0,
	      chartShow: false,
	      buttonText: '图表',
				defaultDate: getDate().ten,
				loading: false,
	      newColumns: [],
	      columnsSchema: {
	      	'日期' : {
	      		width: '120px'
					},
					'新手引导领取': {
						component: GuideHtml
					}
	      },
	      columnsProps: {
	      	align: "center",
	      	sortable: true
	      },
	      columnType: "",
	      key: 1, // table key
	      checkboxVal: [] // checkboxVal
	    }
	  },
	  created() {
	  	this.getData();
	  },
	  computed: {
	  	chartsGroup: function() {
	  		let tempArray = [];
	  		for(let i = 0; i < this.chartGroup.length; i++) {
	  			let item = this.chartGroup[i];
	  			let tempObject = {};
	  			tempObject.items = [];
	  			for(let j = 0; j < this.columns.length; j++){
	  				let list = this.columns[j];
	  				if(item.group === list.chartGroup) {
	  					tempObject.items.push(list);
	  				}
	  			}
	  			tempObject.chartTitle = item.title;
	  			tempObject.hcartUnit = item.unit;
	  			tempObject.id = item.id;
	  			tempArray.push(tempObject);
	  		}
	  		return tempArray;
	  	}
	  },
	  methods: {
	  	getData() {
				this.loading = true
	  		getStatis(this.reUrl, this.reType, this.requestData).then(response => {
					this.loading = false
	  			if(response.data) {
	  				response = response.data
	  			}
	  			this.tableData = response.items
	  			this.totalRecords = response.totalRecords
	  		}).catch(error => {
	  			this.$message({
	          showClose: true,
	          message: '服务器错误',
	          type: 'error'
					})
					this.loading = false
	  		})
	  	},
	  	getBasiedSize(pageSize) {
	  		this.requestData.pageSize = pageSize;
	  		this.getData()
	  	},
	  	getBasiedPage(pageNow) {
	  		this.requestData.pageNow = pageNow;
	  		this.getData()
	  	},
	  	getCvs() {
	  		getStatisSecCvs(this.cvsUrl, this.requestData.time)
	  	},
	  	isChart() {
	  		this.chartShow = !this.chartShow
	  		if(this.chartShow) { 
	  			this.buttonText = '表格'
	  		}else {
	  			this.buttonText = '图表'
	  		}
	  	},
	  	back() {
	  		this.$emit('second-back', true)
	  	}
	  }
	}
</script>

<style>
	.user_head2 {
		line-height: 2;
	}
	.user_head2 .el-button{
	  height: 38px;
	}
	.el-range-editor.el-input__inner {
    width: 240px;
	}
	.chart-bord {
		margin-top: 10px;
	}
	
	.line-chart {
		margin-bottom: 10px;
	}
	
	.el-button {
    width: 60px;
    height: 32px;
    padding: 7px 3px;
    font-size: 14px;
	}
	
	.back-button {
		
	}
</style>