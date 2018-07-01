<template>
	<section>		
		<el-tabs type="border-card">
			<el-tab-pane label="用户基本信息">
				<import-basi></import-basi>
			</el-tab-pane>
			<el-tab-pane label="充值信息及其他">
				<import-recharge></import-recharge>
			</el-tab-pane>
			<el-tab-pane label="游戏对局">
				<import-gameches></import-gameches>
			</el-tab-pane>
			<el-tab-pane label="游戏创建房间">
				<import-create></import-create>
			</el-tab-pane>
			<el-tab-pane label="游戏加入房间">
				<import-join></import-join>
			</el-tab-pane>
			<el-tab-pane label="用户存留">
				<import-rate></import-rate>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	import StatisPage from './page/StatisPage'
	import ImportBasi from './page/ImportBasi'
	import ImportCreate from './page/ImportCreate'
	import ImportGameches from './page/ImportGameches'
	import ImportJoin from './page/ImportJoin'
	import ImportRate from './page/ImportRate'
	import ImportRecharge from './page/ImportRecharge'
	import {getDate} from '@/method'
	export default {
		components: {
			StatisPage,
			ImportBasi,
			ImportCreate,
			ImportGameches,
			ImportJoin,
			ImportRate,
			ImportRecharge
		},
		data() {
			return {}
		},
		methods: { }
	}
</script>

<style>
	.el-tabs {
		margin-top: 10px;
	}
	
	.el-checkbox-group {
		margin: 10px 0;
	}
	
	.user_head2 {
		line-height: 2;
	}
</style>