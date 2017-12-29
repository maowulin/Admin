import request from '@/utils/request'

export function getUserBasied(data) {
	return request({
		url: '../userL8/userL8_baseindicators.json',
		method: 'get',
		data: data
  });
}

export function getUserActivi(data) {
	return request({
		url: '../userL8/userL8_activitydegree.json',
		method: 'get',
		data: data
  });
}

export function getStatis(_url, _type, _data) {
	return request({
		url: _url,
		method: _type,
		data: _data
	});
}
