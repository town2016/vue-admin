<template>
<div class="taber">
  <div class="icon left" @click='scrollTo(50)'><i class="el-icon-arrow-left"></i></div>
  <div class="icon right" @click='scrollTo(-50)'><i class="el-icon-arrow-right"></i></div>
  <div class="taber-inner">
    <el-tag size="small" @click='goTo(item)'  :type='$route.name !== item.name ? "info" : "" ' v-if='item.name === "home"' v-for='(item, index) in historys' :key='item.name'>{{item.meta.name}}</el-tag>
    <el-tag size="small" @click='goTo(item)' :type='$route.name !== item.name ? "info" : "" ' v-else closable  :key='item.name' @close='close(item, index)'>{{item.meta.name}}</el-tag>
  </div>
</div>
</template>

<script>
export default {
  name: 'taber',
  data () {
    return {
      routerMaps: {},
      historys: []
    }
  },
  watch: {
    '$route' (val) {
      if (!this.routerMaps[val.name]) {
        this.routerMaps[val.name] = val
        this.historys.push(val)
      }
    }
  },
  created () {
    this.routerMaps['home'] = {path: '/', name: 'home', meta: {name: '首页'}}
    this.historys.push({path: '/', name: 'home', meta: {name: '首页'}})
    if (this.$route.name !== 'home') {
      this.routerMaps[this.$route.name] = this.$route
      this.historys.push(this.$route)
    }
  },
  methods: {
    goTo (route) {
      this.$router.push({path: route.path})
    },
    close (item, index) {
      this.historys.splice(index, 1)
      delete this.routerMaps[item.name]
      if (item.name !== this.$route.name) {
        return
      }
      if (this.historys[index]) {
        this.$router.push(this.historys[index].path)
      } else {
        this.$router.push(this.historys[index - 1].path)
      }
    },
    scrollTo (num) {
      var i = 0
      var timer = setInterval(() => {
        i += 1*1
        if (i >= 50) {
          window.clearInterval(timer)
          return
        }
        if (num > 0) {
          document.querySelector('.taber-inner').scrollLeft += 2
        } else {
           document.querySelector('.taber-inner').scrollLeft -= 2
        }
        
      }, 20)
    }
  }
}
</script>

<style>
.taber{
  width: 100%;
  padding: 2px 30px;
  background-color: #fff;
  margin-bottom: 10px;
  box-sizing: border-box;
  position: relative;
  display: block;
}
.taber .taber-inner{
  width: 100%;
  padding: 2px;
  background-color: #F1F1F1;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
}
.taber .taber-inner .el-tag{
  margin: 0 5px;
  cursor: pointer;
}
.taber .icon{
  position: absolute;
  top: 0px;
  width: 30px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
}
.taber .icon.left{
  left: 0;
}
.taber .icon.right{
  right: 0;
}
</style>
