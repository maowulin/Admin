<template>
	<section>
		<div class="user_head">
			<my-select :message="message1" :option-value="optionValue1" v-on:selectChange="orderBuyWay"></my-select>

			<my-search :message="message3" :option-value="optionValue3" v-on:searchClick="orderPhone"></my-search>

			<paging :total="totalRecords" v-on:getSize="getFightSize" v-on:getPage="getFightPage"></paging>
		</div>

		<egrid class="egrid" fit :data="tableData" :columns="columns" :columns-schema="columnsSchema" :columns-props="columnsProps"
		 :column-type="columnType" :columns-handler="columnsHandler">
		</egrid>
	</section>
</template>

<script>
	import { getFightData } from '@/api/query'
	import Paging from '@/components/Paging/'
	import MySelect from '@/components/Select/'
	import MySearch from '@/components/Search/'

	var Btn = {
		template: `<div><el-button class="click-btn" @click="rowEdit" type="primary" icon="el-icon-edit">查看</el-button>
							<el-button class="click-btn" @click="rowDelete" type="danger" icon="el-icon-delete">删除</el-button></div>`,
		props: ['row'],
		methods: {
			rowEdit() {
				this.$emit('row-edit', this.row)
				this.$set(this.row, '_edit', !this.row._edit)
			},
			rowDelete() {
				this.$emit('row-delete', this.row)
			}
		}
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
				dialogVisible: false,
				requestData: {
					uname: "",
					game_over_type: "",
					pageNow: 0,
					pageSize: 10
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
					"label": "订单编号",
					"prop": "out_trade_no"
				}, {
					"label": "订单金额",
					"prop": "total_fee"
				}, {
					"label": "用户昵称",
					"prop": "uname"
				}, {
					"label": "用户手机号",
					"prop": "phone"
				}, {
					"label": "支付方式",
					"prop": "payment_type"
				}, {
					"label": "结束原因",
					"prop": "game_over_type"
				}, {
					"label": "订单状态",
					"prop": "orderStatus"
				}, {
					"label": "配送方式",
					"prop": "getWay"
				}, {
					"label": "创建日期",
					"prop": "createTime"
				}],
				columnsProps: {
					align: "center",
					sortable: true
				},
				columnsSchema: {
					
				},
				columnType: ""
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				getFightData(this.requestData).then(response => {
					console.log(response)
					this.tableData = response.items
					this.totalRecords = response.totalRecords
				}).catch(error => {
					console.log(error)
				})
			},
			orderBuyWay(val) {
				this.requestData.game_over_type = val
				this.getData()
			},
			orderSendWay(select, input) {
				this.requestData.uname = input
				this.getData()
			},
			orderStatus(select, input) {
				this.requestData.uname = input
				this.getData()
			},
			orderPhone(select, input) {
				this.requestData.uname = input
				this.getData()
			},
			getFightSize(pageSize) {
				this.requestData.pageSize = pageSize
				this.getData()
			},
			getFightPage(pageNow) {
				this.requestData.pageNow = pageNow;
				this.getData()
			},
			orderEdit(row) {
	      this.dialogVisible = true
			},
			columnsHandler(cols) {
				let edt = this.orderEdit
				return cols.concat({
					label: '操作',
					fixed: 'right',
					width: 180,
					component: Btn,
					listeners: {
						'row-edit'(row) {
							edt(row)
						},
						'row-delete'(row) {
							console.log("删除")
						}
					}
				})
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