<template>
<div class="fileList">
  <ul>
    <li v-for='(item, index) in fileList' :key='index'>
      <span class="cate">{{item.attachmentTypeName}}</span>
      <span class="file-name">{{item.fileName}}</span>
      <div class="progress" :class='{success: item.status === "success", stopAnt: item.status === "done"}'>
        <div class="progress-scroller"></div>
      </div>
      <span class="desc" :class='{success: item.status === "success", stopAnt: item.status === "done"}'>{{item.desc}}</span>
      <div class="delete" v-if='item.status==="done"' @click='_delete(index)'>
        <i class="el-icon-close delete"></i>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'fileList',
  data () {
    return {
      status: 'await',
      doneList: []
    }
  },
  props: {
    fileList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    this.upload()
  },
  watch: {
    fileList () {
      if (this.status === 'await') {
        this.upload()
      }
    }
  },
  methods: {
    upload () {
      let that = this
      loopUpload(0)
      async function loopUpload (i) {
        let item = that.fileList[i]
        if (!item) {
          return
        }
        if (item.status === 'success' || item.status === 'done') {
          i++
          loopUpload(i)
          return
        }
        let fd = new FormData()
        let params = {
          attachmentFile: item.attachmentFile,
          applyId: '99184066',
          riskNodeFlag: 10,
          attachmentTypeCode: item.attachmentTypeCode,
          attachmentTypeName: item.attachmentTypeName
        }
        for (var k in params) {
          fd.append(k, params[k])
        }
        let config = {
          cbno: (res) => {
            item.status = 'done'
            item.desc = res.message
            i++
            loopUpload(i)
          }
        }
        item.status = 'loading'
        let res = await fetch.post('/risk/attachment/uploadRiskAttachment', fd, config)
        if (res.code !== 200) {
          item.status = res.message
        } else {
          item.status = 'success'
          item.desc = '上传成功'
          that.$emit('setDoneList', item)
        }
        i++
        loopUpload(i)
      }
    },
    _delete (index) {
      this.fileList.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="less">
@import url("../../../static/css/mixin.less");
.fileList{
  margin: 10px 0;
  padding: 0 10px;
  border: 1px dashed #409EFF;
  li{
    background-color:#f5f7fa;
    line-height: 30px;
    margin: 5px 0;
    padding: 0 10px;
    font-size: 12px;
    .cate, .file-name,{
      display: inline-block;
      vertical-align: top;
    }
    .cate, .file-name{
       width: 120px;
       padding-right: 10px;
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
    }
    .delete{
      float: right;
      height: 100%;
      padding: 0 10px;
      cursor: pointer;
      line-height: 30px;
      color: #FF0000;
      font-weight: 600;
      .opacity(0);
      .transition(all .3s linear)
    }
    &:hover{
      .delete{
        .opacity(1)
      }
    }
  }
  .progress{
    display: inline-block;
    width: 150px;
    height: 8px;
    margin-right: 15px;
    border-radius: 4px;
    background-color: #DDDDDD;
    overflow:hidden;
    .progress-scroller{
      width: 100%;
      height: 100%;
      background-color: #67c23a;
      border-radius: 4px;
      animation: slider 2s linear infinite;
      -webkit-animation: slider 2s linear infinite;
      -moz-animation: slider 2s linear infinite;
    }
    @-webkit-keyframes slider{
      0%{
        .transform(translate3d(-100%, 0, 0));
      }
      100%{
        .transform(translate3d(100%, 0, 0));
      }
    }
    @-ms-keyframes slider{
      0%{
        .transform(translate3d(-100%, 0, 0));
      }
      100%{
        .transform(translate3d(100%, 0, 0));
      }
    }
    @-moz-keyframes slider{
      0%{
        .transform(translate3d(-100%, 0, 0));
      }
      100%{
        .transform(translate3d(100%, 0, 0));
      }
    }
  }
  .progress.stopAnt{
    .progress-scroller{
      animation: none;
      -webkit-animation: none;
      -moz-animation: none;
      background-color: #f56c6c;
    }
  }
  .progress.success{
    .progress-scroller{
      animation: none;
      -webkit-animation: none;
      -moz-animation: none;
    }
  }
  .desc.success{
    color: #67c23a;
  }
  .desc.stopAnt{
    color: #f56c6c;
  }
}
</style>
