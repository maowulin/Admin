import request from '@/utils/request'

export function getDetaConfig(_type, _data) {
  return request({
    url: '../game/game_configurationValue',
    method: _type,
    data: _data
  })
}

export function getBounds(_url, _type, _data) {
  return request({
    url: _url,
    method: _type,
    data: _data
  })
}

export function getPremis(_url, _type, _data) {
  return request({
    url: _url,
    method: _type,
    data: _data
  })
}
