<template>
	<div>
		<div class="user_head" v-show="isReport">
  	  <my-search :message="repMessage" :option-value="optionValue1" v-on:searchClick="repSearch"></my-search>
  	  <paging :total="repTotalRecords" v-on:getSize="getRepSize" v-on:getPage="getRepPage" ></paging>
		</div>
	  <div class="user_head" v-show="!isReport">
  	  <my-search :message="ticMessage" :option-value="optionValue2" v-on:searchClick="ticSearch"></my-search>
  	  <paging :total="ticTotalRecords" v-on:getSize="getTicSize" v-on:getPage="getTicPage" ></paging>
	  </div>
		<el-tabs type="border-card" @tab-click="tabClick">
		  <el-tab-pane label="举报">
		  	<egrid class="egrid"
		  		fit
		      :data="repTableData"
		      :columns="repColumns"
		      :columns-schema="repColumnsSchema"
					:columns-props="repColumnsProps"
					v-loading="repload"
		      :column-type="repColumnType">
			  </egrid>
		  </el-tab-pane>
		  <el-tab-pane label="反馈">
		  	<egrid class="egrid"
		  		fit
		  		show-overflow-tooltip
		      :data="ticTableData"
		      :columns="ticColumns"
		      :columns-schema="ticColumnsSchema"
		      :columns-props="ticColumnsProps"
					:column-type="ticColumnType"
					v-loading="ticload">
			  </egrid>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
  import {getReportData, getTickingData} from '@/api/query'
  import Paging from '@/components/Paging/'
  import MySelect from '@/components/Select/'
  import MySearch from '@/components/Search/'
  
  export default {
  	data() {
  		return {
  			repMessage: "用户昵称",
				ticMessage: "用户昵称",
				repload: false,
				ticload: false,
  			repTotalRecords: 0,
  			ticTotalRecords: 0,
  			isReport: true,   //
  			repTableData: [], //举报表数据
  			ticTableData: [], //反馈表数据
  			repPaging: "rep",
  			ticPaging: "tic",
  			optionValue1: [{
  				'opti': "用户昵称",
  				'val': ""
  			}],
  			optionValue2: [{
  				'opti': "用户昵称",
  				'val': ""
  			}],
  			
  			repRequestData: {
  				like: '',
  				pageSize: 10,
  				pageNow: 0
  			},
  			ticRequestData: {
  				like: '',
  				pageSize: 10,
  				pageNow: 0
  			},
  			
  			repColumns: [{
  				"label": '序号',
  				"prop": 'serial'
  			},{
  				"label": '时间',
  				"prop": 'date'
  			},{
  				"label": '类型',
  				"prop": 'type'
  			},{
  				"label": '用户昵称',
  				"prop": 'uname'
  			},{
  				"label": '内容',
  				"prop": 'content'
  			}],
  			ticColumns: [{
  				"label": '序号',
  				"prop": 'serial'
  			},{
  				"label": '时间',
  				"prop": 'date'
  			},{
  				"label": '用户',
  				"prop": 'uname'
  			},{
  				"label": '内容',
  				"prop": 'content'
  			}],
  			
  			repColumnsSchema: {
  				'序号': {
  					width: "60px"
  				}
  			},
  			ticColumnsSchema: {
  				'序号': {
  					width: "60px"
  				},
  				'内容': {
  					'width': '700px',
						'sortable': false,
						'show-overflow-tooltip': true
  				}
  			},
  			
  			repColumnsProps: {
  				align: "center",
        	sortable: true
  			},
  			ticColumnsProps: {
  				align: "center",
        	sortable: true
  			},
  			
  			repColumnType: "",
  			ticColumnType: ""
  		}
  	},
  	components: {
  	  Paging,
  	  MySelect,
  	  MySearch
  	},
  	created(){
  		this.getRepData()
  	},
  	methods: {
  		getRepData() {
				this.repload = true
				getReportData(this.repRequestData).then(response => {
  				this.repload = false
  				this.repTotalRecords = response.recordsPerPage
  				this.repTableData = response.items
  			}).catch(error => {
  				this.$message({
						showClose: true,
						message: '服务器错误',
						type: 'error'
					})
  			})
  		},
  		getTicData() {
				this.ticload = true
  			getTickingData(this.ticRequestData).then(response => {
					this.ticload = false
  				this.ticTotalRecords = response.recordsPerPage
  				this.ticTableData = response.items
  			}).catch(error => {
  				this.$message({
						showClose: true,
						message: '服务器错误',
						type: 'error'
					})
  			})
  		},
  		
  		repSearch(select, input) {
  			this.repRequestData.like = input
  			this.getRepData()
  		},
  		getRepSize(pageSize) {
  			this.repRequestData.pageSize = pageSize
  			this.getRepData()
  		},
  		getRepPage(pageNow) {
  			this.repRequestData.pageNow = pageNow
  			this.getRepData()
  		},
  		
  		ticSearch(select, input) {
  			this.ticRequestData.like = input
  			this.getTicData()
  		},
  		getTicSize(pageSize) {
  			this.ticRequestData.pageSize = pageSize
  			this.getTicData()
  		},
  		getTicPage(pageNow) {
  			this.ticRequestData.pageNow = pageNow
  			this.getTicData()
  		},
  		tabClick(tab, event) {
  			if(tab.label == "举报"){
  				this.isReport = true
  				this.getRepData()
  			}else {
  				this.isReport = false
  				this.getTicData()
  			}
  		}
  	}
  }
</script>

<style>
	.el-tabs {
		margin-top: 10px;
	}
</style>