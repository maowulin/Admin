<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">蝴蝶科技后台管理系统</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon class="menu-svg" icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon class="menu-svg" icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon class="menu-svg" icon-class="eye" /></span>
      </el-form-item>

      <div style="height: 55px; margin-bottom: 16px;">
        <el-form-item prop="password" class="authcode">
          <span class="svg-container">
            <svg-icon class="menu-svg" style="width: 17px; height: 17px;" icon-class="auth-code"></svg-icon>
          </span>
          <el-input name="authimg" class="authimage" type="text"  v-model="loginForm.code" autoComplete="on" placeholder="验证码"></el-input>
        </el-form-item>
  
        <img class="auth-show" @click="authimgRquest">
      </div>

      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登陆
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

// import Router from 'vue-router'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 0) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      imgUrl: ''
    }
  },
  mounted() {
    this.authimgRquest()
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    authimgRquest() {
      document.getElementsByClassName('auth-show')[0].src = '../authImage?date=' + new Date()
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(response => {
            if (response.type === 'error') {
              this.loading = false
              this.$message.error('登陆失败')
            } else {
              this.loading = false
              this.$router.push({ path: '/' })
            }
          }).catch(error => {
            this.loading = false
            this.$message.error('服务器错误')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }

  .login-container .authimage {
    width: 120px;
  }

  .login-container .auth-show {
    width: 120px;
    height: 47px;
    float: right;
    border: none;
  }

  .authcode {
    width: 190px;
    display: inline-block;
    height: 47px;
    cursor: pointer;
  }
</style>
