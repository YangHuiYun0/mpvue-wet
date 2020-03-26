/*
 * createTime：2020/3/24
 * author：fujie.wen
 * description: 全局变量、方法
 * use: global.baseConstant.serverUrl
 */

/** 业务常量 **/
global.baseConstant = {
  // signUpTypeCode: 'D_SMP', // 小程序登陆编码
  // appId: 'wxecab1b2e7d4fd145',
  serverUrl: 'https://wxxcx.qishon.com/septxcx/' // 服务地址
}

/** 全局方法 **/

/**
 * @action 小程序toast封装
 * @param title 提示文案
 * @param icon 提示图标
 *  type:String
 *  option:'success','loading','none'
 * @param image 自定义图标的本地路径,优先级高于 icon
 * @returns {Promise<any>}
 * @describe
 *  icon为'none'不显示图标；
 *  显示图标时文案最多7个字；
 * @use global.Toast('提示文案')
 */
global.Toast = function (title, icon = 'none', image = '') {
  return new Promise(function (resolve, reject) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: 3000,
      success: function () {
        resolve()
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}

/**
 * @action 小程序loading封装
 * @param isShow 控制显示or关闭
 * type: Boolean; true显示，false关闭；
 * @param title 文案
 * @param mask
 * @returns {Promise<any>}
 * @use global.showLoading() 显示loading; global.showLoading(false) 关闭loading;
 */
global.showLoading = function (isShow = true, title = '', mask = false) {
  return new Promise(function (resolve, reject) {
    if (isShow) {
      wx.showLoading({
        title: title,
        mask,
        success: function () {
          resolve()
        },
        fail: function (error) {
          reject(error)
        }
      })
    } else {
      wx.hideLoading({
        success: function () {
          resolve()
        },
        fail: function (error) {
          reject(error)
        }
      })
    }
  })
}

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

/**
 * @action 日期装换
 * @param date type: Date or 时间戳
 * @returns {string} 例：2020/03/25 14:00:00
 */
global.formatTime = function (date) {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
