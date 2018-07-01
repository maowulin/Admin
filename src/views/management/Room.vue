<template>
	<section>
		<el-tabs type="border-card">
			<el-tab-pane label="免费赛房间管理">
				<div class="user_head">
						<my-search :message="message" :option-value="optionValue" @searchClick="freeRoomSearch"></my-search>	
					</div>
				<el-table
					fit
					v-loading="loading"
					:data="freeData"
					tooltip-effect="dark"
					style="width: 100%">
		
					<el-table-column label="创建时间" 	sortable prop="create_room_time">
					</el-table-column>
		
					<el-table-column label="房主" sortable prop="create_user_userName">
					</el-table-column>
					
					<el-table-column width="80px" label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="freeDel(scope.row.key)" icon="el-icon-edit">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="金币赛房间管理">
				<div class="user_head">
						<my-search :message="message2" :option-value="optionValue2" @searchClick="goldRoomSearch"></my-search>	
					</div>
				<el-table
					fit
					v-loading="loading2"
					:data="goldData"
					tooltip-effect="dark"
					style="width: 100%">
					<el-table-column sortable label="序号" 	prop="serial">
					</el-table-column>
		
					<el-table-column label="创建时间" 	sortable prop="create_room_time">
					</el-table-column>
		
					<el-table-column label="房主" sortable prop="create_user_userName">
					</el-table-column>
					
					<el-table-column width="80px" label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="goldDel(scope.row.key)" icon="el-icon-edit">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
      </el-tab-pane>
      <el-tab-pane label="奖金赛房间管理">
				<div class="user_head">
						<my-search :message="message3" :option-value="optionValue3" @searchClick="bounsRoomSearch"></my-search>	
					</div>
				<el-table
					fit
					v-loading="loading3"
					:data="bounsData"
					tooltip-effect="dark"
					style="width: 100%">
					<el-table-column sortable label="序号" 	prop="serial">
					</el-table-column>
		
					<el-table-column label="创建时间" 	sortable prop="create_room_time">
					</el-table-column>
		
					<el-table-column label="房主" sortable prop="create_user_userName">
					</el-table-column>
					
					<el-table-column width="80px" label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="bounsDel(scope.row.key)" icon="el-icon-edit">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	import MySearch from '@/components/Search'
	import { getFreeRoom, delFreeRoom } from '@/api/management'
	export default { 
		components: {
			MySearch
		},
		data() {
			return {
				message: '',
				loading: false,
				freeData: [],
				optionValue: [{
					'opti': '房主名称',
					'val': ''
				}],
				freeRequestData: {
					type: '1',
					roomNumber: ''
				},

				message2: '',
				loading2: false,
				goldData: [],
				optionValue2: [{
					'opti': '房主名称',
					'val': ''
				}],
				goldRequestData: {
					type: '2',
					roomNumber: ''
				},

				message3: '',
				loading3: false,
				bounsData: [],
				optionValue3: [{
					'opti': '房主名称',
					'val': ''
				}],
				bounsRequestData: {
					type: '3',
					roomNumber: ''
				}
			}
		},
		created() {
			this.getFreeData()
			this.getGoldData()
			this.getBounsData()
		},
		methods: {
			getFreeData() {
				this.loading = true
				this.freeData = []
				getFreeRoom(this.freeRequestData).then(response => {
					this.loading = false
					for(let i = 0; i < response[0].data.length; i++) {
						let value = JSON.parse(response[0].data[i].value)
						value.key = response[0].data[i].key
						this.freeData.push(value)
					}
				}).catch(error => {
					console.log(error)
				})
			},
			getGoldData() {
				this.loading2 = true
				this.goldData = []
				getFreeRoom(this.goldRequestData).then(response => {
					this.loading2 = false
					for(let i = 0; i < response[0].data.length; i++) {
						let value = JSON.parse(response[0].data[i].value)
						value.key = response[0].data[i].key
						this.goldData.push(value)
					}
				}).catch(error => {
					console.log(error)
				})
			},
			getBounsData() {
				this.loading3 = true
				this.bounsData = []
				getFreeRoom(this.bounsRequestData).then(response => {
					this.loading3 = false
					for(let i = 0; i < response[0].data.length; i++) {
						let value = JSON.parse(response[0].data[i].value)
						value.key = response[0].data[i].key
						this.bounsData.push(value)
					}
				}).catch(error => {
					console.log(error)
				})
			},
			freeRoomSearch(val, input) {
				this.freeRequestData.roomNumber = input
				this.getFreeData()
			},
			goldRoomSearch(val, input) {
				this.goldRequestData.roomNumber = input
				this.getGoldData()
			},
			bounsRoomSearch(val, input) {
				this.bounsRequestData.roomNumber = input
				this.getBounsData()
			},
			freeDel(row) {
				delFreeRoom({type: 1, roomNumber: row}).then(response => {
					if(response[0].result === 1) {
						this.$message({
              showClose: true,
              message: '删除成功！',
              type: 'success'
						})
						this.getFreeData()
					}else {
						this.$message({
              showClose: true,
              message: '删除失败！',
              type: 'error'
            })
					}
				}).catch(error => {
					this.$message({
						showClose: true,
						message: '删除失败！',
						type: 'error'
					})
				})
			},
			goldDel(row) {
				delFreeRoom({type: 2, roomNumber: row}).then(response => {
					if(response[0].result === 1) {
						this.$message({
              showClose: true,
              message: '删除成功！',
              type: 'success'
						})
						this.getGoldData()
					}else {
						this.$message({
              showClose: true,
              message: '删除失败！',
              type: 'error'
            })
					}
				}).catch(error => {
					this.$message({
						showClose: true,
						message: '删除失败！',
						type: 'error'
					})
				})
			},
			bounsDel(row) {
				delFreeRoom({type: 3, roomNumber: row}).then(response => {
					if(response[0].result === 1) {
						this.$message({
              showClose: true,
              message: '删除成功！',
              type: 'success'
						})
						this.getBounsData()
					}else {
						this.$message({
              showClose: true,
              message: '删除失败！',
              type: 'error'
            })
					}
				}).catch(error => {
					this.$message({
						showClose: true,
						message: '删除失败！',
						type: 'error'
					})
				})
			}
		}
	}
</script>

<style>
</style>