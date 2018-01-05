<template>
	<section>
		<statis-page
			:columns="gameColumns" 
			:chart-group="gameGroup"
			:re-url="gameUrl"
			:cvs-url="gameCvs"
			:re-type="gameType"
			:is-second="isSecond"
			:request-data="eletronRequest"
			v-on:is-check="getCheck">
		</statis-page >
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
	        'prop': 'time',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '电子球杆购买量', // 表头及复选框文字
	        'prop': 'purchaseNum',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '电子球杆球房分销量',
	        'prop': 'broomNum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '电子球杆入库量  ',
	        'prop': 'warehousingNum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '电子球杆赠送量',
	        'prop': 'freeRevNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				gameUrl: '../electronicClub/eletronicClub_statisticinfo.json',
				gameType: 'get',
				gameCvs: "../electronicClub/electronicClub_exportall.json",
				gameGroup: [{
					group: '1',
					id: 'gameChart1',
					title: '约球数',
					unit: '单位（数）'
				}],
				eletronRequest: {
					beginTime  : getDate().ten,
					endTime    : getDate().dateLine,
					pageNow    : 0,
					pageSize   : 10
				},
				isSecond: false
			}
		},
		methods: {
			getCheck() {
				
			}
		}
	}
</script>

<style>
</style>