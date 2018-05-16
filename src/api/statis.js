import request from '@/utils/request'

export function getUserBasied(data) {
	return request({
		url: '../userL8/userL8_baseindicators.json',
		method: 'get',
		params: data
  })
}

export function getUserActivi(data) {
	return request({
		url: '../userL8/userL8_activitydegree.json',
		method: 'get',
		params: data
  })
}

export function getStatis(_url, _type, _data) {
	return request({
		url: _url,
		method: _type,
		params: _data
	})
}

export function getCreateAndJoin(data) {
	return request({
		url: '../userL8/getCrateAndJoin.json',
		method: 'get',
		params: data
	})
}

export function getStatisCvs(_url, _startDate, _stopDate) {
	window.open(_url + "?beginTime=" + _startDate + "&endTime=" + _stopDate)
}

export function getStatisSecCvs(_url, _time) {
	window.open(_url + "?time=" + _time)
}
