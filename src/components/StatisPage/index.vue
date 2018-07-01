<template>
	<div>
		<div class="user_head2">
			<el-date-picker
	      v-model="presentDate"
	      type="daterange"
	      start-placeholder="开始日期"
	      end-placeholder="结束日期"
	      value-format="yyyy-MM-dd"
	      :default-value="defaultDate"
	      @change="dateChange">
	    </el-date-picker>
	    
	    <el-button @click="getCvs">导出cvs</el-button>
	    <el-button @click="isChart">{{buttonText}}</el-button>
	    
	    <paging :total="totalRecords" v-on:getSize="getBasiedSize" v-on:getPage="getBasiedPage"></paging>
		</div>
    
    <div v-if="chartShow" class="chart-bord">
    	<line-chart :chart-title="chartTitle" :chart-unit="chartUnit" :charts-data="columns" :table-data="tableData" ></line-chart>
    </div>
		
    <div v-else>
    	<my-checkbox v-on:change="boxChange" :labeles="columns" :default-checked="defaultHead"></my-checkbox>
    	
    	<egrid class="egrid"
	  		fit 
	  		highlight-current-row
	  		:key="key"
	      :data="tableData"
	      :columns="newColumns"
	      :columns-schema="columnsSchema"
	      :columns-props="columnsProps"
	      :column-type="columnType">
	    </egrid>
    </div>
    
	</div>
</template>

<script>
	import MyCheckbox from '@/components/Checkbox/CheckboxGroup'
	import Paging from '@/components/Paging'
	import LineChart from '@/components/Echarts/LineChart'
	import {getStatis} from '@/api/statis'
	import {getDate, getChecked} from '@/method'
	
	export default {
		components: {
			MyCheckbox,
			Paging,
			LineChart
		},
		props: ['columns', 'chartTitle', 'chartUnit', 'reUrl', 'reType'],
	  data() {
	    return {
	    	presentDate: '',
	      tableData: [],
	      totalRecords: 0,
	      chartShow: false,
	      buttonText: '图表',
	      requestData: {
	      	beginTime: getDate(10),
	      	endTime: getDate(0),
	      	pageNow: 0,
	      	pageSize: 10
	      },
	      defaultDate: '2017-10-19',
	      newColumns: [],
	      columnsSchema: {},
	      columnsProps: {
	      	align: "center"
	      },
	      columnType: "",
	      key: 1, // table key
	      checkboxVal: [] // checkboxVal
	    }
	  },
	  created() {
	  	this.boxChange(this.defaultHead);
	  	this.getData();
	  },
	  computed: {
	  	defaultHead: function() {
	  		let tempArray = [];
	  		for(let i = 0; i < this.columns.length; i++) {
	  			let list = this.columns[i];
	  			if(list.isDefaultHead) {
	  				tempArray.push(list.label);
	  			}
	  		}
	  		
	  		return tempArray;
	  	}
	  },
	  methods: {
	  	getData() {
	  		getStatis(this.reUrl, this.reType, this.requestData).then(response => {
	  			this.tableData = response.items;
	  			this.totalRecords = response.totalRecords;
	  		}).catch(error => {
	  			console.log(error);
	  		});
	  	},
	  	boxChange(val) {
	  		this.newColumns = getChecked(val, this.columns);
	  	},
	  	dateChange(val) {
	  		if(val === '') return;
	  		this.requestData.beginTime = val[0];
	  		this.requestData.endTime = val[1];
	  		this.getData();
	  	},
	  	getBasiedSize(pageSize) {
	  		this.requestData.pageSize = pageSize;
	  		this.getData();
	  	},
	  	getBasiedPage(pageNow) {
	  		this.requestData.pageNow = pageNow;
	  		this.getData();
	  	},
	  	getCvs() {
	  		
	  	},
	  	isChart() {
	  		this.chartShow = !this.chartShow;
	  		if(this.chartShow) { 
	  			this.buttonText = '表格'
	  		}else {
	  			this.buttonText = '图表'
	  		}
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
</style>