<template>
	<section>
		<statis-page
			:columns="ballColumns" 
			:chart-group="ballGroup"
			:re-url="ballUrl"
			:cvs-url="ballCvs"
			:re-type="ballType"
			:is-second="isSecond"
			v-on:is-check="getCheck">
		</statis-page >
	</section>
</template>

<script>
	import StatisPage from './page/StatisPage'
	import StatisScond from './page/StatisSecond'

	export default {
		components: {
			StatisPage,
			StatisScond
		},
		data() {
			return {
				ballColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'time',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '观战用户数', // 表头及复选框文字
	        'prop': 'newCreateNum',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '观战总次数',
	        'prop': 'joinedUserNum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '总观战时长',
	        'prop': 'successedNum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				ballUrl: '../aboutball/aboutball_allstatisticinfo.json',
				ballType: 'get',
				ballCvs: "../aboutball/aboutball_exportall.json",
				ballGroup: [{
					group: '1',
					id: 'ballChart1',
					title: '约球数',
					unit: '单位（数）'
				}],
				isSecond: false
			}
		},
		methods: {
			getCheck(row) {
				
			}
		}
	
	}
</script>

<style>
</style>