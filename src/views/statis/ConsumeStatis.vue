<template>
	<section>		
		<el-tabs type="border-card" @tab-click="cutBord">
			<el-tab-pane label="消费金额（实体货币）">
				<section v-if="bordShow === 1">
					<section v-if="check">
						<statis-page
							:columns="presentColumns" 
							:chart-group="presentGroup"
							:re-url="presentUrl"
							:cvs-url="presentCvs"
							:re-type="presentType"
							:is-second="isSecond"
							:request-data="presentRequest"
							v-on:is-check="getCheck">
						</statis-page >
					</section>
					<section v-else>
						<statis-scond
							:columns="presentSecColumns" 
							:chart-group="presentSecGroup"
							:re-url="presentSecUrl"
							:cvs-url="presentSecCvs"
							:re-type="presentSecType"
							:request-data="presentSecRequest"
							@second-back="secondBack">
						</statis-scond>
					</section>
				</section>
			</el-tab-pane>
			<el-tab-pane label="消费金币（游戏金币）">
				<section v-if="bordShow === 2">
					<section v-if="goldCheck">
						<statis-page
							:columns="goldColumns" 
							:chart-group="goldGroup"
							:re-url="goldUrl"
							:cvs-url="goldCvs"
							:re-type="goldType"
							:is-second="isSecond"
							:request-data="goldRequest"
							v-on:is-check="getGoldCheck">
						</statis-page >
					</section>
					<section v-else>
						<statis-scond
							:columns="goldSecColumns" 
							:chart-group="goldSecGroup"
							:re-url="goldSecUrl"
							:cvs-url="goldSecCvs"
							:re-type="goldSecType"
							:request-data="goldSecRequest"
							@second-back="secondGoldBack">
						</statis-scond>
					</section>
				</section>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	import StatisPage from './page/StatisPage'
	import StatisScond from './page/StatisSecond'
	import {getDate} from '@/method'
	export default {
		components: {
			StatisPage,
			StatisScond
		},
		data() {
			return {
				bordShow: 1,
				check: true,
				goldCheck: false,
				isSecond: true,
				chekcTime: '',
				chekcGoldTime: '',
				presentColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'create_date',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '总消费金额', // 表头及复选框文字
	        'prop': 'total_consumption_amount',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': 'VIP充值金额',
	        'prop': 'vip_pay_amount',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '购买金币金额',
	        'prop': 'buy_gold_consumption_amount',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '购买金币数量',
	        'prop': 'buy_gold_num',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				presentUrl: '../game/game_consume_statisticinfo.json',
				presentType: 'get',
				presentCvs: "../game/game_consume_exportall.json",
				presentGroup: [{
					group: '1',
					id: 'presentChart1',
					title: '赠送数',
					unit: '单位（数）'
				}],
				presentRequest: {
					beginTime : getDate().ten,
					endTime   : getDate().dateLine,
					pageNow   : 0,
					pageSize  : 10,
					type      : 1
				},
				presentSecColumns: [{
	        'label': '序号', // 表头及复选框文字
	        'prop': 'serial',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '用户绰号', // 表头及复选框文字
	        'prop': 'uname',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '总消费金额',
	        'prop': 'total_consumption_amount',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': 'VIP充值金额',
	        'prop': 'vip_pay_amount',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '购买金币金额',
	        'prop': 'buy_gold_consumption_amount',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '购买金币数量',
	        'prop': 'buy_gold_num',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				presentSecUrl: '../game/game_user_consumestatisticinfo.json',
				presentSecType: 'get',
				presentSecCvs: "../game/game_consume_exportusers.json",
				presentSecGroup: [{
					group: '1',
					id: 'gameChart2',
					title: '详细赠送数',
					unit: '单位（数）'
				}],
				presentSecRequest: {
					time      : '',
					pageNow   : 0,
					pageSize  : 10,
					type      : 1
				},
				goldColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'create_date',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '游戏消耗金币统计', // 表头及复选框文字
	        'prop': 'game_consumption_gold_statistic',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '表情包消耗金币统计',
	        'prop': 'emoji_consumption_gold_statistic',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      }],
				goldUrl: '../game/game_consume_statisticinfo.json',
				goldType: 'get',
				goldCvs: "../game/game_consume_exportall.json",
				goldGroup: [{
					group: '1',
					id: 'goldChart1',
					title: '金币赠送数',
					unit: '单位（数）'
				}],
				goldRequest: {
					beginTime : getDate().ten,
					endTime   : getDate().dateLine,
					pageNow   : 0,
					pageSize  : 10,
					type      : 2
				},
				goldSecColumns: [{
	        'label': '序号', // 表头及复选框文字
	        'prop': 'serial',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '用户绰号', // 表头及复选框文字
	        'prop': 'uname',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '游戏消耗金币统计',
	        'prop': 'game_consumption_gold_statistic',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '表情包消耗金币统计',
	        'prop': 'emoji_consumption_gold_statistic',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '剩余金币',
	        'prop': 'user_gold',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				goldSecUrl: '../game/game_user_consumestatisticinfo.json',
				goldSecType: 'get',
				goldSecCvs: "../game/game_consume_exportusers.json",
				goldSecGroup: [{
					group: '1',
					id: 'goldChart2',
					title: '金币详细赠送',
					unit: '单位（数）'
				}],
				goldSecRequest: {
					time      : '',
					pageNow   : 0,
					pageSize  : 10,
					type      : 2
				}
			}
		},
		methods: {
			cutBord(e) {
				if(e.label === '消费金额（实体货币）') {
					this.bordShow = 1;
					this.goldCheck = false;
				}else if(e.label === '消费金币（游戏金币）') {
					this.bordShow = 2;
					this.goldCheck = true;
				}
			},
			
			//红包赠送查看
			getCheck(row) {
				this.presentSecRequest.time = row.create_date
				this.check = false
			},
			//返回
			secondBack(val) {
				this.check = val
			},
			//金币赠送查看
			getGoldCheck(row) {
				this.goldSecRequest.time = row.create_date
				this.goldCheck = false
			},
			//返回
			secondGoldBack(val) {
				this.goldCheck = val
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