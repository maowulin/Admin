<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="重复密码">
        <el-input type="password" v-model="form.comfirmPassword"></el-input>
      </el-form-item>

      <el-form-item label="部门">
        <el-input v-model="form.department"></el-input>
      </el-form-item>

      <el-form-item label="手机号码">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="角色">
        <el-checkbox-group v-model="roleId" @change="roleChange">
          <el-checkbox v-for="item in roles" :label="item.id" name="type">{{ item.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      
      <el-form-item label="设置">
        <el-checkbox-group v-model="status" @change="settingChange">
          <el-checkbox label="true" name="type">是否启用</el-checkbox>
        </el-checkbox-group>
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
  import { getPremis, getToken } from '@/api/management'
  export default {
    props: ['value', 'isAdd', 'premisId', 'roles'],
    data() {
      return {
        form: {
          uname: '',
          password: '',
          comfirmPassword: '',
          department: '',
          phone: '',
          roleIds: '',
          status: '',
          token: ''
        },
        roleId: [],
        status: false
      }
    },
    created() {
      this.getRoler()
      this.getPreToken()
    },
    beforeUpdate() {
      this.roleChange()
    },
    methods: {
      getRoler() {
        if (!this.isAdd) {
          getPremis('../authority/administrator_edit', 'get', this.premisId).then(response => {
            console.log(response)
            this.form.uname = response.name
            this.form.password = response.password
            this.form.comfirmPassword = response.comfirmPassword
            this.form.department = response.deptName
            this.form.phone = response.phone
            this.form.status = response.status

            // 获取当前管理员角色
            for (let i = 0; i < response.roleList.length; i++) {
              this.roleId.push(response.roleList[i].id)
            }
            console.log(name)
          }).catch(error => {
            console.log(error)
          })
        }
      },
      getPreToken() {
				getToken().then(response => {
					this.form.token = response.data
				}).catch(error => {
          console.log(error)
				})
			},
      onSubmit() {
        console.log(this.form)
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
        if (this.status) {
          this.form.status = 0
        } else {
          this.form.status = 0
        }
      }
    }
  }
</script>

<style>

</style>