<template>
	<section>
		<el-tabs type="border-card">
			<el-tab-pane label="用户管理">
				<premis-page></premis-page>
			</el-tab-pane>
			<el-tab-pane label="角色管理">
				<management-page></management-page>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	import PremisPage from './premission/PremisPage'
	import ManagementPage from './premission/ManagementPage'
	export default { 
		components: {
			PremisPage,
			ManagementPage
		}	
	}
</script>

<style>
</style>