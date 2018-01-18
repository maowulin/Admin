<template>
  <div class="show-group">
    <el-row :gutter="30">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="left-icon people-icons">
              <svg-icon class="group-svg" icon-class="peoples"/>
          </div>
          <div class="right-text">
            <span class="text-t">总用户数</span>
            <span class="text-d">11111</span>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="left-icon online-icons">
              <svg-icon class="group-svg" icon-class="peoples"/>
          </div>
          <div class="right-text">
            <span class="text-t">在线用户数</span>
            <span class="text-d">11111</span>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="left-icon message-icons">
              <svg-icon class="group-svg" icon-class="peoples"/>
          </div>
          <div class="right-text">
            <span class="text-t">待处理消息</span>
            <span class="text-d">11111</span>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="left-icon style-icons">
              <svg-icon class="group-svg" icon-class="peoples"/>
          </div>
          <div class="right-text">
            <span class="text-t">admin</span>
            <span class="text-d">管理员</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'ShowGroup'
  }
</script>

<style>

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #fff;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 108px;
  padding: 10px;
  cursor: pointer;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.left-icon {
  float: left;
  padding: 16px;
  height: 80px;
  width: 80px;
  border-radius: 4px;
}

.people-icons {
  color: #40c9c6; 
}

.people-icons:hover {
  background-color: #40c9c6; 
  color: #fff;
}

.online-icons {
  color: #36a3f7; 
}

.online-icons:hover {
  background-color: #36a3f7; 
  color: #fff;
}

.message-icons {
  color: #f4516c;
}

.message-icons:hover {
  background-color: #f4516c; 
  color: #fff;
}

.style-icons {
  color: #34bfa3; 
}

.style-icons:hover {
  background-color: #34bfa3; 
  color: #fff;
}



.right-text {
  float: right;
  height: 80px;
  padding: 16px;
  line-height: 40px;
  font-family: "Helvetica Neue", "PingFang SC";
}

.text-t {
  display: block;
  font-size: 20px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  font-weight: 600;
}

.text-d {
  line-height: 18px;
  color: rgba(51, 51, 51, 0.45);
  font-size: 20px;
  font-weight: 600;
}

.group-svg {
  width: 100%;
  height: 100%;
}
</style>