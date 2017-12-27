<template>
	<section>
		<div class="user_head">
		  <my-search :message="message" :option-value="logsVal" v-on:searchClick="logsSearch"></my-search>
			
			<paging :total="totalRecords" v-on:getSize="getLogsSize" v-on:getPage="getLogsPage"></paging>
		</div>
		
		<egrid class="egrid"
  		fit
      :data="tableData"
      :columns="columns"
      :columns-schema="columnsSchema"
      :columns-props="columnsProps"
      :column-type="columnType">
   </egrid>
	</section>
</template>

<script>
	import Paging from '@/components/Paging/'
	import MySearch from '@/components/Search/'
	
	export default {
		data() {
			return {
				message: "",
				totalRecords: 0,
				tableData: [],
				columns: [{
					'label': "序号",
					'prop': "serial"
				},{
					'label': "操作人",
					'prop': ''
				},{
					'label': "操作人",
					'prop': ''
				},{
					'label': "操作类型",
					'prop': ''
				},{
					'label': "操作内容",
					'prop': ''
				},{
					'label': "操作时间",
					'prop': ''
				}],
				logsVal: [{
					'opti': "操作类型",
					'val': ""
				},{
					'opti': "添加管理员",
					'val': "1"
				},{
					'opti': "删除管理员",
					'val': "1"
				},{
					'opti': "编辑管理员",
					'val': "1"
				},{
					'opti': "添加角色",
					'val': "1"
				},{
					'opti': "编辑角色",
					'val': "1"
				},{
					'opti': "删除角色",
					'val': "1"
				},{
					'opti': "发布版本",
					'val': "1"
				},{
					'opti': "修改用户信息",
					'val': "1"
				},{
					'opti': "导出地址信息",
					'val': "1"
				},{
					'opti': "修改战队信息",
					'val': "1"
				},{
					'opti': "发布赛事信息",
					'val': "1"
				},{
					'opti': "变更赛事信息",
					'val': "1"
				},{
					'opti': "赛事信息推送",
					'val': "1"
				},{
					'opti': "删除帖子",
					'val': "1"
				}],
				columnsSchema: {},
				columnsProps: {
					sortable: true,
					align: "center"
				},
				columnType: ""
			}
		},
		components: {
			Paging,
			MySearch
		},
		methods: {
			getData() {
				
			},
			logsSearch(select, input) {
				
			},
			getLogsSize(pageSize) {
				
			},
			getLogsPage(pageNow) {
				
			}
		}
	}
</script>

<style>
</style>