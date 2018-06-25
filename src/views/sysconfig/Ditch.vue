<template>
  <section v-loading="loading">
    <el-tabs v-model="activeName" @tab-click="handleClick" editable @edit="noticeEdit">
      <el-tab-pane v-for="item in tabs" :label="item.name" :key="item.number" :name="item.number + ''">
        <el-form class="notice-panel">

          <el-form-item label="渠道号">
            <el-input v-text="item.number" type="text" disabled></el-input>
          </el-form-item>

          <el-form-item label="版本号">
            <el-select v-model="version" filterable placeholder="请选择" @change="versionChange(item.number)">
              <el-option
                v-for="temp in tabsChil"
                :key="temp.version"
                :label="temp.version"
                :value="temp.version">
              </el-option>
              <el-option label="添加版本" value="add">新增版本<i class="el-icon-plus" style="float: right; margin-top: 10px;"></i></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="说明">
            <el-input v-model="explian" type="textarea" :id="'ditch-ex' + item.number"  :rows="12" resize="both" ></el-input>
          </el-form-item>

          <el-form-item style="text-align: center;">
            <el-button v-if="status === 0" type="danger" class="notice-button" @click="ditchStart(item.number, 1)">启动</el-button>
            <el-button v-else type="danger" class="notice-button" @click="ditchStart(item.number, 0)">停止</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="新增渠道" :visible.sync="dialogTableVisible">
      <div class="add-notice-panel">
        <el-form ref="form" label-width="80px">
          <el-form-item label="渠道名称">
              <el-input type="text" v-model="ditchName"></el-input>
          </el-form-item>

          <el-form-item label="渠道编号">
              <el-input type="text" v-model="number"></el-input>
          </el-form-item>

          <el-form-item style="text-align: center;">
            <el-button type="danger" class="notice-button" @click="addDitchList">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog title="新增版本" :visible.sync="dialogVersionAdd" @close="dialogClose">
      <div class="add-notice-panel">
        <el-form ref="form" label-width="80px">
          <el-form-item label="版本号">
              <el-input type="text" v-model="addVersionNumber"></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="addVersionStatus" filterable placeholder="请选择" >
              <el-option label="启用" value="1"></el-option>
              <el-option label="不启用" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="版本说明">
              <el-input type="textarea" class="add-conent" :rows="12" resize="both" v-model="addVersionExplian"></el-input>
          </el-form-item>

          <el-form-item style="text-align: center;">
            <el-button type="danger" class="notice-button" @click="addVersion">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import { getDitchList, getVersionList, getVersionInfo, delDitch, addDitch, changeDitch, addVersionInfo } from '@/api/systemconfig'
  export default {
    data() {
      return {
        tabs: [],
        tabsChil: [],
        loading: false,
        dialogTableVisible: false,
        dialogVersionAdd: false,
        ditchName: '',
        status: '',
        number: '',
        version: '',
        explian: '',
        addVersionNumber: '',
        addVersionExplian: '',
        addVersionStatus: ''
      }
    },
    created() {
      this.getData()
    },
    computed: {
      activeName: {
        get: function() {
						let tempObj = this.tabs[0]
						if(tempObj) {
							return tempObj.number + ''
						}else {
							return ''
						}
					},
					set: function() {
						
					}
      }
    },
    methods: {
      getData() {
        this.loading = true
        getDitchList().then(response => {
          this.loading = false
          this.tabs = response.items
          this.getVersionData(response.items[0].number)
        }).catch(error => {
          this.$message({
            showClose: true,
            message: '数据获取失败',
            type: 'error'
          })
        })
      },
      getVersionData(number) {
        getVersionList({number: number}).then(response => {
          this.tabsChil = response.items
        }).catch(error => { 
          console.log(error)
        })
      },
      handleClick(tar) {
        this.number = tar.name
        this.version = ''
        this.explian = ''
        this.getVersionData(tar.name)
      },

      getVersionInfo(number, version) {
        getVersionInfo({number: number, version: version}).then(response => {
          this.explian = response.items[0].explian
          this.status = response.items[0].status
        }).catch(error => {
          console.log(error)
        })
      },

      delData(number) {
        delDitch({number: number}).then(response => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getData()
        }).catch(error => {
          this.$message({
            showClose: true,
            message: '删除失败',
            type: 'error'
          })
        })
      },

      addDitchList() {
        const tempObj = {
          name: this.ditchName,
          number: this.number
        }

        addDitch(tempObj).then(response => {
          if(response.result === 1) {
            this.$message({
              showClose: true,
              message: '新增成功!',
              type: 'success'
            })
            this.dialogTableVisible = false
            this.getData()
          }else {
            this.$message({
              showClose: true,
              message: '渠道编号已存在！',
              type: 'error'
            })
          }
        }).catch(error => {
          this.$message({
            showClose: true,
            message: '新增失败',
            type: 'error'
          })
        })
      },

      changeDitch() {
        const tempObj = {

        }
        changeDitch().then(response => {

        }).catch(error => {

        })
      },

      noticeEdit(targetName, action) {
        if(action === 'remove'){
          this.$confirm('确认删除?', '删除公告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delData(targetName)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })        
          })
        }else {
          this.dialogTableVisible = true
          this.ditchName = '',
          this.status = '',
          this.number = '',
          this.version = '',
          this.explian = ''
        }
      },

      ditchStart(number, status) {
        let tempObj = {
          status: status,
          number: number,
          explian: document.getElementById('ditch-ex'+number).value,
          version: this.version
        }

        if(this.version !== '') {
          changeDitch(tempObj).then(response => {
            this.$message({
              showClose: true,
              message: '操作成功!',
              type: 'success'
            })
            this.getVersionInfo(number, this.version)
          }).catch(error => {
            this.$message({
              showClose: true,
              message: '操作失败',
              type: 'error'
            })
          })
        }
      },

      versionChange(number) {
        this.number = number
        if(this.version === 'add') {
          this.dialogVersionAdd = true
        }else {
          this.getVersionInfo(number, this.version)
        }
      },

      dialogClose() {
        this.version = ''
        this.explian = ''
        this.addVersionExplian = ''
        this.addVersionNumber = ''
        this.addVersionStatus = ''
      },

      addVersion() {
        const tempObj = {
          version: this.addVersionNumber,
          number: this.number,
          status: this.addVersionStatus,
          explian: this.addVersionExplian
        }

        addVersionInfo(tempObj).then(response => {
          if(response.result === 1) {
            this.$message({
              showClose: true,
              message: '新增成功!',
              type: 'success'
            })
            this.dialogVersionAdd = false
            this.getVersionData(this.number)
          }else {
            this.$message({
              showClose: true,
              message: '版本号已存在!',
              type: 'error'
            })
          }
        }).catch(error => {
          this.$message({
            showClose: true,
            message: '新增失败!',
            type: 'error'
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
.click-btn {
  width: 60px;
  height: 32px;
  padding: 7px 3px;
  font-size: 14px;
}
h5 {
  margin: 0;
  font-size: 16px;
}
.el-dialog__body {
  padding: 15px 20px;
}
.notice-panel {
  width: 600px;
  margin: 20px auto;

  .el-textarea {
    width: 500px;
  }
}
.notice-button {
  margin-top: 10px;
}
.add-conent {
  margin-top: 10px;
}
.add-notice-panel {
  width: 600px;
  margin: 20px auto;
}
.from-button {
  text-align: center;
}
</style>