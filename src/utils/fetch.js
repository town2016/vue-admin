import axios from 'axios'
import Cookie from 'js-cookie'
import router from '@/router/index'
import {Loading, Message} from 'element-ui'
import {getDataType} from '@/utils/common'
// import qs from 'qs'
const ERROK = 200
const SERVERURL = '/apis'
const token = Cookie.get('token') || 'qr32qw3es2xvsrt@atwerte62f'

let instance = axios.create({
  baseURL: SERVERURL,
  timeout: 10000,
  withCredentials: true
})

instance.interceptors.request.use(config => {
  if (!token) {
    router.replace({name: 'login'})
  } else {
    config.headers.token = token
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  return config
})

instance.interceptors.response.use(function (res) {
  return res
}, (error) => {
  let response = error.response
  if (response.data.code === 401) {
    router.replace({name: 'login'})
  } else if (response.data.code === 403) {
    Message({
      type: 'warning',
      message: response.data.message
    })
  } else {
    Message({
      type: 'warning',
      message: '网络异常请稍后重试'
    })
  }
  return Promise.reject(error)
})

global.fetch = {
  get: (url, params, config) => {
    if (config && config.load) {
      loading()
    }
    if (params) {
      if (getDataType(params) === 'Object') {
        url += (url.indexOf('?') < 0 ? '?' : '&') + setparams(params)
      } else if (getDataType(params) === 'Array') {
        url += params.join('/')
      }
    }
    return new Promise((resolve, reject) => {
      instance.get(url).then((res) => {
        if (res.data.code === ERROK || res.data.status === ERROK) {
          resolve(res.data)
        } else {
          config && (config.cbno && config.cbno())
          Message.error(res.data.message, {
            duration: 3000
          })
        }
      }).catch((e) => {
        console.log(JSON.stringify(e))
        if (config) {
          config.load && desLoad()
          config.cbno && config.cbno()
        }
      })
    })
  },
  post: (url, params, config) => {
    if (config && config.load) {
      loading()
    }
    return new Promise((resolve, reject) => {
      instance.post(url, params).then((res) => {
        if (config && config.load) {
          desLoad()
        }
        if (res.data.code === ERROK || res.data.status === ERROK) {
          resolve(res.data)
        } else {
          if (config) {
            config.cbno && config.cbno(res.data)
          }
          reject(res.data)
          Message.error(res.data.message, {
            duration: 3000
          })
        }
      }).catch((e) => {
        reject(e)
        if (config) {
          config.load && desLoad()
          config.cbno && config.cbno()
        }
      })
    })
  },
  put: (url, params, config) => {
    if (config && config.load) {
      loading()
    }
    return new Promise((resolve, reject) => {
      instance.put(url, params).then((res) => {
        if (config && config.load) {
          desLoad()
        }
        if (res.data.code === ERROK || res.data.status === ERROK) {
          resolve(res.data)
        } else {
          if (config) {
            config.cbno && config.cbno()
          }
          Message.error(res.data.message, {
            duration: 3000
          })
        }
      }).catch((e) => {
        console.log(e)
        if (config) {
          config.load && desLoad()
          config.cbno && config.cbno()
        }
      })
    })
  },
  deletes: (url, params, config) => {
    if (config && config.load) {
      loading()
    }
    if (params) {
      if (getDataType(params) === 'Object') {
        url += (url.indexOf('?') < 0 ? '?' : '&') + setparams(params)
      } else if (getDataType(params) === 'Array') {
        url += params.join('/')
      }
    }
    return new Promise((resolve, reject) => {
      instance.delete(url).then((res) => {
        if (res.data.code === ERROK || res.data.status === ERROK) {
          resolve(res.data)
        } else {
          config && (config.cbno && config.cbno())
          Message.error(res.data.message, {
            duration: 3000
          })
        }
        if (config) {
          config.load && desLoad()
          config.cbno && config.cbno()
        }
      }).catch((e) => {
        console.log(JSON.stringify(e))
        if (config) {
          config.load && desLoad()
          config.cbno && config.cbno()
        }
      })
    })
  }
}

function loading () {
  Loading.service({ fullscreen: true })
}

function desLoad () {
  Loading.service({ fullscreen: true }).close()
}

/**
 * @param {Object} data
 */
function setparams (data) {
  let paramStr = ''
  for (var k in data) {
    var value = data[k] !== undefined ? data[k] : ''
    paramStr += `&${k}=${encodeURIComponent(value)}` // encodeURIComponent   把字符串作为 URI 组件进行编码。
  };
  return paramStr ? paramStr.substring(1) : ''
}
