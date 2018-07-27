<template>
<div class="views">
  <div class="sub-title clearfix" style="line-height: 32px;">
    附件列表
    <el-button type='primary' size='small' style='float: right;'>批量下载</el-button>
  </div>
  <tn-itable border :tableModel='tableModel' :tableData='tableData' align='center' height='400px'></tn-itable>
</div>
</template>

<script>
import moment from 'moment'
import {downLoadAttachment, deleteAttachment} from 'api/preLoanReview/loanDetail'
export default {
  name: 'views',
  data () {
    return {
      tableModel: [
        {
          type: 'selection',
          width: 50
        }, {
          prop: 'topic',
          label: '附件类别',
          sort: true
        }, {
          prop: 'fileName',
          label: '文件名',
          width: 200
        }, {
          prop: 'uploadBy',
          label: '上传者'
        }, {
          prop: 'uploadDate',
          label: '上传时间',
          sort: true,
          render (h, params) {
            return h('span', {}, !params.row.createTime ? '时间未明确' : moment(new Date(params.row.createTime)).format('YYYY-MM-DD HH:mm:ss'))
          }
        }, {
          label: '操作',
          render: (h, params) => {
            let _div = h('div')
            let _download = h('el-button', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                click: () => {
                  let ids = [params.row.id]
                  this._downLoadAttachment(ids)
                }
              }
            }, '下载')
            let _view = h('el-button', {
              props: {
                type: 'text',
                size: 'small'
              }
            }, '预览')
            let _delete = h('el-button', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                click: () => {
                  this._delete(params.row)
                }
              }
            }, '删除')
            _div.children = [_download, _view, _delete]
            return _div
          }
        }
      ],
      tableData: []
    }
  },
  props: {
    doneList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    this.tableData = this.doneList
  },
  methods: {
    async _delete (row) {
      let params = {
        attachmentId: row.id,
        riskNodeFlag: 10
      }
      let res = deleteAttachment(params)
      console.log(res)
    },
    async _downLoadAttachment (ids) {
      let params = {
        attachmentIds: ids.join(',')
      }
      let res = await downLoadAttachment(params)
      console.log(res)
      if (!res.data) {
        console.log(res)
        this.$message.error(res.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
