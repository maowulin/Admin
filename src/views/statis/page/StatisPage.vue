<template>
	<div>

		<div class="user_head2">

			<el-date-picker v-model="presentDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" :default-value="defaultDate" @change="dateChange">

			</el-date-picker>

			<el-button @click="getCvs">导出cvs</el-button>

			<el-button @click="isChart">{{buttonText}}</el-button>

			<paging :total="totalRecords" v-on:getSize="getBasiedSize" v-on:getPage="getBasiedPage"></paging>

		</div>
		<div v-if="chartShow" class="chart-bord">

			<line-chart v-for="item in chartsGroup" class="line-chart" :key="item.group" :charts-id="item.id" :chart-title="item.chartTitle" :chart-unit="item.hcartUnit" :charts-data="item.items" :table-data="tableData"></line-chart>

		</div>

		<div v-else>

			<my-checkbox v-on:change="boxChange" :labeles="columns" :default-checked="defaultHead"></my-checkbox>

			<egrid class="egrid" 
				fit 
				:key="key" 
				:data="tableData" 
				:columns="newColumns" 
				:columns-schema="columnsSchema" 
				:columns-props="columnsProps" 
				:column-type="columnType" 
				:columns-handler="columnsHandler">

			</egrid>

		</div>

	</div>
</template>

<script>
	import MyCheckbox from '@/components/Checkbox/CheckboxGroup'

	import Paging from '@/components/Paging'

	import LineChart from '@/components/Echarts/LineChart'

	import { getStatis, getStatisCvs } from '@/api/statis'

	import { getChecked } from '@/method'

	// 操作按钮

	var Btn = {

	  template: `<el-button class="click-btn" @click="todo" type="primary" icon="el-icon-view">查看</el-button>`,

	  props: ['row'],

	  methods: {

	    todo() {
	      this.$emit('row-check', this.row)

	      this.$set(this.row, '_edit', !this.row._edit)
	    }

	  }

	}

	export default {

	  components: {

	    MyCheckbox,

	    Paging,

	    LineChart

	  },

	  props: ['columns', 'chartGroup', 'reUrl', 'reType', 'cvsUrl', 'isSecond', 'requestData'],

	  data() {
	    return {

	      presentDate: '',

	      tableData: [],

	      totalRecords: 0,

	      chartShow: false,

	      buttonText: '图表',

	      defaultDate: '2017-10-19',

	      newColumns: [],

	      columnsSchema: {
	        '日期': {
	          width: '120px'
	        }
	      },

	      columnsProps: {

	        align: 'center',

	        sortable: true

	      },

	      columnType: '',

	      key: 1, // table key

	      checkboxVal: [] // checkboxVal

	    }
	  },

	  created() {
	    this.boxChange(this.defaultHead)

	    this.getData()
	  },

	  computed: {

	    defaultHead: function() {
	      const tempArray = []

	      for (let i = 0; i < this.columns.length; i++) {
	        const list = this.columns[i]

	        if (list.isDefaultHead) {
	          tempArray.push(list.label)
	        }
	      }

	      return tempArray
	    },

	    chartsGroup: function() {
	      const tempArray = []

	      for (let i = 0; i < this.chartGroup.length; i++) {
	        const item = this.chartGroup[i]

	        const tempObject = {}

	        tempObject.items = []

	        for (let j = 0; j < this.columns.length; j++) {
	          const list = this.columns[j]

	          if (item.group === list.chartGroup) {
	            tempObject.items.push(list)
	          }
	        }

	        tempObject.chartTitle = item.title

	        tempObject.hcartUnit = item.unit

	        tempObject.id = item.id

	        tempArray.push(tempObject)
	      }

	      return tempArray
	    }

	  },

	  methods: {

	    getData() {
	      getStatis(this.reUrl, this.reType, this.requestData).then(response => {
	        if (response.data) {
	          response = response.data
	        }

	        this.tableData = response.items

	        this.totalRecords = response.totalRecords
	      }).catch(error => {
	        console.log(error)
	      })
	    },

	    boxChange(val) {
	      this.newColumns = getChecked(val, this.columns)
	    },

	    dateChange(val) {
	      if (val === '') return

	      if (this.requestData.beginTime) {
	        this.requestData.beginTime = val[0]

	        this.requestData.endTime = val[1]
	      } else if (this.requestData.startDate) {
	        this.requestData.startDate = val[0]

	        this.requestData.endDate = val[1]
	      }

	      this.getData()
	    },

	    getBasiedSize(pageSize) {
	      this.requestData.pageSize = pageSize

	      this.getData()
	    },

	    getBasiedPage(pageNow) {
	      this.requestData.pageNow = pageNow

	      this.getData()
	    },

	    getCvs() {
	      getStatisCvs(this.cvsUrl, this.requestData.beginTime, this.requestData.endTime)
	    },

	    isChart() {
	      this.chartShow = !this.chartShow

	      if (this.chartShow) {
	        this.buttonText = '表格'
	      } else {
	        this.buttonText = '图表'
	      }
	    },

	    columnsHandler(cols) {
	      const _isRowCheck = this.isRowCheck

	      if (this.isSecond) {
	        return cols.concat({

	          label: '操作',

	          fixed: 'right',

	          width: 80,

	          component: Btn,

	          listeners: {

	            'row-check'(row) {
	              _isRowCheck(row)
	            }

	          }

	        })
	      } else {
	        return ''
	      }
	    },

	    isRowCheck(row) {
	      this.$emit('is-check', row)
	    }

	  }

	}
</script>

<style>
	.user_head2 {
		line-height: 2;
	}
	
	.user_head2 .el-button {
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
	
	.click-btn {
		width: 60px;
		height: 32px;
		padding: 7px 3px;
		font-size: 14px;
	}

</style>