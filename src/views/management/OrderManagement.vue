<template>
		<section>
			<div class="user_head">
				<my-select :message="message1" :option-value="optionValue1" v-on:selectChange="orderBuyWay"></my-select>

				<my-select :message="message2" :option-value="optionValue2" v-on:selectChange="orderSendWay"></my-select>

				<my-select :message="message4" :option-value="optionValue4" v-on:selectChange="orderStatus"></my-select>

				<my-search :message="message3" :option-value="optionValue3" v-on:searchClick="orderPhone"></my-search>
				
				<paging :total="totalRecords" v-on:getSize="getFightSize" v-on:getPage="getFightPage"></paging>
			</div>
			
			<egrid class="egrid"
				fit
				:data="tableData"
				:columns="columns"
				:columns-schema="columnsSchema"
				:columns-props="columnsProps"
				:column-type="columnType"
				:columns-handler="columnsHandler">
		 </egrid>

		 <el-dialog
			title="收获地址信息"
			:visible.sync="dialogVisible"
			width="30%">

			<el-form :model="orderInfo" :inline="true" status-icon ref="orderInfo" label-width="120px" class="demo-ruleForm">
				<h5>商品信息</h5>
				<el-form-item label="商品信息" prop="pass">
					<span>{{orderInfo.name}}</span>
				</el-form-item>
				<el-form-item label="商品详情" prop="checkPass">
					<span>{{orderInfo.details}}</span>
				</el-form-item>
				<h5>收获信息</h5>
				<el-form-item label="收货人" prop="age">
					<span>{{orderInfo.consignee}}</span>
				</el-form-item>
				<el-form-item label="收货地址" prop="age">
					<span>{{orderInfo.address}}</span>
				</el-form-item>
				<h5>配送信息</h5>
				<el-form-item label="配送方式" prop="age">
					<el-select v-model="orderInfo.sendway" placeholder="请选择">
						<el-option :value="1">快递</el-option>
						<el-option :value="2">自取</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="物流单号" prop="age">
					<el-input v-model="orderInfo.ordernum" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="配送费用" prop="age">
					<el-input v-model="orderInfo.orderprice" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="快递公司" prop="age">
					<el-input v-model="orderInfo.ordercom" auto-complete="off"></el-input>
				</el-form-item>
				<h5>商品配置</h5>
				<el-form-item label="电子球杆编号" prop="age">
					<el-select v-model="orderInfo.elenum" placeholder="请选择">
						<el-option :value="1">1</el-option>
						<el-option :value="2">2</el-option>
					</el-select>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="orderAddressSubmit">确认发货</el-button>
			</span>
		</el-dialog>
			
		</section>
	</template>
	
	<script>
		import { getFightData } from '@/api/query'
		import Paging from '@/components/Paging/'
		import MySelect from '@/components/Select/'
		import MySearch from '@/components/Search/'

		var Btn = {
		  template: `<div><el-button class="click-btn" @click="rowEdit" type="primary" icon="el-icon-edit">编辑</el-button>
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
					message2: "",
					message3: "",
					message4: "",
					totalRecords: 0,
					tableData: [],
					orderInfo: {
						name: '----',
          	details: '----',
          	consignee: '----',
						phone: '-----------',
						address: '',
						sendway: '',
						ordernum: '',
						orderprice: '',
						ordercom: '',
						elenum: ''
					},
					dialogVisible: false,
					requestData: {
						uname: "",
						game_over_type: "",
						pageNow: 0,
						pageSize: 10
					},
					optionValue1: [{
						"opti": "支付方式",
						"val": ""
					},{
						"opti": "微信",
						"val": "2"
					},{
						"opti": "支付宝",
						"val": "1"
					}],
					optionValue2: [{
						"opti": "配送方式",
						"val": ""
					},{
						"opti": "快递",
						"val": "1"
					},{
						"opti": "自取",
						"val": "2"
					}],
					optionValue3: [{
						"opti": "用户手机号",
						"val": ""
					},{
						"opti": "用户昵称",
						"val": "1"
					},{
						"opti": "收货人",
						"val": "2"
					}],
					optionValue4: [{
						"opti": "订单状态",
						"val": ""
					},{
						"opti": "等待发货",
						"val": "1"
					},{
						"opti": "已发货",
						"val": "2"
					},{
						"opti": "已完成",
						"val": "3"
					},{
						"opti": "已分配",
						"val": "4"
					}],
					columns: [{
						"label": "序号",
						"prop": "serial"
					},{
						"label": "订单编号",
						"prop": "out_trade_no"
					},{
						"label": "订单金额",
						"prop": "total_fee"
					},{
						"label": "用户昵称",
						"prop": "uname"
					},{
						"label": "用户手机号",
						"prop": "phone"
					},{
						"label": "支付方式",
						"prop": "payment_type"
					},{
						"label": "结束原因",
						"prop": "game_over_type"
					},{
						"label": "订单状态",
						"prop": "orderStatus"
					},{
						"label": "配送方式",
						"prop": "getWay"
					},{
						"label": "创建日期",
						"prop": "createTime"
					}],
					columnsProps: {
						align: "center",
						sortable: true
					},
					columnsSchema: {},
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
					console.log(row)
					this.dialogVisible = true
				},
				orderAddressSubmit() {
					console.log("信息提交")
					this.dialogVisible = false
				},
				fromChange() {
					console.log(this.orderInfo);
				},
				columnsHandler(cols) {
					let oed = this.orderEdit
					return cols.concat({
						label: '操作',
						fixed: 'right',
						width: 170,
						component: Btn,
						listeners: {
							'row-edit'(row) {
								oed(row)
							},
							'row-delete'(row) {

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
	h5 {
		margin: 0;
		font-size: 16px;
	}
	.el-dialog__body {
		padding: 15px 20px;
	}
	</style>