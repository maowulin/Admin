	<template>
		<section>
			<div class="user_head">
					<my-search :option-value="compeValue" @searchClick="tribeManageSearch"></my-search>
			</div>

			<transition name="fade">
				<el-form v-if="show" class="ment-coent" ref="form" :model="form" label-width="105px">
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
			</transition>
		</section>
	</template>
	<script>
		import MySearch from '@/components/Search'
		export default {
			components: {
				MySearch
			},
			data() {
				return {
					show: false,
					compeValue: [{
						'opti': 'ID/队长昵称/手机号',
						'val' : ''
					}],
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
				},

				tribeManageSearch(val, input) {
					this.show = true
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