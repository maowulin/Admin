<template>
  <div class="user_table">
		
  	<div class="user_head">
  		<my-select :message="message1" :option-value="optionValue1" v-on:selectChange="downloadChange"></my-select>
  		
	  	<my-select :message="message2" :option-value="optionValue2" v-on:selectChange="userTypeChange"></my-select>
	  	
	  	<my-search :message="message3" :option-value="optionValue3" v-on:searchClick="userInfoSearch"></my-search>
	  	
	  	<paging :total="totalRecords" v-on:getSize="getUserSize" v-on:getPage="getUserPage"></paging>
  	</div>
  	
  	<egrid class="egrid"
  		fit
      :data="tableData"
      :columns="columns"
      :columns-schema="columnsSchema"
      :columns-props="columnsProps"
			:column-type="columnType"
			:expand-row-keys="expands"
			row-key="user_id"
			v-loading="loading"
      @expand="expandChange">
      <template slot="expand" slot-scope="{}">
        <section class="expand-detail userdateil-expand">
					<ul class="user-detail">
						<li class="head">账号信息</li>
						<li class="conent">
							<span class="conent-title">用户编码：</span>
							<span class="conent-cent">{{ detailData.userCode }}</span>
						</li>
						<li class="conent">
							<span class="conent-title">注册时间：</span>
							<span class="conent-cent">{{ detailData.registerDate }}</span>
						</li>
						<li class="conent">
							<span class="conent-title">最后登陆时间：</span>
							<span class="conent-cent">{{ detailData.lastLoginTime }}</span>
						</li>
						<li class="conent">
							<span class="conent-title">VIP到期时间：</span>
							<span class="conent-cent">{{ detailData.vip_date_limit }}</span>
						</li>
					</ul>

					<ul class="user-detail">
						<li class="head">约球信息</li>
						<li class="conent">
							<span class="conent-title">发起约球：</span>
							<span class="conent-cent">{{ detailData.myCreateYq }}</span>
						</li>
						<li class="conent">
							<span class="conent-title">参与约球：</span>
							<span class="conent-cent">{{ detailData.myJoinYq }}</span>
						</li>
					</ul>

					<ul class="user-detail">
						<li class="head">帖子信息</li>
						<li class="conent">
							<span class="conent-title">已发帖子：</span>
							<span class="conent-cent">{{ detailData.myCreateTopic }}</span>
						</li>
						<li class="conent">
							<span class="conent-title">参与帖子：</span>
							<span class="conent-cent">{{ detailData.myjoinTopic }}</span>
						</li>
					</ul>

					<ul class="user-detail">
						<li class="head">游戏信息</li>
						<li class="conent">
							<span class="conent-title">游戏场次：</span>
							<span class="conent-cent">{{ detailData.game_total_number }}</span>
						</li>
						<li class="conent">
							<span class="conent-title">积分赛：</span>
							<span class="conent-cent">{{ detailData.integral_game }}</span>
						</li>
						<li class="conent">
							<span class="conent-title">金币积分赛：</span>
							<span class="conent-cent">{{ detailData.gold_integral_game }}</span>
						</li>
						<li class="conent">
							<span class="conent-title">免费积分赛：</span>
							<span class="conent-cent">{{ detailData.free_integral_game }}</span>
						</li>
						<li class="conent">
							<span class="conent-title">奖金赛：</span>
							<span class="conent-cent">{{ detailData.bonus_game }}</span>
						</li>
						<li class="conent">
							<span class="conent-title">23分赛：</span>
							<span class="conent-cent">{{ detailData.score_23_game }}</span>
						</li>
						<li class="conent">
							<span class="conent-title">游戏胜场：</span>
							<span class="conent-cent">--</span>
						</li>
						<li class="conent">
							<span class="conent-title">游戏排名：</span>
							<span class="conent-cent">--</span>
						</li>
					</ul>

					<ul class="user-detail">
						<li class="head">设备绑定</li>
						<li class="conent" v-for="item in detailData.facilityBindings">
							<span class="conent-cent" v-if="item.facility_status === 1">{{ item.facility_code }}（使用中）</span>
							<span class="conent-cent" v-else>{{ item.facility_code }}</span>
						</li>
					</ul>

					<ul class="user-detail">
						<li class="conent">
							<span class="conent-title">总在线时长：</span>
							<span class="conent-cent">{{ onlinetime }} （小时）</span>
							<el-button type="primary" size="mini" icon="el-icon-view" @click="userOnlineCheck">查看</el-button>
						</li>
					</ul>
					
        </section>
      </template>
	  </egrid>
	 
		<el-dialog
			title="在线时长列表"
			:visible.sync="dialogVisible"
			class="online-dialog"
			width="25%">
			<div>
				<el-date-picker
					v-model="onlineDate"
					align="right"
					type="date"
					placeholder="选择日期"
					@change="onlineDateChange"
					:picker-options="pickerOptions1">
				</el-date-picker>
			</div>
			<el-table
				:data="onlineTableData"
				style="width: 300px"
				:default-sort = "{prop: 'date', order: 'descending'}"
				>
				<el-table-column
					prop="dayTime"
					label="日期"
					sortable
					width="120">
				</el-table-column>
				<el-table-column
					prop="onlineHour"
					label="在线时长（小时）"
					sortable
					width="180">
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">返回</el-button>
			</span>
		</el-dialog>
  </div>
