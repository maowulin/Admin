import request from '@/utils/request'
import jq from 'jquery'

// 获取用户信息;
export function getUserInfoData(_data) {
  return request({
    url: '../userL8/userL8List.json',
    method: 'post',
    params: _data
  })
}

// 获取用户详细信息;
export function getUserDetailData(userID) {
  const formData = new FormData()
  formData.append('userID', userID)
  return request({
    url: '../userL8/userL8_details.json',
    method: 'post',
    data: formData
  })
}

export function getOnlineTime(_data) {
  return request({
    url: '../userL8/online_time_list.json',
    method: 'get',
    params: _data
  })
}

// 获取战队信息
export function getTribeData(data) {
  return request({
    url: '../circleL8/circleL8List.json',
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

// 获取战队详细信息
export function getTribeDetail(data) {
  return new Promise((resolve, reject) => {
    jq.ajax({
      type: 'POST',
      url: '../circleL8/circleL8_details.json',
      data: data,
      success: function(response) {
        resolve(response)
      },
      error: function(error) {
        reject(error)
      }
    })
  })
}

// 获取赛事信息
export function getCompeData(data) {
  return request({
    url: '../competitionL8/competitionL8list.json',
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

// 获取赛事信息
export function getCompeDetail(competitionID) {
  return request({
    url: '../competitionL8/competitionL8_details.json',
    method: 'post',
    data: {
      competitionID
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

// 获取举报信息
export function getReportData(data) {
  return request({
    url: '../wb_and_gfb/whistleBlowingL8list.json',
    method: 'get',
    params: data
  })
}

// 获取反馈信息
export function getTickingData(data) {
  return request({
    url: '../wb_and_gfb/giveFeedbackL8list.json',
    method: 'get',
    params: data
  })
}

// 获取日志信息
export function getLogsData(data) {

}

// 获取订单信息
export function getFightData(data) {
  return request({
    url: '../game/game_past_record.json',
    method: 'get',
    params: data
  })
}

export function getUserTimeQuantum(data) {
  return request({
    url: '../userL8/getUserTimeQuantumList.json',
    method: 'get',
    params: data
  })
}

export function getUserDayList(data) {
  return request({
    url: '../userL8/getUserDayQuantumList.json',
    method: 'get',
    params: data
  })
}

export function loginCity() {
  return request({
    url: '../userL8/getUserLoginCity.json',
    method: 'get'
  })
}
