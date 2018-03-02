<template>
		<section>
			<div class="user_head">
				<el-button @click="versionAdd" >添加</el-button>

				<my-select :message="message1" :option-value="optionValue1" v-on:selectChange="versionWay"></my-select>

				<my-search :message="message3" :option-value="optionValue3" v-on:searchClick="versionSear"></my-search>
				
				<paging :total="totalRecords" v-on:getSize="getFightSize" v-on:getPage="getFightPage"></paging>
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

		 <el-dialog
			title="版本发发布"
			:visible.sync="dialogVisible"
			:before-close="handleClose"
			width="600px">

			<el-form :model="versionInfo" status-icon ref="versionInfo" label-width="120px" class="demo-ruleForm">
				<el-form-item label="选择平台" prop="type">
					<el-select v-model="versionInfo.type" placeholder="请选择">
						<el-option label="ios" value="1"></el-option>
						<el-option label="android" value="2"></el-option>
						<el-option label="ios游戏端" value="3"></el-option>
						<el-option label="android游戏端" value="4"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="最低版本" prop="minVersion">
					<el-input v-model="versionInfo.minVersion" type="text" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="当前版本" prop="maxVersion">
					<el-input v-model="versionInfo.maxVersion" type="text" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="更新说明" prop="desc">
					<el-input v-model="versionInfo.desc" rows="6" type="textarea" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="上传文件">
					<input type="file" id="version-file" @change="fileChange">
				</el-form-item>

				<el-form-item v-if="isProgress">
					<span v-text="network"></span>
					<el-progress :percentage="progressData"></el-progress>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="versionSubmit">确认发布</el-button>
			</span>
		</el-dialog>
			
		</section>
	</template>
	
	<script>
		import { getVersion, getVersionEdit, versionUpdate, versionSubmit } from '@/api/systemconfig'
		import { getToken } from '@/api/management'
		import Paging from '@/components/Paging/'
		import MySelect from '@/components/Select/'
		import MySearch from '@/components/Search/'

		const Btn = {
		  template: `<div><el-button class="click-btn" @click="rowDownload" type="primary" icon="el-icon-download">下载</el-button>
							  <el-button class="click-btn" @click="rowEdit" type="primary" icon="el-icon-edit">编辑</el-button></div>`,
		  props: ['row'],
		  methods: {
		    rowEdit() {
		      this.$emit('row-edit', this.row)
		    },
		    rowDownload() {
		      this.$emit('row-download', this.row)
		    }
		  }
		}

		const Tooltip = {
		  template: `<div class="version-tip">
										<span :title="row.updateContent">{{ row.updateContent }}</span>	
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
					message3: '功能描述',
					totalRecords: 0,
					loading: false,
					dialogType: 0,
					tableData: [],
					isProgress: false,
					network: '0kb/s',
					progressData: 0,
					nowTime: 0,
					readyFile: 0,
		      versionInfo: {
		        type: '',
          	minVersion: '',
          	maxVersion: '',
		        desc: '',
						file: '',
						token: ''
		      },
		      dialogVisible: false,
		      requestData: {
		        type: '',
		        desc: '',
		        pageNow: 0,
		        pageSize: 10
		      },
		      optionValue1: [{
		        'opti': '请选择',
		        'val': ''
		      }, {
		        'opti': 'ios',
		        'val': '1'
		      }, {
		        'opti': 'android',
		        'val': '2'
		      }, {
		        'opti': 'ios游戏端',
		        'val': '3'
		      }, {
		        'opti': 'android游戏端',
		        'val': '4'
		      }],
		      optionValue3: [],
		      columns: [{
		        'label': '序号',
		        'prop': 'serial'
		      }, {
		        'label': '类型',
		        'prop': 'type'
		      }, {
		        'label': '发布时间',
		        'prop': 'releaseTime'
		      }, {
		        'label': '发布人',
		        'prop': 'releaseUser'
		      }, {
		        'label': '更新内容',
		        'prop': 'updateContent'
		      }, {
		        'label': '最低版本',
		        'prop': 'minimumVersion'
		      }, {
		        'label': '最高版本',
		        'prop': 'version'
		      }, {
		        'label': '安装包下载地址',
		        'prop': 'apkUrl'
		      }],
		      columnsProps: {
		        align: 'center',
		        sortable: true
		      },
		      columnsSchema: {
		        '更新内容': {
							component: Tooltip
		        },
		        '安装包下载地址': {
		          'show-overflow-tooltip': true
		        }
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
		      getVersion(this.requestData).then(response => {
						this.loading = false
		        this.tableData = response.items
		        this.totalRecords = response.totalRecords
		      }).catch(error => {
		        console.log(error)
		      })
				},
				getVersionToken() {
					getToken().then(response => {
						this.versionInfo.token  = response.data
					}).catch(error => {
						this.$message({
							showClose: true,
							message: 'token获取失败！',
							type: 'error'
						})
					})
				},
		    versionWay(val) {
		      this.requestData.game_over_type = val
		      this.getData()
		    },
		    versionSear(select, input) {
		      this.requestData.uname = input
		      this.getData()
		    },
		    getFightSize(pageSize) {
		      this.requestData.pageSize = pageSize
		      this.getData()
		    },
		    getFightPage(pageNow) {
		      this.requestData.pageNow = pageNow
		      this.getData()
		    },
		    versionEdit(row) {
					this.dialogVisible = false
					this.dialogType = 1
					this.versionRowId = row.id
					this.getVersionToken()
					getVersionEdit({'versionId': row.id}).then(response => {
						( {	type: (this.versionInfo.type), 
								updateContent: (this.versionInfo.desc)
							} = response)

						this.versionInfo.minVersion = Number(response.minimumVersion)
						this.versionInfo.maxVersion = Number(response.version)
						this.dialogVisible = true

						let fileEle = document.getElementById('version-file')
						fileEle.value = ''
						this.versionInfo.file = ''
					}).catch(error => {
						this.$message({
							showClose: true,
							message: '服务器错误！',
							type: 'error'
						})
					})
		    },
		    versionDownload(row) {
					window.open(row.apkUrl)
		    },
		    versionAdd(formName) {
					this.dialogVisible = true
					this.dialogType = 2
					
					this.versionInfo.type = ''
					this.versionInfo.minVersion = ''
					this.versionInfo.maxVersion = ''
					this.versionInfo.desc = ''

					let fileEle = document.getElementById('version-file')
					fileEle.value = ''
					this.versionInfo.file = ''
		    },
		    versionSubmit() {
					if(this.dialogType === 1) {
						const tempObj = {
							'type': this.versionInfo.type,
							'minimumVersion': this.versionInfo.minVersion,
							'version': this.versionInfo.maxVersion,
							'updateContent': this.versionInfo.desc,
							'id': this.versionRowId,
							'file': this.versionInfo.file
						}
						versionUpdate(tempObj, (res) => {
							this.isProgress = true // 上传开始
						}, (res) => {
							this.progressChange(res) // 上传中
						}).then(response => {
							this.$message({  // 上传完成
								showClose: true,
								message: '编辑成功',
								type: 'success'
							})
							this.isProgress = false
							this.dialogVisible = false
							this.getData()
						}).catch(error => {
							this.isProgress = false // 上传失败
							this.$message({
								showClose: true,
								message: '编辑失败',
								type: 'error'
							})
						})
					}else if (this.dialogType === 2) {
						versionSubmit(this.versionInfo, (res) => {
							this.isProgress = true // 上传开始
						}, (res) => {
							this.progressChange(res) // 上传中
						}).then(response => {
							this.$message({
								showClose: true,
								message: '发布成功',
								type: 'success'
							})
							this.isProgress = false
							this.dialogVisible = false
							this.getData()
						}).catch(error => {
							this.$message({
								showClose: true,
								message: '服务器错误',
								type: 'error'
							})
							this.isProgress = false // 上传失败
						})
					}
		    },
		    fromChange() {

				},
				fileChange() {
					this.versionInfo.file = document.getElementById('version-file').files[0]
				},
				progressChange(res) {
					// 计算时间间隔
					let thatTime = new Date().getTime()
					let perTime = (thatTime - this.nowTime) / 1000
					this.nowTime = new Date().getTime()

					// 计算时间段内传输的文件大小
					let perload = res.loaded - this.readyFile
					this.readyFile = res.loaded

					// 计算传输速度
					let transTime = perload/perTime
					let surplusTime = ((res.total - res.loaded) / transTime)
					surplusTime = surplusTime.toFixed(2) + 's' 
					let transUnit = ''
					if(transTime/1024 > 1) {
						transTime = transTime/1024 
						transUnit = 'kb/s'
					}
					if(transTime/1024 > 1) {
						transTime = transTime/1024 
						transUnit = 'Mb/s'
					}
					transTime = transTime.toFixed(2)

					this.network = '上传速度：' + transTime + transUnit + '    剩余时间：' + surplusTime
					this.progressData = Number(parseInt((res.loaded / res.total) * 100))
				},
		    columnsHandler(cols) {
		      const ved = this.versionEdit
		      const vdl = this.versionDownload
		      return cols.concat({
		        label: '操作',
		        fixed: 'right',
		        width: 170,
		        component: Btn,
		        listeners: {
		          'row-edit'(row) {
		            ved(row)
		          },
		          'row-download'(row) {
		            vdl(row)
		          }
		        }
		      })
				},
				handleClose(done) {
					this.$confirm('确认关闭？').then( _ => {
						done()
					}).catch( _ => {})
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
	.version-tip {
		overflow: hidden; 
		text-overflow: ellipsis; 
		white-space: nowrap; 
		cursor: pointer;
	}
	</style>