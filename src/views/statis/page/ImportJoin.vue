<template>
	<div>
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
	</div>
</template>

<script>
	import StatisPage from './StatisPage'
	import StatisScond from './StatisSecond'
	import { getDate } from '@/method'

	export default {
		components: {
			StatisPage,
			StatisScond
		},
		data() {
			return {
				gameColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'time',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '加入房间总数', // 表头及复选框文字
	        'prop': 'join_room_total',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '加入房间但等待超时总次数',
	        'prop': 'join_room_Timeout_total',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '加入房间但被拒绝总次数',
	        'prop': 'join_room_refuse_total',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '加入奖金赛房间次数',
	        'prop': 'join_room_bonus_num',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '加入金币赛房间次数（中式黑8）',
	        'prop': 'join_room_gold_black8_num',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '加入金币赛房间次数（23分）',
	        'prop': 'join_room_gold_score23_num',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '加入免费赛房间次数（中式黑8）',
	        'prop': 'join_room_free_black8_num',
	        'isDefaultHead': false,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '加入免费赛房间次数（23分）',
	        'prop': 'join_room_free_score23_num',
	        'isDefaultHead': false,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				gameUrl: '../userL8/getUserBasicInfo_list.json',
				gameType: 'get',
				gameCvs: "",
				gameGroup: [{
					group: '1',
					id: 'gameChart1',
					title: '约球数',
					unit: '单位（数）'
				}],
				gameRequest: {
					beginTime  : getDate(0),
					endTime    : getDate(0),
					pageNow    : 0,
          pageSize   : 10,
          type: 5
				},
				
				gameSecColumns: [{
	        'label': '序号', // 表头及复选框文字
	        'prop': 'serial',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '用户绰号', // 表头及复选框文字
	        'prop': 'uname',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '加入房间总次数',
	        'prop': 'user_join_total',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '加入房间但等待超时总次数',
	        'prop': 'user_join_timeOut_num',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '加入房间但被拒绝总次数',
	        'prop': 'user_join_refase_num',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '加入奖金赛房间次数',
	        'prop': 'user_join_bonus_num',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '加入金币赛房间次数（中式黑8）',
	        'prop': 'user_join_gold_black8_num',
	        'isDefaultHead': true,
	        'isChart': false,
	      },{
	        'label': '加入金币赛房间次数（23分）',
	        'prop': 'user_join_gold_score23_num',
	        'isDefaultHead': false,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '加入免费赛房间次数（中式黑8）',
	        'prop': 'user_join_free_black8_num',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '加入免费赛房间次数（23分）',
	        'prop': 'user_join_free_score23_num',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				gameSecUrl: '../userL8/getUserBasicInfo_user_list.json',
				gameSecType: 'get',
				gameSecCvs: "",
				gameSecGroup: [{
					group: '1',
					id: 'gameChart2',
					title: '约球数',
					unit: '单位（数）'
				}],
				gameSecRequest: {
					time : getDate(10),
					pageNow   : 0,
          pageSize  : 10,
          type: 5
				},
				check: true,
				isSecond: true,
				chekcTime: ''
			}
		},
		methods: {
			getCheck(row) {
				this.gameSecRequest.time = row.time
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