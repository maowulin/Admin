<template>
  <section>
  	<div class="user_head">
  	  <my-select :message="tribeMessage" :option-value="tribeValue" @selectChange="tribeStatusChange"></my-select>
  	  <my-search :option-value="tribeValue2" @searchClick="tribeInfoSearch"></my-search>
  	  <paging :total="totalRecords" @getSize="getTribeSize" @getPage="getTribePage"></paging>
  	</div>
  	
  	<egrid class="egrid"
  		fit
      :data="tableData"
      :columns="columns"
      :columns-schema="columnsSchema"
      :columns-props="columnsProps"
      :column-type="columnType"
      row-key="circleID"
      :expand-row-keys="expands"
      v-loading="loading"
      @expand="expandChange">
      <template slot="expand" slot-scope="{}">
        <section class="expand-detail userdateil-expand">
            <ul class="user-detail">
              <li class="head">战队资料</li>
              <li class="conent">
                <span class="conent-title">战队ID：</span>
                <span class="conent-cent">{{ detailData.circle_code }}</span>
              </li>
              <li class="conent">
                <span class="conent-title">创建时间：</span>
                <span class="conent-cent">{{ detailData.createDate }}</span>
              </li>
              <li class="conent">
                <span class="conent-title">战队二维码：</span>
                <span class="conent-cent">{{ detailData.zd_qrcode}}</span>
              </li>
              <li class="conent">
                <span class="conent-title">战队排名：</span>
                <span class="conent-cent">{{ detailData.vip_date_limit }}</span>
              </li>
              <li class="conent">
                <span class="conent-title">战队战斗力：</span>
                <span class="conent-cent">{{ detailData.vip_date_limit }}</span>
              </li>
              <li class="conent">
                <span class="conent-title">战队活跃度：</span>
                <span class="conent-cent">{{ detailData.vip_date_limit }}</span>
              </li>
            </ul>
            <ul class="user-detail">
              <li class="head">战队约球信息</li>
              <li class="conent">
                <span class="conent-title">总约球数：</span>
                <span class="conent-cent">{{ detailData.yq_count }}</span>
              </li>
              <li class="conent">
                <span class="conent-title">成功约球：</span>
                <span class="conent-cent">{{ detailData.yq_success }}</span>
              </li>
              <li class="conent">
                <span class="conent-title">失败约球：</span>
                <span class="conent-cent">{{ detailData.yq_fail}}</span>
              </li>
            </ul>
            <ul class="user-detail">
              <li class="head">战队宣言</li>
              <li class="conent">
                <span class="conent-cent">{{ detailData.circle_intro }}</span>
              </li>
            </ul>
            <ul class="user-detail">
              <li class="head">战队圈信息</li>
              <li class="conent">
                  <span class="conent-title">圈总数：</span>
                  <span class="conent-cent">{{ detailData.topic_count }}</span>
              </li>
              <li class="conent">
                <span class="conent-title">删除圈：</span>
                <span class="conent-cent">{{ detailData.del_topic_count }}</span>
              </li>
              <li class="conent">
                <span class="conent-title">锁定圈：</span>
                <span class="conent-cent">{{ detailData.lock_topic_count}}</span>
              </li>
            </ul>
        </section>
      </template>
   </egrid>
  </section>
</template>

