<template>
	<section>
		<statis-page
			:columns="gameColumns" 
			:chart-group="gameGroup"
			:re-url="gameUrl"
			:cvs-url="gameCvs"
			:re-type="gameType"
			:is-second="isSecond"
			:request-data="gameRequest">
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
				gameColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'time',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '第1步通过占比', // 表头及复选框文字
	        'prop': 'step_1_proportion',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
          'itemColor2': 'rgba(137,189,2,0.27)', // rgba
          'isPercent': true
	      },
	      {
	        'label': '第2步通过占比', // 表头及复选框文字
	        'prop': 'step_2_proportion',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)', // rgba
          'isPercent': true
	      },
	      {
	        'label': '第3步通过占比', // 表头及复选框文字
	        'prop': 'step_3_proportion',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)', // rgba
          'isPercent': true
	      },
	      {
	        'label': '第4步通过占比', // 表头及复选框文字
	        'prop': 'step_4_proportion',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)', // rgba
          'isPercent': true
	      },
	      {
	        'label': '第5步通过占比', // 表头及复选框文字
	        'prop': 'step_5_proportion',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)', // rgba
          'isPercent': true
	      },
	      {
	        'label': '第6步通过占比', // 表头及复选框文字
	        'prop': 'step_6_proportion',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)', // rgba
          'isPercent': true
	      },
	      {
	        'label': '第7步通过占比', // 表头及复选框文字
	        'prop': 'step_7_proportion',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)', // rgba
          'isPercent': true
	      },
	      {
	        'label': '第8步通过占比', // 表头及复选框文字
	        'prop': 'step_8_proportion',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)', // rgba
          'isPercent': true
	      },
	      {
	        'label': '第9步通过占比', // 表头及复选框文字
	        'prop': 'step_9_proportion',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)', // rgba
          'isPercent': true
	      },{
	        'label': '通关占比',
	        'prop': 'pass_proportion',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(137,189,2,0.27)', // rgba
          'isPercent': true
	      }],
				gameUrl: '../userL8/findNoviceGuidanceStatistic_list.json',
				gameType: 'get',
				gameCvs: "",
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
        isSecond: false
			}
		},
		methods: {

		}
	
	}
</script>

<style>
</style>