<template>
	<section v-if="check">
		<statis-page
			:columns="ballColumns" 
			:chart-group="ballGroup"
			:re-url="ballUrl"
			:cvs-url="ballCvs"
			:re-type="ballType"
			:is-second="isSecond"
			:request-data="ballRequest"
			v-on:is-check="getCheck">
		</statis-page >
	</section>
	<section v-else>
		<statis-scond
			:columns="ballSecColumns" 
			:chart-group="ballSecGroup"
			:re-url="ballSecUrl"
			:cvs-url="ballSecCvs"
			:re-type="ballSecType"
			:request-data="ballSecRequest"
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
				ballColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'time',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '访问量', // 表头及复选框文字
	        'prop': 'total_visit',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '访问IP数',
	        'prop': 'total_ip',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '下载按钮点击次数',
	        'prop': 'total_download',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				ballUrl: '../userL8/getDownloadHtmlVisit.json',
				ballType: 'get',
				ballCvs: "",
				ballGroup: [{
					group: '1',
					id: 'ballChart1',
					title: '下载页访问数',
					unit: '单位（数）'
				}],
				ballRequest: {
					beginTime : getDate().ten,
					endTime   : getDate().dateLine,
					pageNow   : 0,
					pageSize  : 10
				},
				
				ballSecColumns: [{
	        'label': '序号', // 表头及复选框文字
	        'prop': 'serial',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '访问者IP', // 表头及复选框文字
	        'prop': 'ip',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '最后访问时间',
	        'prop': 'last_visit_time',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '访问次数',
	        'prop': 'visit_count',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '下载按钮点击次数',
	        'prop': 'click_count',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '访问设备',
	        'prop': 'user_type',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }],
				ballSecUrl: '../userL8/getDownloadHtmlTimeVisit.json',
				ballSecType: 'get',
				ballSecCvs: "",
				ballSecGroup: [{
					group: '1',
					id: 'ballChart2',
					title: '约球数',
					unit: '单位（数）'
				}],
				ballSecRequest: {
					time : getDate().ten,
					pageNow   : 0,
					pageSize  : 10
				},
				check: true,
				isSecond: true,
				chekcTime: ''
			}
		},
		methods: {
			getCheck(row) {
				this.ballSecRequest.time = row.time
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