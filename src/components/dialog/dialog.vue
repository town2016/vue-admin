<template>
<div class="cdialog" v-if='visible'>
  <el-dialog :title="title" :visible.sync="dialog.visible" @close='_close' :width='width'>
    <slot name='body'></slot>
    <div slot="footer" class="dialog-footer">
      <div slot='btns' align="center">
        <slot name='dialogBtns'>
          <el-button type='default' size='small' @click='_close'>{{!options.cancelBtn?'取消':options.cancelBtn}}</el-button>
          <el-button type='primary' size='small' @click='options.confirm'>{{!options.sureBtn?'确定':options.sureBtn}}</el-button>
        </slot>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'cdialog',
  data () {
    return {
      dialog: {
        visible: true
      }
    }
  },
  watch: {
    visible: {
      handler (val) {
        this.dialog.visible = val
      },
      deep: true
    }
  },
  created () {},
  props: {
    visible: {
      type: Boolean,
      default () {
        return false
      }
    },
    title: {
      type: String,
      default () {
        return ''
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    width: {
      type: String,
      default () {
        return '50%'
      }
    }
  },
  methods: {
    _close () {
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
