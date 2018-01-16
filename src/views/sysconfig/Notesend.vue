<template>
	<el-form class="note-form" :label-position="labelPosition" ref="ruleForm" label-width="80px" :model="formLabelAlign">
		<el-form-item label="名称">
			<el-input type="textarea" v-model="formLabelAlign.name"></el-input>
		</el-form-item>
		<el-form-item label="活动区域">
			<el-select>
				<el-select v-model="value4" clearable placeholder="请选择">
					<el-option :label="所有用户" :value="0"></el-option>
					<el-option :label="制定用户" :value="1"></el-option>
				</el-select>
			</el-select>
		</el-form-item>
		<el-form-item label="名称">
			<el-upload
				class="upload-demo"
				action="https://jsonplaceholder.typicode.com/posts/"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:before-remove="beforeRemove"
				multiple
				:limit="3"
				:on-exceed="handleExceed"
				:file-list="fileList">
				<el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				labelPosition: 'right',
				formLabelAlign: {
					name: '',
					region: '',
					type: ''
				}
			}
		},
		methods: {
			resetForm(formName) {
				this.$refs[formName].resetFields()
			},
			handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }?`)
      }
		}
}
</script>

<style>
	.note-form {
		width: 500px;
		margin: 0 auto;
	}
</style>