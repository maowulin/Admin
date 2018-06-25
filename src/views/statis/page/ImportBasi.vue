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
	        'prop': 'add_number',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '游客转注册用户',
	        'prop': 'visitor_convert_register_number',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '注册用户数',
	        'prop': 'register_directly',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '游客用户数',
	        'prop': 'visitor_number',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '最高在线人数',
	        'prop': 'max_online_number',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '平均在线人数',
	        'prop': 'average_online_number',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
				},
				// {
	      //   'label': '每日IOS登陆用户数',
	      //   'prop': 'new_user_ios',
	      //   'isDefaultHead': true,
	      //   'isChart': false,
	      //   'chartType': 'line',
	      //   'chartGroup': '1',
	      //   'chartColor': ''
				// },
				{
	        'label': '日活跃用户数',
	        'prop': 'dayActiveNum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '周活跃用户数',
	        'prop': 'weekActiveNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '月活跃用户数',
	        'prop': 'monthActiveNum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      }],
				basiedUrl: '../userL8/getUserBasicInfo_list.json',
				basiedType: 'get',
				basiedCvs: "",
				basiedSecond: false,
				basiedGroup: [{
					group: '1',
					id: 'basiedChart1',
					title: '用户数据',
					unit: '单位（数）'
				}],
				basiedRequest: {
					beginTime : getDate(0),
					endTime   : getDate(0),
					pageNow   : 0,
					pageSize  : 10,
					type: 1
				}
      }
    }
  }
</script>
<style></style>