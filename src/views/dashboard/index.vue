<template>
  <section class="index-panel">
    <show-group></show-group>
    <div class="index-line-chart" v-loading="basiload">
      <my-select :message="message1" :option-value="optionValue1" v-on:selectChange="selectChange" class="chart-select"></my-select>
      <div style="width:100%;height:100%;">
          <line-chart v-if="basiData.length !== 0 && !isThreeDay" :chart-data="basiData" :line-conf="userDayConfig" :line-id="'imp-basi-chart'" :charTitel="'新用户登陆'"></line-chart>
          <time-quantum-chart v-else-if="userTimeQuantumData.length !== 0 && isThreeDay" :lineConf="userTimeQuantumConfig" :chart-data="userTimeQuantumData" :line-id="'three-time-chart'" :charTitel="'新用户登陆'"></time-quantum-chart>
      </div>
    </div>

    <div class="index-line-chart" v-loading="oldload">
      <my-select :message="message1" :option-value="optionValue1" v-on:selectChange="oldUserSelectChange" class="chart-select"></my-select>
      <div style="width:100%;height:100%;">
          <line-chart v-if="oldBasiData.length !== 0 && !isOldThreeDay" :chart-data="oldBasiData" :line-conf="oldUserDayConfig" :line-id="'imp-old-basi-chart'" :charTitel="'老用户登陆'"></line-chart>
          <time-quantum-chart v-else-if="oldUserTimeData.length !== 0 && isOldThreeDay" :lineConf="userTimeQuantumConfig" :chart-data="oldUserTimeData" :line-id="'old-time-chart'" :charTitel="'老用户登陆'"></time-quantum-chart>
      </div>
    </div>

    <div class="index-line-chart" v-loading="chesload">
      <my-select :message="message1" :option-value="optionValue1" v-on:selectChange="chesSelectChange" class="chart-select"></my-select>
      <div style="width:100%;height:100%;">
          <line-chart v-if="chesData.length !== 0 && !isChesThree" :chart-data="chesData" :line-conf="chesConfig" :line-id="'imp-ches-chart'" :charTitel="'每日对局数'"></line-chart>
          <time-quantum-chart v-else-if="chesTimeData.length !== 0 && isChesThree" :lineConf="userTimeQuantumConfig" :chart-data="chesTimeData" :line-id="'ches-time-chart'" :charTitel="'每日对局数'"></time-quantum-chart>
      </div>
    </div>

    <div class="index-line-chart" v-loading="orderload">
      <my-select :message="message1" :option-value="optionValue1" v-on:selectChange="orderSelectChange" class="chart-select"></my-select>
      <div style="width:100%;height:100%;">
          <line-chart v-if="orderData.length !== 0 && !isOrderThree" :chart-data="orderData" :line-conf="orderConfig" :line-id="'imp-order-chart'" :charTitel="'每日充值数'"></line-chart>
          <time-quantum-chart v-else-if="orderTimeData.length !== 0 && isOrderThree" :lineConf="userTimeQuantumConfig" :chart-data="orderTimeData" :line-id="'order-time-chart'" :charTitel="'每日充值数'"></time-quantum-chart>
      </div>
    </div>

    <div class="index-line-chart">
      <rate></rate>
    </div>

    <div class="join-chart" v-loading="joinCreateLoad">
      <el-date-picker
        v-model="joinDate"
        align="left"
        type="date"
        placeholder="选择日期"
        class="join-create-date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        @change="joinChange"
        :picker-options="pickerOptions1">
      </el-date-picker>
      <create-and-join v-if="createData.length !== 0 && !joinCreateLoad" :create-data="createData" :join-data="joinData"></create-and-join>
    </div>

    <div class="china-chart">
      <city v-if="cityData.length !== 0" :char-data="cityData"></city>
    </div>

  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import ShowGroup from './components/ShowGroup'
import { getStatis, getCreateAndJoin } from '@/api/statis'
import { getDate } from '@/method'
import { rate } from './components/rate'
import { getUserTimeQuantum, getUserDayList } from '@/api/query'
import { loginCity } from '@/api/query'

