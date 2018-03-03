<template>
	<section v-if="isSecond">
		<div class="user_head">
			<el-button class="hede-btn" @click="toImport" plain>批量导入</el-button>
			<el-button class="hede-btn" @click="createCode" plain>生成认证码</el-button>

			<my-select :message="message1" :option-value="optionValue1" @selectChange="orderBuyWay"></my-select>

			<my-search :message="message3" :option-value="optionValue3" @searchClick="orderPhone"></my-search>
		
			<paging :total="totalRecords" @getSize="getFightSize" @getPage="getFightPage"></paging>
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
	</section>

	<section v-else>
		<el-form :model="ballInfo" :inline="true" status-icon ref="ballInfo" label-width="120px" class="demo-ruleForm">
			<el-form-item label="球房名称" prop="pass">
				<el-input v-model="ballInfo.ballName" :disabled="isEdite" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="联系人" prop="checkPass">
				<el-input v-model="ballInfo.ballUser" :disabled="isEdite" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="球房地址" prop="age">
				<el-input v-model="ballInfo.ballAddress" :disabled="isEdite" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="联系电话" prop="age">
				<el-input v-model="ballInfo.ballPhone" :disabled="isEdite" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="认证码" prop="age">
				<el-input v-model="ballInfo.ballCode" :disabled="isEdite" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="电子球杆" prop="age">
				<el-input v-model="ballInfo.ballEletron" :disabled="isEdite" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="营业执照" prop="age">
				<el-upload
					class="avatar-uploader"
					action="https://jsonplaceholder.typicode.com/posts/"
					:show-file-list="false"
					:disabled="isEdite"
					:on-success="handleAvatarSuccess">
					<img v-if="ballInfo.ballPermit" :src="ballInfo.ballPermit" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			
			<el-form-item label="球房照片" prop="age">
				<el-upload
					class="avatar-uploader"
					action="https://jsonplaceholder.typicode.com/posts/"
					:show-file-list="false"
					:disabled="isEdite"
					:on-success="handleAvatarSuccess">
					<img v-if="ballInfo.photo" :src="ballInfo.photo" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
		</el-form>

		<footer>
				<div class="btn-group" v-if="isEdite">
					<el-button plain @click="orderPass">通过</el-button>
					<el-button plain @click="orderRefuse">拒绝</el-button>
				</div>
				<div class="btn-group" v-else>
					<el-button plain @click="orderSubmit">提交</el-button>
				</div>
				<el-button plain @click="orderBack">返回</el-button>
		</footer>
	</section>

</template>

<script>
	import { getBallRoom } from '@/api/management'
	import Paging from '@/components/Paging/'
	import MySelect from '@/components/Select/'
	import MySearch from '@/components/Search/'

	var Btn = {
	  template: `<div><el-button class="click-btn" @click="rowEdit" type="primary" icon="el-icon-view">审核</el-button>
							<el-button class="click-btn" @click="rowAudit" type="primary" icon="el-icon-question">查看</el-button></div>`,
	  props: ['row'],
	  methods: {
	    rowEdit() {
	      this.$emit('row-edit', this.row)
	    },
	    rowAudit() {
	      this.$emit('row-audit', this.row)
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
				isSecond: true,
				isEdite: false,
				message1: "",
				message3: "球房名称",
				totalRecords: 0,
				tableData: [],
				loading: false,
				requestData: {
					status   : '',
					sort     : '',
					like     : '',
					pageNow  : 0,
					pageSize : 10
				},
				ballInfo: {
					'ballName': '----',
					'ballUser': '----',
					'ballAddress': '----',
					'ballPhone': '----',
					'ballCode': '----',
					'ballEletron': '0',
					'ballPermit': '',
					'ballPhoto': ''
				},
				optionValue1: [{
					"opti": "状态",
					"val": ""
				},{
					"opti": "已通过",
					"val": "1"
				},{
					"opti": "已拒绝",
					"val": "2"
				},{
					"opti": "待审核",
					"val": "0"
				},{
					"opti": "已拒绝",
					"val": "2"
				},{
					"opti": "批量导入",
					"val": "3"
				}],
				optionValue3: [{
					"opti": "球房名称",
					"val": "1"
				},{
					"opti": "联系人",
					"val": "2"
				},{
					"opti": "联系方式",
					"val": "3"
				},{
					"opti": "关联用户",
					"val": "4"
				},{
					"opti": "认证码",
					"val": "5"
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
					"label": "创建时间",
					"prop": "createTime"
				},{
					"label": "球房名称",
					"prop": "name"
				},{
					"label": "球房地址",
					"prop": "address"
				},{
					"label": "电子球杆数量",
					"prop": "total"
				},{
					"label": "状态",
					"prop": "status"
				},{
					"label": "认证码",
					"prop": "authCode"
				},{
					"label": "关联用户",
					"prop": "phone"
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
				this.loading = true
				getBallRoom(this.requestData).then(response => {
					this.loading = false
					this.tableData = response.items
					this.totalRecords = response.totalRecords
				}).catch(error => {
					this.loading = false
					this.$message.error('服务器错误')
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
				this.isSecond = false
				this.isEdite = true
			},
			orderAudit(row) {
				console.log(row)
				this.isSecond = false
				this.isEdite = false
			},
			orderAddressSubmit() {
				console.log("信息提交")
				this.dialogVisible = false
			},
			orderPass() {  //通过审核

			},
			orderRefuse() { //拒绝审核

			},
			orderSubmit() { //提交

			},
			orderBack() {  //返回
				this.isSecond = true
			},
			toImport(){

			},
			createCode() {

			},
			handleAvatarSuccess(res, file) {

			},
			columnsHandler(cols) {
				let oed = this.orderEdit
				let oau = this.orderAudit
				return cols.concat({
					label: '操作',
					fixed: 'right',
					width: 170,
					component: Btn,
					listeners: {
						'row-edit'(row) {
							oed(row)
						},
						'row-audit'(row) {
							oau(row)
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
.hede-btn{
	height: 40px;
	width: auto;
}
h5 {
	margin: 0;
	font-size: 16px;
}
.el-dialog__body {
	padding: 15px 20px;
}
.el-form-item {
	width: 49%;
}

.btn-group {
	display: inline-block;
}

footer {
	text-align: center;
}
</style>