<template>
	<section v-if="check">
		<statis-page
			:columns="gameColumns" 
			:chart-group="gameGroup"
			:re-url="gameUrl"
			:cvs-url="gameCvs"
			:re-type="gameType"
			:is-second="isSecond"
			:request-data="gameRequest"
			v-on:is-check="getCheck">
		</statis-page >
	</section>
	<section v-else>
		<statis-scond
			:columns="gameSecColumns" 
			:chart-group="gameSecGroup"
			:re-url="gameSecUrl"
			:cvs-url="gameSecCvs"
			:re-type="gameSecType"
			:request-data="gameSecRequest"
			@second-back="secondBack">
			
		</statis-scond>
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
				gameColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'create_date',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '普通用户获得积分数', // 表头及复选框文字
	        'prop': 'user_integral_sum',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': 'VIP获得积分数',
	        'prop': 'vip_integral_sum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '奖金赛消耗积分数',
	        'prop': 'prize_consume_integral_sum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				gameUrl: '../userL8/integral_list.json',
				gameType: 'get',
				gameCvs: "../userL8/integral_exportall.json",
				gameGroup: [{
					group: '1',
					id: 'gameChart1',
					title: '积分数',
					unit: '单位（数）'
				}],
				gameRequest: {
					beginTime  : getDate(10),
					endTime    : getDate(0),
					pageNow    : 0,
					pageSize   : 10
				},
				
				gameSecColumns: [{
	        'label': '序号', // 表头及复选框文字
	        'prop': 'serial',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '用户昵称', // 表头及复选框文字
	        'prop': 'uname',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', // 折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '用户获得积分数',
	        'prop': 'user_integral_sum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '使用金币获得积分数',
	        'prop': 'use_gold_get_integral_sum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '奖金赛消耗积分数',
	        'prop': 'prize_consume_integral_sum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				gameSecUrl: '../userL8/user_integral_list.json',
				gameSecType: 'get',
				gameSecCvs: "../userL8/integral_exportusers.json",
				gameSecGroup: [{
					group: '1',
					id: 'gameChart2',
					title: '积分数',
					unit: '单位（数）'
				}],
				gameSecRequest: {
					createDate : getDate(10),
					pageNow   : 0,
					pageSize  : 10
				},
				check: true,
				isSecond: true
			}
		},
		methods: {
			getCheck(row) {
				this.gameSecRequest.createDate = row.create_date
				this.check = false
			},
			
			secondBack(val) {
				this.check = val
			}
		}
	
	}
</script>

<style>
</style>