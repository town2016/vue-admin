<template>
<div class="title clearfix" :class='name'>
  <h5><slot name='title'></slot></h5>
  <div class="btns"><slot name='btns'></slot></div>
</div>
</template>

<script>
export default {
  name: 'pageTitle',
  props: {
    name: {
      type: String,
      default () {
        return 'normal'
      }
    }
  }
}
</script>

<style scoped lang="less">
.title{
  background-color: #F9F9F9;
  padding: 8px 15px;
  margin-bottom: 10px;
  h5{
    font-size: 14px;
    color: #666666;
    float:left;
    line-height: 32px;
    font-weight: 400;
  }
  .btns{
    float: right;
  }
}
.title.pageTitle{
  font-size: 16px;
  padding: 15px;
}
</style>
