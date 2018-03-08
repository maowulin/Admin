<template>
	<section>
    <div v-if="isSecond">
      <div class="user_head">
        <el-button class="hede-btn" @click="premisAdd" plain>添加</el-button>
        <el-button class="hede-btn" @click="premisDelete" plain>删除</el-button>
        <my-search :message="message" :option-value="optionValue" @searchClick="premisSarch"></my-search>		
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
  
        <el-table-column sortable label="角色名称" 	prop="roleName">
        </el-table-column>
  
        <el-table-column label="是否内置" sortable prop="phone">
					<template slot-scope="scope">
						<div>
							<span v-if="scope.row.isInner === 0">否</span>
							<span v-else>是</span>
						</div>
					</template>
        </el-table-column>
  
        <el-table-column label="角色描述" 	sortable prop="roleDesc">
        </el-table-column>
  
        <el-table-column label="创建日期" sortable prop="createTime">
				</el-table-column>
				
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" :disabled="scope.row.id === 4" @click="primEdit(scope.row)" icon="el-icon-edit">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <management-config v-model="isSecond" :is-add="isAdd" :premis-id="premisId" :roles="roles"></management-config>
    </div>
  </section>
</template>

<script>
	import MySearch from '@/components/Search'
	import MySelect from '@/components/Select'
  import { getManager, getManagerRoles, delRoler } from '@/api/systemconfig'
  import ManagementConfig from './ManagementConfig'
	export default {
		components: {
			MySearch,
      MySelect,
      ManagementConfig
		},
		data(){
			return {
				message: '请选择',
        tableData: [],
        isSecond: true,
        isAdd: true,
        premisId: {},
        loading: false,
        premisIds: '',
        roles: [],
				requestData: {
					type: '',
					like: '',
					pageNow: 0,
					pageSize: 10
				},
				optionValue: []
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
				getManager(this.requestData).then(reponse => {
          this.loading = false
          this.tableData = reponse.items
				}).catch(error => {
					this.loading = false
          this.$message.error('服务器错误')
				})
      },
      getRoles(params) {
        getManagerRoles(params).then(response => {
          this.roles = response
        }).catch(error => {
          this.$message({
            showClose: true,
            message: '服务器错误！',
            type: 'error'
          })
        })
      },
			premisAdd() {
        this.isAdd = true
        this.isSecond = false
      },
			premisDelete() {
        delRoler({'ids': this.premisIds}).then(response => {
          if(response.result === 1) {
            this.$message({
              showClose: true,
              message: '删除成功！',
              type: 'success'
            })
          }else {
            this.$message({
              showClose: true,
              message: '删除失败！',
              type: 'error'
            })
          }
          this.getData()
        }).catch(error => {
          this.$message({
            showClose: true,
            message: '服务器错误！',
            type: 'error'
          })
        })
      },
			premisSarch(val, input) {
				this.requestData.type = val
				this.requestData.like = input
				this.getData()
			},
			handleSelectionChange(index) {
        this.premisIds = ''
        for(let i = 0; i < index.length; i++) {
          if(i < index.length - 1) {
            this.premisIds += index[i].id + ','
          }else {
            this.premisIds += index[i].id
          }
        }
      },
			isChecked(row) {
				if (row.id === 4) {
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