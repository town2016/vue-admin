import iform from '@/components/Forms/iform'
import itable from '@/components/table/itable'
import dtable from '@/components/table/dtable'
import dialog from '@/components/dialog/dialog'
import upload from '@/components/upload/upload'
import title from '@/components/title/title'
import countTo from '@/components/countTos/countTo'
import {storages, deepClone, getDataType, resetObj} from '@/utils/common'
import * as validators from '@/utils/validator'
// import store from '../store/index'
let events = {
  update: null
}
let plugins = {}
plugins.install = (Vue) => {
  Vue.mixin({
    components: {
      iTitle: title,
      iForm: iform,
      iDialog: dialog,
      iTable: itable,
      iDtable: dtable,
      iCountTo: countTo
    }
  })
  Vue.directive('visible', {
    bind (el, binding) {
      let maps = {} // store.state.menu.curMap
      if (!binding.value) {
        setTimeout(() => {
          el.remove()
        }, 17)
        return false
      }
      if (!maps[binding.value]) {
        el.remove()
      }
    }
  })
  Vue.directive('update', {
    bind (el, binding) {
      events.update = new Event('update')
      el.addEventListener('update', () => {
      }, false)
    },
    update (el, binding) {
      el.dispatchEvent(events.update)
    }
  })
  Vue.prototype.cache = () => !storages.check('cache') ? {} : JSON.parse(storages.get('cache'))
  Vue.prototype.dist = () => !storages.check('dist') ? {} : JSON.parse(storages.get('dist'))
  Vue.prototype.clearObj = (obj) => { return deepClone(obj) }
  Vue.prototype.getDataType = (obj) => { return getDataType(obj) }
  Vue.prototype.resetObj = (obj) => { return resetObj(obj) }
  Vue.prototype.initRules = (formModel) => {
    let rules = {}
    function makeValidator (item) {
      if (item.rules !== undefined && item.visible !== false) {
        rules[item.prop] = []
        item.rules && item.rules.map(rule => {
          if (typeof rule === 'function') {
            rules[item.prop].push({validator: rule})
          } else {
            if (rule === 'required') {
              rules[item.prop].push({required: true, message: '此项为必填项'})
            } else {
              rules[item.prop].push({validator: validators[rule + 'Check']})
            }
          }
        })
      }
    }
    if (!formModel.map) {
      throw new Error('请传入数组')
    } else {
      formModel.map(item => {
        if (item.visible !== false) {
          if (item.group) {
            item.childs.map(citem => {
              makeValidator(citem)
            })
          } else {
            makeValidator(item)
          }
        }
      })
    }
    return rules
  }
  Vue.prototype.textareaAuto = (textareas) => {
    textareas.forEach(item => {
      item.style.height = item.scrollHeight + 'px'
      item.addEventListener('input', function () {
        if (item.scrollHeight > 52) {
          item.style.height = item.scrollHeight + 'px'
        }
      }, false)
      item.addEventListener('change', function () {
        if (item.scrollHeight > 52) {
          item.style.height = item.scrollHeight + 'px'
        }
      }, false)
    })
  }
  Vue.prototype.timeFormate = time => {
      if (time.toLocaleDateString) {
          var timeStr = time.toLocaleDateString();
          var timeArr = timeStr.split('/');
          timeArr.map((item,index) =>{
            if(parseInt(item)<10){
              item = "0"+item;
              timeArr[index] = item;
            }
          });
          timeStr = timeArr.join('-');
          return timeStr;
      } else {
          return time;
      }
  }
}

export default plugins
