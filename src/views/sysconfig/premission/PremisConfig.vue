<template>
  <div>
    <el-form ref="form" :model="form" :rules="premisRules" label-width="80px">
      <el-form-item label="名称" prop="uname">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="重复密码" prop="comfirmPassword">
        <el-input type="password" v-model="form.comfirmPassword"></el-input>
      </el-form-item>

      <el-form-item label="部门" prop="department">
        <el-input v-model="form.department"></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="角色">
        <el-checkbox-group v-model="roleId" @change="roleChange">
          <el-checkbox v-for="item in roles" :label="item.id" name="type">{{ item.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      
      <el-form-item label="设置">
        <el-radio-group v-model="form.status" @change="settingChange">
          <el-radio label="0" value="0">启用</el-radio>
          <el-radio label="1" value="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="短信通知">
        <el-checkbox-group >
          <el-checkbox label="" name="type">是否启用</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getManagerRoles, getRolesAll, updateManageconfig } from '@/api/systemconfig'
  import { getToken } from '@/api/management'
  export default {
    props: ['value', 'isAdd', 'premisId'],
    data() {

      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.password !== '') {
            this.$refs.form.validateField('comfirmPassword')
          }
          callback();
        }
      }

      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }

      return {
        form: {
          id              : '',
					uname           : '',
					password        : '',
					comfirmPassword : '',
					department      : '',
					name            : '',
					phone           : '',
					roleIds         : '',
					status          : '',
					token           : ''
        },
        premisRules: {
          'uname': [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          'name': [{
            required: true,
            message: '此项不能为空',
            trigger: 'blur'
          }],
          'password': [{
            validator: validatePass,
            trigger: 'blur'
          }],
          'comfirmPassword': [{
            validator: validatePass2,
            trigger: 'blur'
          }],
          'department': [{
            required: true,
            message: '请输入部门',
            trigger: 'blur'
          }],
          'phone': [{
            required: true,
            message: '请输入手机号',
            trigger: 'change'
          },{
            type: 'string',
            min: 11,
            max: 11,
            message: '请输入正确的手机号',
            trigger: 'change'
          }]
        },
        roleId: [],
        roles: []
      }
    },
    created() {
      this.managementInfo()
      this.getPreToken()
      this.getRoles()
    },
    beforeUpdate() {
      this.roleChange()
    },
    methods: {
      managementInfo() {
        if (!this.isAdd) {
          getManagerRoles({'id': this.premisId.id}).then(response => {
            this.form.uname = response.uname
            this.form.name = response.name
            this.form.password = response.password
            this.form.comfirmPassword = response.comfirmPassword
            this.form.department = response.deptName
            this.form.phone = response.phone
            this.form.status = response.status + ''

            for (let i = 0; i < response.roleList.length; i++) {
              this.roleId.push(response.roleList[i].id)
            }

            console.log(response)
          }).catch(error => {
            this.$message({
              showClose: true,
              message: '服务器错误',
              type: 'error'
            })
          })
        }
      },
      getPreToken() {
        getToken().then(response => {
					this.form.token = response.data
				}).catch(error => {
          this.$message({
            showClose: true,
            message: '获取token失败！',
            type: 'error'
          })
				})
      },
      getRoles() {
        getRolesAll().then(response => {
          this.roles = response
        }).catch(error => {
          this.$message({
            showClose: true,
            message: '获取token失败！',
            type: 'error'
          })
        })
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.id = this.premisId.id
            console.log(this.form)
            updateManageconfig(this.form).then(response => {
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
                message: '提交失败！',
                type: 'error'
              })
            })
          } else {
            return false
          }
        })
      },
      roleChange() {
        let tempStr = ''
        for (let i = 0; i < this.roleId.length; i++) {
          if (i < this.roleId.length - 1) {
            tempStr += this.roleId[i]
            tempStr += ','
          } else {
            tempStr += this.roleId[i]
          }
        }
        this.form.roleIds = tempStr
      },
      back() {
        this.$emit('input', 'false')
      },
      settingChange() {
        console.log(this.form.status)
      }
    }
  }
</script>

<style>

</style>