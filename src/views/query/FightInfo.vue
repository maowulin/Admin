<template>
	<section>
		<div class="user_head">
			<my-select :message="message1" :option-value="optionValue1" v-on:selectChange="userFightChange"></my-select>
			
			<my-select :message="message3" :option-value="optionValue3" v-on:selectChange="gameTypeChange"></my-select>

			<my-search :message="message2" :option-value="optionValue2" v-on:searchClick="FightSearch"></my-search>
			
			<el-date-picker v-model="presentDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"  @change="dateChange">
			</el-date-picker>
	  	
		</div>
		
		<egrid class="egrid"
  		fit
      :data="tableData"
      :columns="columns"
      :columns-schema="columnsSchema"
			:columns-props="columnsProps"
			v-loading="loading"
      :column-type="columnType">
    </egrid>
		<div class="user_head">
			<paging :total="totalRecords" v-on:getSize="getFightSize" v-on:getPage="getFightPage"></paging>
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
								<span v-if="row.game_over_type === 1">逃跑判输</span>
								<span v-if="row.game_over_type === 2">主动认输</span>
								<span v-if="row.game_over_type === 3">进黑8胜利</span>
								<span v-else>误入黑8失败</span>
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
	        game_over_type: '',
	        game_type: '',
	        beginTime: getDate().ten,
	        endTime: getDate().dateLine,
	        pageNow: 0,
	        pageSize: 10
	      },
	      optionValue1: [{
	        'opti': '结束原因',
	        'val': ''
	      }, {
	        'opti': '逃跑判输（包含三回合为操作）',
	        'val': '1'
	      }, {
	        'opti': '主动认输',
	        'val': '2'
	      }, {
	        'opti': '进黑8胜利',
	        'val': '3'
	      }, {
	        'opti': '误入黑8失败',
	        'val': '4'
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
	        this.$message({
	          showClose: true,
	          message: '服务器错误',
	          type: 'error'
	        })
	      })
	    },
	    userFightChange(val) {
	      this.requestData.game_over_type = val
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
	      if (val === '') return
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