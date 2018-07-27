<template>
  <div class="searchTree">
    <div class="search-wrapper">
      <el-input @input='_search' ref='query' placeholder='请输入......' v-model='query' @blur='_blur' @focus='_focus'>
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-tree
      v-show='isOpen'
      ref='tree'
      :data="tree"
      :show-checkbox='showCheckbox'
      :node-key='nodeKey'
      @node-click='_getNode'
      @check='_onChange'
      :check-on-click-node='false'
      :expand-on-click-node='expandOnClick'
      :filter-node-method='treeFilters'
      :default-expanded-keys="openList"
      :default-checked-keys="checkedList"
      :props="options">
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'searchTree',
  data () {
    return {
      query: '',
      tree: [],
      openList: [],
      checkedList: [],
      treeMap: {},
      isOpen: false,
      isReady: false
    }
  },
  props: {
    treeData: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    open: {
      type: Boolean,
      default () {
        return true
      }
    },
    curNode: {
      type: String,
      default () {
        return ''
      }
    },
    model: {
      type: String,
      default () {
        return 'multiple'
      }
    },
    showCheckbox: {
      type: Boolean,
      default () {
        return true
      }
    },
    expandOnClick: {
      type: Boolean,
      default () {
        return true
      }
    },
    nodeKey: {
      type: String,
      default () {
        return 'orgId'
      }
    }
  },
  watch: {
    treeData (val) {
      this._setOpen(val)
      this.tree = this.clearObj(val)
      this._getTreeMap(val, '')
    },
    curNode (val) {
      this.checkedList.push(val)
    },
    checkedList (val) {
      this.$emit('update:curNode', val.id)
    }
  },
  created () {
    this._setOpen(this.treeData)
    this.tree = this.clearObj(this.treeData)
    this.isOpen = this.open
    this._getTreeMap(this.tree, '')
  },
  methods: {
    _getTreeMap (list, pid) {
      list.map(item => {
        this.treeMap[item[this.nodeKey]] = {
          pid: pid,
          body: item
        }
        if (item.children) {
          this._getTreeMap(item.children, item.orgId)
        }
      })
    },
    treeFilters (value, data, node) {
      if (data[this.options.label].includes(this.query)) {
        return true
      } else {
        return false
      }
    },
    _search () {
      this.$refs.tree.filter()
    },
    getChecked () {
      return this.checkedList
    },
    _setOpen (list) {
      if (list.length > 0) {
        list.map(item => {
          this.openList.push(item[this.nodeKey])
          if (item.children !== undefined) {
            this._setOpen(item.children)
          }
        })
      }
    },
    setChecked (list) {
      this.$refs.tree.setCheckedNodes(list)
    },
    _onChange ($event) {
      this.checkedList = this.$refs.tree.getCheckedNodes(true)
      this.$emit('on-change', this.checkedList)
    },
    _getFullPath (curNode) {
      let fullPath = []
      let that = this
      getParent(curNode)
      function getParent (curNode) {
        var pid = curNode.parentId
        if (pid === 0) {
          fullPath.unshift(curNode)
        } else {
          fullPath.unshift(curNode)
          getParent(that.treeMap[pid].body)
        }
      }
      this.$emit('getFullPath', fullPath)
    },
    _blur () {
      if (this.open) {
        return false
      } else {
        setTimeout(() => {
          this.isOpen = false
        }, 200)
      }
    },
    _focus () {
      if (this.open) {
        return false
      } else {
        this.isOpen = true
      }
    },
    _getNode (org, node, component) {
      this.query = org.orgName
      if (!this.open) {
        this.isOpen = false
      }
      this.$emit('setCurOrg', org)
      this._getFullPath(org)
    },
    setDefault (id) {
      const pid = this.treeMap[id].pid
      if (!this.treeMap[pid]) {
        this.query = '无上级组织'
      } else {
        this.checkedList = [this.treeMap[pid].body]
        this.query = this.treeMap[pid].body.orgName
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../../static/css/mixin");
.searchTree{
  height: 100%;
  position:relative;
  .search-wrapper{}
  .el-tree{
    .borderRadius(5px);
    .boxShadow(0 2px 12px 0 rgba(0,0,0,.1));
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 200px;
    overflow: auto;
    z-index: 1000;
  }
}
</style>
