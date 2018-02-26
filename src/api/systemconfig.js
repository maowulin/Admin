import request from '@/utils/request'

export function getPremis(params) {
  return request({
    url: '../authority/administrator_list',
    method: 'get',
    params: params
  })
}

export function getManager(params) {
  return request({
    url: '../authority/role_list',
    method: 'get',
    params: params
  })
}

export function getRolesAll() {
  return request({
    url: '../authority/role_all',
    method: 'get'
  })
}

export function getManagerRoles(params) {
  return request({
    url: '../authority/administrator_edit',
    method: 'get',
    params: params
  })
}

export function updateManageconfig(data) {
  return request({
    url: '../authority/role_update',
    method: 'post',
    data: data,
    transformRequest: [data => {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}