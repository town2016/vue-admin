<template>
<div class="crumbs">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for='item in crumbs' v-if='item.path' :to="{ path: item.path }" :key='item.path'>{{item.name}}</el-breadcrumb-item>
    <el-breadcrumb-item v-else>{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script>
export default {
  name: 'crumbs',
  data () {
    return {
      crumbs: []
    }
  },
  watch: {
    '$route' (val) {
      this.crumbs = val.meta.crumbs
    }
  },
  created () {}
}
</script>

<style>
.crumbs{
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #fff;
  font-size: 16px;
}
.crumbs .el-breadcrumb__item{
  font-size: 14px;
}
</style>
