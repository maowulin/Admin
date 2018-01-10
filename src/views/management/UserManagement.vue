<template>
  <section>
    <el-form :inline="true" ref="form" :model="form" label-width="105px">
      <el-form-item label="用户头像">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="VIP状态">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="已开通" value="1"></el-option>
          <el-option label="未开通" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="VIP到期时间">
        <el-col :span="8">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="0.5">-</el-col>
        <el-col :span="8">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="用户昵称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="用户手机号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="用户等级">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="0" value="0"></el-option>
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="密码">
        <el-input type="password" v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="form.resource">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="用户金币">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="用户银币">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="用户余额">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="所属战队">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="用户编码">
        <el-input disabled v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="注册时间">
        <el-col :span="16">
          <el-date-picker disabled type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="用户状态">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="正常" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="设备绑定">
        <span v-for="item in form.divice">{{item}}</span>
        <el-button size="mini" round>添加</el-button>
        <el-button size="mini" round>删除</el-button>
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