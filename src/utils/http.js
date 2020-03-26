const host = global.baseConstant.serverUrl // 本地调试域名

// 对象转化成url上带的参数
let urlEncode = function (param, key, encode) {
  if (param == null) return ''
  let paramStr = ''
  let t = typeof (param)
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
  } else {
    for (let i in param) {
      let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}

// 请求封装
async function request (url, method, data) {
  url = http.filterUrl(url)

  //  参数重组
  if (!data) {
    data = {}
  }
  data = http.rebuildParams(data, url)

  // todo 获取token，先获取本地token，若无则则调接口获取
  // let token = await tokenManager.getclientToken()

  let defaultHeaders = {
    // Authorization: 'Bearer ' + token,
    'content-type': 'application/json', // 默认值
    'accept': 'application/json'
    // 'content-type': 'application/json' // 默认值
  }
  return new Promise((resolve, reject) => {
    // get请求头处理缓存
    if (method === 'get' || method === 'GET') {
      defaultHeaders = Object.assign(defaultHeaders, {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      })
    }

    // DELETE方法改为传参模式
    if (method === 'DELETE') {
      url = url + (url.indexOf('?') === -1 ? '?' : '&') + urlEncode(data).slice(1)
    }

    wx.request({
      url: url, // 仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: defaultHeaders,
      success: function (res) {
        let response = res.data

        let resStr = JSON.stringify(response)

        // todo token过期处理
        // if (resStr.indexOf('invalid_token') !== -1) {
        //   Storage.remove('TOKENINFO')
        //   tokenManager.getclientToken()
        //   reject(response)
        //   console.error('token过期，接口回参：' + resStr)
        // }

        // 异常处理
        if ((!!response && !!response.statusCode && response.statusCode !== 200) || resStr.indexOf('errorCode') !== -1) {
          // console.debug('前端请求路径:' + url)
          // console.error('请求失败，接口回参：' + resStr)
          return reject(response)
        } else {
          // console.debug('前端请求路径:' + url)
          // console.info('请求成功，接口回参：' + resStr)
          return resolve(response)
        }
      },
      fail: function (error) {
        return reject(new Error(error))
      },
      complete: function () {
        // wx.hideLoading();
      }
    })
  })
}

const http = {
  get: async function (url, data) {
    return request(url, 'GET', data)
  },
  post: async function (url, data) {
    return request(url, 'POST', data)
  },
  put: async function (url, data) {
    return request(url, 'PUT', data)
  },
  delete: async function (url, data) {
    return request(url, 'DELETE', data)
  },

  //  请求参数重组
  rebuildParams: function (data, url) {
    try {
      // todo 增加必传数据，如用户信息
      // let company = Storage.get('COMPANYID')
      // data.company = company
      return http.filter(data)
    } catch (e) {
      return data
    }
  },

  // 请求地址过滤
  filterUrl: function (url) {
    if (url.indexOf('http:') !== -1 || url.indexOf('https:') !== -1) {
      return url
    } else {
      return host + url
    }
  },

  // 外层空对象过滤
  filter: function (data) {
    let _data = {}
    for (let i in data) {
      let val = data[i]
      //  过滤不传的字符串
      if (val === null || typeof val === 'undefined') {
        continue
      }
      _data[i] = val
    }
    return _data
  }

}
export default http
