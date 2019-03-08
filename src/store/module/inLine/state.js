export default {
  inLine_FormModel: [
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
      label: '企业规模(人)：',
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
      elemType: 'select',
      label: '公司地址：',
      placeholder: '请选择...',
      prop: 'province',
      colSpan: 5,
      rules: ['required'],
      col: 'dataValue',
      colVal: 'dataCode',
      options: []
    }, {
      elemType: 'select',
      placeholder: '请选择...',
      prop: 'province',
      colSpan:3,
      rules: ['required'],
      labelWidth: '10px',
      col: 'dataValue',
      colVal: 'dataCode',
      options: []
    }, {
      elemType: 'select',
      placeholder: '请选择...',
      prop: 'province',
      colSpan: 3,
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
      colSpan: 7
    }, {
      prop: 'income',
      label: '月收入：',
      placeholder: '请输入月收入',
      elemType: 'input',
      rules: ['required', 'intger'],
      slot: '元',
      classes: 'slot',
      onChange ($event, formModel, formData, index) {
        var rules = formModel[index + 1].rules
        var _index = rules.indexOf('required')
        if ($event > 0) {
          _index < 0 && (formModel[index + 1].rules = rules.concat(['required']))
        } else {
          if (_index > -1) {
            rules.splice(_index, 1)
            formModel[index + 1].rules = rules
          }
        }
      }
    }, {
      prop: 'year',
      label: '入职年限：',
      placeholder: '请输入入职年限',
      elemType: 'input',
      slot: '月',
      rules: ['number'],
      classes: 'slot'
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
      options: [
        {
          dataValue: '有',
          dataCode: true
        }, {
          dataValue: '无',
          dataCode: false
        }
      ]
    }, {
      elemType: 'textarea',
      label: '异常信息',
      colSpan: 18,
      placeholder: '请输入...',
      rules: ['required'],
      prop: 'remark',
      maxlength: 255,
      visible: (formData) => {
        return formData.isMistake
      }
    }
  ],
  inLine_FormData: {}
}