</template>
  
<script>
	import { getUserInfoData, getUserDetailData, getOnlineTime } from '@/api/query'
	import Paging from '@/components/Paging/'
	import MySelect from '@/components/Select/'
	import MySearch from '@/components/Search/'
	
	// 用户头像显示
	var userUrl = {
	  template: '<img :src="row.iconUrl" alt="暂无" style="width:40px;" />',
	  props: ['row']
	}
	
	// 用户是否为vip
	var isVip = {
	  template: `<span v-if="row.if_vip == 0">否</span>
		 					<span v-else style="color:red;">是</span>`,
	  props: ['row']
	}
	
	// 账号状态
	var accountStatus = {
	  template: `<span v-if="row.accountStatus == 0">正常</span>
		 					<span v-else style="color:red;">禁用</span>`,
	  props: ['row']
	}
	
	// vip等级
	var vipLevel = {
	  template: `<span v-if="row.level !== 0">VIP{{row.level}}</span>
		 					<span v-else>--</span>`,
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
      tableData: [],
      message1: '下载渠道',
      message2: '用户类型',
      message3: '请选择',
      totalRecords: 0,
			detailData: {},
			dialogVisible: false,
			expands: [],
			userId: '',
      optionValue1: [{
          'opti': '下载渠道',
        	'val': ''
      }, {
        	'opti': '官网',
        	'val': 'butterfly'
      }, {
        	'opti': '华为',
        	'val': 'huawei'
      }, {
        	'opti': '360',
        	'val': '360'
      }, {
        	'opti': '联想',
        	'val': 'lianxiang'
      }, {
        	'opti': '绿茶软件园',
        	'val': 'lvcha'
      }, {
        	'opti': 'PC6',
        	'val': 'pc6'
      }],

      optionValue2: [{
        	'opti': '用户类型',
        	'val': ''
      }, {
        	'opti': '游客',
        	'val': '1'
      }, {
        	'opti': '普通会员',
        	'val': '2'
      }, {
        	'opti': 'VIP用户',
        	'val': '3'
      }, {
        	'opti': '充值用户',
        	'val': '4'
      }],

      optionValue3: [{
        	'opti': '请选择',
        	'val': ''
      }, {
        	'opti': '用户手机号',
        	'val': '1'
      }, {
        	'opti': '用户绰号',
        	'val': '2'
      }, {
        	'opti': '战队名称',
        	'val': '3'
      }],
      columns: [{
        	'label': '序号', // 列名称
        	'prop': 'serial', // 列数据
        	'isCustom': false, // 是否自定义列
        	'isSortable': true, // 是否显示排序
        	'width': '60px' // 宽度
      }, {
        	'label': '用户头像', // 列名称
        	'prop': 'iconUrl', // 列数据
        	'isCustom': true, // 是否自定义列
        	'isSortable': false, // 是否显示排序
        	'width': '',
        	'slotName': 'imageUrl'
      }, {
        	'label': '用户手机号', // 列名称
        	'prop': 'phone', // 列数据
        	'isCustom': false, // 是否自定义列
        	'isSortable': true, // 是否显示排序
        	'width': '120px'
      }, {
        	'label': '用户', // 列名称
        	'prop': 'uname', // 列数据
        	'isCustom': false, // 是否自定义列
        	'isSortable': false, // 是否显示排序
        	'width': ''
      }, {
        	'label': '等级', // 列名称
        	'prop': 'level', // 列数据
        	'isCustom': false, // 是否自定义列
        	'isSortable': true, // 是否显示排序
        	'width': ''
      }, {
        	'label': '金币', // 列名称
        	'prop': 'gold', // 列数据
        	'isCustom': false, // 是否自定义列
        	'isSortable': true, // 是否显示排序
        	'width': ''
      }, {
        	'label': '游戏场次', // 列名称
        	'prop': 'total_number', // 列数据
        	'isCustom': false, // 是否自定义列
        	'isSortable': true, // 是否显示排序
        	'width': ''
      }, {
        	'label': 'VIP等级', // 列名称
        	'prop': 'level', // 列数据
        	'isCustom': true, // 是否自定义列
        	'isSortable': true, // 是否显示排序
        	'width': ''
      }, {
        	'label': '账号状态', // 列名称
        	'prop': 'accountStatus', // 列数据
        	'isCustom': true, // 是否自定义列
        	'isSortable': false, // 是否显示排序
        	'width': ''
      }, {
        	'label': '在线时长', // 列名称
        	'prop': 'onlinetime', // 列数据
        	'isCustom': false, // 是否自定义列
        	'isSortable': true, // 是否显示排序
        	'width': ''
      }, {
        	'label': '当前版本', // 列名称
        	'prop': 'version', // 列数据
        	'isCustom': false, // 是否自定义列
        	'isSortable': true, // 是否显示排序
        	'width': ''
      }, {
        	'label': '下载渠道', // 列名称
        	'prop': 'channel', // 列数据
        	'isCustom': false, // 是否自定义列
        	'isSortable': true, // 是否显示排序
        	'width': ''
      }],
      expansionConent: [{
        	'expansionHead': '用户编码', // 列名称
        	'expansionData': 'userCode', // 列数据
        	'isCustom': false, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '注册时间', // 列名称
        	'expansionData': 'registerDate', // 列数据
        	'isCustom': false, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': 'VIP到期时间', // 列名称
        	'expansionData': 'vipDate', // 列数据
        	'isCustom': false, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '游戏场次', // 列名称
        	'expansionData': 'game_total_number', // 列数据
        	'isCustom': false, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '积分赛', // 列名称
        	'expansionData': '', // 列数据
        	'isCustom': false, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '红包赛', // 列名称
        	'expansionData': '', // 列数据
        	'isCustom': false, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '游戏胜场', // 列名称
        	'expansionData': 'game_win_number', // 列数据
        	'isCustom': false, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '游戏排名', // 列名称
        	'expansionData': 'game_rank', // 列数据
        	'isCustom': false, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '发起约球', // 列名称
        	'expansionData': 'myCreateYq', // 列数据
        	'isCustom': false, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '参与约球', // 列名称
        	'expansionData': 'myJoinYq', // 列数据
        	'isCustom': false, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '已发帖子', // 列名称
        	'expansionData': 'myCreateTopic', // 列数据
        	'isCustom': false, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '参与帖子', // 列名称
        	'expansionData': 'myjoinTopic', // 列数据
        	'isCustom': false, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '设备绑定', // 列名称
        	'expansionData': '', // 列数据
        	'isCustom': true, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '总在线时长', // 列名称
        	'expansionData': '', // 列数据
        	'isCustom': true, // 是否自定义列
        	'width': ''
      }, {
        	'expansionHead': '在线时长列表', // 列名称
        	'expansionData': '', // 列数据
        	'isCustom': true, // 是否自定义列
        	'width': ''
      }],
      columnsProps: {
        	align: 'center',
        	sortable: true
      },
	      columnsSchema: {
	        '用户头像': {
	        	component: userUrl
	        },
	        'VIP': {
	        	component: isVip
	        },
	        '账号状态': {
	        	component: accountStatus
	        },
	        'VIP等级': {
	        	component: vipLevel
	        },
	        '赠送金币数': {
	        	width: '120px'
	        }
	      },
	      // columnType: 'selection',
				columnType: 'expand',
				loading: false,
				onlinetime: '--',
				onlineDate: '',
				onlineTableData: [],
	      requeseData: {
					channel: '',
					vip: '',
					type: '',
					user_type: '',
					like: '',
					pageNow: 0,
					pageSize: 10
				},
				pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    formatter(row, column) {
      return row.address
      },
    getData() {
			this.loading = true
			getUserInfoData(this.requeseData).then(response => {
				this.loading = false
				this.tableData = response.items
				this.totalRecords = response.totalRecords
    	}).catch(error => {
				this.loading = false
				this.$message({
          showClose: true,
          message: '服务器错误',
          type: 'error'
        })
    	})
    },
		expandChange(row, expandedRows) {
			if (expandedRows === true) {
				this.onlinetime = row.onlinetime
				this.userId = row.user_id
				getUserDetailData(this.userId).then(response => {
				this.detailData = response.data
				}).catch(error => {
					this.$message({
						showClose: true,
						message: '服务器错误',
						type: 'error'
					})
				})
			}

			Array.prototype.remove = function (val) {
					let index = this.indexOf(val)
					if (index > -1) {
							this.splice(index, 1)
					}
			};

			if (this.expands.indexOf(row.user_id) < 0) {
					this.expands = []
					this.expands.push(row.user_id)
			} else {
					this.expands.remove(row.user_id)
			}
		},
		downloadChange(command) {
			// this.requeseData.downloadVal = command
    },
		userTypeChange(command) {
			this.requeseData.user_type = command
			this.getData()
    },
		userInfoSearch(select, input) {
			this.requeseData.type = select
    	this.requeseData.like = input
    	this.getData()
    },
		getUserSize(pageSize) {
			this.requeseData.pageSize = pageSize
    	this.getData()
    },
		getUserPage(pageNow) {
			this.requeseData.pageNow = pageNow
    	this.getData()
		},
		userOnlineCheck() {
			const requestData = {
				'userID': this.userId,
				'time': this.onlineDate,
				'pageNow': 0,
				'pageSize': 10
			}
			getOnlineTime(requestData).then(response => {
				this.onlineTableData = response.data
				this.dialogVisible = true
			}).catch(error => {
				this.$message({
          showClose: true,
          message: '服务器错误',
          type: 'error'
        })
			})
		},
		onlineDateChange() {
			this.userOnlineCheck()
		} 
  }
}
</script>

<style>
	.el-button {
		margin-left: -2px;
    width: 80px;
	}
</style>