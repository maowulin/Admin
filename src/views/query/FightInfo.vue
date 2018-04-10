<template>
	<section>
		<div class="user_head">
			<my-select :message="message1" :option-value="optionValue1" v-on:selectChange="userFightChange"></my-select>
			
			<my-select :message="message3" :option-value="optionValue3" v-on:selectChange="gameTypeChange"></my-select>

			<my-search :message="message2" :option-value="optionValue2" v-on:searchClick="FightSearch"></my-search>
			
			<el-date-picker v-model="presentDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"  @change="dateChange">
			</el-date-picker>
	  	
		</div>
		
		<div v-loading="loading">
			<egrid class="egrid"
				fit
				:data="tableData"
				:columns="columns"
				:columns-schema="columnsSchema"
				:columns-props="columnsProps"
				:column-type="columnType">
			</egrid>
			<div class="user_head">
				<paging :total="totalRecords" v-on:getSize="getFightSize" v-on:getPage="getFightPage"></paging>
			</div>
		</div>
	</section>
</template>

<script>
	import { getFightData } from '@/api/query'
	import { getDate } from '@/method'
	import Paging from '@/components/Paging/'
	import MySelect from '@/components/Select/'
	import MySearch from '@/components/Search/'

	const gameTypeCom = {
	  template: `<div>
								<span v-if="row.type === 1">免费中式黑8</span>
								<span v-if="row.type === 2">金币赛中式黑8</span>
								<span v-if="row.type === 3">奖金赛中式黑8</span>
								<span v-if="row.type === 4">免费23分赛</span>
								<span v-if="row.type === 5">金币23分赛</span>
							</div>`,
	  props: ['row']
	}

	const gameOverCom = {
	  template: `<div>
								<span v-if="row.game_over_detail === 'TwentyThree1'">分数高获得胜利/失败</span>
								<span v-else-if="row.game_over_detail === 'TwentyThree2'">分数为23分/超过23分</span>
								<span v-else-if="row.game_over_detail === 'TwentyThree3'">分数超过23分/对方超过23分</span>
								<span v-else-if="row.game_over_detail === 'TwentyThree4'">三回合未操作/对方三回合未操作</span>
								<span v-else-if="row.game_over_detail === 'TwentyThree5'">对手主动认输</span>
								<span v-else-if="row.game_over_detail === 'TwentyThree6'">同分数下进球多/少</span>
								<span v-else-if="row.game_over_detail === 'TwentyThree7'">同分数同球数球号大/小</span>
								<span v-else-if="row.game_over_detail === 'TwentyThree8'">双方同时为零，房主失败</span>
								<span v-else-if="row.game_over_detail === 'BlackEight1'">进黑8</span>
								<span v-else-if="row.game_over_detail === 'BlackEight2'">白球与黑白同时落袋</span>
								<span v-else-if="row.game_over_detail === 'BlackEight3'">误入黑8/对方击打黑8犯规</span>
								<span v-else-if="row.game_over_detail === 'BlackEight4'">击打黑8时结束/对方击打黑8犯规</span>
								<span v-else-if="row.game_over_detail === 'BlackEight5'">三回合未操作</span>
								<span v-else-if="row.game_over_detail === 'BlackEight6'">对方主动认输</span>
							</div>`,
	  props: ['row']
	}
	
	export default {
	  components: {
	    Paging,
	    MySelect,
	    MySearch
	  },
	  data() {
	    return {
	      message1: '',
	      message2: '',
	      message3: '',
	      totalRecords: 0,
	      presentDate: '',
	      loading: false,
	      tableData: [],
	      requestData: {
	        uname: '',
	        game_over_detail: '',
	        game_type: '',
	        beginTime: getDate(10),
	        endTime: getDate(0),
	        pageNow: 0,
	        pageSize: 10
	      },
	      optionValue1: [{
	        'opti': '结束原因',
	        'val': ''
	      }, {
	        'opti': '分数高获得胜利/失败',
	        'val': 'TwentyThree1'
	      }, {
	        'opti': '分数为23分/超过23分',
	        'val': 'TwentyThree2'
	      }, {
	        'opti': '分数超过23分/对方超过23分',
	        'val': 'TwentyThree3'
	      }, {
	        'opti': '三回合未操作/对方三回合未操作',
	        'val': 'TwentyThree4'
	      }, {
	        'opti': '对手主动认输 ',
	        'val': 'TwentyThree5'
	      }, {
	        'opti': '同分数下进球多/少 ',
	        'val': 'TwentyThree6'
	      }, {
	        'opti': '同分数同球数球号大/小',
	        'val': 'TwentyThree7'
	      }, {
	        'opti': '双方同时为零，房主失败',
	        'val': 'TwentyThree8'
	      }, {
	        'opti': '进黑8 ',
	        'val': 'BlackEight1'
	      }, {
	        'opti': '白球与黑白同时落袋',
	        'val': 'BlackEight2'
	      }, {
	        'opti': '误入黑8/对方击打黑8犯规',
	        'val': 'BlackEight3'
	      }, {
	        'opti': '击打黑8时结束/对方击打黑8犯规',
	        'val': 'BlackEight4'
	      }, {
	        'opti': '三回合未操作',
	        'val': 'BlackEight5'
	      }, {
	        'opti': '对方主动认输',
	        'val': 'BlackEight6'
	      }],
	      optionValue2: [{
	        'opti': '用户昵称',
	        'val': ''
	      }],
	      optionValue3: [{
	        'opti': '游戏类型',
	        'val': ''
	      }, {
	        'opti': '免费中式黑8',
	        'val': '1'
	      }, {
	        'opti': '金币赛中式黑8',
	        'val': '2'
	      }, {
	        'opti': '奖金赛中式黑8',
	        'val': '3'
	      }, {
	        'opti': '免费23分赛',
	        'val': '4'
	      }, {
	        'opti': '金币23分赛',
	        'val': '5'
	      }],
	      columns: [{
	        'label': '序号',
	        'prop': 'serial'
	      }, {
	        'label': '游戏类型',
	        'prop': 'type'
	      }, {
	        'label': '开始时间',
	        'prop': 'start_game_time'
	      }, {
	        'label': '结束时间',
	        'prop': 'end_game_time'
	      }, {
	        'label': '游戏时长',
	        'prop': 'longTime'
	      }, {
	        'label': '胜利方',
	        'prop': 'winnerName'
	      }, {
	        'label': '失败方',
	        'prop': 'loserName'
	      }, {
	        'label': '结束原因',
	        'prop': 'game_over_type'
	      }],
	      columnsProps: {
	        align: 'center',
	        sortable: true
	      },
	      columnsSchema: {
	        '游戏类型': {
	          component: gameTypeCom
	        },
	        '结束原因': {
	          component: gameOverCom
	        }
	      },
	      columnType: ''
	    }
	  },
	  created() {
	    this.getData()
	  },
	  methods: {
	    getData() {
				this.loading = true
	      getFightData(this.requestData).then(response => {
	        this.loading = false
	        this.tableData = response.items
					this.totalRecords = response.totalRecords
	      }).catch(error => {
	        this.loading = false
					this.$message.error('服务器错误')
	      })
	    },
	    userFightChange(val) {
	      this.requestData.game_over_detail = val
	      this.getData()
	    },
	    FightSearch(select, input) {
	      this.requestData.uname = input
	      this.getData()
	    },
	    gameTypeChange(val) {
	      this.requestData.game_on_type = val
	      this.getData()
	    },
	    getFightSize(pageSize) {
	      this.requestData.pageSize = pageSize
	      this.getData()
	    },
	    getFightPage(pageNow) {
	      this.requestData.pageNow = pageNow
	      this.getData()
	    },
	    dateChange(val) {
	      if (val === null) return
	      if (this.requestData.beginTime) {
	        this.requestData.beginTime = val[0]
	        this.requestData.endTime = val[1]
	      } else if (this.requestData.startDate) {
	        this.requestData.startDate = val[0]
	        this.requestData.endDate = val[1]
	      }
	      this.getData()
	    }
	  }
	}
</script>

<style>
</style>