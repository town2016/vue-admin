<template>
  <div class="iform">
    <v-iform  :labelWidth='130' ref='iforms' formName='inLine' v-if='isReady'>
      <div slot='iform-btns'>
        <el-button type='primary' size='small' @click='validate'>提交</el-button>
        <el-button type='default' size='small' @click='_reset("iforms")'>重置</el-button>
      </div>
    </v-iform>
  </div>
</template>

<script>
import iform from './iform'
import { mapGetters } from 'vuex'
export default {
  name: 'iform',
  data () {
    return {
      formName: 'iforms',
      dateEditable: false,
      isReady: false
    }
  },
  watch: {
    inLine_FormData: {
      handler (val) {
        // console.log(val)
      }, deep: true
    },
    validateForms: {
      handler (val) {
        console.log(val)
      }, deep: true
    }
  },
  components: {
    'v-iform': iform
  },
  created () {
    var list = this.clearObj()
    this.inLine_FormModel[2].onChange =  ($event) => {
      console.log($event, this.formName)
    }
    this.isReady = true
  },
  methods: {
    _reset (name) {
      this.$refs[name].resetForm()
    },
    resetForm () {
      this.$refs[this.formName].resetFields()
    },
    validate () {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.iformData)
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'inLine_FormModel',
      'inLine_FormData',
      'validateForms'
    ])
  }
}

</script>

<style>
.el-form-item.slot .el-form-item__content .el-input-group{
  vertical-align: top;
}
</style>
