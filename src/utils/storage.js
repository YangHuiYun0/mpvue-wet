/**
 *  小程序本地缓存封装
 * Created by fujie.wen on 2020-03-24.
 */
var STORAGE_EXPIRE_MAP = 'STORAGE_EXPIRE_MAP'

var Storage = {
  /**
   * 获取缓存
   * @param key 键名
   * @returns {Object}
   */
  get: function (key) {
    return wx.getStorageSync(key)
  },
  /**
   * 设置缓存
   * @param key 键名
   * @param object 键值
   * @param expire 有效时长（秒）
   */
  set: function (key, object, expire) {
    if (object !== null && object !== undefined) {
      wx.setStorageSync(key, object)
      if (expire && expire > 0) {
        let expireAt = new Date().getTime() + expire * 1000
        addExpire(key, expireAt)
      }
    }
  },
  /**
   * 移除
   * @param key
   */
  remove: function (key) {
    try {
      wx.removeStorageSync(key)
    } catch (e) {

    }
  },
  /**
   * 清理
   */
  clear: function () {
    wx.clearStorageSync()
  }
}

/**
 * 设置过期
 * @param key
 * @param expireAt
 */
function addExpire (key, expireAt) {
  var map = Storage.get(STORAGE_EXPIRE_MAP) || {}
  map[key] = expireAt
  Storage.set(STORAGE_EXPIRE_MAP, map)
}

/**
 * 清理过期
 */
function clearExpire () {
  var map = Storage.get(STORAGE_EXPIRE_MAP) || {}
  var now = new Date().getTime()
  for (let key in map) {
    if (map[key] * 1 < now) {
      Storage.remove(key)
      delete map[key]
    }
  }
  Storage.set(STORAGE_EXPIRE_MAP, map)
}

/**
 * 过期轮询
 */
setInterval(function () {
  clearExpire()
}, 60000)

export default Storage
