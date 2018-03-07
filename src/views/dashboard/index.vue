<template>
  <section class="index-panel">
    <show-group></show-group>
    <div class="index-line-chart" v-loading="basiload">
      <line-chart v-if="basiData.length !== 0" :chart-data="basiData" :line-conf="basiedLineColumns" :line-id="'imp-basi-chart'"></line-chart>
      <span class="chart-title">用户基本信息表</span>
    </div>

    <div class="index-line-chart" v-loading="rechargeload">
      <line-chart v-if="rechargeData.length !== 0" :chart-data="rechargeData" :line-conf="rechargeLineColumns" :line-id="'imp-recharge-chart'"></line-chart>
      <span class="chart-title">充值信息表</span>
    </div>

    <div class="index-line-chart" v-loading="gamechesload">
      <line-chart v-if="gameChesData.length !== 0" :chart-data="gameChesData" :line-conf="gameChesLineColumns" :line-id="'imp-gameches-chart'"></line-chart>
      <span class="chart-title">游戏对局表</span>
    </div>

    <div class="index-line-chart" v-loading="createload">
      <line-chart v-if="createData.length !== 0" :chart-data="createData" :line-conf="createLineColumns" :line-id="'imp-create-chart'"></line-chart>
      <span class="chart-title">游戏创建表</span>
    </div>

    <div class="index-line-chart" v-loading="joinload">
      <line-chart v-if="joinData.length !== 0" :chart-data="joinData" :line-conf="joinLineColumns" :line-id="'imp-join-chart'"></line-chart>
      <span class="chart-title">房间加入信息表</span>
    </div>

    <div class="index-line-chart" v-loading="rateload">
      <line-chart v-if="rateData.length !== 0" :chart-data="rateData" :line-conf="rateLineColumns" :line-id="'imp-rate-chart'"></line-chart>
      <span class="chart-title">用户存留信息表</span>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import ShowGroup from './components/ShowGroup'
import { getStatis } from '@/api/statis'
import { getDate } from '@/method'
import { basiedColumns } from './config/basi'
import { createColumns } from './config/create'
import { rateColumns } from './config/rate'
import { rechargeColumns } from './config/recharge'
import { gameChesColumns } from './config/gameChes'
import { joinColumns } from './config/join'

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
      basiData: [],
      rechargeData: [],
      gameChesData: [],
      createData: [],
      joinData: [],
      rateData: [],

      basiload: false,
      rechargeload: false,
      gamechesload: false,
      createload: false,
      joinload: false,
      rateload: false,

      basiedLineColumns: basiedColumns,
      createLineColumns: createColumns,
      rateLineColumns: rateColumns,
      rechargeLineColumns: rechargeColumns,
      gameChesLineColumns: gameChesColumns,
      joinLineColumns: joinColumns,
      
      basiRequestData: {
        beginTime  : getDate().ten,
        endTime    : getDate().dateLine,
        pageNow    : 0,
        pageSize   : 10,
        type: 1
      },
      createRequestData: {
        beginTime  : getDate().ten,
        endTime    : getDate().dateLine,
        pageNow    : 0,
        pageSize   : 10,
        type: 4
      },
      rateReuestData: {
        beginTime : getDate().ten,
        endTime   : getDate().dateLine,
        pageNow   : 0,
        pageSize  : 10
      },
      rechargeReuestData: {
        beginTime  : getDate().ten,
        endTime    : getDate().dateLine,
        pageNow    : 0,
        pageSize   : 10,
        type: 2
      },
      gameChesReuestData: {
        beginTime  : getDate().ten,
        endTime    : getDate().dateLine,
        pageNow    : 0,
        pageSize   : 10,
        type: 3
      },
      joinReuestData: {
        beginTime  : getDate().ten,
        endTime    : getDate().dateLine,
        pageNow    : 0,
        pageSize   : 10,
        type: 5
      }
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
      this.basiload = true
      this.rechargeload = true
      this.gamechesload = true
      this.createload = true
      this.joinload = true
      this.rateload = true
      getStatis('../userL8/getUserBasicInfo_list.json', 'get', this.basiRequestData).then(response => {
        this.basiload = false
        if(response.items.length > 0) {
          this.basiData = response.items
        }else {
          this.basiData = ''
        }
      }).catch(error => {
        console.log(error)
      })

      getStatis('../userL8/getUserBasicInfo_list.json', 'get', this.rechargeReuestData).then(response => {
        this.rechargeload = false
        
        if(response.items.length > 0) {
          this.rechargeData = response.items
        }else {
          this.rechargeData = ''
        }
      }).catch(error => {
        console.log(error)
      })

      getStatis('../userL8/getUserBasicInfo_list.json', 'get', this.gameChesReuestData).then(response => {
        this.gamechesload = false
        if(response.items.length > 0) {
          this.gameChesData = response.items
        }else {
          this.gameChesData = ''
        }
      }).catch(error => {
        console.log(error)
      })

      getStatis('../userL8/getUserBasicInfo_list.json', 'get', this.createRequestData).then(response => {
        this.createload = false
        if(response.items.length > 0) {
          this.createData = response.items
        }else {
          this.createData = ''
        }
      }).catch(error => {
        console.log(error)
      })

      getStatis('../userL8/getUserBasicInfo_list.json', 'get', this.joinReuestData).then(response => {
        this.joinload = false
        if(response.items.length > 0) {
          this.joinData = response.items
        }else {
          this.joinData = ''
        }
      }).catch(error => {
        console.log(error)
      })

      getStatis('../userL8/userL8_retain_rate.json', 'get', this.rateReuestData).then(response => {
        this.rateload = false
        if(response.items.length > 0) {
          this.rateData = response.items
        }else {
          this.rateData = ''
        }
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
  padding: 15px 15px 25px 15px;
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

.chart-title {
  display: block;
  padding-top: 5px;
  text-align: center;
}

</style>
