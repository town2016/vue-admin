<template>
  <div class="iform">
    <v-iform :formModel='formModel' :formData='formData' :labelWidth='130' ref='iforms'>
      <div slot='iform-btns'>
        <el-button type='primary' size='small'>提交</el-button>
        <el-button type='default' size='small' @click='_reset("iforms")'>重置</el-button>
      </div>
    </v-iform>
  </div>
</template>

<script>
import iform from './iform'
const formModel = [
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
    visible: true,
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
    visible: true,
    classes: 'slot',
    slot: '元'
  }, {
    elemType: 'date',
    prop: 'debt',
    width: '100%',
    rules: ['required'],
    label: '注册时间：',
    placeholder: '请选择注册时间',
    visible: true
  }, {
    elemType: 'input',
    prop: 'liveWith',
    width: '100%',
    rules: ['required'],
    label: '公司名称：',
    maxlength: 50,
    placeholder: '请输入公司名称'
  }, {
    elemType: 'select',
    prop: 'houseType',
    width: '100%',
    label: '法人类型：',
    rules: ['required'],
    placeholder: '请选择法人类型',
    col: 'dataValue',
    colVal: 'dataCode',
    options: []
  }, {
    prop: 'modular',
    label: '企业规模（人）',
    width: '100%',
    rules: ['required'],
    placeholder: '请选择企业规模',
    elemType: 'select',
    col: 'dataValue',
    colVal: 'dataCode',
    options: []
  }, {
    prop: 'liveMonth',
    label: '客户占股比例：',
    placeholder: '请输入客户占股比例',
    elemType: 'input',
    rules: ['required', 'number'],
    slot: '%',
    classes: 'slot'
  }, {
    elemType: 'select',
    label: '公司性质：',
    placeholder: '请选择公司性质',
    width: '100%',
    prop: 'xz',
    rules: ['required'],
    col: 'dataValue',
    colVal: 'dataCode',
    options: []
  }, {
    elemType: 'select',
    label: '客户行业分类:',
    width: '100%',
    rules: ['required'],
    placeholder: '请选择客户行业分类',
    prop: 'type',
    col: 'dataValue',
    colVal: 'dataCode',
    options: []
  }, {
    elemType: 'input',
    label: '岗位职务：',
    maxlength: 5,
    placeholder: '请输入职务',
    prop: 'zw'
  }, {
    elemType: 'input',
    label: '公司电话',
    rules: ['tel'],
    placeholder: '请输入公司电话',
    prop: 'telphone'
  }, {
    prop: 'income',
    label: '月收入：',
    placeholder: '请输入月收入',
    elemType: 'input',
    rules: ['required', 'intger'],
    slot: '元',
    classes: 'slot'
  }, {
    prop: 'year',
    label: '入职年限：',
    placeholder: '请输入入职年限',
    elemType: 'input',
    slot: '月',
    rules: ['number'],
    classes: 'slot'
  }, {
    group: true,
    prop: '',
    label: '公司地址：',
    colSpan: 12,
    childs: [
      {
        elemType: 'select',
        placeholder: '请选择...',
        prop: 'province',
        colSpan: 8,
        rules: ['required'],
        col: 'dataValue',
        colVal: 'dataCode',
        options: []
      }, {
        elemType: 'select',
        placeholder: '请选择...',
        prop: 'province',
        colSpan: 4,
        rules: ['required'],
        labelWidth: '10px',
        col: 'dataValue',
        colVal: 'dataCode',
        options: []
      }, {
        elemType: 'select',
        placeholder: '请选择...',
        prop: 'province',
        colSpan: 4,
        rules: ['required'],
        labelWidth: '10px',
        col: 'dataValue',
        colVal: 'dataCode',
        options: []
      }, {
        elemType: 'input',
        placeholder: '请输入具体地址',
        maxlength: 100,
        prop: 'address',
        rules: ['required'],
        labelWidth: '10px',
        colSpan: 8
      }
    ]
  }, {
    elemType: 'select',
    label: '有无异常：',
    placeholder: '请选择...',
    defaultValue: '',
    width: '100%',
    rules: ['required'],
    prop: 'isMistake',
    col: 'dataValue',
    colVal: 'dataCode',
    options: []
  }, {
    elemType: 'textarea',
    label: '异常信息',
    colSpan: 18,
    placeholder: '请输入...',
    rules: ['required'],
    prop: 'remark',
    maxlength: 255,
    visible: false
  }
]
export default {
  name: 'iform',
  data () {
    return {
      formModel: formModel,
      formData: {},
      dateEditable: false
    }
  },
  components: {
    'v-iform': iform
  },
  created () {
    this.initForm()
  },
  methods: {
     _reset (name) {
      this.$refs[name].resetForm()
    },
    initForm () {
      let formData = {}
      this.formModel.map(item => {
        if (!this.formData[item.prop]) {
          formData[item.prop] = item.defaultValue
        } else {
          formData[item.prop] = this.formData[item.prop]
        }
        if (!item.onChange) {
          item.onChange = () => {}
        }
        if (!item.onFocus) {
          item.onFocus = () => {}
        }
      })
      this.iformData = formData
      this.$set(this, 'iformModel', this.formModel)
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
  }
}

</script>

<style>
.el-form-item.slot .el-form-item__content .el-input-group{
  vertical-align: top;
}
</style>
