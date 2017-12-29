<template>
	<div>
		<div class="user_head2">
			<el-date-picker
	      v-model="presentDate"
	      type="daterange"
	      start-placeholder="开始日期"
	      end-placeholder="结束日期"
	      default-value="2017-12-27"
	      value-format="yyyy-MM-dd"
	      @change="dateChange">
	    </el-date-picker>
	    
	    <el-button>导出cvs</el-button>
	    <el-button>图表</el-button>
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
	import {getDate, getChecked} from '@/method'
	
	const defaultFormThead = ['新注册用户', '次日留存数', '3日留存数', '7日留存数', '月留存数（APP）'] // 默认选中项
	
	export default {
		components: {
			MyCheckbox
		},
	  data() {
	    return {
	    	presentDate: "",
	      tableData: [],
	      columns: [{
	        'label': '新注册用户',
	        'prop': 'guestNum'
	      },{
	        'label': '次日留存数',
	        'prop': 'bindingPhoneUserNum'
	      },{
	        'label': '次日留存率',
	        'prop': 'newUserNum'
	      },{
	        'label': '3日留存数',
	        'prop': 'newUserEnterGameNum'
	      },{
	        'label': '3日留存率',
	        'prop': 'newVipNum'
	      },{
	        'label': '7日留存数',
	        'prop': 'limitedNum'
	      },{
	        'label': '7日留存率',
	        'prop': 'goldNum'
	      },{
	        'label': '月留存数（APP）',
	        'prop': 'bindfacNum'
	      },{
	        'label': '月留存率',
	        'prop': 'vipPayRatio'
	      }],
	      newColumns: [],
	      columnsSchema: {},
	      columnsProps: {},
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
	  },
	  methods: {
	  	boxChange(val) {
	  		this.newColumns = getChecked(val, this.columns);
	  	},
	  	dateChange(val) {
	  		console.log(val);
	  	}
	  }
	}
</script>

<style>
	.user_head2 .el-button{
	  height: 38px;
	}
	.el-range-editor.el-input__inner {
    width: 240px;
	}
</style>