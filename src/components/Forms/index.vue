<template>
  <div class="Form-wrapper">
    <h3 class="warn_tips" >温馨提示：表单组件的 formModel 和 formData 支持通过vuex或者props传值两种方式, 建议使用props传值,性能会更好，请务必传入formName</h3>
    <div>
      <div class="title"><slio</div>
      <v-iform :labelWidth='130' ref='iforms' :formData='formData' formName='inLine' v-if='isReady'>
        <iTitle slot='header'><span slot='title'>这是普通表单</span></iTitle>
        <div slot='iform-btns'>
          <el-button type='primary' size='small' @click='validate'>提交</el-button>
          <el-button type='default' size='small' @click='_reset("iforms")'>重置</el-button>
        </div>
      </v-iform>
    </div>
  </div>
</template>

<script>
import iform from './iform'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'iform',
  data () {
    return {
      formName: 'iforms',
      dateEditable: false,
      isReady: false,
      formData: {},
      dynamicFormModel: [
        [
          {
            elemType: 'input',
            prop: 'name',
            label: '姓名'
          },
          {
            elemType: 'input',
            prop: 'age',
            label: '年龄'
          }
        ]
      ]
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
    this.formModel = [
      {
        elemType: 'switch',
        prop: 'isBoss',
        width: '100%',
        label: '工作类型：',
        defaultValue: '',
        activeText: '授薪人士',
        inactiveText: '自雇人士'
      }, {
        elemType: 'select',
        prop: 'componay',
        width: '100%',
        label: '公司是否注册：',
        placeholder: '请选择...',
        rules: ['required'],
        defaultValue: '',
        col: 'dataValue',
        colVal: 'dataCode',
        options: []
      }, {
        elemType: 'input',
        prop: 'zj',
        width: '100%',
        label: '注册资金：',
        rules: ['required', 'intger'],
        placeholder: '请输入注册资金',
        classes: 'slot',
        slot: '元'
      }, {
        elemType: 'date',
        prop: 'debt',
        width: '100%',
        rules: ['required'],
        label: '注册时间：',
        placeholder: '请选择注册时间'
      }
    ]
    /* this.inLine_FormModel[2].onChange =  ($event) => {
      console.log($event, this.formName)
    } */
    // this.syncFormData({formData: this.formData, formName: 'inLine'})
    this.formData = {
      isBoss: false,
      componay: '是',
      zj: 1000,
      debt: new Date()
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
    },
    ...mapMutations([
      'syncFormData'
    ])
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
