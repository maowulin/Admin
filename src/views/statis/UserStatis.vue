<template>
	<section>		
		<el-tabs type="border-card" @tab-click="cutBord">
			<el-tab-pane label="基础指标">
				<statis-page
					v-if="bordShow === 1"
					:columns="basiedColumns" 
					:chart-group="basiedGroup"
					:re-url="basiedUrl"
					:cvs-url="basiedCvs"
					:re-type="basiedType"
					:request-data="basiedRequest"
					:is-second="basiedSecond">
				</statis-page >
			</el-tab-pane>
			<el-tab-pane label="用户活跃度">
				<statis-page
					v-if="bordShow === 2"
					:columns="activiColumns" 
					:chart-group="activiGroup"
					:re-url="activiUrl"
					:cvs-url="activiCvs"
					:re-type="activiType"
					:request-data="activiRequest"
					:is-second="activiSecond">
				</statis-page >
			</el-tab-pane>
			<el-tab-pane label="用户存留率">
				<statis-page
					v-if="bordShow === 3"
					:columns="retenColumns" 
					:chart-group="retenGroup"
					:re-url="retenUrl"
					:cvs-url="retenCvs"
					:re-type="retenType"
					:request-data="retenRequest"
					:is-second="retenSecond">
				</statis-page >
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	import StatisPage from './page/StatisPage'
	import {getDate} from '@/method'
	export default {
		components: {
			StatisPage
		},
		data() {
			return {
				basiedColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'datetime',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '新游客用户', // 表头及复选框文字
	        'prop': 'guestNum',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '新普通会员',
	        'prop': 'bindingPhoneUserNum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '新注册用户',
	        'prop': 'newUserNum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '新注册并进入游戏数',
	        'prop': 'newUserEnterGameNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '新VIP用户',
	        'prop': 'newVipNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '未续费用户',
	        'prop': 'limitedNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '购买金币数',
	        'prop': 'goldNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '绑定且登陆人数',
	        'prop': 'bindfacNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '新注册用户付费比',
	        'prop': 'vipPayRatio',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '新用户付费金额  ',
	        'prop': 'newUserPayNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '新用户付费金额比  ',
	        'prop': 'newUserPayRatio',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '付费率',
	        'prop': 'payedRatio',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': 'ARPU',
	        'prop': 'ARPU',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': 'ARPPU',
	        'prop': 'ARPPU',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '营收',
	        'prop': 'revenue',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': 'VIP收入',
	        'prop': 'vipIncome',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '新增设备数',
	        'prop': 'newImeis',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '最高在线人数',
	        'prop': 'maxAppOnlineNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '平均在线人数',
	        'prop': 'avgAppOnlineNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      }],
				basiedUrl: '../userL8/userL8_baseindicators.json',
				basiedType: 'get',
				basiedCvs: "../userL8/userL8_exportbase.json",
				basiedGroup: [{
					group: '1',
					id: 'basiedChart1',
					title: '用户数据',
					unit: '单位（数）'
				}],
				basiedRequest: {
					beginTime : getDate().ten,
					endTime   : getDate().dateLine,
					pageNow   : 0,
					pageSize  : 10
				},
				
				activiColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'datetime',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },{
	        'label': '日活用户数', // 表头及复选框文字
	        'prop': 'dayActiveNum',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '日活跃度',
	        'prop': 'dayActivePercent',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '日活/月活',
	        'prop': 'dayActiveMonth',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '周活用户数',
	        'prop': 'weekActiveNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '周活跃度',
	        'prop': 'weekActivePercent',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '月活用户数（APP）',
	        'prop': 'monthActiveNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '月活跃度',
	        'prop': 'monthActivePercent',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '月沉默用户',
	        'prop': 'monthInactiveNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '月沉默率',
	        'prop': 'monthInactivePercent',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '流失用户',
	        'prop': 'lostUserNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '流失率',
	        'prop': 'lostUserPercent',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '累计启动用户',
	        'prop': 'totalActivedUserNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '启动次数',
	        'prop': 'startTimes',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				activiUrl: '../userL8/userL8_activitydegree.json',
				activiType: 'get',
				activiCvs: '../userL8/userL8_exportactivity.json',
				activiGroup: [{
					group: '1',
					id: 'activiChart1',
					titel: '用户活跃度',
					unit: '单位（数）'
				}],
				activiRequest: {
					beginTime : getDate().ten,
					endTime   : getDate().dateLine,
					pageNow   : 0,
					pageSize  : 10
				},
				
				retenColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'time',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },{
	        'label': '新注册用户', // 表头及复选框文字
	        'prop': 'newUserNum',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '次日留存数',
	        'prop': 'oneDayRetaiNum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '次日留存率',
	        'prop': 'oneRetainPercent',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '2',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '3日留存数',
	        'prop': 'thirdDayRetainNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '3日留存率',
	        'prop': 'thirdRetainPercent',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '2',
	        'chartColor': ''
	      },{
	        'label': '7日留存数',
	        'prop': 'sevenDayRetainNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '7日留存率',
	        'prop': 'sevenRetainPercent',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '2',
	        'chartColor': ''
	      },{
	        'label': '月留存数（APP）',
	        'prop': 'monthRetainNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '月留存率',
	        'prop': 'monthRetainPercent',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '2',
	        'chartColor': ''
	      }],
	      retenGroup: [{
	      		group: '1',
	      		id: 'retenChart1',
	      		title: "用户存留数",
						unit: "单位（数）",
	      	},
	      	{
	      		group: '2',
	      		id: 'retenChart2',
	      		title: "用户存留率",
						unit: "单位（%）",
	      }],
	      retenRequest: {
					beginTime : getDate().ten,
					endTime   : getDate().dateLine,
					pageNow   : 0,
					pageSize  : 10
				},
				retenUrl: '../userL8/userL8_retainnum.json',
				retenCvs: '../userL8/userL8_exportretain.json',
				retenType: 'get',
				activiSecond: false,
				basiedSecond: false,
				retenSecond: false,
				bordShow: 1
			}
		},
		methods: {
			cutBord(e) {
				if(e.label === '基础指标') {
					this.bordShow = 1
				}else if(e.label === '用户活跃度') {
					this.bordShow = 2
				}else if(e.label === '用户存留率') {
					this.bordShow = 3
				}
			}
		}
	}
</script>

<style>
	.el-tabs {
		margin-top: 10px;
	}
	
	.el-checkbox-group {
		margin: 10px 0;
	}
	
	.user_head2 {
		line-height: 2;
	}
</style>