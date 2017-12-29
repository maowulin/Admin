<template>
	<div>
		<div class="user_head2">
			<el-date-picker
	      v-model="presentDate"
	      type="daterange"
	      start-placeholder="开始日期"
	      end-placeholder="结束日期"
	      :default-value="defaultDate"
	      value-format="yyyy-MM-dd"
	      @change="dateChange">
	    </el-date-picker>
	    
	    <el-button>导出cvs</el-button>
	    <el-button>图表</el-button>
	    
	    <paging :total="totalRecords" v-on:getSize="getBasiedSize" v-on:getPage="getBasiedPage"></paging>
		</div>
    
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
</template>

<script>
	import MyCheckbox from '@/components/Checkbox/CheckboxGroup'
	import Paging from '@/components/Paging/'
	import LineChart from '@/components/Echarts/LineChart'
	import {getUserActivi} from '@/api/statis'
	import {getDate, getChecked} from '@/method'
	
	const defaultFormThead = ['日活用户数', '日活跃度', '周活用户数', '周活跃度', '月活用户数（APP）', '月活跃度', '累计启动用户', '启动次数'] // 默认选中项
	
	export default {
		components: {
			MyCheckbox,
			Paging,
			LineChart
		},
	  data() {
	    return {
	    	presentDate: "",
	      tableData: [],
	      totalRecords: 0,
	      columns: [{
	        'label': '日活用户数',
	        'prop': 'guestNum'
	      },{
	        'label': '日活跃度',
	        'prop': 'bindingPhoneUserNum'
	      },{
	        'label': '日活/月活',
	        'prop': 'newUserNum'
	      },{
	        'label': '周活用户数',
	        'prop': 'newUserEnterGameNum'
	      },{
	        'label': '周活跃度',
	        'prop': 'newVipNum'
	      },{
	        'label': '月活用户数（APP）',
	        'prop': 'limitedNum'
	      },{
	        'label': '月活跃度',
	        'prop': 'goldNum'
	      },{
	        'label': '月沉默用户',
	        'prop': 'bindfacNum'
	      },{
	        'label': '月沉默率',
	        'prop': 'vipPayRatio'
	      },{
	        'label': '流失用户  ',
	        'prop': 'newUserPayNum'
	      },{
	        'label': '流失率  ',
	        'prop': 'newUserPayRatio'
	      },{
	        'label': '累计启动用户',
	        'prop': 'payedRatio'
	      },{
	        'label': '启动次数',
	        'prop': 'ARPU'
	      }],
	      requestData: {
	      	beginTime: getDate().ten,
	      	endTime: getDate().dateLine,
	      	pageNow: 0,
	      	pageSize: 10
	      },
	      newColumns: [],
	      defaultDate: '2017-10-10',
	      columnsSchema: {},
	      columnsProps: {
	      	align: 'center'
	      },
	      columnType: "",
	      key: 1, // table key
	      checkboxVal: defaultFormThead, // checkboxVal
	      formThead: defaultFormThead, // 默认表头
	      groupLabls: [{
	      	'label': 'apple'
	      },{
	      	'label': 'banana'
	      },{
	      	'label': 'orange'
	      }]
	    }
	  },
	  watch: {
	    checkboxVal(valArr) {
//	      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
//	      this.key = this.key + 1// 为了保证table 每次都会重渲 
	    }
	  },
	  created() {
	  	this.boxChange(this.checkboxVal);
	  	this.getData();
	  },
	  methods: {
	  	getData() {
	  		getUserActivi(this.requestData).then(response => {
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
	  		
	  	}
	  }
	}
</script>

<style>
	.user_head2 .el-button{
	  height: 38px;
	}
	.el-range-editor.el-input__inner{
    width: 240px;
	}
</style>