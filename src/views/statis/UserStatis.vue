<template>
	<section>		
		<el-tabs type="border-card">
			<el-tab-pane label="基础指标">
				<basied></basied>
			</el-tab-pane>
			<el-tab-pane label="用户活跃度">
				<activi></activi>
			</el-tab-pane>
			<el-tab-pane label="用户存留率">
				<reten></reten>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	import Basied from './UserStatis/Basied'
	import Activi from './UserStatis/Activi'
	import Reten from './UserStatis/Reten'
	import {getUserBasied} from '@/api/statis'
	export default {
		components: {
			Basied,
			Activi,
			Reten
		}
	}
</script>

<style>
	.el-tabs {
		margin-top: 10px;
	}
	
	.el-checkbox-group {
		margin: 10px 0;
	}
	
	.el-button {
		width: auto;
		margin-left: auto;
	}
	
	.user_head2 {
		line-height: 2;
	}
</style>