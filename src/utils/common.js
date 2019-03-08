export const storages = {
  set (key, value) {
    localStorage.setItem(key, value)
  },
  get (key) {
    return localStorage.getItem(key)
  },
  remove (key) {
    localStorage.removeItem(key)
  },
  check (key) {
    return localStorage.getItem(key) !== null && localStorage.getItem(key) !== undefined && localStorage.getItem(key) !== 'undefined'
  },
  clear () {
    localStorage.clear()
  }
}

export const sessions = {
  set (key, value) {
    sessionStorage.setItem(key, value)
  },
  get (key) {
    return sessionStorage.getItem(key)
  },
  remove (key) {
    sessionStorage.removeItem(key)
  },
  clear () {
    sessionStorage.clear()
  },
  check (key) {
    return sessionStorage.getItem(key) !== null && sessionStorage.getItem(key) !== undefined && sessionStorage.getItem(key) !== 'undefined'
  }
}

// 深度克隆
export function deepClone (obj) {
  let result
  let type = getDataType(obj)
  if (type === 'Object') {
    result = {}
  } else if (type === 'Array') {
    result = []
  } else {
    return obj
  }
  for (var k in obj) {
    var item = obj[k]
    if (getDataType(item) === 'Object' || getDataType(item) === 'Array') {
      result[k] = deepClone(item)
    } else {
      result[k] = item
    }
  }
  return result
}
// 深度替换
export function deepReplace (obj1, obj2, applyId) {
  for (var k in obj1) {
    var item = obj1[k]
    if (getDataType(item) === 'Object' || getDataType(item) === 'Array' || getDataType(item) === 'null') {
      if (obj2[k]) {
        // 判断原有的数据是否为空数组
        if ((getDataType(obj2[k]) === 'Array' && obj2[k].length === 0)) {
          deepReplace(item, item, applyId)
          // 判断原有的数据是否为空对象
        } else if ((getDataType(obj2[k]) === 'Object' && Object.keys(obj2[k]).length === 0)) {
          deepReplace(item, item, applyId)
          // 判断原有的数据为
        } else {
          deepReplace(item, obj2[k], applyId)
        }
      } else if (obj2[k] === null) {
        deepReplace(item, item, applyId)
      }
    } else {
      if (obj2[k]) {
        if (k.includes('Id') || (k.includes('id') && k.length === 2)) {
          if (obj1[k] === obj2[k]) {
            if (k === 'applyId') {
              obj1[k] = applyId
            } else if (k === 'customerId') {
              obj1[k] = obj2[k]
            } else {
              obj1[k] = ''
            }
          } else {
            obj1[k] = obj2[k]
          }
        }
      } else {
        if (k.includes('Id') || (k.includes('id') && k.length === 2)) {
          if (k === 'applyId') {
            obj1[k] = applyId
          } else {
            obj1[k] = ''
          }
        }
      }
    }
  }
}

/**
 * @param {Object} obj
 */
export function getDataType (obj) {
  if (obj === null) {
    return 'null'
  }
  if (obj === undefined) {
    return undefined
  }
  return Object.prototype.toString.call(obj).slice(8, -1)
}

// 删除对象的空属性
export function deleteEmptyAttr (obj) {
  for (var k in obj) {
    if (obj[k] === '') {
      delete obj[k]
    }
  }
  return obj
}

// 置空对象
export function resetObj (obj) {
  let result
  let type = getDataType(obj)
  if (type === 'Object') {
    result = {}
    for (var k in obj) {
      var item = obj[k]
      if (getDataType(obj) === 'Object') {
        result[k] = resetObj(item)
      } else {
        result[k] = ''
      }
    }
  } else if (type === 'Array') {
    result = []
  } else {
    return ''
  }
  return result
}

// 脱敏处理
export function messy (val, sign) {
  if (typeof val !== 'string') {
    val = ''
  }
  if (sign === 'phone') {
    let str1 = val.substr(0, 3)
    let str2 = val.substr(7, val.length - 1)
    val = str1 + '****' + str2
  }
  if (sign === 'idNumber') {
    var str1 = val.substring(0, 2)
    var str2 = val.substring(6, val.length - 1)
    var str3 = str2.substring(0, val.length - 4)
    val = str1 + '****' + str3 + '****'
  }
  return val
}
// 将字符转转换为数字
export function stringToNumber (list, data) {
  list.map(item => {
    data[item] = data[item] ? Number(data[item]) : data[item]
  })
}
