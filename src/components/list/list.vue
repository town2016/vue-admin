<template>
<div class="list">
  <tn-iform
    :formModel='forms.formModel'
    :formData = 'forms.formData'
    :colSpan='forms.colSpan'
    ref='searchForm'
    :labelWidth='120'
    :rules='forms.rules'
    @sendFormData='_getFormData($event)'
    @submit='getList($event)'>
    <div slot='iform-btns'>
      <el-button type='primary' size='small' @click='query("searchForm")'>查询</el-button>
      <el-button type='default' size='small' @click='_reset("searchForm")'>重置</el-button>
    </div>
  </tn-iform>
  <slot class="list-btns" name='listBtns'></slot>
  <br>
  <tn-itable
    :loading='loading'
    border
    ref='listTable'
    @selectionChange='_getSelection'
    :align='tables.align'
    :tableModel='tables.tableModel'
    :tableData='tables.tableData'>
  </tn-itable>
  <br>
  <div class="pager" align="center" v-if='pageto'> <!--v-if='tables.data && tables.data.total'-->
    <span
      class="el-icon-refresh"
      :class='{"ani-rotate": isRefresh}'
      @click='query'>
    </span>
    <el-pagination
      class='pager-control'
      @size-change="_sizeChange"
      @current-change="_currentChange"
      :current-page="pager.pageNum"
      :page-sizes="pager.sizes"
      :page-size="pager.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="pager.total">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      pager: {
        pageNum: 1,
        pageSize: 10,
        sizes: [10, 20, 30, 40],
        total: 0
      },
      loading: false,
      isRefresh: false
    }
  },
  props: {
    tables: {
      type: Object,
      default () {
        return {}
      }
    },
    forms: {
      type: Object,
      default () {
        return {}
      }
    },
    pageto: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  created () {},
  watch: {
    'tables': {
      handler (val) {
        if (this.pageto) {
          this.pager.total = val.data.total
        }
        this.$nextTick(() => {
          this.timeOut()
        })
      },
      deep: true
    }
  },
  methods: {
    _reset (name) {
      this.$refs[name].resetForm()
    },
    _validate (name) {
      this.$refs[name].validate()
    },
    search () {
      this._validate('searchForm')
    },
    query () {
      this.pager.pageNum = 1
      this._validate('searchForm')
    },
    getList (formData) {
      if (this.isRefresh) {
        return
      }
      this.isRefresh = true
      this.loading = true
      let query = {
        ...formData
      }
      if (this.pageto) {
        query.pageNum = this.pager.pageNum
        query.pageSize = this.pager.pageSize
      }
      this.$emit('refreshData', query)
      setTimeout(() => {
        this.timeOut()
      }, 3000)
    },
    timeOut () {
      setTimeout(() => {
        this.loading = false
        this.isRefresh = false
      }, 200)
    },
    _sizeChange (s) {
      this.pager.pageSize = s
      this.search(this.forms.formData)
    },
    _currentChange (p) {
      this.pager.pageNum = p
      this.search()
    },
    _getSelection (selections) {
      this.$emit('selections', selections)
    },
    // 默认选中
    selectetionDefault (cols) {
      this.$nextTick(() => {
        this.$refs.listTable.setSelect(cols)
      })
    },
    // 获取form表单的值
    _getFormData (formData) {
      this.$emit('setQuery', formData)
    }
  }
}
</script>

<style  lang="less">
.pager{
  span{
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }
  .pager-control{
    display: inline-block;
    vertical-align: middle;
  }
  .el-input__icon{
    line-height: 1;
  }
}
</style>
