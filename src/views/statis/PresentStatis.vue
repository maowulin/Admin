<template>
	<section>
		<el-tabs type="border-card" @tab-click="cutBord">
			<el-tab-pane label="奖金赠送">
				<section v-if="bordShow === 1">
					<section v-if="check">
						<statis-page 
							:columns="presentColumns" 
							:chart-group="presentGroup" 
							:re-url="presentUrl" 
							:cvs-url="presentCvs" 
							:re-type="presentType" 
							:is-second="isSecond" 
							:request-data="presentRequest" 
							v-on:is-check="getCheck"></statis-page>
					</section>
					<section v-else>
						<statis-scond 
							:columns="presentSecColumns" 
							:chart-group="presentSecGroup" 
							:re-url="presentSecUrl" 
							:cvs-url="presentSecCvs" 
							:re-type="presentSecType" 
							:request-data="presentSecRequest" 
							@second-back="secondBack"></statis-scond>
					</section>
				</section>
			</el-tab-pane>
			<el-tab-pane label="金币赠送">
				<section v-if="bordShow === 2">
					<section v-if="goldCheck">
						<statis-page 
							:columns="goldColumns" 
							:chart-group="goldGroup" 
							:re-url="goldUrl" 
							:cvs-url="goldCvs" 
							:re-type="goldType" 
							:is-second="isSecond" 
							:request-data="goldRequest" 
							v-on:is-check="getGoldCheck"></statis-page>
					</section>
					<section v-else>
						<statis-scond 
							:columns="goldSecColumns" 
							:chart-group="goldSecGroup" 
							:re-url="goldSecUrl" 
							:cvs-url="goldSecCvs" 
							:re-type="goldSecType" 
							:request-data="goldSecRequest" 
							@second-back="secondGoldBack"></statis-scond>
					</section>
				</section>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
	import StatisPage from './page/StatisPage'
	import StatisScond from './page/StatisSecond'
	import { getDate } from '@/method'
	export default {
	  components: {
	    StatisPage,
	    StatisScond
	  },
	  data() {
	    return {
	      bordShow: 1,
	      check: true,
	      goldCheck: false,
	      isSecond: true,
	      chekcGoldTime: '',
	      presentColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'create_date', // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '赠送总额', // 表头及复选框文字
	        'prop': 'presented_total_amount', // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true, // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', // 折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },
	      {
	        'label': '红包赛赠送统计',
	        'prop': 'redpack_presented_amount',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },
	      {
	        'label': '抽奖赠送统计',
	        'prop': 'lottery__presented_amount',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },
	      {
	        'label': '用户提现总额',
	        'prop': 'user_withdraw_amount',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }
	      ],
	      presentUrl: '../game/game_presented_statisticinfo.json',
	      presentType: 'get',
	      presentCvs: '../game/game_presented_exportall.json',
	      presentGroup: [{
	        group: '1',
	        id: 'presentChart1',
	        title: '赠送数',
	        unit: '单位（数）'
	      }],
	      presentRequest: {
	        beginTime: getDate().ten,
	        endTime: getDate().dateLine,
	        pageNow: 0,
	        pageSize: 10,
	        type: 1
	      },
	      presentSecColumns: [{
	        'label': '序号', // 表头及复选框文字
	        'prop': 'serial', // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '用户绰号', // 表头及复选框文字
	        'prop': 'uname', // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true, // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', // 折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },
	      {
	        'label': '今日领取总额',
	        'prop': 'presented_total_amount',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },
	      {
	        'label': '奖金赛领取金额',
	        'prop': 'redpack_presented_amount',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },
	      {
	        'label': '抽奖领取金额',
	        'prop': 'lottery__presented_amount',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }
	      ],
	      presentSecUrl: '../loginreg/info_detail.json',
	      presentSecType: 'get',
	      presentSecCvs: '../loginreg/loginreg_click_detail_export.json',
	      presentSecGroup: [{
	        group: '1',
	        id: 'gameChart2',
	        title: '详细赠送数',
	        unit: '单位（数）'
	      }],
	      presentSecRequest: {
	        time: '',
	        pageNow: 0,
	        pageSize: 10,
	        type: 1
	      },
	      goldColumns: [{
	        'label': '日期', // 表头及复选框文字
	        'prop': 'create_date', // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '金币赠送总数', // 表头及复选框文字
	        'prop': 'gold_presented_total', // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true, // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', // 折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },
	      {
	        'label': '抽奖金币赠送总数',
	        'prop': 'lottery_presented_gold',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },
	      {
	        'label': 'VIP金币赠送总数',
	        'prop': 'vip_presented_gold',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }
	      ],
	      goldUrl: '../game/game_presented_statisticinfo.json',
	      goldType: 'get',
	      goldCvs: '../loginreg/loginreg_click_export.json',
	      goldGroup: [{
	        group: '1',
	        id: 'goldChart1',
	        title: '金币赠送数',
	        unit: '单位（数）'
	      }],
	      goldRequest: {
	        beginTime: getDate().ten,
	        endTime: getDate().dateLine,
	        pageNow: 0,
	        pageSize: 10,
	        type: 2
	      },
	      goldSecColumns: [{
	        'label': '序号', // 表头及复选框文字
	        'prop': 'serial', // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': false
	      },
	      {
	        'label': '用户绰号', // 表头及复选框文字
	        'prop': 'time', // 字段名
	        'isDefaultHead': true, // 是否默认显示
	        'isChart': true, // 是否显示到图表中
	        'chartType': 'line', // 图表类型
	        'chartGroup': '1', // 图表的组
	        'areaColor1': 'rgba(137,189,27,0.3)', // 图表填充色1, 使用rgba
	        'areaColor2': 'rgba(137,189,27,0)', // 图表填充色2 rgba
	        'itemColor1': 'rgb(137,189,27)', // 折现拐点颜色 rgb
	        'itemColor2': 'rgba(137,189,2,0.27)' // rgba
	      },
	      {
	        'label': '用户绰号',
	        'prop': 'register',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(0,136,212,0.3)',
	        'areaColor2': 'rgba(0,136,212,0)',
	        'itemColor1': 'rgb(0,136,212)',
	        'itemColor2': 'rgba(0,136,212,0.2)'
	      },
	      {
	        'label': '抽奖获得金币数',
	        'prop': 'reg_code',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      },
	      {
	        'label': 'VIP金币赠送总数',
	        'prop': 'reg_next',
	        'isDefaultHead': true,
	        'isChart': true,
	        'chartType': 'line',
	        'chartGroup': '1',
	        'areaColor1': 'rgba(219, 50, 51, 0.3)',
	        'areaColor2': 'rgba(0, 0, 0, 0.1)',
	        'itemColor1': 'rgb(219,50,51)',
	        'itemColor2': 'rgba(219,50,51,0.2)'
	      }
	      ],
	      goldSecUrl: '../loginreg/info_detail.json',
	      goldSecType: 'get',
	      goldSecCvs: '../loginreg/loginreg_click_detail_export.json',
	      goldSecGroup: [{
	        group: '1',
	        id: 'goldChart2',
	        title: '金币详细赠送',
	        unit: '单位（数）'
	      }],
	      goldSecRequest: {
	        time: '',
	        pageNow: 0,
	        pageSize: 10,
	        type: 2
	      }
	    }
	  },
	  methods: {
	    cutBord(e) {
	      if (e.label === '奖金赠送') {
	        this.bordShow = 1
	      } else if (e.label === '金币赠送') {
	        this.bordShow = 2
	      }
	    },
	    // 红包赠送查看
	    getCheck(row) {},
	    // 返回
	    secondBack() {},
	    // 金币赠送查看
	    getGoldCheck(row) {},
	    // 返回
	    secondGoldBack() {}
	  }
}

</script><style>.el-tabs {
	margin-top: 10px;
}

.el-checkbox-group {
	margin: 10px 0;
}

.el-button {
	width: auto;
	margin-left: auto;
}

.user_head2 {
	line-height: 2;
}

</style>