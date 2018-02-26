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
            <el-button size="mini" type="primary" :disabled="scope.row.id === 1" @click="primEdit(scope.row)" icon="el-icon-edit">编辑</el-button>
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
  import { getManager, getManagerRoles } from '@/api/systemconfig'
  import PremisConfig from './PremisConfig'
	export default {
		components: {
			MySearch,
      MySelect,
      PremisConfig
		},
		data(){
			return {
				message: '请选择',
        tableData: [],
        isSecond: true,
        isAdd: true,
        premisId: {},
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
		methods: {
			getData() {
				getManager(this.requestData).then(reponse => {
					this.tableData = reponse.items
				}).catch(error => {
					console.log(console.error)
				})
      },
      getRoles(params) {
        getManagerRoles(params).then(response => {
          console.log(response)
          this.roles = response
        }).catch(error => {
          console.log(error)
        })
      },
			premisAdd() {
        this.isAdd = true
        this.isSecond = false
      },
			premisDelete() {},
			premisSarch(val, input) {
				this.requestData.type = val
				this.requestData.like = input
				this.getData()
			},
			handleSelectionChange(index) {},
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