<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.roleName"></el-input>
      </el-form-item>

      <el-form-item label="角色描述">
        <el-input v-model="form.roleDesc"></el-input>
      </el-form-item>

      <div>
        <el-form-item v-for="item in menu" :key="item.id" :label="item.menu">
          <el-checkbox-group v-model="roleId" @change="rolesChange">
            <el-checkbox v-for="list in item.children" :key="list.id" :label="list.id" name="type">{{list.menu}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getToken } from '@/api/management'
  import { getRolerInfo, addRoler, updateRoler } from '@/api/systemconfig'
  import { getMenuSec } from '@/method'
  export default {
    props: ['value', 'isAdd', 'premisId', 'roles'],
    data() {
      return {
        form: {
          roleName      : '',
          roleDesc      : '',
          token         : ''
        },
        roleId: [],
        status: false,
        menu: []
      }
    },
    created() {
      this.getRoler()
      this.getPreToken()
      this.getRolesConfig()
    },
    beforeUpdate() {
      this.rolesChange()
    },

    methods: {
      getRoler() {
        if (!this.isAdd) {
          this.form.id = this.premisId.id
          getRolerInfo(this.premisId).then(response => {
            console.log(response)
            this.form.roleName = response.roleName
            this.form.roleDesc = response.roleDesc

            // 获取当前管理员角色
            for (let i = 0; i < response.rpList.length; i++) {
              this.roleId.push(response.rpList[i].moduleId)
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },
      async getRolesConfig() {
        this.menu = await getMenuSec()
      },
      getPreToken() {
				getToken().then(response => {
					this.form.token = response.data
				}).catch(error => {
          console.log(error)
				})
			},
      onSubmit() {
        if(this.isAdd) {

          this.form.moduleIds = ''
          for(let i = 0; i < this.roleId.length; i++) {
            if(i < this.roleId.length - 1) {
              this.form.moduleIds += this.roleId[i] + ','
            }else {
              this.form.moduleIds += this.roleId[i]
            }
          }

          addRoler(this.form).then(response => {
            if(response.result === 1) {
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              this.back()
            }else {
              this.$message({
                showClose: true,
                message: '添加失败',
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
        }else {

          this.form.permissionIds = ''
          for(let i = 0; i < this.roleId.length; i++) {
            if(i < this.roleId.length - 1) {
              this.form.permissionIds += this.roleId[i] + ','
            }else {
              this.form.permissionIds += this.roleId[i]
            }
          }

          updateRoler(this.form).then(response => {
            if(response.result === 1) {
              this.$message({
                showClose: true,
                message: '更新成功',
                type: 'success'
              })
              this.back()
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
        }
      },
      rolesChange() {
        
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