<template>
	<section>
		<div class="user_head">
			<my-select :message="message1" :option-value="optionValue1" v-on:selectChange="orderBuyWay"></my-select>

			<my-search :message="message3" :option-value="optionValue3" v-on:searchClick="orderPhone"></my-search>

			<paging :total="totalRecords" v-on:getSize="getFightSize" v-on:getPage="getFightPage"></paging>
		</div>

		<egrid v-loading="loading" class="egrid" fit :data="tableData" :columns="columns" :columns-schema="columnsSchema" :columns-props="columnsProps"
		 :column-type="columnType" >
		</egrid>
	</section>
</template>

<script>
	import { getCircle } from '@/api/management'
	import Paging from '@/components/Paging/'
	import MySelect from '@/components/Select/'
	import MySearch from '@/components/Search/'

	const Circle = {
		template: `<div>
								<span v-if="row.status === -1">已删除</span>
								<span v-else-if="row.status === 0">正常</span>
							</div>`,
		props: ['row']
	}

	export default {
		components: {
			Paging,
			MySelect,
			MySearch
		},
		data() {
			return {
				message1: "",
				message3: "",
				totalRecords: 0,
				tableData: [],
				loading: false,
				dialogVisible: false,
				requestData: {
					status   : '',
					type     : '',
					like     : '',
					pageNow  : 0,
					pageSize : 10
				},
				optionValue3: [{
					"opti": "搜索内容",
					"val": ""
				}, {
					"opti": "发起人绰号",
					"val": "1"
				}, {
					"opti": "圈标题",
					"val": "2"
				},{
					"opti": "所属战队",
					"val": "3"
				}],
				optionValue1: [{
					"opti": "圈状态",
					"val": ""
				}, {
					"opti": "已删除",
					"val": "-1"
				}, {
					"opti": "正常",
					"val": "0"
				}, {
					"opti": "已锁定",
					"val": "1"
				}],
				columns: [{
					"label": "序号",
					"prop": "serial"
				}, {
					"label": "发起人昵称",
					"prop": "userName"
				}, {
					"label": "所属部落",
					"prop": "post_circle_name"
				}, {
					"label": "发表时间",
					"prop": "createTime"
				}, {
					"label": "圈标题",
					"prop": "title"
				}, {
					"label": "浏览数",
					"prop": "pageView"
				}, {
					"label": "评论数",
					"prop": "replies"
				}, {
					"label": "圈状态",
					"prop": "status"
				}],
				columnsProps: {
					align: "center",
					sortable: true
				},
				columnsSchema: {
					'圈状态': {
						component: Circle
					}
				},
				columnType: ""
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				this.loading = true
				getCircle(this.requestData).then(response => {
					this.loading = false
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
			orderBuyWay(val) {
				this.requestData.status = val
				this.getData()
			},
			orderPhone(select, input) {
				this.requestData.type = select
				this.requestData.like = input
				this.getData()
			},
			getFightSize(pageSize) {
				this.requestData.pageSize = pageSize
				this.getData()
			},
			getFightPage(pageNow) {
				this.requestData.pageNow = pageNow;
				this.getData()
			}
		}
	}
</script>

<style>
	.click-btn {
		width: 60px;
		height: 32px;
		padding: 7px 3px;
		font-size: 14px;
	}
</style>