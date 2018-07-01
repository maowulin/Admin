<template>
  <section>
    <statis-page
      :columns="basiedColumns" 
      :chart-group="basiedGroup"
      :re-url="basiedUrl"
      :cvs-url="basiedCvs"
      :re-type="basiedType"
      :request-data="basiedRequest"
      :is-second="basiedSecond">
    </statis-page >
  </section>
</template>
<script>
  import StatisPage from './StatisPage'
  import {getDate} from '@/method'
  
  export default {
    components: {
      StatisPage
    },
    data() {
      return {
        basiedColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'time',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '新增用户总数', // 表头及复选框文字
	        'prop': 'new_users_num',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '次日存留率',
	        'prop': 'one_retention_rate',
	        'isDefaultHead': true,
          'isChart': true,
          'isPercent': true,
	        'chartType': 'line',
          'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '第2天留存率',
	        'prop': 'two_retention_rate',
	        'isDefaultHead': true,
          'isChart': true,
          'isPercent': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '第3天留存率',
	        'prop': 'three_retention_rate',
	        'isDefaultHead': true,
          'isChart': false,
          'isPercent': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '第4天留存率',
	        'prop': 'four_retention_rate',
	        'isDefaultHead': true,
          'isChart': false,
          'isPercent': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '第5天留存率',
	        'prop': 'five_retention_rate',
	        'isDefaultHead': true,
          'isChart': false,
          'isPercent': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '第6天留存率',
	        'prop': 'six_retention_rate',
	        'isDefaultHead': true,
          'isChart': false,
          'isPercent': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '第7天留存率',
	        'prop': 'seven_retention_rate',
	        'isDefaultHead': false,
          'isChart': false,
          'isPercent': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '第15天留存率',
	        'prop': 'fifteen_retention_rate',
	        'isDefaultHead': false,
          'isChart': false,
          'isPercent': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '第30天留存率',
	        'prop': 'thirty_retention_rate',
	        'isDefaultHead': false,
          'isChart': false,
          'isPercent': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      }],
				basiedUrl: '../userL8/userL8_retain_rate.json',
				basiedType: 'get',
        basiedCvs: '',
        basiedSecond: false,
				basiedGroup: [{
					group: '1',
					id: 'basiedChart1',
					title: '用户数据',
					unit: '单位（%）'
				}],
				basiedRequest: {
					beginTime : getDate(10),
					endTime   : getDate(0),
					pageNow   : 0,
					pageSize  : 10
				}
      }
    }
  }
</script>
<style></style>