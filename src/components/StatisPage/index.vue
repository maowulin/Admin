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
    	<my-checkbox v-on:change="boxChange" :labeles="columns" :default-checked="checkboxVal"></my-checkbox>
    	
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
	
	import {getDate, getChecked} from '@/method'
	//默认表头
	const defaultFormThead = ['新游客用户', '新普通会员', '新注册用户', '新注册并进入游戏数', '新VIP用户', '未续费用户', '购买金币数']
	
	export default {
		name: 'StatisPage',
		components: {
			MyCheckbox,
			Paging,
			LineChart
		},
		props: ['getUserBasied'],
	  data() {
	    return {
	    	presentDate: '',
	      tableData: [],
	      totalRecords: 0,
	      chartShow: false,
	      buttonText: '图表',
	      chartTitle: '用户数据',
	      chartUnit: '单位（数）',
	      columns: [{
	        'label': '新游客用户', // 表头及复选框文字
	        'prop': 'guestNum',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '新普通会员',
	        'prop': 'bindingPhoneUserNum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '新注册用户',
	        'prop': 'newUserNum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '新注册并进入游戏数',
	        'prop': 'newUserEnterGameNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '新VIP用户',
	        'prop': 'newVipNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '未续费用户',
	        'prop': 'limitedNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '购买金币数',
	        'prop': 'goldNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '绑定且登陆人数',
	        'prop': 'bindfacNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '新注册用户付费比',
	        'prop': 'vipPayRatio',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '新用户付费金额  ',
	        'prop': 'newUserPayNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '新用户付费金额比  ',
	        'prop': 'newUserPayRatio',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '付费率',
	        'prop': 'payedRatio',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': 'ARPU',
	        'prop': 'ARPU',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': 'ARPPU',
	        'prop': 'ARPPU',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '营收',
	        'prop': 'revenue',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': 'VIP收入',
	        'prop': 'vipIncome',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '新增设备数',
	        'prop': 'newImeis',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '最高在线人数',
	        'prop': 'maxAppOnlineNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '平均在线人数',
	        'prop': 'avgAppOnlineNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      }],
	      requestData: {
	      	beginTime: getDate().ten,
	      	endTime: getDate().dateLine,
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
	      checkboxVal: defaultFormThead, // checkboxVal
	    }
	  },
	  watch: {
	    checkboxVal(valArr) {
	    	
	    }
	  },
	  created() {
	  	this.boxChange(this.checkboxVal);
	  	this.getData();
	  },
	  computed: {
	  	defaultThed: function() {
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
	  		getUserBasied(this.requestData).then(response => {
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