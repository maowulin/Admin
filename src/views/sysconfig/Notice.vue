<template>
		<section>
			<div class="user_head">
				<el-button @click="noticeAdd" >添加</el-button>

				<my-search :message="message" :option-value="optionValue" @searchClick="noticeSear"></my-search>
				
				<paging :total="totalRecords" @getSize="getFightSize" @getPage="getFightPage"></paging>
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
		  template: `<div><el-button class="click-btn" @click="rowCheck" type="primary" icon="el-icon-view">查看</el-button>
							  <el-button class="click-btn" @click="rowDelete" type="primary" icon="el-icon-delete">删除</el-button></div>`,
		  props: ['row'],
		  methods: {
		    rowCheck() {
		      this.$emit('row-check', this.row)
		    },
		    rowDelete() {
		      this.$emit('row-delete', this.row)
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
		      message: '输入搜索',
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
		      optionValue: [],
		      columns: [{
		        'label': '序号',
		        'prop': 'serial'
		      }, {
		        'label': '时间',
		        'prop': 'time'
		      }, {
		        'label': '标题',
		        'prop': 'title'
		      }, {
		        'label': '浏览数量',
		        'prop': 'pv'
		      }],
		      columnsProps: {
		        align: 'center',
		        sortable: true
		      },
		      columnsSchema: {},
		      columnType: ''
		    }
		  },
		  created() {
		    this.getData()
		  },
		  methods: {
		    getData() {
		      // getPremis('../version/version_list', 'get', this.requestData).then(response => {
		      //   console.log(response)
		      //   this.tableData = response.items
		      //   this.totalRecords = response.totalRecords
		      // }).catch(error => {
		      //   console.log(error)
		      // })
		    },
		    noticeSear(select, input) {
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
		    noticeChcek(row) {
		    },
		    noticeDelete(row) {
		    },
		    noticeAdd(formName) {
					
		    },
		    versionSubmit() {
		      this.dialogVisible = false
		    },
		    fromChange() {
		    },
		    columnsHandler(cols) {
		      const nck = this.noticeChcek
		      const ntd = this.noticeDelete
		      return cols.concat({
		        label: '操作',
		        fixed: 'right',
		        width: 170,
		        component: Btn,
		        listeners: {
		          'row-check'(row) {
		            nck(row)
		          },
		          'row-delete'(row) {
		            ntd(row)
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