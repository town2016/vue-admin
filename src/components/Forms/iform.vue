<template>
  <div class="iform">
    <el-form :model='iformData' :validate-on-rule-change='false' :rules="iRules" :ref="formName" :label-width="labelWidth + 'px' "  :inline='inline' :disabled='disabled'>
      <el-row>
        <el-col v-for='(item, index) in iformModel' :span='!item.colSpan?colSpan:item.colSpan' :key='index'>
          <v-formGroup
            v-if='item.group && item.visible !== false'
            :formModel='item.childs'
            :formData='iformData'
            :label='item.label'>
          </v-formGroup>
          <el-form-item  :prop="item.prop" :label="item.label" v-else-if='item.visible !== false' :class='item.classes'>
            <el-input
              class="cusInput"
              v-if=" item.elemType == 'input' "
              :type="item.type"
              v-model="iformData[item.prop]"
              :maxlength = 'item.maxlength'
              :readonly='item.readonly'
              :placeholder="item.placeholder?item.placeholder:'请输入'+item.label"
              @change='item.onChange($event, formModel, formData, index)'
              :style="{width:item.width+'!important'}">
              <template slot="append" v-if="item.slot != undefined ">{{item.slot}}</template>
            </el-input>
            <el-input
              type="textarea"
              v-else-if=" item.elemType == 'textarea' "
              v-model="iformData[item.prop]"
              :maxlength = 'item.maxlength'
              :readonly='item.readonly'
              :placeholder="item.placeholder?item.placeholder:'请输入'+item.label+'......'"
              @change='item.onChange($event, formModel, formData, index)'
              :style="{width:item.width+'!important'}">
            </el-input>
            <el-select
              clearable
              v-else-if=" item.elemType == 'select' "
              v-model="iformData[item.prop]"
              :placeholder="item.placeholder?item.placeholder:'请选择'+item.label"
              @change='item.onChange($event, formModel, formData, index)'
              @focus='item.onFocus($event, formModel, formData, index)'
              :style="{width:item.width+'!important'}">
              <el-option
                v-for=" (option, index) in item.options "
                :key="index"
                :label="option[item.col]"
                :value="option[item.colVal]">
              </el-option>
            </el-select>
            <el-date-picker
              :editable='dateEditable'
              clearable v-else-if=" item.elemType == 'date' "
              v-model="iformData[item.prop]"
              :type="item.type"
              @change='item.onChange($event, formModel, formData, index)'
              :placeholder="item.placeholder?item.placeholder:item.label"
              :style="{width:item.width+'!important'}">
            </el-date-picker>
            <el-checkbox-group
              v-else-if=" item.elemType == 'checkbox' "
              v-model="iformData[item.prop]"
              :placeholder="item.placeholder?item.placeholder:item.label"
              @change='item.onChange($event, formModel, formData, index)'
              :style="{width:item.width+'important'}">
              <el-checkbox
                v-for='(option, oindex) in item.options'
                :label="option[item.colVal]" :key='oindex'>
                {{option[item.col]}}
              </el-checkbox>
            </el-checkbox-group>
            <el-radio-group
              v-else-if=" item.elemType == 'radio' "
              v-model="iformData[item.prop]"
              @change='item.onChange($event, formModel, formData, index)'
              :style="{width:item.width+'important'}">
              <el-radio
                v-for='(option, rindex) in item.options'
                :label="option[item.colVal]" :key='rindex'>
                {{option[item.col]}}
              </el-radio>
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
              :editable='dateEditable'
              clearable
              v-else-if=' item.elemType == "daterange"'
              v-model="iformData[item.prop]"
              @change='item.onChange($event, formModel, formData, index)'
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="item.options"
              :style="{width:item.width+'!important'}">
            </el-date-picker>
            <v-searchTree v-else-if='item.elemType === "searchTree"'
              ref='searchTree'
              :treeData = 'item.options'
              :showCheckbox='false'
              :expandOnClick='false'
              :options='item.props'
              :open='false'
              @click='item.onClick($event, formModel, formData, index)'
              @setCurOrg='_setModel($event, iformData, item.prop)'>
            </v-searchTree>
            <div v-else-if='item.elemType === "temp"' v-html="item.temp(iformData[item.prop])"></div>
            <el-switch
              v-else-if='item.elemType === "switch"'
              v-model="iformData[item.prop]"
              :active-text="item.activeText"
              :inactive-text="item.inactiveText">
            </el-switch>
            <div v-else-if='item.elemType === "div"'>{{!iformData[item.prop]?item.placeholder:iformData[item.prop]}}</div>
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
import formGroup from '@/components/Forms/formGroup'
import searchTree from '@/components/searchTree/searchTree'
export default {
  name: 'iform',
  data () {
    return {
      iformModel: [],
      iformData: {},
      dateEditable: false,
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
        this.$emit('sendFormData', this.iformData)
      },
      deep: true
    },
    formModel: {
      handler (val) {
        this._initRules()
      },
      deep: true
    }
  },
  created () {
    let formData = {}
    this._initRules()
    this.initForm(this.formModel, formData)
  },
  methods: {
    // 初始化验证规则
    _initRules () {
      if (Object.keys(this.rules).length === 0) {
        this.iRules = this.initRules(this.formModel)
      } else {
        this.iRules = this.rules
      }
    },
    initForm (list, formData) {
      list.map(item => {
        if (item.group) {
          this.initForm(item.childs, formData)
        } else {
          if (!this.formData[item.prop]) {
            formData[item.prop] = item.defaultValue !== undefined ? item.defaultValue : ''
          } else {
            formData[item.prop] = this.formData[item.prop]
          }
          if (!item.onChange) {
            item.onChange = () => {}
          }
          if (!item.onFocus) {
            item.onFocus = () => {}
          }
        }
      })
      this.iformData = this.clearObj(Object.assign({}, formData, this.formData))
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
    },
    _setModel ($event, iformData, prop) {
      iformData[prop] = $event[prop]
    }
  },
  components: {
    'v-formGroup': formGroup,
    'v-searchTree': searchTree
  }
}
</script>

<style>
</style>
