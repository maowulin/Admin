import request from '@/utils/request'
import jq from 'jquery'

export function getUserConfig(_data) {
  return request({
    url: '../userL8/admin_userinfo',
    method: 'get',
    params: _data
  })
}

export function getDetaConfig(_type, _data) {
  return request({
    url: '../game/game_configurationValue',
    method: _type,
    data: _data
  })
}

export function setUserConfig(_data) {
  return request({
    url: '../userL8/update_user',
    method: 'post',
    data: _data,
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

export function getPremis(_url, _type, _data) {
  return request({
    url: _url,
    method: _type,
    params: _data
  })
}

export function getOrder(params) {
  return request({
    url: '../order/orderlist',
    method: 'get',
    params: params
  })
}

export function getOrderInfo(params) {
  return request({
    url: '../order/ordercheck',
    method: 'get',
    params: params
  })
}

export function updateOrder(from) {
  return request({
    url: '../order/delivery_submit',
    method: 'post',
    data: from,
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

export function overOrder(from) {
  return request({
    url: '../order/over_submit',
    method: 'post',
    data: from,
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

export function getCircle(params) {
  return request({
    url: '../postingsL8/postings_list.json',
    method: 'get',
    params: params
  })
}

export function getBallRoom(params) {
  return request({
    url: '../billiardRoomL8/brList.json',
    method: 'get',
    params: params
  })
}

export function gameConfig(params) {
  return request({
    url: '../game/game_configurationValue',
    method: 'get',
    params: params
  })
}

export function gameConfigAdd(data) {
  return request({
    url: '../game/game_configurationValue',
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

export function gameConfigEdit(data) {
  return request({
    url: '../game/game_configurationValue',
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

export function gameConfigDel(data) {
  return request({
    url: '../game/game_configurationValue',
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

export function getBouns(params) {
  return request({
    url: '../userL8/destoonFinanceCash_list.json',
    method: 'get',
    params: params
  })
} 

export function bounsPass(data) {
  return new Promise((resolve, reject) => {
    jq.ajax({
      type: "GET",
      url: "../userL8/destoonFinanceCash.json",
      data: data,
      dataType: "json",
      traditional : true,
      success: function (response) {
        resolve(response)
      },
      error: function (error) {
        reject(error)
      }
    })
  })
}

export function bounsRefuse(data) {
  return new Promise((resolve, reject) => {
    jq.ajax({
      type: "GET",
      url: "../userL8/destoonFinanceCash.json",
      data: data,
      dataType: "json",
      traditional : true,
      success: function (response) {
        resolve(response)
      },
      error: function (error) {
        reject(error)
      }
    })
  })
}

export function getToken() {
  return request({
    url: '../authority/get_token',
    method: 'get'
  })
}
