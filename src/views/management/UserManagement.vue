<template>
  <section>
    <div class="user_head">
        <my-search :option-value="compeValue" @searchClick="userManageSearch"></my-search>
    </div>
    <transition name="fade">
      <el-form v-if="show" class="ment-coent" :inline="true" ref="form" :model="form" label-width="105px" v-loading="loading">
        <el-form-item label="用户头像">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
  
        <el-form-item label="VIP状态">
          <el-select v-model="form.if_vip" placeholder="请选择">
            <el-option label="已开通" value="1"></el-option>
            <el-option label="未开通" value="0"></el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item label="VIP到期时间">
          <el-col :span="8">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.vip_date_limit" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="0.5">-</el-col>
          <el-col :span="8">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
  
        <el-form-item label="用户昵称">
          <el-input v-model="form.uname"></el-input>
        </el-form-item>
  
        <el-form-item label="用户手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
  
        <el-form-item label="用户等级">
          <el-select v-model="form.level" placeholder="请选择">
            <el-option label="0" value="0">0</el-option>
            <el-option label="1" value="1">1</el-option>
            <el-option label="2" value="2">2</el-option>
            <el-option label="3" value="3">3</el-option>
            <el-option label="4" value="4">4</el-option>
            <el-option label="5" value="5">5</el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
  
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="1" value="1">男</el-radio>
            <el-radio label="0" value="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
  
        <el-form-item label="用户金币">
          <el-input v-model="form.gold"></el-input>
        </el-form-item>
  
        <el-form-item label="用户银币">
          <el-input v-model="form.silver"></el-input>
        </el-form-item>
  
        <el-form-item label="用户余额">
          <el-input v-model="form.balance"></el-input>
        </el-form-item>
  
        <el-form-item label="所属战队">
          <el-input v-model="form.circleName"></el-input>
        </el-form-item>
  
        <el-form-item label="用户编码">
          <el-input disabled v-model="form.userCode"></el-input>
        </el-form-item>
  
        <el-form-item label="注册时间">
          <el-col :span="16">
            <el-input v-model="registerDate"  disabled style="width: 150px;"></el-input>
          </el-col>
        </el-form-item>
  
        <el-form-item label="用户状态">
          <el-select v-model="form.accountStatus" placeholder="请选择">
            <el-option label="0" value="0">正常</el-option>
            <el-option label="1" value="1">禁用</el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item label="设备绑定">
          <span v-for="item in form.divice">{{ item }}</span>
          <el-button size="mini" round>添加</el-button>
          <el-button size="mini" round>删除</el-button>
        </el-form-item>
        
        <div class="from-footer">
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="cecanl">取消</el-button>
        </div>
      </el-form>
    </transition>
  </section>
</template>
<script>
  import MySearch from '@/components/Search'
  import { getUserConfig, setUserConfig, getToken } from '@/api/management'
  export default {
    components: {
      MySearch
    },
    data() {
      return {
        compeValue: [{
          'opti': 'ID/昵称/手机号',
          'val' : ''
        }],
        form: {
          id             : '',
					phone          : '',
					uname          : '',
					password       : '',
					icon           : '',
					level          : 0,
					vip_time_limit : '',
					accountStatus  : '',
					userCode       : '',
					sex            : 0,
					silver         : '',
					gold           : '',
					if_vip         : 0,
					facs           : '',
					deleteIds      : '',
					balance        : '',
					token          : ''
        },
        imageUrl: '',
        registerDate: '',
        show: false,
        loading: false
      }
    },
    created() {
      getToken().then(response => {
        this.form.token  = response.data
      }).catch(error => {
        this.$message({
          showClose: true,
          message: 'token获取失败！',
          type: 'error'
        })
      })
    },
    methods: {
      onSubmit() {
        setUserConfig(this.form).then(response => {
          if(response.result === 1) {
            this.$message({
              showClose: true,
              message: '更新成功',
              type: 'success'
            })
          }else {
            this.$message({
              showClose: true,
              message: '更新失败',
              type: 'error'
            })
          }
        }).catch(error => {
          this.$message({
            showClose: true,
            message: '服务器错误',
            type: 'error'
          })
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      userManageSearch(val, input) {
        this.loading = true
        getUserConfig({ 'like': input }).then(response => {
          this.loading = false
          
          if (response.result === 1) {
            // this.form = response.data
            this.form.id = response.data.id
            this.form.phone = response.data.phone
            this.form.uname = response.data.uname
            this.form.password = response.data.password
            this.form.icon = response.data.iconUrl
            this.form.level = response.data.level + ''
            this.form.vip_time_limit = response.data.vip_date_limit
            this.form.accountStatus = response.data.accountStatus
            this.form.userCode = response.data.userCode
            this.form.sex = response.data.sex + ''
            this.form.silver = response.data.silver
            this.form.gold = response.data.gold
            this.form.if_vip = response.data.if_vip + ''
            this.form.facs = response.data.facilityBindings
            this.form.balance = response.data.balance
            this.registerDate = response.data.registerDate
            this.show = true
          } else {
            this.$message({
              showClose: true,
              message: '获取用户信息失败，请重试！',
              type: 'error'
            })
          }
        }).catch(error => {
          this.loading = false
          this.$message({
	          showClose: true,
	          message: '服务器错误',
	          type: 'error'
	        })
        })
      },
      cecanl() {
        this.show = false
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    line-height: 0;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .el-form-item {
    width: 49%;
  }
  .avatar {
    width: 40px;
    height: 40px;
    display: block;
  }
  .from-footer {
    margin: 0 auto;
    text-align: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>