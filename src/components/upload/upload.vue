<template>
<div class="upload" style="position: static;" v-loading='loading'>
  <div class="img-wrapper clearfix" v-if='fileType === "img"'>
    <div class="upControler clearfix">
      <input type="file" accept="image/*" :multiple='multiple' ref='fileValue'/>
      <span class="el-icon-plus"></span>
    </div>
    <div class="imgList">
      <ul class="clearfix" @click='viewOrDelete'>
        <li v-for='(item, index) in fileList' :key='index'>
          <img :src="item.src"/>
          <div class="cover">
            <span class="el-icon-zoom-in" name='zoom' :data-index='index'></span>
            <span class="el-icon-delete" name='delete' :data-index='index'></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="file-wrapper" v-if='fileType === "file"'>
    <div class="upControler clearfix" style="float: none;display: inline-block;">
      <input type="file" :multiple='multiple' @change="uploadControl" ref='fileValue'/>
      <el-button type='primary' size='small'>点击上传</el-button>
    </div>
    <div class="file-list">
      <ul @click="viewOrDelete">
        <li v-for='(item, index) in fileList' :key='index'>
          <span class="el-icon-circle-close-outline" :data-index='index' name='delete'></span>
          <div>{{item.name}}</div>
        </li>
      </ul>
    </div>
  </div>
  <p class="error-tips" v-if='status === "fail"'>{{errTips}}</p>
  <el-dialog
    :visible.sync='dialog.visible'
    title='图片预览'
    width='30%'
    :modal='false'>
    <img :src="curFile.src"  width="100%"/>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      dialog: {
        visible: false
      },
      fileList: [],
      curFile: {},
      loading: false,
      errTips: '网络繁忙，稍后再试',
      status: 'success'
    }
  },
  props: {
    fileType: {
      type: String,
      default () {
        return 'file'
      }
    },
    multiple: {
      type: Boolean,
      default () {
        return true
      }
    },
    beforeUpload: {
      type: Function,
      default () {
        return true
      }
    },
    uploadSuccess: {
      type: Function,
      default () {
        return true
      }
    },
    uploadFail: {
      type: Function,
      default () {
        return true
      }
    }
  },
  methods: {
    viewOrDelete ($event) {
      var index = $event.target.dataset.index
      this.curFile = this.fileList[index]
      var srcElement = $event.target.getAttribute('name')
      if (srcElement === 'zoom') {
        this.dialog.visible = true
      } else {
        this.fileList.splice(index, 1)
      }
    },
    uploadControl ($event) {
      let _file = $event.target.files[0]
      const CHECK = this.beforeUpload(_file)
      if (CHECK) {
        this.loading = true
        this.upload()
      }
    },
    upload () {
      var code = Math.floor(Math.random() * 10)
      setTimeout(() => {
        this.loading = false
        if (code === 0) {
          this.uploadSuccess()
        } else {
          this.uploadFail()
          this.$refs.fileValue.value = ''
          this.status = 'fail'
        }
      }, 300)
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../../static/css/mixin");
.upload{
  .img-wrapper{
    .upControler{
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      border:1px dashed #dedede;
    }
  }
  .upControler{
    float:left;
    position:relative;
    .borderRadius(3px);
    input{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
    span{
      font-size: 28px;
      color: #dedede;
      font-weight: 200;
    }
  }
  .imgList{
    margin: 0 0 0 110px;
    ul {
      list-style: none;
      li{
        width: 100px;
        height: 100px;
        float: left;
        position: relative;
        margin:0px 10px 10px 0px;
        border:1px solid #DCDFE6;
        .borderRadius(3px);
        overflow: hidden;
        .cover{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 100px;
          .opacity(0);
          .transition(all .3s linear);
          background-color: rgba(0,0,0,0.6);
          &:hover{
             .opacity(1);
          }
          span{
            .transition(all .3s linear);
            padding: 5px;
            cursor: pointer;
            color: #fff;
          }
          span:hover{
            .transform(scale(1.8))
          }
        }
        img {
          width: 100%;
        }
      }
    }
  }
  .file-list {
    width: 50%;
    li{
      list-style:none;
      div{
        margin: 0 32px 0 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span{
        float: right;
        color: #ff0000;
        padding: 14px 10px;
        cursor: pointer;
      }
    }
  }
  .error-tips{
    color: #FF0000;
  }
}
</style>
