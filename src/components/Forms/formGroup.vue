<template>
<div class="formGroup">
  <el-col v-for="(item,index) in formModel" :span='item.colSpan' :key='index'>
    <el-form-item
      class="group-item"
      :prop="item.prop"
      :label=" index == 0?label:''"
      :label-width='item.labelWidth'
      style='{marginLeft: index ==0?"0px":"10px", width:"100%"}'
      :class="{noLabel:index>0}" >
      <el-input
        class="cusInput"
        v-if=" item.elemType == 'input' "
        :type="item.type"
        v-model="iformData[item.prop]"
        :maxlength = 'item.maxlength'
        :readonly='item.readonly'
        :placeholder="item.placeholder?item.placeholder:item.label"
        @change='item.onChange($event, formModel, iformData, index)'
        :style="{width:item.width+'!important'}">
        <template slot="append" v-if="item.slot != undefined ">{{item.slot}}</template>
      </el-input>
      <el-input
        type="textarea"
        v-else-if=" item.elemType == 'textarea' "
        v-model="iformData[item.prop]"
        :maxlength = 'item.maxlength'
        :readonly='item.readonly'
        :placeholder="item.placeholder?item.placeholder:item.label"
        @change='item.onChange($event, formModel, iformData, index)'
        :style="{width:item.width+'!important'}">
        </el-input>
      <el-select
        clearable
        v-else-if=" item.elemType == 'select' "
        v-model="iformData[item.prop]"
        :placeholder="item.placeholder?item.placeholder:item.label"
        @change='item.onChange($event, formModel, iformData, index)'
        @focus='item.onFocus($event, formModel, iformData, index)'
        :style="{width:item.width+'!important'}">
        <el-option
          v-for=" option in item.options "
          :key="option[item.colVal]"
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
        @change='item.onChange($event, iformModel, iformData, index)'
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
        @change='item.onChange($event, formModel, iformData, index)'
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
        @change='item.onChange($event, formModel, iformData, index)'
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="item.options"
        :style="{width:item.width+'!important'}">
      </el-date-picker>
      <div v-else>{{item.placeholder}}</div>
    </el-form-item>
  </el-col>
</div>
</template>

<script>
export default {
  name: 'formGroup',
  data () {
    return {
      dateEditable: false,
      iformData: {}
    }
  },
  created () {
    this.iformData = this.formData
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
    label: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.formGroup {
  .group-item {
    display: inline-block;
    vertical-align: top;
    width: 100%;
  }
  .noLabel {
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .append{
    margin: 0 10px;
  }
}
</style>
