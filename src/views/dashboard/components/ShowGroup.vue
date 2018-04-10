<template>
  <div class="show-group">
    <el-row :gutter="30">
      <el-col :span="4">
        <div class="grid-content bg-purple" v-loading="loading">
          <div class="right-text">
            <span class="text-t">总用户数：
              <count-to :startVal='0' :endVal='userNum' :duration='3000'></count-to>
            </span>
            <span class="text-s">IOS：{{totalIos}}%
            </span>
            <span class="text-s">Android：{{totalAndroid}}%
            </span>
            <span class="text-s">当前在线数：
              <count-to :startVal='0' :endVal='onlineNum' :duration='3000'></count-to>
            </span>
            
          </div>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="grid-content bg-purple" v-loading="loading">
          <div class="right-text">
            <span class="text-t">VIP总人数：
              <count-to :starVal="0" :endVal="vipTotalNum" :duration="3000"></count-to>
            </span>
            <span class="text-s">IOS占比：{{vipIos}}%</span>
            <span class="text-s">Android占比：{{vipAndroid}}%</span>
          </div>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="grid-content bg-purple" v-loading="loading2">
          <div class="right-text">
            <span class="text-t">新增用户：
              <count-to :starVal="0" :endVal="newUserTotal" :duration="3000"></count-to>
            </span>
            <span class="text-s">IOS占比：{{newIos}}%</span>
            <span class="text-s">Android占比：{{newAndroid}}%</span>
            <span class="text-s">转注册占比：{{visToRegister}}%</span>
          </div>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="grid-content bg-purple" v-loading="loading2">
          <div class="right-text">
              <span class="text-t">活跃用户：
                <count-to :starVal="0" :endVal="dayActiveNum" :duration="3000"></count-to>
              </span>
              <span class="text-s">IOS占比：{{dayActiveIosNum}}%</span>
              <span class="text-s">Android占比：{{dayActiveAndroidNum}}%</span>
            </div>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="grid-content bg-purple" v-loading="loading2">
          <div class="right-text">
              <span class="text-t">充值用户：
                <count-to :starVal="0" :endVal="orderUserTotal" :duration="3000"></count-to>
              </span>
              <span class="text-s">IOS占比：{{orderIos}}%</span>
              <span class="text-s">Android占比：{{orderAndroid}}%</span>
            </div>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="grid-content bg-purple" v-loading="loading2">
          <div class="right-text">
              <span class="text-t">游戏对局用户：
                <count-to :starVal="0" :endVal="chesTotalNum" :duration="3000"></count-to>
              </span>
              <span class="text-s">免费赛：{{chesFree}}%</span>
              <span class="text-s">金币赛：{{chesGold}}%</span>
              <span class="text-s">实物赛：{{chesBouns}}%</span>
              <span class="text-s">占创建总房间数占比：{{chesCreate}}%</span>
            </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import  {getOnline, getUserType, getEveryDayUserStatis} from '@/api/login'
  import { getBouns } from '@/api/management'
  import { getDate } from '@/method'
  import countTo from 'vue-count-to'
  export default {
    name: 'ShowGroup',
    components: {
      countTo
    },
    data() {
      return {
        userNum: 0,
        onlineNum: 0,
        messageNum: 0,
        totalUserNum: 0,
        totalIos: 0,
        totalAndroid: 0,
        vipTotalNum: 0,
        vipIos: 0,
        vipAndroid: 0,

        newUserTotal: 0,
        newIos: 0,
        newAndroid: 0,
        visToRegister: 0,
        dayActiveNum: 0,
        dayActiveAndroidNum: 0,
        dayActiveIosNum: 0,
        orderUserTotal: 0,
        orderIos: 0,
        orderAndroid: 0,
        chesTotalNum: 0,
        chesFree: 0,
        chesGold: 0,
        chesBouns: 0,
        chesCreate: 0,

        loading: false,
        loading2: false
      }
    },
    created() {
      this.getOnlineNumber()
      this.getMessage()
    },
    computed: {
      adminName: function() {
        let token = this.$store.state.user.token
        let type = typeof(token)
        if(type === 'string') {
          return JSON.parse(token).name
        }else {
          return token.name
        }
      },
      adminUser: function() {
        let token = this.$store.state.user.token
        let type = typeof(token)
        if(type === 'string') {
          return JSON.parse(token).rols
        }else {
          return token.rols
        }
      }
    },
    methods: {
      getOnlineNumber() {
        getOnline().then(response => {
          this.userNum = response.totalUserNum
          this.onlineNum = response.onlineNum
        }).catch(error => {
          this.$message({
						showClose: true,
						message: '数据获取失败！',
						type: 'error'
					})
        })
        
        this.loading = true
        getUserType().then(response => {
          this.loading = false
          let item = response.items[0]
          this.totalAndroid = ((item.andriod_user / item.total_user) * 100).toFixed(2)
          this.totalIos = ((item.ios_user / item.total_user) * 100).toFixed(2)
          this.vipTotalNum = item.vip_user
          this.vipAndroid = ((item.android_vip_user / item.vip_user) * 100).toFixed(2)
          this.vipIos = ((item.ios_vip_user / item.vip_user) * 100).toFixed(2)

        }).catch(error => {
          this.$message({
						showClose: true,
						message: '数据获取失败！',
						type: 'error'
					})
        })
        
        this.loading2 = true
        getEveryDayUserStatis({"beginTime": getDate(0), "endTime": getDate(0)}).then(response => {
          this.loading2 = false
          let total = response.items.total
          let order = response.items.order
          let ches = response.items.ches
          
          if(total) {
            this.newUserTotal = total.total_new
            this.newIos = ((total[0].ios_new / total[0].total_new) * 100).toFixed(2)
            this.newAndroid = ((total[0].android_new / total[0].total_new) * 100).toFixed(2)
            this.visToRegister = ((total[0].vis_to_register / total[0].total_new) * 100).toFixed(2)

            this.dayActiveNum = total[0].dayActiveNum
            this.dayActiveAndroidNum = total[0].dayActiveNum_android
            this.dayActiveIosNum = total[0].dayActiveNum_ios
          }

          if(order) {
            this.orderUserTotal = order[0].order_all_total
            this.orderAndroid = order[0].order_android
            this.orderIos = order[0].order_ios
          }

          if(ches) {
            this.chesTotalNum = ches[0].total_ches
            this.chesBouns = ((ches[0].bouns / ches[0].total_ches) * 100).toFixed(2)
            this.chesFree = ((ches[0].free / ches[0].total_ches) * 100).toFixed(2)
            this.chesGold = ((ches[0].gold / ches[0].total_ches) * 100).toFixed(2)
            this.chesCreate = ((ches[0].total_ches / ches[0].total_crete) * 100).toFixed(2)
          }
        }).catch(error => {
          this.$message({
						showClose: true,
						message: '获取数据失败！',
						type: 'error'
					})
        })
      },
      getMessage() {
        getBouns({ 'status': '', 'phone': '', 'pageNow': 0, 'pageSize': 100 }).then(response => {
          let bounsMessage = 0
          for(let i = 0; i < response.items.length; i++) {
            let list = response.items[i]
            if(list.status === 0) {
              bounsMessage++
            }
          }
          this.messageNum = bounsMessage
          if(bounsMessage > 0) {
            this.$notify({
              title: '提示',
              message: `共有${bounsMessage}人等待奖金审核！`,
              duration: 0
            })
          }
        }).catch(error =>{
          this.$message({
						showClose: true,
						message: '奖金审核统计消息获取失败！',
						type: 'error'
					})
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg {
  &-purple-dark {
    background: #99a9bf;
  }

  &-purple {
    background: #fff;
  }

  &-purple-light {
    background: #e5e9f2;
  }
}
.grid-content {
  border-radius: 4px;
  min-height: 128px;
  padding: 5px;
  cursor: pointer;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.left-icon {
  float: left;
  padding: 12px;
  height: 90px;
  width: 90px;
  border-radius: 4px;
}

.people-icons {
  color: #40c9c6; 
  &:hover {
    background-color: #40c9c6; 
    color: #fff;
  }
}

.online-icons {
  color: #36a3f7; 
  &:hover {
    background-color: #36a3f7; 
    color: #fff;
  }
}

.message-icons {
  color: #f4516c;
  &:hover {
    background-color: #f4516c; 
    color: #fff;
  }
}

.style-icons {
  color: #34bfa3; 
  &:hover {
    background-color: #34bfa3; 
    color: #fff;
  }
}

.right-text {
  width: 90%;
  height: 100%;
  padding: 5px;
  margin: 0 auto;
  line-height: 40px;
  font-family: "Helvetica Neue", "PingFang"; 
}

.text {
  &-t {
    display: block;
    font-size: 20px;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    font-weight: 600;
  }

  &-d {
    line-height: 18px;
    color: rgba(51, 51, 51, 0.45);
    font-size: 20px;
    font-weight: 600;
  }

  &-s {
    display: block;
    height: 23px;
    line-height: 2;
    font-size: 14px;
    color: #8f8f8f;
  }
}


.group-svg {
  width: 100%;
  height: 100%;
}
</style>