<template>
  <el-checkbox-group v-model="checkboxVal" @change="boxChange">
    <el-checkbox v-for="city in labeles" :label="city.label" :key="city.label">{{city.label}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
	
	export default {
		name: 'MyCheckboxGroup',
		props: ['labeles', 'defaultChecked'],
		data(){
			return {
				checkboxVal: this.defaultChecked
			}
		},
//		computed: {
//			getChecked: {
//				get: function() {
//					var checkedArray = [];
//					for(var i = 0; i < this.defaultChecked.length; i++) {
//						checkedArray.push(this.defaultChecked[i].label);
//					}
//					return checkedArray;
//				},
//				set:function(newValue) {
//					console.log(newValue);
//				}
//			}
//		},
		methods: {
			boxChange(val) {
//				console.log(val);
				this.$emit('change', this.checkboxVal)
			}
		}
	}
</script>

<style>
</style>