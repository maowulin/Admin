<template>
	<section>
		<div class="user_head">
			<my-select :message="message1" :option-value="optionValue1" v-on:selectChange="userFightChange"></my-select>
	  	
	  	<my-search :message="message2" :option-value="optionValue2" v-on:searchClick="FightSearch"></my-search>
	  	
	  	<paging :total="totalRecords" v-on:getSize="getFightSize" v-on:getPage="getFightPage"></paging>
		</div>
		
		<egrid class="egrid"
  		fit
      :data="tableData"
      :columns="columns"
      :columns-schema="columnsSchema"
      :columns-props="columnsProps"
      :column-type="columnType">
   </egrid>
		
	</section>
</template>

<script>
	import {getFightData} from '@/api/query'
	import Paging from '@/components/Paging/'
	import MySelect from '@/components/Select/'
	import MySearch from '@/components/Search/'
	
	export default {
		components: {
			Paging,
			MySelect,
			MySearch
		},
		data() {
			return {
				message1: "",
				message2: "",
				totalRecords: 0,
				tableData: [],
				requestData: {
					uname: "",
					game_over_type: "",
					pageNow: 0,
					pageSize: 10
				},
				optionValue1: [{
					"opti": "结束原因",
					"val": ""
				},{
					"opti": "断线",
					"val": "1"
				},{
					"opti": "认输",
					"val": "2"
				},{
					"opti": "进黑8",
					"val": "3"
				}],
				optionValue2: [{
					"opti": "用户昵称",
					"val": ""
				}],
				columns: [{
					"label": "序号",
					"prop": "serial"
				},{
					"label": "开始时间",
					"prop": "start_game_time"
				},{
					"label": "结束时间",
					"prop": "end_game_time"
				},{
					"label": "游戏时长",
					"prop": "longTime"
				},{
					"label": "胜利方",
					"prop": "winnerName"
				},{
					"label": "失败方",
					"prop": "loserName"
				},{
					"label": "结束原因",
					"prop": "game_over_type"
				}],
				columnsProps: {
					align: "center",
					sortable: true
				},
				columnsSchema: {},
				columnType: ""
			}
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				getFightData(this.requestData).then(response => {
					console.log(response);
					this.tableData = response.items;
					this.totalRecords = response.totalRecords;
				}).catch(error => {
					console.log(error);
				});
			},
			userFightChange(val) {
				this.requestData.game_over_type = val;
				this.getData();
			},
			FightSearch(select, input) {
				this.requestData.uname = input;
				this.getData();
			},
			getFightSize(pageSize) {
				this.requestData.pageSize = pageSize;
				this.getData();
			},
			getFightPage(pageNow) {
				this.requestData.pageNow = pageNow;
				this.getData();
			}
		}
	}
</script>

<style>
</style>