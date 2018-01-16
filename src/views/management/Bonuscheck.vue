<template>
	<section class="bound-bord">
		<div class="user_head">
			<el-button class="hede-btn" @click="bounsPass" plain>通过</el-button>

			<el-button class="hede-btn" @click="bounsRefuse" plain>拒绝</el-button>

			<my-select :message="message1" :option-value="optionValue1" @selectChange="bounsStatus"></my-select>

			<my-search :message="message3" :option-value="optionValue3" @searchClick="bounsSarch"></my-search>
		
			<paging :total="totalRecords" @getSize="getSize" @getPage="getPage"></paging>
		</div>
		
		<el-table
			fit
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange">
			<el-table-column
				type="selection"
				:selectable="isChecked"
				width="55">
			</el-table-column>
			<el-table-column
				sortable
				label="申请时间"
				prop="apply_for_date">
			</el-table-column>
			<el-table-column
				label="提现金额"
				sortable
				prop="sum">
			</el-table-column>
			<el-table-column
				label="用户绰号"
				sortable
				prop="userName">
			</el-table-column>
			<el-table-column
				label="用户手机号"
				sortable
				prop="phone">
			</el-table-column>
			<el-table-column
				label="审核状态"
				sortable
				prop="status">
				<template slot-scope="scope">
					<div>
						<span v-if="scope.row.status === 0">等待审核</span>
						<span v-else-if="scope.row.status === 1">已通过</span>
						<span v-else>已拒绝</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				label="审核人"
				sortable
				prop="approver">
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	import Paging from '@/components/Paging/'
	import MySelect from '@/components/Select/'
	import MySearch from '@/components/Search/'
	import { getBounds } from '@/api/management'

	var Status = {
		template: `<div>
								<span v-if="row.status === 1">已通过</span>
								<span v-else-if="row.status === 2">已拒绝</span>
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
				message1: '',
				message2: '',
				message3: '',
				totalRecords: 0,
				optionValue1: [{
					'opti': '审核状态',
					'val': ''
				},{
					'opti': '等待审核',
					'val': '0'
				},{
					'opti': '已通过',
					'val': '1'
				},{
					'opti': '已拒绝',
					'val': '2'
				}],
				optionValue3: [{
					'opti': '请选择',
					'val': ''
				},{
					'opti': '用户手机号',
					'val': '1'
				},{
					'opti': '用户昵称',
					'val': '2'
				}],
				tableData: [],
				columns: [{
					"label": "序号",
					"prop": "serial"
				},{
					"label": "申请时间",
					"prop": "apply_for_date"
				},{
					"label": "提现金额",
					"prop": "sum"
				},{
					"label": "用户绰号",
					"prop": "userName"
				},{
					"label": "用户手机号",
					"prop": "phone"
				},{
					"label": "审核状态",
					"prop": "status"
				},{
					"label": "审核人",
					"prop": "approver"
				}],
				requesetData: {
					status: '',
					phone: '',
					pageNow: 0,
					pageSize: 10
				},
				columnsSchema: {
					'序号': {
						width: '70px'
					},
					'审核状态': {
						component: Status
					}
				},
				columnsProps: {
					align: "center",
					sortable: true
				},
				columnType: 'selection'
			}
		},
		created() {
			this.getData()
		},
		computed: {
			
		},
		methods: {
			getData() {
				getBounds('../userL8/destoonFinanceCash_list.json', 'get', this.requesetData).then(response => {
					console.log(response)
					this.tableData = response.items
					this.totalRecords = response.totalRecords
				}).catch(error => {
					console.log(error)
				})
			},
			bounsPass() {

			},
			bounsRefuse() {

			},
			bounsStatus(val) {
				this.requesetData.status = val
				this.getData()
			},
			bounsSarch(val) {
				this.requesetData.phone = val
				this.getData()
			},
			getPage(_pageNow) {
				this.requesetData.pageNow = _pageNow
				this.getData()
			},
			getSize(_pageSize) {
				this.requesetData.pageSize = _pageSize
				this.getData()
			},
			handleSelectionChange(index) {
				let tempArray = []
				for(let i = 0; i < index.length; i++) {
					tempArray.push(index[i].id)
				}
				console.log(tempArray)
			},
			isChecked (row, index) {
				// if(row.status === 0) {
				// 	return true
				// }else {
				// 	return false 
				// }
				return true
			}
		}
	}
</script>

<style>
	.el-select .el-input {
    width: 104px;
	}
	.bound-bord {
		
	}
</style>