export default {
  name: 'dashboard',
  components: {
    ShowGroup,
    rate: function(resolve) {
      require(['./components/rate'], resolve)
    },
    MySelect: function(resolve) {
      require(['@/components/Select'], resolve)
    },
    LineChart: function(resolve) {
      require(['./components/LineChart'], resolve)
    },
    timeQuantumChart: function(resolve) {
      require(['./components/timeQuantumChart'], resolve)
    },
    city: function(resolve) {
      require(['./components/city'], resolve)
    },
    CreateAndJoin: function(resolve) {
      require(['./components/CreateAndJoin'], resolve)
    }
  },
  data() {
    return {
      message1: "近3日",
      joinDate: getDate(0),

      userTimeQuantumData: [],
      basiData: [],
      oldUserTimeData: [],
      oldBasiData: [],
      chesData: [],
      chesTimeData: [],
      orderData: [],
      orderTimeData: [],
      cityData: [],
      createData: [],
      joinData: [],

      isThreeDay: true,
      isOldThreeDay: true,
      isChesThree: true,
      isOrderThree: true,

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
      oldload: false,
      chesload: false,
      joinCreateLoad: false,

      pickerOptions1:  {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', getDate(0))
          }
        }, {
          text: '昨天',
          onClick(picker) {
            picker.$emit('pick', getDate(2))
          }
        }, {
          text: '一周前',
          onClick(picker) {
            picker.$emit('pick', getDate(7))
          }
        }]
      },
      
      userDayConfig: [{
        'label': '新增用户', // 表头及复选框文字
        'prop': 'new_user',  // 字段名
        'lineColor': '#9d82df',
        'renderColor': '#cfbcfd',
        'isChart': true,
        'defaultShow': true
      }],
      chesConfig: [{
        'label': '每日对局数', // 表头及复选框文字
        'prop': 'new_user',  // 字段名
        'lineColor': '#9d82df',
        'renderColor': '#cfbcfd',
        'isChart': true,
        'defaultShow': true
      }],
      orderConfig: [{
        'label': '每日充值', // 表头及复选框文字
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
        'label': getDate(1).substring(0, 10), // 表头及复选框文字
        'prop': 'new_user',  // 字段名
        'lineColor': '#9d82df',
        'renderColor': '#cfbcfd',
        'isChart': true,
        'defaultShow': true
      },{
        'label': getDate(2).substring(0, 10), // 表头及复选框文字
        'prop': 'new_user',  // 字段名
        'lineColor': '#f10000',
        'renderColor': '#f18383',
        'isChart': true,
        'defaultShow': false
      },{
        'label': getDate(3).substring(0, 10), // 表头及复选框文字
        'prop': 'new_user',  // 字段名
        'lineColor': '#ff0',
        'renderColor': '#f9f9b6',
        'isChart': true,
        'defaultShow': false
      }],
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
      },
      chesReqeust: {
        beginTime  : getDate(3),
        endTime    : getDate(0),
        type       : "3"
      },
      orderReqeust: {
        beginTime  : getDate(3),
        endTime    : getDate(0),
        type       : "4"
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
    request() {
      let thisDate = getDate(0).substring(0, 10)
      return {
        beginTime: thisDate + ' 00:00:00',
        endTime: thisDate + ' 23:23:23'
      }
    }
  },
  watch: {
    joinDate: function(val){
    }
  },
  created() {
    this.getData()
    this.getUserTimeDate()
    this.getOldUserTimeQuantum()
    this.getChesTimeData()
    this.getOrderTimeData()
    this.getCityData()
    this.getCreataAndJoinData(this.request)
  },
  methods: {
    getData() {
      
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
    getChesDayData(data) {
      this.chesload = true
      this.chesData = []
      getUserDayList(data).then(response => {
        this.chesload = false
        this.chesData = response.items
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败！',
          type: 'error'
        })
      })
    },
    getChesTimeData() {
      this.chesload = true
      getUserTimeQuantum(this.chesReqeust).then(response => {
        this.chesload = false
        this.chesTimeData = response.items
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败！',
          type: 'error'
        })
      })
    },
    getOrderDayData(data) {
      this.orderload = true
      this.orderData = []
      getUserDayList(data).then(response => {
        this.orderload = false
        this.orderData = response.items
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败！',
          type: 'error'
        })
      })
    },
    getOrderTimeData() {
      this.orderload = true
      getUserTimeQuantum(this.orderReqeust).then(response => {
        this.orderload = false
        this.orderTimeData = response.items
      }).catch(error => {
        this.$message({
          showClose: true,
          message: '获取数据失败！',
          type: 'error'
        })
      })
    },
    getCityData() {
      loginCity().then(response => {
        this.cityData = response.items
      }).catch(error => {
        console.log(error)
      })
    },
    getCreataAndJoinData(request) {
      this.joinCreateLoad = true
      getCreateAndJoin(request).then(response => {
        this.joinCreateLoad = false
        this.createData = response.items.create
        this.joinData = response.items.join
      }).catch(error => {
        console.log(error)
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
    },
    chesSelectChange(val) {
      if(val === '3' || val == ''){
        this.isChesThree = true
        this.getChesTimeData()
      }else{
        this.isChesThree = false
        let data = {
          beginTime: getDate(val),
          endTime  : getDate(0),
          type: "3"
        }
        this.getChesDayData(data)
      }
    },
    orderSelectChange(val) {
      if(val === '3' || val == ''){
        this.isOrderThree = true
        this.getOrderTimeData()
      }else{
        this.isOrderThree = false
        let data = {
          beginTime: getDate(val),
          endTime  : getDate(0),
          type: "4"
        }
        this.getOrderDayData(data)
      }
    },
    joinChange() {
      let begin = this.joinDate.substring(0, 10) + " 00:00:00"
      let end = this.joinDate.substring(0, 10) + " 23:23:23"
      this.getCreataAndJoinData({beginTime: begin, endTime: end})
    },
    joinCreatePick() {

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

.testImg {
  height: 500px;
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
  height: 390px;
  margin-top: 30px;
  padding: 15px 15px 0;
  background-color: #fff;
}

.china-chart {
  position: relative;
  width: 100%;
  height: 550px;
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
  z-index: 888;
}

.join-chart {
  position: relative;
  width: 100%;
  height: 650px;
  margin-top: 30px;
  padding: 15px 15px 0;
  background-color: #fff;

  .join-create-date {
    position: absolute;
    left: 49px;
    top: 10px;
    z-index: 888;
  }
}

</style>
