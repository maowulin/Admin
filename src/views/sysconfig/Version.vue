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

			<el-form :model="versionInfo" status-icon ref="versionInfo" label-width="120px" class="demo-ruleForm">
				<el-form-item label="选择平台" prop="pass">
					<el-select v-model="versionInfo.type" placeholder="请选择">
						<el-option value="1" label="ios"></el-option>
						<el-option value="2" label="android"></el-option>
						<el-option value="3" label="ios游戏端"></el-option>
						<el-option value="4" label="android游戏端"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="最低版本" prop="age">
					<el-input v-model="versionInfo.minVersion" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="当前版本" prop="age">
					<el-input v-model="versionInfo.maxVersion" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="更新说明" prop="age">
					<el-input v-model="versionInfo.desc" type="textarea" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="上传文件" prop="age">
					<el-upload
						class="upload-demo"
						drag
						action="../version/version_submit"
						multiple>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					</el-upload>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="versionSubmit">确认发布</el-button>
			</span>
		</el-dialog>
			
		</section>
	</template>
	
	<script>
		import { getPremis } from '@/api/management'
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
		      // this.$set(this.row, '_edit', !this.row._edit)
		    },
		    rowDownload() {
		      this.$emit('row-download', this.row)
		    }
		  }
		}

		const Tooltip = {
		  template: `<div style="overflow:hidden; text-overflow:ellipsis; white-space: nowrap; cursor: pointer;">
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
		      tableData: [],
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
		      getPremis('../version/version_list', 'get', this.requestData).then(response => {
		        console.log(response)
		        this.tableData = response.items
		        this.totalRecords = response.totalRecords
		      }).catch(error => {
		        console.log(error)
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
					getPremis('../version/version_edit', 'get', row.id).then(response => {
						( {	type: (this.versionInfo.type), 
								minimumVersion: (this.versionInfo.minVersion), 
								version: (this.versionInfo.maxVersion), 
								updateContent: (this.versionInfo.desc) 
							} = response)
					}).catch(error => {
						console.log(error)
					})

					this.dialogVisible = true
		    },
		    versionDownload(row) {
		      console.log(row)
		    },
		    versionAdd(formName) {
					this.dialogVisible = true
					this.versionInfo.type = ''
					this.versionInfo.minVersion = ''
					this.versionInfo.maxVersion = ''
					this.versionInfo.desc = ''
					this.file = ''
					this.token = ''
		    },
		    versionSubmit() {
					console.log('信息提交')
					console.log(this.versionInfo)
		      this.dialogVisible = false
		    },
		    fromChange() {
		      console.log(this.orderInfo)
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