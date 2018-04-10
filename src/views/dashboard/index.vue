<template>
  <section class="index-panel">
    <show-group></show-group>
    <div class="index-line-chart" v-loading="basiload">

      <my-select :message="message1" :option-value="optionValue1" v-on:selectChange="selectChange" class="chart-select"></my-select>

      <div style="width:100%;height:100%;">
          <line-chart v-if="basiData.length !== 0 && !isThreeDay" :chart-data="basiData" :line-conf="userDayConfig" :line-id="'imp-basi-chart'"></line-chart>
          <time-quantum-chart v-else-if="userTimeQuantumData.length !== 0 && isThreeDay" :lineConf="userTimeQuantumConfig" :chart-data="userTimeQuantumData" :line-id="'three-time-chart'"></time-quantum-chart>
      </div>

      <span class="chart-title">新用户登陆</span>
    </div>

    <div class="index-line-chart" v-loading="oldload">

      <my-select :message="message1" :option-value="optionValue1" v-on:selectChange="oldUserSelectChange" class="chart-select"></my-select>

      <div style="width:100%;height:100%;">
          <line-chart v-if="oldBasiData.length !== 0 && !isOldThreeDay" :chart-data="oldBasiData" :line-conf="oldUserDayConfig" :line-id="'imp-old-basi-chart'"></line-chart>
          <time-quantum-chart v-else-if="oldUserTimeData.length !== 0 && isOldThreeDay" :lineConf="userTimeQuantumConfig" :chart-data="oldUserTimeData" :line-id="'old-time-chart'"></time-quantum-chart>
      </div>

      <span class="chart-title">老用户登陆</span>
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
import { rateColumns } from './config/rate'
import { getUserTimeQuantum, getUserDayList } from '@/api/query'

export default {
  name: 'dashboard',
  components: {
    ShowGroup,
    MySelect: function(resolve) {
      require(['@/components/Select'], resolve)
    },
    LineChart: function(resolve) {
      require(['./components/LineChart'], resolve)
    },
    timeQuantumChart: function(resolve) {
      require(['./components/timeQuantumChart'], resolve)
    }
  },
  data() {
    return {
      rateData: [],
      message1: "近3日",

      userTimeQuantumData: [],
      userTimeQuantumConfig: [],
      basiData: [],
      oldUserTimeData: [],
      oldBasiData: [],

      isThreeDay: true,
      isOldThreeDay: true,

      optionValue1: [{
        	'opti': '近3日',
        	'val': '3'
      }, {
        	'opti': '近7日',
        	'val': '7'
      }, {
        	'opti': '近30日',
        	'val': '30'
      }, {
        	'opti': '近60日',
        	'val': '60'
      }],
      
      basiload: false,
      rateload: false,
      oldload: false,
      
      userDayConfig: [{
        'label': '新增用户', // 表头及复选框文字
        'prop': 'new_user',  // 字段名
        'lineColor': '#9d82df',
        'renderColor': '#cfbcfd',
        'isChart': true,
        'defaultShow': true
      }],
      oldUserDayConfig: [{
        'label': '老用户', // 表头及复选框文字
        'prop': 'new_user',  // 字段名
        'lineColor': '#9d82df',
        'renderColor': '#cfbcfd',
        'isChart': true,
        'defaultShow': true
      }],
      userTimeQuantumConfig: [{
        'label': '', // 表头及复选框文字
        'prop': 'new_user',  // 字段名
        'lineColor': '#9d82df',
        'renderColor': '#cfbcfd',
        'isChart': true,
        'defaultShow': true
      },{
        'label': '', // 表头及复选框文字
        'prop': 'new_user',  // 字段名
        'lineColor': '#676fd0',
        'renderColor': '#c2c6fb',
        'isChart': true,
        'defaultShow': true
      },{
        'label': '', // 表头及复选框文字
        'prop': 'new_user',  // 字段名
        'lineColor': '#377bd0',
        'renderColor': '#aed0fb',
        'isChart': true,
        'defaultShow': true
      }],
      rateLineColumns: rateColumns,
      
      rateReuestData: {
        beginTime : getDate(10),
        endTime   : getDate(0),
        pageNow   : 0,
        pageSize  : 10
      },
      newUserDayRequest: {
        beginTime  : getDate(3),
        endTime    : getDate(0)
      },
      oldUserRequest: {
        beginTime  : getDate(3),
        endTime    : getDate(0),
        type       : "2"
      },
      newUserReqeust: {
        beginTime  : getDate(3),
        endTime    : getDate(0),
        type       : "1"
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
    this.getUserTimeDate()
    this.getOldUserTimeQuantum()
  },
  methods: {
    getData() {
      this.rateload = true
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
    },
    getUserTimeDate() {
      this.basiload = true
      getUserTimeQuantum(this.newUserReqeust).then(response => {
        this.basiload = false
        this.userTimeQuantumData = response.items
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败！',
          type: 'error'
        })
      })
    },
    getUserDay(data) {
      this.basiload = true
      this.basiData = []
      getUserDayList(data).then(response => {
        this.basiload = false
        this.basiData = response.items
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败！',
          type: 'error'
        })
      })
    },
    getOldUserTimeQuantum() {
      this.oldload = true
      getUserTimeQuantum(this.oldUserRequest).then(response => {
        this.oldload = false
        this.oldUserTimeData = response.items
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败！',
          type: 'error'
        })
      })
    },
    getOldUserDay(data) {
      this.oldload = true
      this.oldBasiData = []
      getUserDayList(data).then(response => {
        this.oldload = false
        this.oldBasiData = response.items
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败！',
          type: 'error'
        })
      })
    },
    selectChange(val) {
      if(val === '3' || val == ''){
        this.isThreeDay = true
        this.getUserTimeDate()
      }else{
        this.isThreeDay = false
        let data = {
          beginTime: getDate(val),
          endTime  : getDate(0),
          type: "1"
        }
        this.getUserDay(data)
      }
    },
    oldUserSelectChange(val) {
      if(val === '3' || val == ''){
        this.isOldThreeDay = true
        this.getOldUserTimeQuantum()
      }else{
        this.isOldThreeDay = false
        let data = {
          beginTime: getDate(val),
          endTime  : getDate(0),
          type: "2"
        }
        this.getOldUserDay(data)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 60px;
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
  position: relative;
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

.chart-select {
  position: absolute;
  left: 49px;
  top: 10px;
  z-index: 5555;
}

</style>
