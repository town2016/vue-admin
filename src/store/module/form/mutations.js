import {SYNC_FORMMODEL, SYNC_FORMDATA, SET_VALIDATEFORM } from '../Type/mutation_type'
import Vue from 'vue'
const vm = new Vue()
export default {
  [SYNC_FORMDATA] (state, {formData, formName}) {
    vm.$set(state, `${formName}_FormData`, formData)
  },
  [SYNC_FORMMODEL] (state, {formModel, formName}) {
    vm.$set(state, `${formName}_formModel`, formModel)
  },
  [SET_VALIDATEFORM] (state, formList) {
    state.validateForms = formList
  }
}
