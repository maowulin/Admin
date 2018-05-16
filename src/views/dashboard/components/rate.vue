<template>
  <div>
    <span class="rate-title">用户存留</span>
    <egrid class="egrid"
      fit
      v-loading="loading"
      id="rate-table"
      :data="tableData"
      :columns="columns"
      :columns-schema="columnsSchema"
      :columns-props="columnsProps"
      :column-type="columnType">
    </egrid>
  </div>
</template>

<script>
  import { getDate } from '@/method'
  import { getStatis } from '@/api/statis'
  import { rateColumns } from '../config/rate'

  const rateConent = {
    template: `<div :class="rateRowClass">{{row[col.prop]}}%</div>`,
    props: ['row', 'col'],
    computed: {
      rateRowClass: function() {
        let val = this.row[this.col.prop]
        if(val <= 0) {
          return 'rate-vessel color10'
        }else if(val < 2 && val > 0) {
          return 'rate-vessel color8'
        }else if(val < 4 && val >= 2) {
          return 'rate-vessel color8'
        }else if(val < 6 && val >= 4) {
          return 'rate-vessel color6'
        }else if(val < 8 && val >= 6) {
          return 'rate-vessel color4'
        }else if(val < 10 && val >= 8) {
          return 'rate-vessel color2'
        }else {
          return 'rate-vessel color1'
        }
      }
    }
  }

  export default {
    data() {
      return {
        tableData: [],
        loading: false,
        columns: rateColumns,
        columnsSchema: {
          '次日' : {
            component: rateConent
          },
          '第2天' : {
            component: rateConent
          },
          '第3天' : {
            component: rateConent
          },
          '第4天' : {
            component: rateConent
          },
          '第5天' : {
            component: rateConent
          },
          '第6天' : {
            component: rateConent
          },
          '第7天' : {
            component: rateConent
          },
          '第15天' : {
            component: rateConent
          },
          '第30天' : {
            component: rateConent
          }
        },
        columnsProps: {
          align: 'center'
        },
        columnType: '',
        rateReuestData: {
          beginTime : getDate(9),
          endTime   : getDate(0),
          pageNow   : 0,
          pageSize  : 10
        }
      }
    },
    created(){
      this.getData()
    },
    methods: {
      getData() {
        this.loading = true
        getStatis('../userL8/userL8_retain_rate.json', 'get', this.rateReuestData).then(response => {
          this.loading = false
          if(response.items.length > 0) {
            this.tableData = response.items
          }else {
            this.tableData = ''
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  #rate-table {
    td {
      padding: 0;
    }

    th {
      padding: 6px 0;
    }

    .rate-vessel {
      padding: 5px 0;
      /* color: white; */
      margin-right: 1px;
    }

    .cell {
      padding: 0;
    }
  }

  .rate-title {
    display: block;
    text-align: center;
    font-size: 18px;
  }

  .color1 {
    background-color: #0589fd;
  }

  .color2 {
    background-color: #2395f9;
  }

  .color3 {
    background-color: #349efb;
  }

  .color4 {
    background-color: #47a5f7;
  }

  .color5 {
    background-color: #5caff7;
  }

  .color6 {
    background-color: #76bdfb;
  }

  .color7 {
    background-color: #8bc7fb;
  }

  .color8 {
    background-color: #94caf9;
  }

  .color9 {
    background-color: #9dcdf7;
  }

  .color10 {
    background-color: #cee7fd;
  }
</style>