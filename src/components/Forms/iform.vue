<template>
  <div class="iform">
    <div class="formHeader">
      <slot name='header'></slot>
    </div>
    <el-form :model='iformData' :validate-on-rule-change='false' :rules="!disabled ? iRules : {}" :ref="formName" :label-width="labelWidth + 'px' "  :inline='inline' :disabled='disabled' v-update='formName'>
      <el-row class='clearfix'>
        <el-col v-for='(item, index) in iformModel' :lg='!item.colSpan?colSpan:item.colSpan' :md='!item.mdSpan?8:item.mdSpan' :sm='!item.smSpan?8:item.smSpan' :xs='!item.smSpan?8:item.smSpan'  :key='index'>
          <el-form-item  :prop="item.prop" :label="item.label" v-if='item.visible(iformData, iformModel, index)' :class='item.classes' :label-width='!item.labelWidth ? labelWidth + "px" : item.labelWidth'>
            <el-input
              class="cusInput"
              v-if=" item.elemType == 'input' "
              :type="item.type"
              v-model="iformData[item.prop]"
              :maxlength = 'item.maxlength'
              :readonly='item.readonly'
              :disabled='item.disabled'
              :placeholder="item.placeholder?item.placeholder:'请输入'+item.label"
              @change='item.onChange($event, iformModel, iformData, index)'
              :style="{width:item.width+'!important'}">
              <template slot="append" v-if="item.slot != undefined ">{{item.slot}}</template>
            </el-input>
            <el-input
              type="textarea"
              v-else-if=" item.elemType == 'textarea' "
              v-model="iformData[item.prop]"
              :maxlength = 'item.maxlength'
              :readonly='item.readonly'
              resize='both'
              :placeholder="item.placeholder?item.placeholder:'请输入'+item.label+'......'"
              @change='item.onChange($event, iformModel, iformData, index)'
              :style="{width:item.width+'!important'}">
            </el-input>
            <el-select
              :clearable='item.clearable === false ? false : true'
              v-else-if=" item.elemType == 'select' "
              v-model="iformData[item.prop]"
              :filterable='item.filterable'
              :multiple='item.multiple'
              :placeholder="item.placeholder?item.placeholder:'请选择'+item.label"
              @change='item.onChange($event, iformModel, iformData, index)'
              @focus='item.onFocus($event, iformModel, iformData, index)'
              :style="{width:item.width+'!important'}">
              <el-option
                v-for=" (option, index) in item.options "
                :key="index"
                :disabled="option.disabled"
                :label="option[item.col]"
                :value="option[item.colVal]">
              </el-option>
            </el-select>
            <el-date-picker
              :editable='item.dateEditable'
              clearable v-else-if=" item.elemType == 'date' "
              v-model="iformData[item.prop]"
              :type="item.type"
              @change='item.onChange($event, iformModel, iformData, index)'
              :placeholder="item.placeholder?item.placeholder:item.label"
              :style="{width:item.width+'!important'}">
            </el-date-picker>
            <el-checkbox-group
              v-else-if=" item.elemType == 'checkbox' "
              v-model="iformData[item.prop]"
              :placeholder="item.placeholder?item.placeholder:item.label"
              @change='item.onChange($event, iformModel, iformData, index)'
              :style="{width:item.width+'important'}">
              <el-checkbox
                v-for='(option, oindex) in item.options'
                :label="option[item.colVal]" :key='oindex'>
                {{option[item.col]}}
              </el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group
              v-else-if=" item.elemType == 'checkbox_label' "
              v-model="iformData[item.prop]"
              :placeholder="item.placeholder?item.placeholder:item.label"
              @change='item.onChange($event, iformModel, iformData, index)'
              :style="{width:item.width+'important'}">
              <el-checkbox
                v-for='(option, oindex) in item.options'
                :label="option[item.colVal]+'_' +option[item.col]" :key='oindex'>
                {{option[item.col]}}
              </el-checkbox>
            </el-checkbox-group>
            <el-radio-group
              v-else-if=" item.elemType == 'radio' "
              v-model="iformData[item.prop]"
              size='small'
              @change='item.onChange($event, iformModel, iformData, index)'
              :style="{width:item.width+'important'}">
              <el-radio
                v-for='(option, rindex) in item.options'
                v-if='!item.type'
                :label="option[item.colVal]" :key='rindex'>
                {{option[item.col]}}
              </el-radio>
              <el-radio-button
                v-else
                :label="option[item.colVal]" :key='rindex'>
                {{option[item.col]}}
              </el-radio-button>
            </el-radio-group>
            <el-time-picker
              v-else-if=" item.elemType == 'time' "
              v-model="iformData[item.prop]"
              v-validate='!item.directive?"void":{model: iformData, prop:item.prop, rule: item.directive}'
              :picker-options="{
                selectableRange: item.timeRange
              }"
              placeholder="请选择时间点">
            </el-time-picker>
            <el-date-picker
              :editable='item.dateEditable'
              clearable
              v-else-if=' item.elemType == "daterange"'
              v-model="iformData[item.prop]"
              @change='item.onChange($event, iformModel, iformData, index)'
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="item.options"
              :style="{width:item.width+'!important'}">
            </el-date-picker>
            <div v-else-if='item.elemType === "temp"' v-html="item.temp(iformData[item.prop])"></div>
            <el-switch
              v-else-if='item.elemType === "switch"'
              v-model="iformData[item.prop]"
              :active-text="item.activeText"
              @change='item.onChange($event, formModel, iformData, index)'
              :inactive-text="item.inactiveText">
            </el-switch>
            <div v-else-if='item.elemType === "div"' v-html='item.format ? item.format(iformData, item.prop) : iformData[item.prop]'></div>
          </el-form-item>
        </el-col>
        <div style="float: left;" >
          <el-form-item label-width='20px'>
            <slot name="iform-btns"></slot>
          </el-form-item>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Iform',
  data () {
    return {
      iformModel: this.formModel.length > 0 ? this.formModel : this.$store.state.form[this.formName+'_FormModel'] || [],
      iformData: Object.keys(this.formData).length > 0 ? this.formData : this.$store.state.form[this.formName+'_FormData'],
      iRules: {}
    }
  },
  props: {
    formModel: {
      type: Array,
      default () {
        return []
      }
    },
    formData: {
      type: Object,
      default () {
        return {}
      }
    },
    inline: {
      type: [Boolean, String],
      default () {
        return false
      }
    },
    colSpan: {
      type: Number,
      default () {
        return 6
      }
    },
    rules: {
      type: Object,
      default () {
        return {}
      }
    },
    formName: {
      type: String,
      default () {
        return 'iform'
      }
    },
    labelWidth: {
      type: Number,
      default () {
        return 100
      }
    },
    width: {
      type: String,
      default () {
        return 'auto'
      }
    },
    disabled: {
      type: Boolean,
      default () {
        return false
      }
    },
    autoValidate: {
      type: Boolean,
      default () {
        return false
      }
    },
    isSync: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  watch: {
    formData: {
      handler (val) {
        this.iformData = this.clearObj(this.formData)
      },
      deep: true
    },
    iformData: {
      handler (val) {
        /*
         * 发送表单数据到业务组件中
         */
        this.$emit('$update', this.iformData)
        /*
         * 默认将各自的表单信息同步到vuex中对应的表单formData中
         */
        if (this.isSync) {
          // 调用vuex的mutation同步数据
          this.syncFormData({formData: val, formName: this.formName})
        }
      },
      deep: true
    },
    /*
     * 监听vuex中的form的变化，同步数据到各个表单中
     */
    '$store.state.form': {
      handler (val) {
        this.iformData = val[`${this.formName}_FormData`]
      },
      deep: true
    },
    /*
     * 监听表单模型的变化，重新生成校验规则
     */
    iformModel: {
      handler (val) {
        // 根据表单模型数据的变化
        this._initRules()
      },
      deep: true
    },
    /* validateting: {
      handler (val) {
        !val && this.clearValidate()
      },
      deep: true
    } */
  },
  created () {
    console.log(this.formData)
    this._initRules()
    this.initForm(this.iformModel)
  },
  methods: {
    /*
     * 初始化验证规则
     */
    _initRules () {
      /*
       * 判断是否存在表单验证规则
       */
      if (Object.keys(this.rules).length === 0) {
        this.iRules = this.initRules(this.iformModel)
      } else {
        this.iRules = this.rules
      }
    },
    /*
     * 初始化表单数据
     */
    initForm (list) {
      let formData = {}
      list.map(item => {
        if (item.group) {
          this.initForm(item.childs, formData)
        } else {
          /*
           * 初始化表单数据
           */
          if (!this.iformData[item.prop]) {
            formData[item.prop] = item.defaultValue !== undefined ? item.defaultValue : ''
          } else {
            formData[item.prop] = this.iformData[item.prop]
          }
          /*
           * 给每个表单控件添加change时间
           */
          if (!item.onChange) {
            item.onChange = ($event, formModel, formData, index) => {}
          }
          /*
           * 给每个表单控件添加显示隐藏函数
           */
          if (item.visible === undefined) {
            item.visible = (formData, formModel, index) => { return true }
          }
          /*
           * 给每个表单控件添加focus函数
           */
          if (!item.onFocus) {
            item.onFocus = () => {}
          }
        }
      })
      /*
       * 将初始化的formData和props => formData合并
       */
      this.iformData = this.clearObj(Object.assign({}, formData, this.formData))
      /*
       * 设置表单渲染的模型
       */
      this.$set(this, 'iformModel', list)
      /*
       * 执行表单数据里的初始化change事件
       */
      this.iformModel.map((item, index) => {
        if (item.onChange) {
          if (this.iformData[item.prop]) {
            item.onChange(this.iformData[item.prop], this.iformModel, this.iformData, index)
          }
        }
      })
    },
    /*
     * 重置表单
     */
    resetForm () {
      this.$refs[this.formName].resetFields()
      if (this.$refs[this.formName + 'searchTree']) {
        this.$refs[this.formName + 'searchTree'][0].resetTree()
      }
    },
    /*
     * 手动获取当前表单的数据
     */
    getFormData () {
      return this.iformData
    },
    /*
     * 表单验证
     */
    validate () {
      let status = false
      this.$refs[this.formName].validate((valid) => {
        status = valid
      })
      return status
    },
    /*
     * 清除校验的信息
     */
    clearValidate () {
      this.$refs[this.formName].clearValidate()
    },
    ...mapMutations([
      'syncFormData',
      'setValidateForm'
    ])
  }
}
</script>

<style>
</style>
