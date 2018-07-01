<template>
	<section>
		<statis-page
			:columns="goldColumns" 
			:chart-group="goldGroup"
			:re-url="goldUrl"
			:cvs-url="goldCvs"
			:re-type="goldType"
			:request-data="goldRequest">
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
				goldColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'time',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '消耗金币量', // 表头及复选框文字
	        'prop': 'consume_gold',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '金币购买量',
	        'prop': 'buy_gold',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '金币赠送量',
	        'prop': 'present_gold',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '系统回收',
	        'prop': 'recycle_gold',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '累计存留量',
	        'prop': '',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				goldUrl: '../userL8/getUserGoldStatis.json',
				goldType: 'get',
				goldCvs: "",
				goldGroup: [{
					group: '1',
					id: 'basiedChart1',
					title: '金币数据',
					unit: '单位（数）'
				}],
				goldRequest: {
					beginTime : getDate(10),
					endTime   : getDate(0),
					pageNow   : 0,
					pageSize  : 10
				}
			}
		}
	}
</script>

<style>
</style>