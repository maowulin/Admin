<template>
  <section class="index-panel">
    <show-group></show-group>
    <div class="index-line-chart">
      <line-chart v-if="userData.length !== 0" :chart-data="userData" :line-conf="userLineConf" :line-id="'imp-user-chart'"></line-chart>
    </div>

    <div class="index-line-chart">
      <line-chart v-if="bounsData.length !== 0" :chart-data="bounsData" :line-conf="boundsConfig" :line-id="'imp-bouns-chart'"></line-chart>
    </div>

    <div class="index-line-chart">
      <line-chart v-if="gameData.length !== 0" :chart-data="gameData" :line-conf="gameConfig" :line-id="'imp-game-chart'"></line-chart>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import ShowGroup from './components/ShowGroup'
// import LineChart from './components/LineChart'
import { getPremis } from '@/api/management'
import { getDate } from '@/method'

export default {
  name: 'dashboard',
  components: {
    ShowGroup,
    LineChart: function(resolve) {
      require(['./components/LineChart'], resolve)
    }
  },
  data() {
    return {
      userData: [],
      bounsData: [],
      gameData: [],
      userRequestData: {
        'beginTime': getDate().ten,
        'endTime': getDate().dateLine,
        'pageSize': 10,
        'pageNow': 0,
        'type': 1
      },
      bounsRequestData: {
        'beginTime': getDate().ten,
        'endTime': getDate().dateLine,
        'pageSize': 10,
        'pageNow': 0,
        'type': 2
      },
      gameRequestData: {
        'beginTime': getDate().ten,
        'endTime': getDate().dateLine,
        'pageNow': 0,
        'pageSize': 10
      },
      userLineConf: [{
        'label': '新游客用户数',
        'prop': 'visitor_number',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '游客转注册用户',
        'prop': 'visitor_convert_register_number',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '最高在线人数',
        'prop': 'max_online_number',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '平均在线人数',
        'prop': 'average_online_number',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '日活跃用户数',
        'prop': 'dayActiveNum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '周活跃用户数',
        'prop': 'weekActiveNum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '月活跃用户数',
        'prop': 'monthActiveNum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }],
      boundsConfig: [{
        'label': '充值VIP用户数',
        'prop': 'topUp_vip_num',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '充值VIP金额',
        'prop': 'topUp_vip_sum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '购买金币用户数',
        'prop': 'buy_gold_num',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '购买金币金额',
        'prop': 'buy_gold_sum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '获得金币总数',
        'prop': 'get_gold_sum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '消耗金币总数',
        'prop': 'consume_gold_sum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '获得积分人数',
        'prop': 'get_integral_num',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '获得积分总数',
        'prop': 'get_integral_sum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '消耗积分总数',
        'prop': 'consume_integral_sum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '获得奖金人数',
        'prop': 'get_bonus_num',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '获得奖金金额',
        'prop': 'get_bonus_sum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '提取奖金人数',
        'prop': 'extract_bonus_num',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '提取奖金金额',
        'prop': 'extract_bonus_sum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }],
      gameConfig: [{
        'label': '游戏总对局数',
        'prop': 'totalGameAllNum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '奖金赛对局数',
        'prop': 'redpackGameNum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '金币赛对局数（23分）',
        'prop': 'gold23GameNum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '免费对局数（23分）',
        'prop': 'free23GameNum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }, {
        'label': '好友PK赛',
        'prop': 'pkGameNum',
        'lineColor': '',
        'renderColor': '',
        'isChart': true
      }]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getPremis('../userL8/getUserBasicInfo_list.json', 'get', this.userRequestData).then(response => {
        this.userData = response.items
        // console.log(this.userData)
      }).catch(error => {
        console.log(error)
      })

      getPremis('../userL8/getUserBasicInfo_list.json', 'get', this.bounsRequestData).then(response => {
        this.bounsData = response.items
        // console.log(this.bounsData)
      }).catch(error => {
        console.log(error)
      })

      getPremis('../game/game_allstatisticinfo.json', 'get', this.gameRequestData).then(response => {
        this.gameData = response.items
        console.log(this.gameData)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.index-panel {
  background-color: #f0f2f5;
  margin: 10px;
  padding: 15px;
}

.svg-icon {
  width: 100%;
  height: 100%;
}

.index-line-chart {
  width: 100%;
  height: 365px;
  margin-top: 30px;
  padding: 15px 15px 0;
  background-color: #fff;
}

</style>
