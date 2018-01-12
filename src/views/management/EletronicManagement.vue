<template>
	<section>
		<div class="user_head">
			<el-button class="hede-btn" @click="eletronDelete" plain>删除</el-button>

			<el-button class="hede-btn" @click="toImport" plain>批量导入</el-button>

			<my-select :message="message1" :option-value="optionValue1" @selectChange="eleStatus"></my-select>

			<my-select :message="message2" :option-value="optionValue2" @selectChange="eleBinds"></my-select>

			<my-search :message="message3" :option-value="optionValue3" @searchClick="orderPhone"></my-search>
		
			<paging :total="totalRecords" @getSize="getSize" @getPage="getPage"></paging>
		</div>

		<egrid class="egrid"
			fit
			:data="tableData"
			:columns="columns"
			:columns-schema="columnsSchema"
			:columns-props="columnsProps"
			:column-type="columnType"
			@section-change="sectionChange">
	  </egrid>
	</section>
</template>

<script>
	import Paging from '@/components/Paging/'
	import MySelect from '@/components/Select/'
	import MySearch from '@/components/Search/'

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
			eletronDelete() {

			},
			toImport() {

			},
			eleStatus() {

			},
			eleBinds() {

			},
			orderPhone() {

			},
			getPage() {

			},
			getSize() {

			},
			sectionChange() {

			}
		}
	}
</script>

<style>
	.el-select .el-input {
    width: 104px;
	}
</style>