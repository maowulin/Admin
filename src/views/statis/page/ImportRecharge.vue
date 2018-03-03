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
	        'label': '充值VIP用户数', // 表头及复选框文字
	        'prop': 'topUp_vip_num',  // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true,  // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', //折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },{
	        'label': '充值VIP金额',
	        'prop': 'topUp_vip_sum',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },{
	        'label': '购买金币用户数',
	        'prop': 'buy_gold_num',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },{
	        'label': '购买金币金额',
	        'prop': 'buy_gold_sum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '用户获得金币总数',
	        'prop': 'get_gold_sum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '消耗金币总数',
	        'prop': 'consume_gold_sum',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '获得奖金人数',
	        'prop': 'get_bonus_num',
	        'isDefaultHead': true,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '获得奖金总金额',
	        'prop': 'get_bonus_sum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '奖金赛胜利获得奖金数',
	        'prop': 'bonus_competition_sum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '新手引导赠送奖金数',
	        'prop': 'presented_bonus_sum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '奖金提现申请人数',
	        'prop': 'extract_bonus_num',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '奖金提现申请金额',
	        'prop': 'extract_bonus_sum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '奖金提现申请成功人数',
	        'prop': 'extract_bonus_win_num',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
	      },{
	        'label': '奖金提现申请成功金额',
	        'prop': 'extract_bonus_win_sum',
	        'isDefaultHead': false,
	        'isChart': false,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'chartColor': ''
        }],
				basiedUrl: '../userL8/getUserBasicInfo_list.json',
				basiedType: 'get',
        basiedCvs: '',
        basiedSecond: false,
				basiedGroup: [{
					group: '1',
					id: 'basiedChart1',
					title: '用户数据',
					unit: '单位（数）'
				}],
				basiedRequest: {
					beginTime : getDate().dateLine,
					endTime   : getDate().dateLine,
					pageNow   : 0,
					pageSize  : 10,
					type: 2
				}
      }
    }
  }
</script>
<style></style>