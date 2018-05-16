<template>
		<section v-loading="loading">
			<el-tabs v-model="activeName" @tab-click="handleClick" editable @edit="noticeEdit">
				<el-tab-pane v-for="item in tabs" :label="item.title" :key="item.id" :name="item.id + ''">
					<el-form class="notice-panel">
						<el-form-item label="公告标题">
								<el-input type="text" :id="'notice-title' + item.id" :value="item.title" ></el-input>
						</el-form-item>

						<el-form-item label="公告状态">
							<el-select v-model="status" placeholder="请选择">
								<el-option
									v-for="temp in noticeStatus"
									:key="temp.value"
									:label="temp.label"
									:value="temp.value">
								</el-option>
							</el-select>
							</el-form-item>

						<el-form-item label="公告类型">
							<el-select v-model="type" placeholder="请选择">
								<el-option
									v-for="list in options"
									:key="list.value"
									:label="list.label"
									:value="list.value">
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="公告内容">
							<el-input type="textarea" :id="'testarea-notice' + item.id"  :rows="12" resize="both" :value="item.conent"></el-input>
						</el-form-item>

						<el-form-item style="text-align: center;">
							<el-button type="danger" class="notice-button" @click="noticeUpdate(item.id)">更新</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>

			<el-dialog title="新增公告" :visible.sync="dialogTableVisible">
				<div class="add-notice-panel">
					<el-form ref="form" label-width="80px">
						<el-form-item label="标题">
								<el-input type="text" v-model="addTitle"></el-input>
						</el-form-item>

						<el-form-item label="公告状态">
							<el-select v-model="status" placeholder="请选择">
								<el-option
									v-for="temp in noticeStatus"
									:key="temp.value"
									:label="temp.label"
									:value="temp.value">
								</el-option>
							</el-select>
							</el-form-item>

						<el-form-item label="公告类型">
							<el-select v-model="type" placeholder="请选择">
								<el-option
									v-for="list in options"
									:key="list.value"
									:label="list.label"
									:value="list.value">
								</el-option>
							</el-select>
						</el-form-item>
				
						<el-form-item label="内容">
								<el-input type="textarea" class="add-conent" :rows="12" resize="both" v-model="addConent"></el-input>
						</el-form-item>
				
						<el-form-item class="from-button">
								<el-button type="danger" class="notice-button" @click="addNotice">新增</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-dialog>
		</section>
	</template>
	
	<script>
		import { getOfficalList, addOfficalList, updateOfficalList, delOfficalList } from '@/api/systemconfig'
		export default {
		  data() {
		    return {
					tabs: [],
					form: {
						desc: ''
					},
					options: [{
						value: '1',
          	label: '普通'
					}],
					noticeStatus: [{
						value: '0',
          	label: '未使用'
					},{
						value: '1',
          	label: '使用中'
					}],
					dialogTableVisible: false,
					addTitle: '',
					addConent: '',
					loading: false,
					updateConent: '',
					updateTitle: '',
					type: '1',
					status: '1'
		    }
		  },
		  created() {
				this.getData()
			},
			computed: {
				activeName: {
					get: function() {
						let tempObj = this.tabs[0]
						if(tempObj) {
							return tempObj.id + ''
						}else {
							return ''
						}
					},
					set: function() {
						
					}
				}
			},
		  methods: {
		    getData() {
					this.loading = true
					getOfficalList().then(response => {
						this.loading = false
						this.tabs = response.items
					}).catch(error => {
						this.$message({
							showClose: true,
							message: '数据获取失败',
							type: 'error'
						})
					})
				},
				handleClick(tab, event) {
					
				},
				noticeEdit(targetName, action) {
					if(action === 'add') {
						this.dialogTableVisible = true
					}else if(action === 'remove') {
						this.$confirm('确认删除?', '删除公告', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.delOffical(targetName)
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							})        
						})
					}
				},
				noticeUpdate(id) {
					let tempData = {
						id: id,
						conent: this.getValue('testarea-notice' + id), 
						type: this.type, 
						status: this.status, 
						title: this.getValue('notice-title' + id)
					}
					updateOfficalList(tempData).then(response => {
						if(response.result === 1) {
							this.$message({
								showClose: true,
								message: '更新成功！',
								type: 'success'
							})
							this.getData()
						}
					}).catch(error => {
						this.$message({
							showClose: true,
							message: '更新失败！',
							type: 'error'
						})
					})
				},
				addNotice() {
					addOfficalList({title: this.addTitle, conent: this.addConent, type: this.type, status: this.status}).then(response => {
						if(response.result === 1) {
							this.dialogTableVisible = false
							this.getData()
							this.addTitle = ''
							this.addConent = ''
						}else {
							this.$message({
								showClose: true,
								message: '添加失败！',
								type: 'error'
							})
						}
					}).catch(error => {
						this.$message({
							showClose: true,
							message: '添加失败！',
							type: 'error'
						})
					})
				},
				delOffical(id) {
					delOfficalList({id: id}).then(response => {
						this.$message({
							showClose: true,
							message: '删除成功！',
							type: 'success'
						})
						this.getData()
					}).catch(error => {
						this.$message({
							showClose: true,
							message: '删除失败！',
							type: 'error'
						})
					})
				},
				getValue(ele) {
					let element = document.getElementById(ele)
					return element.value
				}
		  }
		}
	</script>
	
	<style rel="stylesheet/scss" lang="scss">
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
	.notice-panel {
		width: 600px;
		margin: 20px auto;

		.el-textarea {
			width: 500px;
		}
	}
	.notice-button {
		margin-top: 10px;
	}
	.add-conent {
		margin-top: 10px;
	}
	.add-notice-panel {
		width: 600px;
		margin: 20px auto;
	}
	.from-button {
		text-align: center;
	}
	</style>