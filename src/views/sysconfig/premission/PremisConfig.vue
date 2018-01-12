<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="重复密码">
        <el-input v-model="form.comfirmPassword"></el-input>
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
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getPremis } from '@/api/management'
  export default {
    props: ['value'],
    data() {
      return {
        form: {
          uname: '',
          password: '',
          comfirmPassword: '',
          department: '',
          name: false,
          phone: '',
          roleIds: [],
          status: '',
          token: ''
        },
        roles: [],
        roleId: []
      }
    },
    created() {
      this.getRoles()
    },
    methods: {
      getRoles() {
        getPremis('../authority/role_all', 'get', '').then(response => {
          console.log(response)
          this.roles = response
        }).catch(error => {
          console.log(error)
        })
      },
      onSubmit() {
        console.log('submit!')
      },
      roleChange() {
        console.log(this.roleId)
        for(let i = 0; i < this.roleId.length; i++) {
          
        }
      },
      back() {
        this.$emit('input', 'false')
      }
    }
  }
</script>

<style>

</style>