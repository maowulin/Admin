import request from '@/utils/request'

export function getDetaConfig(_type, _data) {
  return request({
    url: '../game/game_configurationValue',
    method: _type,
    data: _data
  })
}
