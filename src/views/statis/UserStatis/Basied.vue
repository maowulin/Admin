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
	    
	    <el-button type="primary" icon="el-icon-download">导出CVS</el-button>
	    <el-button type="primary" icon="el-icon-download">图表</el-button>
		</div>
    
		<my-checkbox v-on:change="boxChange" :labeles="columns" :default-checked="checkboxVal"></my-checkbox>
    
    <egrid class="egrid"
  		fit 
  		highlight-current-row
  		border
  		:key="key"
      :data="tableData"
      :columns="columns"
      :columns-schema="columnsSchema"
      :columns-props="columnsProps"
      :column-type="columnType">
    </egrid>
    
	</div>
</template>

<script>
	import MyCheckbox from '@/components/Checkbox/CheckboxGroup'
	
	const defaultFormThead = ['新游客用户', '新普通会员', '新注册用户', '新注册并进入游戏数', '新VIP用户', '未续费用户', '购买金币数'] // 默认选中项
	export default {
		components: {
			MyCheckbox
		},
	  data() {
	    return {
	    	presentDate: "",
	      tableData: [],
	      columns: [{
	        'label': '新游客用户',
	        'prop': 'guestNum',
	        '新游客用户': 'guestNum'
	      },{
	        'label': '新普通会员',
	        'prop': 'bindingPhoneUserNum',
	        '新普通会员': 'bindingPhoneUserNum'
	      },{
	        'label': '新注册用户',
	        'prop': 'newUserNum',
	        '新注册用户': 'newUserNum'
	      },{
	        'label': '新注册并进入游戏数',
	        'prop': 'newUserEnterGameNum',
	        '新注册并进入游戏数': 'newUserEnterGameNum'
	      },{
	        'label': '新VIP用户',
	        'prop': 'newVipNum',
	        '新VIP用户': 'newVipNum'
	      },{
	        'label': '未续费用户',
	        'prop': 'limitedNum',
	        '未续费用户': 'limitedNum'
	      },{
	        'label': '购买金币数',
	        'prop': 'goldNum',
	        '购买金币数': 'goldNum'
	      },{
	        'label': '绑定且登陆人数',
	        'prop': 'bindfacNum',
	        '绑定且登陆人数': 'bindfacNum'
	      },{
	        'label': '新注册用户付费比',
	        'prop': 'vipPayRatio',
	        '新注册用户付费比': 'vipPayRatio'
	      },{
	        'label': '新用户付费金额  ',
	        'prop': 'newUserPayNum',
	        '新用户付费金额': 'newUserPayNum'
	      },{
	        'label': '新用户付费金额比  ',
	        'prop': 'newUserPayRatio',
	        '新用户付费金额比': 'newUserPayRatio'
	      },{
	        'label': '付费率',
	        'prop': 'payedRatio',
	        '付费率': 'payedRatio'
	      },{
	        'label': 'ARPU',
	        'prop': 'ARPU',
	        'ARPU': 'ARPU'
	      },{
	        'label': 'ARPPU',
	        'prop': 'ARPPU',
	        'ARPPU': 'ARPPU'
	      },{
	        'label': '营收',
	        'prop': 'revenue',
	        '营收': 'revenue'
	      },{
	        'label': 'VIP收入',
	        'prop': 'vipIncome',
	        'VIP收入': 'vipIncome'
	      },{
	        'label': '新增设备数',
	        'prop': 'newImeis',
	        '新增设备数': 'newImeis'
	      },{
	        'label': '最高在线人数',
	        'prop': 'maxAppOnlineNum',
	        '最高在线人数': 'maxAppOnlineNum'
	      },{
	        'label': '平均在线人数',
	        'prop': 'avgAppOnlineNum',
	        '平均在线人数': 'avgAppOnlineNum'
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
//	      this.key = this.key + 1// 为了保证table 每次都会重渲 （牺牲性能保证效果，当然也可以不用）
	    }
	  },
	  methods: {
	  	boxChange(val) {
	  		console.log(val);
				this.checkboxVal = val;
	  	},
	  	tabClick(tab, event) {
	  		
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
</style>