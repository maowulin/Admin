import request from '@/utils/request'

export function login(_name, _password, _code) {
  const formData = new FormData()
  formData.append('username', _name)
  formData.append('password', _password)
  formData.append('code', _code)
  return request({
    url: '../authority/admin_user_login',
    method: 'POST',
    data: formData,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
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
    data: _data
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
