<template>
	<section>
		<statis-page
			:columns="tribeColumns" 
			:chart-group="tribeGroup"
			:re-url="tribeUrl"
			:cvs-url="tribeCvs"
			:re-type="tribeType"
			:request-data="tribeRequest">
		</statis-page >
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
				tribeColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'time',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '新增战队', // 表头及复选框文字
	        'prop': 'newCircleNum',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '解散战队',
	        'prop': 'resoledCircleNum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '累计战队总数',
	        'prop': 'totalCreatedCircleNum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '发送世界喊话数',
	        'prop': 'worldMessageNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '总招募信息数',
	        'prop': 'totalRecruitNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '新增招募信息数',
	        'prop': 'newRecruitNum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(300, 240, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(299,239,51)',
	        'itemColor2': 'rgba(299,239,51,0.2)'
	      }],
				tribeUrl: '../circleL8/circleL8_indicators.json',
				tribeType: 'get',
				tribeCvs: "../circleL8/circleL8_exportinfo.json",
				tribeGroup: [{
					group: '1',
					id: 'basiedChart1',
					title: '战队数据',
					unit: '单位（数）'
				}],
				tribeRequest: {
					beginTime : getDate().ten,
					endTime   : getDate().dateLine,
					pageNow   : 0,
					pageSize  : 10
				}
			}
		}
	}
</script>

<style>
</style>