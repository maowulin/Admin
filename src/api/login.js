import request from '@/utils/request'

export function login(_name, _password, _code) {
  return request({
    url: '../authority/admin_user_login',
    method: 'post',
    data: {
      username: _name,
      password: _password,
      code: _code
    },
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

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getOnlineTime(_data) {
  return request({
    url: '../userL8/online_time_list.json',
    method: 'get',
    params: _data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function menu(_data) {
  return request({
    url: 'http://localhost:8090/adminMenu/getMenu.json',
    method: 'get',
    params: _data
  })
}
