<template>
	<section>
    <div v-if="isSecond">
      <div class="user_head">
        <el-button class="hede-btn" @click="premisAdd" plain>添加</el-button>
        <el-button class="hede-btn" @click="premisDelete" plain>删除</el-button>
        <my-search :option-value="optionValue" @searchClick="premisSarch"></my-search>		
      </div>
      <el-table
        fit
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" :selectable="isChecked" width="55">
        </el-table-column>
  
        <el-table-column sortable label="用户名" 	prop="uname">
        </el-table-column>
  
        <el-table-column label="手机号码" sortable prop="phone">
        </el-table-column>
  
        <el-table-column label="姓名" 	sortable prop="name">
        </el-table-column>
  
        <el-table-column label="部门" sortable prop="deptName">
        </el-table-column>
  
        <el-table-column label="角色" sortable prop="roleNames">
        </el-table-column>
  
        <el-table-column label="最后登录日期" sortable prop="lastLoginTime">
        </el-table-column>
  
        <el-table-column label="最后登录IP" sortable prop="lastLoginIp">
        </el-table-column>
  
        <el-table-column label="状态" sortable prop="status">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.status === 0">正常</span>
              <span v-else>禁用</span>
            </div>
          </template>
        </el-table-column>
  
        <el-table-column label="创建日期" sortable prop="createTime">
        </el-table-column>
  
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="primEdit(scope.row)" icon="el-icon-edit">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <premis-config v-model="isSecond" :is-add="isAdd" :premis-id="premisId" :roles="roles"></premis-config>
    </div>
  </section>
</template>

<script>
	import MySearch from '@/components/Search'
	import MySelect from '@/components/Select'
  import { getPremis, addManageconfig, delManageconfig } from '@/api/systemconfig'
  import PremisConfig from './PremisConfig'
	export default {
		components: {
			MySearch,
      MySelect,
      PremisConfig
		},
		data(){
			return {
        tableData: [],
        isSecond: true,
        isAdd: true,
        premisId: {},
        premisIds: '',
        roles: [],
        loading: false,
				requestData: {
					type: '',
					like: '',
					pageNow: 0,
					pageSize: 10
				},
				optionValue: [{
					'opti': '请选择',
					'val': ''
				},{
					'opti': '用户名',
					'val': '1'
				},{
					'opti': '姓名',
					'val': '2'
				},{
					'opti': '手机号码',
					'val': '3'
				},{
					'opti': '部门',
					'val': '4'
				}]
			}
		},
		created() {
      this.getData()
    },
    watch: {
      isSecond: function() {
        this.getData()
      }
    },
		methods: {
			getData() {
        this.loading = true
				getPremis(this.requestData).then(reponse => {
          this.loading = false
					this.tableData = reponse.items
				}).catch(error => {
					console.log(console.error)
				})
      },
			premisAdd() {
        this.isAdd = true
        this.isSecond = false
      },
			premisDelete() {
        if(this.premisIds !== '' ) {
          delManageconfig({'ids': this.premisIds}).then(response => {
            if(response.result === 1) {
              this.$message({
                showClose: true,
                message: '更新成功',
                type: 'success'
              })
              this.getData()
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
              message: '获取用户信息失败，请重试！',
              type: 'error'
            })
          })
        }
      },
			premisSarch(val, input) {
				this.requestData.type = val
				this.requestData.like = input
				this.getData()
			},
			handleSelectionChange(index) {
        this.premisIds = ''
        for(let i = 0; i < index.length; i++) {
          if(i < index.length -1 ) {
            this.premisIds += index[i].id + ','
          }else {
            this.premisIds += index[i].id
          }
        }
      },
			isChecked(row) {
				if (row.id === 1) {
					return false
				} else {
					return true
				}
			},
			primEdit(row) {
        this.isAdd = false
        this.isSecond = false
        this.premisId.id = row.id
			}
		}
	}
</script>

<style>
</style>