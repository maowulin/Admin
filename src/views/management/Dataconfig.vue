<template>
		<section>
			<div class="user_head">
				<el-button class="hede-btn" @click="dataInsert" plain>新增</el-button>
			</div>
	
			<egrid class="egrid"
				fit
				:data="tableData"
				:columns="columns"
				:columns-schema="columnsSchema"
				:columns-props="columnsProps"
				:column-type="columnType"
				:columns-handler="columnsHandler"
				@section-change="sectionChange">
			</egrid>
		</section>
	</template>
	
	<script>
		import Paging from '@/components/Paging/'
		import MySelect from '@/components/Select/'
		import MySearch from '@/components/Search/'

		var Btn = {
			template: `<el-button-group>
									<el-button type="primary" @click="edit" icon="el-icon-edit">编辑</el-button>
									<el-button type="primary" @click="delete" icon="el-icon-delete">删除</el-button>
								</el-button-group>`,
		  props: ['row'],
			methods: {
				edit() {
					this.$emit('data-edit', this.row)
				},
				delete() {
					this.$eimit('data-delete', this.row)
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
					message1: '',
					message2: '',
					message3: '',
					totalRecords: 0,
					optionValue1: [{
						'opti': '分配状态',
						'val': ''
					},{
						'opti': '初始导入',
						'val': '0'
					},{
						'opti': '已赠送',
						'val': '1'
					},{
						'opti': '未出售',
						'val': '2'
					},{
						'opti': '线下出售',
						'val': '3'
					},{
						'opti': '线上出售',
						'val': '4'
					}],
					optionValue2: [{
						'opti': '绑定状态',
						'val': ''
					},{
						'opti': '已绑定',
						'val': '0'
					},{
						'opti': '未绑定',
						'val': '1'
					}],
					optionValue3: [{
						'opti': '请选择',
						'val': ''
					},{
						'opti': '编号',
						'val': '1'
					},{
						'opti': 'MAC地址',
						'val': '2'
					},{
						'opti': '所属球房',
						'val': '3'
					},{
						'opti': '用户昵称',
						'val': '4'
					}],
					tableData: [],
					columns: [{
						"label": "序号",
						"prop": "serial"
					},{
						"label": "设备地址",
						"prop": "createTime"
					},{
						"label": "所属球房",
						"prop": "name"
					},{
						"label": "分配状态",
						"prop": "address"
					},{
						"label": "绑定状态",
						"prop": "total"
					},{
						"label": "用户绰号",
						"prop": "status"
					},{
						"label": "创建时间",
						"prop": "time"
					}],
					columnsSchema: {
						'序号': {
							width: '70px'
						}
					},
					columnsProps: {
						align: "center",
						sortable: true
					},
					columnType: 'selection'
				}
			},
			methods: {
				dataInsert() {
	
				},
				dataEdit(row) {

				},
				dataDelete(row) {

				},
				columnsHandler(cols) {
					let det = this.dataEdit
					let dde = this.dataDelete
					return cols.concat({
					label: '操作',
					fixed: 'right',
					width: 170,
					component: Btn,
					listeners: {
						'data-edit'(row) {
							det(row)
						},
						'data-delete'(row) {
							dde(row)
						}
					}
					})
				}
			}
		}
	</script>
	
	<style>
		.el-select .el-input {
			width: 104px;
		}
	</style>