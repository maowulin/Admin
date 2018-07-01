<template>
  <el-form  ref="form" class="maintainFrom" :model="form" label-width="80px">
    <el-form-item label="维护时间" v-if="form.value4.length !== 0">
      <el-date-picker
        v-model="form.value4"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="维护原因">
      <el-input v-model="form.name" class="maintain-res"></el-input>
    </el-form-item>

    <el-form-item label="维护说明">
      <el-input type="textarea" :rows="6" resize="both" v-model="form.desc"></el-input>
    </el-form-item>

    <el-form-item class="from-button">
      <span>
          <el-button v-if="form.status === 0" type="danger" @click="mainOpen">开始维护</el-button>
          <el-button v-else type="danger">维护中...</el-button>
      </span>
      
      <span>
          <el-button v-if="form.status === 1" @click="mainClose">停止维护</el-button>
          <el-button v-else>停止维护</el-button>
      </span>
    </el-form-item>
  </el-form>
</template>

<script>

  import { findMaintainList, updateMaintainList } from '@/api/systemconfig'
  
  export default {
    data() {
      return {
        form: {
          name: '',
          status: 0,
          desc: '',
          value4: []
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        findMaintainList().then(response => {
          let list = response.items[0]
          
          this.form.name = list.reason
          this.form.desc = list.conent
          this.form.status = list.status

          let tempStart = list.start_time.split(/\-|\s|\:/g)
          let tempEnd = list.end_time.split(/\-|\s|\:/g)
        
          this.form.value4[0] = list.start_time
          this.form.value4[1] = list.end_time
          
        }).catch(error => {
          console.log(error)
        })
      },
      mainOpen() {
        this.$confirm('此操作将开启服务器的维护, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateMaintain("1")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消开启'
          })          
        })
      },
      mainClose() {
        this.$confirm('此操作将关闭当前服务器的维护, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateMaintain('0')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消关闭'
          })         
        })
      },
      updateMaintain(status) {
        let tempData = {
          status: status,
          start_time: this.form.value4[0].replace(/\.0/g, ''),
          end_time: this.form.value4[1].replace(/\.0/g, ''),
          reason: this.form.name,
          conent: this.form.desc
        }
        
        updateMaintainList(tempData).then(response => {
          this.$message({
            showClose: true,
            message: '修改成功！',
            type: 'success'
          })
          this.getData()
        }).catch(error => {
          this.$message({
            showClose: true,
            message: '修改失败！',
            type: 'error'
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .maintainFrom {
    width: 400px;
    margin: 20px auto;
    .el-input, .el-textarea {
      width: 400px;
    }
    .from-button {
      text-align: center;
      width: 400px;
    }
  }
</style>