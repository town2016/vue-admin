export function phoneCheck (rule, val, callback) {
  let reg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
  if (!val) {
    callback()
    return false
  }
  if (!reg.test(val)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

export function emailCheck (rule, val, callback) {
  let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  if (!val) {
    callback()
    return false
  }
  if (!reg.test(val)) {
    callback(new Error('请输入正确邮箱'))
  } else {
    callback()
  }
}

export function idNoCheck (rule, val, callback) {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!reg.test(val)) {
    callback(new Error('请输入正确身份证号'))
  } else {
    callback()
  }
}

export function intgerCheck (rule, val, callback) {
  let reg = /^([1-9]\d*|[0]{1,1})$/
  if (!val) {
    callback()
    return false
  }
  if (!reg.test(val)) {
    callback(new Error('请输入正整数'))
  } else {
    callback()
  }
}

export function numberCheck (rule, val, callback) {
  let reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
  if (!val) {
    callback()
    return false
  }
  if (!reg.test(val)) {
    callback(new Error('请输入大于0的数字'))
  } else {
    callback()
  }
}

export function telCheck (rule, val, callback) {
  let reg = /^((0\d{2,3}-\d{7,8}))$/
  if (!val) {
    callback()
    return false
  }
  if (!reg.test(val)) {
    callback(new Error('请输入正确的带区号固定电话号码'))
  } else {
    callback()
  }
}

export function bNumberCheck (rule, val, callback) {
  let reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/
  if (val !== 0 && !val) {
    callback()
    return false
  }
  if (!reg.test(val)) {
    callback(new Error('请输入大于0的数字'))
  } else {
    callback()
  }
}

export function numScetionCheck (rule, val, callback) {
  let reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
  if (!val) {
    callback()
    return false
  }
  if (!reg.test(val)) {
    callback(new Error('请输入大于0的数字'))
  } else if (val > 999) {
    callback(new Error('请输入小于1000的数字'))
  } else {
    callback()
  }
}
