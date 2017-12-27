<template>
	<section>		
		<el-tabs type="border-card">
			<el-tab-pane label="基础指标">
				<basied></basied>
			</el-tab-pane>
			<el-tab-pane label="用户活跃度"></el-tab-pane>
			<el-tab-pane label="用户存留率"></el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	import Basied from './UserStatis/Basied'
	export default {
		components: {
			Basied
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
</style>