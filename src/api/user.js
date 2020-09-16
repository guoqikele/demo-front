// 进行远程调用
import axios from '@/utils/axios'
// 包装param参数
import qs from 'qs'

import base from '@/utils/base'

// 登录
export function requestLogin (params) {
  return axios({
    url: `${base.url}/sys/user/login`,
    method: 'post',
    data: params
  })
}

// 获取用户详情
export function requestUserDetail (params) {
  return axios({
    url: `${base.url}/sys/user/login/${params}`,
    method: 'get'
  })
}

// 创建用户
export function requestCreate (params) {
  return axios({
    url: `${base.url}/sys/user`,
    method: 'post',
    data: params
  })
}

// 分页查询
export function requestUserPage (params) {
  return axios({
    url: `${base.url}/sys/user/page`,
    method: 'post',
    data: qs.stringify(params)
  })
}

// 更新用户
export function requestUpdateUser (params) {
  return axios({
    url: `${base.url}/sys/user`,
    method: 'put',
    data: params
  })
}

// 更新用户
export function requestUpdateUserStatus (params) {
  return axios({
    url: `${base.url}/sys/user/change/status/${params}`,
    method: 'put',
    data: params
  })
}

// 退出登录
export function requestLogout (params) {
  return axios({
    url: `${base.url}/sys/user/logout/${params}`,
    method: 'post'
  })
}

// 新增用户权限
export function requestAddPerm (params) {
  return axios({
    url: `${base.url}/sys/user/add_perms/${params}`,
    method: 'post'
  })
}

// 查询当前登录用户菜单
export function requestUserOfMenus () {
  return axios({
    url: `${base.url}/sys/user/menus`,
    method: 'get'
  })
}
