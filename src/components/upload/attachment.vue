<template>
<div class="attachment">
  <div class="sub-title">附件上传</div>
  <div class="upload-wrapper">
    <div v-for='(item, index) in defaultCates' :key='index' class="controler">
      <div class="iconbox">
        <input type="file" multiple :name='item.dataCode' @change='_setWaiteList($event, item.datacode, item.datavalue)'/>
        <i class="el-icon-plus"></i>
      </div>
      <div class="category">
        {{item.datavalue}}
      </div>
    </div>
    <div class="controler">
      <div class="iconbox">
        <i class="el-icon-plus"></i>
        <input type="file" multiple @change='_setWaiteList($event, setCategory)'/>
      </div>
      <div class="category">
        <el-select style='width: 150px;' v-model='setCategory' filterable clearable>
          <el-option v-for='(cate, index) in categoryList' :key='index' :value='cate.datacode' :label='cate.datavalue'></el-option>
        </el-select>
      </div>
    </div>
  </div>
  <v-fileList v-if='waiteList.length > 0' :fileList='waiteList' @setDoneList='_getDoneList'></v-fileList>
  <v-views v-if='doneList.length > 0' :doneList='doneList'></v-views>
</div>
</template>

<script>
export default {
  name: 'attachment',
  data () {
    return {
      setCategory: '',
      waiteList: [],
      fileList: {},
      doneList: []
    }
  },
  props: {
    defaultCates: {
      type: Array,
      default () {
        return []
      }
    },
    categoryList: {
      type: Array,
      default () {
        return []
      }
    },
    historyList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    this.doneList = this.historyList
  },
  methods: {
    _setWaiteList ($event, type, name) {
      let files = $event.target.files
      for (var item of files) {
        let data = {
          attachmentTypeCode: type,
          attachmentTypeName: name,
          fileName: item.name,
          attachmentFile: item,
          status: 'await',
          createTime: new Date()
        }
        this.waiteList.push(data)
      }
    },
    // 获取上传成功了的文件
    _getDoneList (file) {
      this.doneList.unshift(file)
    }
  },
  components: {
    'v-fileList': (resolve) => { require(['@/components/upload/fileList'], resolve) },
    'v-views': (resolve) => { require(['@/components/upload/views'], resolve) }
  }
}
</script>

<style scoped lang="less">
@import url("../../../static/css/mixin");
.attachment{
  .controler {
    padding: 0px 10px 10px 10px;
    margin-bottom: 5px;
    margin-right: 5px;
    height: 100px;
    -webkit-user-select: none;
    vertical-align: top;
    box-sizing: border-box;
    border:1px solid #EBEEF5;
    display: inline-block;
    .iconbox{
      position: relative;
      width: 100%;
      overflow: hidden;
      height: 48px;
      text-align: center;
      line-height: 50px;
      font-size: 20px;
      input{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 100;
        .opacity(0)
      }
    }
    .category{
      min-width: 100px;
      font-size: 12px;
      line-height: 40px;
      text-align: center
    }
  }
}
</style>
