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
				v-loading="loading"
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
				<el-form-item label="商品信息：" prop="pass">
					<span>{{orderInfo.name}}</span>
				</el-form-item>
				<el-form-item label="商品详情：" prop="checkPass">
					<span>{{orderInfo.details}}</span>
				</el-form-item>
				<h5>收获信息</h5>
				<el-form-item label="收货人：" prop="age">
					<span>{{orderInfo.consignee}}</span>
				</el-form-item>
				<el-form-item label="收货地址：" prop="age">
					<span>{{orderInfo.address}}</span>
				</el-form-item>
				<el-form-item label="收货人电话：" prop="age">
					<span>{{orderInfo.phone}}</span>
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
					<el-select v-if="orderInfo.serial !== ''" v-model="orderInfo.serial" placeholder="请选择">
						<el-option v-for="item in orderInfo.serial" :key="item" :value="item" v-text="item"></el-option>
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
		import { getOrder, getOrderInfo, updateOrder, overOrder } from '@/api/management'
		import Paging from '@/components/Paging/'
		import MySelect from '@/components/Select/'
		import MySearch from '@/components/Search/'

		const Btn = {
		  template: `<div><el-button class="click-btn" @click="rowEdit" type="primary" icon="el-icon-edit">编辑</el-button></div>`,
		  props: ['row'],
		  methods: {
				rowEdit() {
					this.$emit('row-edit', this.row)
					this.$set(this.row, '_edit', !this.row._edit)
				}
			}
		}

		const Pay = {
			template: `<div>
									<span v-if="row.payment_type == 1">支付宝</span>
								  <span v-else>微信</span>
								</div>`,
		  props: ['row', 'col']
		}

		const OrderStatus = {
			template: `<div>
									<span v-if="row.orderStatus == 1">等待发货</span>
									<span v-else-if="row.orderStatus == 2">已发货</span>
									<span v-else-if="row.orderStatus == 3">已完成</span>
									<span v-else-if="row.orderStatus == 4">已分配</span>
								</div>`,
		  props: ['row', 'col']
		}

		const deliWay = {
			template: `<div>
									<span v-if="row.getWay == 1">快递</span>
									<span v-else-if="row.getWay == 2">自取</span>
								</div>`,
		  props: ['row', 'col']
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
					loading: false,
					tableData: [],
					orderRow: {},
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
						elenum: '',
						serial: ''
					},
					dialogVisible: false,
					requestData: {
						payType  : '',
						disType  : '',
						orStatus : '',
						like     : '',
						pageNow  : 0,
						pageSize : 10,
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
					columnsSchema: {
						'支付方式': {
							component: Pay
						},
						'订单状态': {
							component: OrderStatus
						},
						'配送方式': {
							component: deliWay
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
					getOrder(this.requestData).then(response => {
						this.loading = false
						this.tableData = response.items
						this.totalRecords = response.totalRecords
					}).catch(error => {
						this.loading = false
            this.$message.error('服务器错误')
					})
				},
				orderBuyWay(val) {
					this.requestData.payType = val
					this.getData()
				},
				orderSendWay(val) {
					this.requestData.disType = val
					this.getData()
				},
				orderStatus(val) {
					this.requestData.orStatus = val
					this.getData()
				},
				orderPhone(select, input) {
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
				},
				orderEdit(row) {
					if(row.orderStatus === 1 || row.orderStatus === 2) {
						getOrderInfo({'orderId': row.id}).then(response => {
							this.orderInfo.name = response.data.subject
							this.orderInfo.details = response.data.body
							this.orderInfo.consignee = response.data.rev_name
							this.orderInfo.address = response.data.address
							this.orderInfo.phone = response.data.phone
							this.orderInfo.serial = response.data.serials
							this.orderRow = row

							this.dialogVisible = true
						}).catch(error => {
							this.$message({
								showClose: true,
								message: '订单信息获取失败，请重试！',
								type: 'error'
							})
						})
					}else {
						return
					}
				},
				orderAddressSubmit() {
					let tempReObj =  {
															orderId 	: this.orderRow.id,
															distype 	: this.orderInfo.sendway,
															shipNum 	: this.orderInfo.serial,
															delFee  	: this.orderInfo.ordernum,
															serial  	: this.orderInfo.serial,
															express_com : this.orderInfo.ordercom
														}

					if(this.orderRow.orderStatus === 1) {
						updateOrder(tempReObj).then(response => {
						}).catch(error => {
							this.$message({
								showClose: true,
								message: '服务器错误！',
								type: 'error'
							})
						})
					}else if(this.orderRow.orderStatus === 2) {
						overOrder({'orderId': this.orderRow.id}).then(response => {
							 
						}).catch(error => {
							this.$message({
								showClose: true,
								message: '服务器错误！',
								type: 'error'
							})
						})
					}else if(this.orderRow.orderStatus === 3) {
						return
					}else {
						return
					}
					this.dialogVisible = false
					this.$refs['orderInfo'].resetFields()
				},
				fromChange() {
				  
				},
				columnsHandler(cols) {
					let oed = this.orderEdit
					return cols.concat({
						label: '操作',
						fixed: 'right',
						width: 120,
						component: Btn,
						listeners: {
							'row-edit'(row) {
								oed(row)
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