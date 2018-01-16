<template>
		<section>
			<div class="user_head">
				<el-button @click="bannerAdd" >添加</el-button>
				<el-button @click="bannerDelete" >删除</el-button>

				<my-select :message="message1" :option-value="optionValue1" @selectChange="bannerJump"></my-select>
				<my-select :message="message2" :option-value="optionValue2" @selectChange="bannerType"></my-select>
				
				<paging :total="totalRecords" @getSize="getFightSize" @getPage="getFightPage"></paging>
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
					ortable
					label="序号"
					prop="serial"
					width="55">
				</el-table-column>

				<el-table-column
					sortable
					label="说明"
					prop="explain">
				</el-table-column>

				<el-table-column
					label="链接"
					sortable
					prop="link">
				</el-table-column>

				<el-table-column
					label="跳转方式"
					sortable
					prop="jumpMode">
					<template slot-scope="scope">
						<div>
							<span v-if="scope.row.jumpMode === 0">H5跳转</span>
							<span v-else-if="scope.row.jumpMode === 1">内部跳转</span>
							<span v-else>暂无数据</span>
						</div>
					</template>
				</el-table-column>

				<el-table-column label="类型" sortable 	prop="type">
					<template slot-scope="scope">
						<div>
							<span v-if="scope.row.type === 1">新手任务</span>
							<span v-else-if="scope.row.type === 2">未结束赛事</span>
							<span v-else-if="scope.row.type === 3">开通会员</span>
							<span v-else-if="scope.row.type === 4">金币充值</span>
							<span v-else-if="scope.row.type === 5">银币兑换</span>
							<span v-else-if="scope.row.type === 6">游戏入口</span>
							<span v-else-if="scope.row.type === 7">无类型</span>
							<span v-else-if="scope.row.type === 9">电子球杆购买</span>
							<span v-else>暂无数据</span>
						</div>
					</template>
				</el-table-column>

				<el-table-column
					label="创建时间"
					sortable
					prop="createTime">
				</el-table-column>

				<el-table-column label="操作" sortable width="100">
					<template slot-scope="scope">
						<el-button type="primary" @click="bannerCheck('scope.row.image')" icon="el-icon-view">查看</el-button>
					</template>
				</el-table-column>
			</el-table>

		 <el-dialog
			title="添加banner"
			:visible.sync="dialogVisible"
			width="30%">

			<el-form :model="bannerInfo" status-icon ref="bannerInfo" label-width="120px" class="demo-ruleForm">
				<el-form-item label="说明" prop="explain">
					<el-input v-model="bannerInfo.explain" type="textarea" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="跳转方式" prop="jumpMode">
					<el-radio v-model="bannerInfo.jumpMode" label="1">内部跳转</el-radio>
  				<el-radio v-model="bannerInfo.jumpMode" label="2">外部跳转</el-radio>
				</el-form-item>

				<el-form-item label="跳转链接" prop="link">
					<el-input v-model="bannerInfo.link" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="选择类型" prop="link">
					<el-select v-model="bannerInfo.link" placeholder="请选择">
						<el-option value="1" label="新手任务"></el-option>
						<el-option value="2" label="未结束赛事"></el-option>
						<el-option value="3" label="开通会员"></el-option>
						<el-option value="4" label="金币充值"></el-option>
						<el-option value="5" label="银币兑换"></el-option>
						<el-option value="6" label="游戏入口"></el-option>
						<el-option value="9" label="无类型"></el-option>
						<el-option value="7" label="电子球杆购买"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="上传图片" prop="age">
					<el-upload
						class="avatar-uploader"
						action="https://jsonplaceholder.typicode.com/posts/"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload">
						<img v-if="bannerInfo.image" :src="bannerInfo.image" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="bannerSubmit">确认发布</el-button>
			</span>
		</el-dialog>
			
		</section>
	</template>
	
	<script>
		import { getPremis } from '@/api/management'
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
		      totalRecords: 0,
		      tableData: [],
		      bannerInfo: {
		        explain: '',
          	jumpMode: '',
          	link: '',
		        image: '',
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
		        'opti': '跳转方式',
		        'val': ''
		      }, {
		        'opti': '内部跳转',
		        'val': '1'
		      }, {
		        'opti': 'H5跳转',
		        'val': '0'
		      }],
		      optionValue2: [{
		        'opti': '请选择',
		        'val': ''
		      }, {
		        'opti': '新手任务',
		        'val': '1'
		      }, {
		        'opti': '未结束赛事',
		        'val': '2'
		      }, {
		        'opti': '开通会员',
		        'val': '3'
		      }, {
		        'opti': '金币充值',
		        'val': '4'
		      }, {
		        'opti': '银币兑换',
		        'val': '5'
		      }, {
		        'opti': '游戏入口',
		        'val': '6'
		      }, {
		        'opti': '无类型',
		        'val': '9'
		      }, {
		        'opti': '电子球杆购买',
		        'val': '7'
					}]
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
		    getFightSize(pageSize) {
		      this.requestData.pageSize = pageSize
		      this.getData()
		    },
		    getFightPage(pageNow) {
		      this.requestData.pageNow = pageNow
		      this.getData()
		    },
		    bannerSubmit() {
					console.log('信息提交')
					console.log(this.versionInfo)
		      this.dialogVisible = false
		    },
				bannerJump() {

				},
				bannerType() {

				},
				bannerCheck(img) {
					console.log(img)
				},
				bannerAdd(row) {
					this.dialogVisible = true
				},
				bannerDelete() {
					
				},
				beforeAvatarUpload() {
					
				},
				handleAvatarSuccess() {

				},
				handleSelectionChange(index) {

				},
				isChecked(index) {
					return true
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