<script>
  import { getTribeData, getTribeDetail } from '@/api/query'
  import Paging from '@/components/Paging/'
  import MySelect from '@/components/Select/'
  import MySearch from '@/components/Search/'
  
  // 战队头像显示
  var tribeIcon = {
    template: '<img :src="row.iconUrl" alt="暂无" style="width:40px;" />',
    props: ['row']
  }
  
  // 战队状态
  var tribeStaus = {
    template: `<span v-if="row.status == 0">正常</span>
		 		<span v-else style="color:red;">解散</span>`,
	  props: ['row']
  }
  
  export default {
    components: {
  	  Paging,
  	  MySelect,
  	  MySearch
    },
    data() {
  	  return {
        tribeMessage: '状态',
        totalRecords: 0,
        tableData: [],
        detailData: {},
        expands: [],
        loading: false,
        tribeData: {
          like: '',
          status: '',
          pageSize: 10,
          pageNow: 0
        },
        tribeValue: [{
          'opti': '状态',
          'val': ''
        }, {
          'opti': '正常',
          'val': '0'
        }, {
          'opti': '解散',
          'val': '1'
        }],
        tribeValue2: [{
          'opti': '战队名称',
          'val': '0'
        }, {
          'opti': '队长名称',
          'val': '1'
        }],
        columns: [{
          'label': '序号',
          'prop': 'serial'
        }, {
          'label': '战队图标',
          'prop': 'iconUrl'
        }, {
          'label': '战队名称',
          'prop': 'circleName'
        }, {
          'label': '队长',
          'prop': 'userName'
        }, {
          'label': '战队等级',
          'prop': 'circle_level'
        }, {
          'label': '战队人数',
          'prop': 'memCount'
        }, {
          'label': '圈数',
          'prop': 'newTopic_count'
        }, {
          'label': '约球',
          'prop': 'iconType'
        }, {
          'label': '状态',
          'prop': 'status'
        }],
        expansionConent: [{
          'label': '战队ID',
          'prop': 'circle_code'
        }, {
          'label': '创建时间',
          'prop': 'createDate'
        }, {
          'label': '战队二维码',
          'prop': 'zd_qrcode'
        }, {
          'label': '战队排名',
          'prop': 'zh_rank'
        }, {
          'label': '战队战斗力',
          'prop': 'zdl_rank'
        }, {
          'label': '战队活跃度',
          'prop': 'circle_liveness'
        }, {
          'label': '总约球数',
          'prop': 'yq_count'
        }, {
          'label': '成功约球',
          'prop': 'yq_success'
        }, {
          'label': '失败约球',
          'prop': 'yq_fail'
        }, {
          'label': '战队宣言',
          'prop': 'circle_intro'
        }, {
          'label': '圈总数',
          'prop': 'topic_count'
        }, {
          'label': '删除圈',
          'prop': 'del_topic_count'
        }, {
          'label': '锁定圈',
          'prop': 'lock_topic_count'
        }],
        columnsProps: {
          align: 'center',
          sortable: true
        },
        columnsSchema: {
          '战队图标': {
            sortable: false,
            component: tribeIcon
          },
          '状态': {
            sortable: false,
            component: tribeStaus
          }
        },
        columnType: 'expand'
  	  }
    },
    created() {
  	  this.getData()
    },
    methods: {
      getData() {
        this.loading = true
        getTribeData(this.tribeData).then(response => {
          this.loading = false
          this.tableData = response.items
          this.totalRecords = response.totalRecords
        }).catch(error => {
          this.loading = false
          this.$message.error('服务器错误')
        })
      },
      expandChange(row, expandedRows) {
        if (expandedRows) {
          getTribeDetail({ 'circleID': row.circleID }).then(response => {
            
            this.detailData = response
          }).catch(error => {
            this.$message({
              showClose: true,
              message: '服务器错误',
              type: 'error'
            })
          })
        }
        Array.prototype.remove = function(val) {
          const index = this.indexOf(val)
          if (index > -1) {
            this.splice(index, 1)
          }
        }
  
        if (this.expands.indexOf(row.circleID) < 0) {
          this.expands = []
          this.expands.push(row.circleID)
        } else {
          this.expands.remove(row.circleID)
        }
  	  },
      tribeStatusChange(command) {
        this.tribeData.status = command
        this.getData()
  	  },
  	  tribeInfoSearch(select, input) {
  	  	this.tribeData.like = input
  	  	this.getData()
  	  },
  	  getTribeSize(pageSize) {
  	  	this.tribeData.pageSize = pageSize
  	  	this.getData()
  	  },
  	  getTribePage(pageNow) {
  	  	this.tribeData.pageNow = pageNow
  	  	this.getData()
  	  }
    }
  }
</script>

<style>
</style>