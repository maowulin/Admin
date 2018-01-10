	<template>
		<section>
			<el-form ref="form" :model="form" label-width="105px">
				<el-form-item label="战队头像">
					<el-upload
						class="avatar-uploader"
						action="https://jsonplaceholder.typicode.com/posts/"
						:show-file-list="false"
						:on-success="handleAvatarSuccess">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
	
				<el-form-item label="战队管理员">
						<el-button size="small">管理</el-button>
				</el-form-item>
	
				<el-form-item label="战队名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
	
				<el-form-item label="成员管理">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
	
				<el-form-item label="战队ID">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
	
				<el-form-item label="成员等级">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				
				<el-form-item label="战队宣言">
					<el-input type="textarea" v-model="form.desc"></el-input>
				</el-form-item>

				<div class="from-footer">
					<el-button type="primary" @click="onSubmit">提交</el-button>
					<el-button>取消</el-button>
				</div>
			</el-form>
		</section>
	</template>
	<script>
		export default {
			data() {
				return {
					form: {
						name: '',
						region: '',
						date1: '',
						date2: '',
						delivery: false,
						type: [],
						resource: '',
						desc: '',
						divice: ['设备1', '设备2', '设备3']
					},
					imageUrl: ''
				}
			},
			methods: {
				onSubmit() {
					console.log('submit!')
				},
	
				handleAvatarSuccess(res, file) {
					this.imageUrl = URL.createObjectURL(file.raw)
				}
			}
		}
	</script>
	
	<style>
		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			line-height: 0;
		}
		.avatar-uploader .el-upload:hover {
			border-color: #409EFF;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 40px;
			height: 40px;
			line-height: 40px;
			text-align: center;
		}
		.el-form-item {
			width: 49%;
		}
		.avatar {
			width: 40px;
			height: 40px;
			display: block;
		}
		.from-footer {
			margin: 0 auto;
			text-align: center;
		}
	</style>