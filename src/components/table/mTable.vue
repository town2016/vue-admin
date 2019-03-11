<template>
<div class="mergeTables">
  <v-itable
    :loading='loading'
    :tableModel='tableModel'
    :merge='mergeHandler'
    :tableData='tableData'
    :align='align'
    border>
  </v-itable>
</div>
</template>
<script>
import itable from './itable'
export default {
  name: 'mergeTable',
  data () {
    return {
      mergeCache: {}
    }
  },
  watch: {
    tableData: function (val, oval) {
      this.mergeCache = {}
    }
  },
  methods: {
    mergeHandler ({ row, column, rowIndex, columnIndex }) {
      if (this.merge.indexOf(columnIndex) >= 0) {
        return this.setMergeNum(row, rowIndex, columnIndex)
      }
    },
    setMergeNum (row, rowIndex, colIndex) {
      var merge = 0
      var prop = this.tableModel[colIndex].prop
      var value = row[prop]
      var tabledata = this.clearObj(this.tableData)
      var mergeObj = {}
      if (this.mergeCache[rowIndex + '_' + colIndex] !== undefined) {
        return this.mergeCache[rowIndex + '_' + colIndex]
      }
      for (var i = 0; i < tabledata.length; i++) {
        var item = tabledata[i]
        if (i >= rowIndex) {
          if (item[this.sign] === row[this.sign]) {
            if (item[prop] === value) {
              merge++
            } else {
              mergeObj.rowspan = merge
              mergeObj.colspan = 1
              break
            }
          }
        }
        if (i === tabledata.length - 1) {
          mergeObj.rowspan = merge
          mergeObj.colspan = 1
        }
      }
      if (merge > 0) {
        for (var k = rowIndex; k < tabledata.length; k++) {
          if (k > rowIndex && k < (rowIndex + merge)) {
            this.mergeCache[k + '_' + colIndex] = {
              rowspan: 0,
              colspan: 0
            }
          } else if (k === rowIndex) {
            this.mergeCache[k + '_' + colIndex] = mergeObj
          }
        }
      }
      if (this.mergeCache[rowIndex + '_' + colIndex] === undefined) {
        this.mergeCache[rowIndex + '_' + colIndex] = mergeObj
      }
      return this.mergeCache[rowIndex + '_' + colIndex]
    }
  },
  props: {
    // 需要合并的列
    merge: {
      type: Array,
      default () {
        return []
      }
    },
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    tableModel: {
      type: Array,
      default () {
        return []
      }
    },
    // 以什么参数为合并参照， 比如值合并userId = 1的数据，其他的即使数据相同也不合并
    sign: {
      type: String,
      default () {
        return undefined
      }
    },
    loading: {
      type: Boolean,
      default () {
        return true
      }
    },
    align: {
      type: String,
      default () {
        return ''
      }
    }
  },
  components: {
    'v-itable': itable
  }
}
</script>

<style>
</style>
