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
			v-loading="loading"
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
	import { getBouns, bounsPass, bounsRefuse } from '@/api/management'
	import { mapGetters } from 'vuex'

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
				loading: false,
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
				checkRows: [],
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
		computed: {
			...mapGetters([
				'name',
				'id',
				'token'
			])
		},
		created() {
			this.getData()
		},
		computed: {
			
		},
		methods: {
			getData() {
				this.loading = true
				getBouns(this.requesetData).then(response => {
					this.loading = false
					this.tableData = response.items
					this.totalRecords = response.totalRecords
				}).catch(error => {
					this.$message({
						showClose: true,
						message: '服务器错误！',
						type: 'error'
					})
				})
			},
			bounsPass() {
				let letToken = JSON.parse(this.$store.getters.token)
				let tempObj = {
												approverID : letToken.id,
												approver   : letToken.name,
												ids        : this.checkRows,
												status     : "1"
											}
				bounsPass(tempObj).then(response => {
					if(response.result === 1) {
            this.$message({
              showClose: true,
              message: '审核成功',
              type: 'success'
            })
          }else {
            this.$message({
              showClose: true,
              message: '提交失败',
              type: 'error'
            })
          }
				}).catch(error => {
					this.$message({
						showClose: true,
						message: '错误！',
						type: 'error'
					})
				})
			},
			bounsRefuse() {
				let letToken = JSON.parse(this.$store.getters.token)
				let tempObj = {
												approverID : letToken.id,
												approver   : letToken.name,
												ids        : this.checkRows,
												status     : "2"
											}
				bounsPass(tempObj).then(response => {
					if(response.result === 1) {
            this.$message({
              showClose: true,
              message: '审核成功',
              type: 'success'
            })
          }else {
            this.$message({
              showClose: true,
              message: '提交失败',
              type: 'error'
            })
          }
				}).catch(error => {
					this.$message({
						showClose: true,
						message: '错误！',
						type: 'error'
					})
				})
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
				this.checkRows = []
				for(let i = 0; i < index.length; i++) {
					this.checkRows.push(index[i].id)
				}
			},
			isChecked (row, index) {
				if(row.status === 0) {
					return true
				}else {
					return false 
				}
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