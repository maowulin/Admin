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
    url: '../authority/administrator_update',
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
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function addManageconfig(data) {
  return request({
    url: '../authority/administrator_save',
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
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function delManageconfig(data) {
  return request({
    url: '../authority/administrator_del',
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
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function getRolerInfo(params) {
  return request({
    url: '../authority/role_edit',
    method: 'get',
    params: params
  })
} 

export function addRoler(data) {
  return request({
    url: '../authority/role_save',
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
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function updateRoler(data) {
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
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function delRoler(data) {
  return request({
    url: '../authority/role_del',
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
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function getVersion(params) {
  return request({
    url: '../version/version_list',
    method: 'get',
    params: params
  })
}

export function getVersionEdit(params) {
  return request({
    url: '../version/version_edit',
    method: 'get',
    params: params
  })
}

export function versionUpdate(data, callback1, callback2) {
  return new Promise((reslove, reject) => {
    let xhr = new XMLHttpRequest()
    let formData = new FormData()
    console.log(data)
    formData.append("type", data.type)
		formData.append("minimumVersion", data.minimumVersion)
		formData.append("version", data.version)
    formData.append("updateContent", data.updateContent)
    
    if(data.file == ''){
			data.file = null
    }

		formData.append("file", data.file)
    formData.append("id", data.id)
    
		xhr.open('POST', '../version/version_update', true)
		xhr.onload = (response) => {
			reslove(response)
    }
    xhr.onerror = (error) => {
      reject(error)
    }
		//上传进度条实现方法
		xhr.upload.onprogress = (progressEvent) => {
      callback2(progressEvent)
    }
		//传开始执行方法
		xhr.upload.onloadstart = (e) => {
			callback1('开始')
		}
		xhr.send(formData)

  })
}

export function versionSubmit(data, callback1, callback2) {
  return new Promise((reslove, reject) => {
    let xhr = new XMLHttpRequest()
    let formData = new FormData()
    console.log(data)
    formData.append("type", data.type)
		formData.append("minVersion", data.minVersion)
		formData.append("maxVersion", data.maxVersion)
    formData.append("desc", data.desc)
    
    if(data.file == ''){
			data.file = null
    }

		formData.append("file", data.file)
    formData.append("token", data.token)
    
		xhr.open('POST', '../version/version_submit', true)
		xhr.onload = response => {
			reslove(response)
    }
    xhr.onerror = error => {
      reject(error)
    }
		//上传进度条实现方法
		xhr.upload.onprogress = progressEvent => {
      callback2(progressEvent)
    }
		//传开始执行方法
		xhr.upload.onloadstart = e => {
			callback1('开始')
		}
		xhr.send(formData)

  })
}

export function getBanner(params) {
  return request({
    url: '../banner/banner_list.json',
    method: 'get',
    params: params
  })
}

export function addBanner(data) {
  return request({
    url: '../banner/banner_save.json',
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
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function delBanner(data) {
  return request({
    url: '../banner/banner_del.json',
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
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function imgUpload(data){
  return request({
    url: '../circleL8/upload_image',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data;'
    }
  })
}