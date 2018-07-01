<template>
		<section class="data-bord">
			<div class="user_head data-head">
				<el-button class="hede-btn" @click="dataInsert" plain>新增</el-button>
			</div>
	
			<egrid class="egrid"
				fit
				v-loading="loading"
				:data="tableData"
				:columns="columns"
				:columns-schema="columnsSchema"
				:columns-props="columnsProps"
				:column-type="columnType"
				:columns-handler="columnsHandler">
			</egrid>
		</section>
	</template>
	
	<script>
		import Paging from '@/components/Paging/'
		import MySelect from '@/components/Select/'
		import MySearch from '@/components/Search/'
		import { gameConfig, gameConfigAdd, gameConfigEdit, gameConfigDel } from '@/api/management'

		var Btn = {
			template: `<div>
									<el-button-group v-if="row.isAdd">
										<el-button class="config-btn" type="primary" @click="rowAdd" icon="el-icon-edit">提交</el-button>
									</el-button-group>
									<el-button-group v-else>
										<el-button class="config-btn" type="primary" @click="edit" icon="el-icon-edit">{{ row._edit ? '提交' : '编辑' }}</el-button>
										<el-button class="config-btn"  type="danger" @click="rowDelete" icon="el-icon-delete">删除</el-button>
									</el-button-group>
								</div>`,
		  props: ['row'],
		  methods: {
		    edit() {
		      this.$emit('data-edit', this.row)
		      this.$set(this.row, '_edit', !this.row._edit)
		    },
		    rowDelete() {
		      this.$emit('data-delete', this.row)
		    },
		    rowAdd() {
					this.$emit('row-add', this.row)
					this.$set(this.row, '_edit', !this.row._edit)
		    }
		  }
		}

		var Edit = {
			template: `<div>
									<el-input v-show="row._edit"  v-model="row[col.prop]" clearable> </el-input>
									<span v-show="!row._edit">{{ text }}</span>
								</div>`,
			props: ['row', 'col'],
			computed: {
				text() {
					return this.row[this.col.prop]
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
					loading: false,
		      optionValue1: [{
		        'opti': '分配状态',
		        'val': ''
		      }, {
		        'opti': '初始导入',
		        'val': '0'
		      }, {
		        'opti': '已赠送',
		        'val': '1'
		      }, {
		        'opti': '未出售',
		        'val': '2'
		      }, {
		        'opti': '线下出售',
		        'val': '3'
		      }, {
		        'opti': '线上出售',
		        'val': '4'
		      }],
		      optionValue2: [{
		        'opti': '绑定状态',
		        'val': ''
		      }, {
		        'opti': '已绑定',
		        'val': '0'
		      }, {
		        'opti': '未绑定',
		        'val': '1'
		      }],
		      optionValue3: [{
		        'opti': '请选择',
		        'val': ''
		      }, {
		        'opti': '编号',
		        'val': '1'
		      }, {
		        'opti': 'MAC地址',
		        'val': '2'
		      }, {
		        'opti': '所属球房',
		        'val': '3'
		      }, {
		        'opti': '用户昵称',
		        'val': '4'
		      }],
		      tableData: [],
		      columns: [ {
		        'label': '字段名',
		        'prop': 'v_key'
		      }, {
		        'label': '字段说明',
		        'prop': 'explain'
		      }, {
		        'label': '字段值',
		        'prop': 'v_value'
		      }, {
		        'label': '上限',
		        'prop': 'upper_limit'
		      }],
					getRequestData: {
						'type': '1'
					},
		      columnsSchema: { },
		      columnsProps: {
		        align: 'center',
						sortable: true,
						component: Edit
		      },
		      columnType: ''
		    }
			},
			created() {
				this.getData()
			},
		  methods: {
		    getData() {
					this.loading = true
		      gameConfig({'type': 1}).then(response => {
						this.loading = false
						this.tableData = response.data
		      }).catch(error => {
		        this.loading = false
            this.$message.error('服务器错误')
		      })
		    },
		    dataInsert() {
					const mainEle = document.getElementsByClassName('app-wrapper')[0]
					const appEle = document.getElementsByClassName('main-container')[0]
					window.scrollTo(0, appEle.scrollHeight - mainEle.clientHeight)
					this.tableData.push({
						'explain': '',
						'upper_limit': '',
						'v_key': '',
						'v_value': '',
						'isAdd': 'true',
						"_edit": 'true'
					})
		    },
		    dataEdit(row) {
					if(row._edit) {
						this.$confirm('确认提交?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							let tempObj = {
								type 		    : 2,
								key   		  : row.v_key,
								upper_limit : row.upper_limit,
								explain     : row.explain,
								value   	  : row.v_value
							}
							gameConfigEdit(tempObj).then(response => {
								if(response.result === 1) {
									this.$message({
										type: 'success',
										message: '提交成功!'
									})
								}else {
									this.$message({
										showClose: true,
										message: '提交失败！',
										type: 'error'
									})
								}
								this.getData()
							}).catch(error => {
								this.$message({
									showClose: true,
									message: '服务器错误！',
									type: 'error'
								})
							})
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消提交'
							})          
						})
					}
		    },
		    dataDelete(row) {
		      this.$confirm('确认删除?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						gameConfigDel({'type': 4, 'key': row.v_key}).then(response => {
							if(response.result === 1) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								})
							}else {
								this.$message({
									showClose: true,
									message: '删除失败！',
									type: 'error'
								})
							}

							this.getData()

						}).catch(error => {
							this.$message({
								showClose: true,
								message: '服务器错误！',
								type: 'error'
							})
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						})          
					})
				},
				rowAdd(row) {
					let tempObj = {
						type 		    : 3,
						key   		  : row.v_key,
						upper_limit : row.upper_limit,
						explain     : row.explain,
						value   	  : row.v_value
					}
					gameConfigAdd(tempObj).then(response => {
						if(response.result === 1) {
							this.$message({
								showClose: true,
								message: '添加成功！',
								type: 'success'
							})
						}else {
							this.$message({
								showClose: true,
								message: '添加失败！',
								type: 'error'
							})
						}
						this.getData()
					}).catch(error => {
						this.$message({
							showClose: true,
							message: '服务器错误！',
							type: 'error'
						})
					})
					row.isAdd = false
				},
		    columnsHandler(cols) {
		      const det = this.dataEdit
					const dde = this.dataDelete
					const roa = this.rowAdd
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
							},
							'row-add'(row) {
								roa(row)
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

		.config-btn {
			width: 60px;
			padding: 9px 7px;
		}

		.data-head {
			position: fixed;
			top: 60px;
			z-index: 999;
		}

		.data-bord {
			/* padding-top: 90px; */
		}
	</style>