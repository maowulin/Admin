<template>
  <div class="china-chart" v-loading="loading">
    <city v-if="cityData.length !== 0" :char-data="cityData"></city>
  </div>
</template>

<script>
  import { loginCity } from '@/api/query'
  export default {
    components: {
      city: function(resolve) {
        require(['../dashboard/components/city'], resolve)
      }
    },
    data() {
      return {
        cityData: [],
        loading: false
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        this.loading = true
        loginCity().then(response => {
          this.loading = false
          this.cityData = response.items
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .china-chart {
    position: relative;
    width: 100%;
    height: 550px;
    margin-top: 30px;
    padding: 15px 15px 0;
    background-color: #fff;
  }
</style>