/*
 * createTime：2020/3/24
 * author：fujie.wen
 * description: 登陆模块api
 */

import http from '@/utils/http'

/**
 * 账号密码登录
 * @param config
 * @returns {*}
 */
export const AccountLogin = (config) => {
  return http.get('login/getSingleCode', config)
}
