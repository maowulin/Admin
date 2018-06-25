import { menu } from '@/api/login'
import jq from 'jquery'
import { request } from 'https';
// 获取日期
export function getDate(dateAgo) {
  let days = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let time = new Date()
  let agoTime = new Date(time)
  
  if(dateAgo > 0) {
    agoTime.setDate(time.getDate() - (dateAgo-1))
  }

  let agoYear = agoTime.getFullYear()
  let agoMonth = agoTime.getMonth() + 1
  let agoDate = agoTime.getDate()
  let agoDay = agoTime.getDay()
  let agoHour = agoTime.getHours()
  let agoMinutes = agoTime.getMinutes()
  let agoSeconds = agoTime.getSeconds()

  if (agoMonth < 10) {
    agoMonth = '0' + agoMonth
  }

  if (agoDate < 10) {
    agoDate = '0' + agoDate
  }

  if (agoHour < 10) {
    agoHour = '0' + agoHour
  }

  if (agoMinutes < 10) {
    agoMinutes = '0' + agoMinutes
  }

  if (agoSeconds < 10) {
    agoSeconds = '0' + agoSeconds
  }

  if(dateAgo > 0) {
    return agoYear + "-" + agoMonth + "-" + agoDate + " 00:00:00"
  }else {
    return agoYear + "-" + agoMonth + "-" + agoDate + " " + agoHour + ":" + agoMinutes + ":" + agoSeconds
  }

   
}

// 获取系统版本
export function getSystem() {
  let browser = {
    versions: (function() {
      let u = navigator.userAgent, app = navigator.appVersion
      return { // 移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
      }
    }()),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }

  if (browser.versions.mobile) { // 判断是否是移动设备打开。browser代码在下面
    let ua = navigator.userAgent.toLowerCase()// 获取判断用的对象
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return 'weixin'
    } else if (ua.match(/WeiBo/i) == 'weibo') {
      return 'weibo'
    } else if (ua.match(/QQ/i) == 'qq') {
      return 'qq'
    } else if (browser.versions.ios) {
      return 'ios'
    } else if (browser.versions.android) {
      return 'android'
    }
  } else {
	  return 'pc'
  }
}

// 获取选中项
export function getChecked(checkedVal, columns) {
  let tempArray = []
  for (let j = 0; j < columns.length; j++) {
    for (let i = 0; i < checkedVal.length; i++) {
      if (checkedVal[i] === columns[j].label) {
        tempArray.push(columns[j])
      }
    }
  }
  return tempArray
}

// 定时器
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

// 获取menu
export function getMenuMain() {
  return new Promise(function(resolve, reject) {
    menu({ 'level': '1', 'menu_parent': 0 }).then(response => {
      resolve(response)
    }).catch(error => {
      console.log(error)
    })
  })
}

export async function getMenuSec() {
  let me = []
  return new Promise(function(resolve, reject) {
    jq.ajax({
      type: 'GET',
      url: '../adminMenu/getMenu.json',
      data: { 'level': '1', 'menu_parent': 0 },
      dataType: 'json',
      async: false,
      success: function(data) {
        me = data
        for (let i = 0; i < data.length; i++) {
          jq.ajax({
            type: 'GET',
            url: '../adminMenu/getMenu.json',
            data: { 'level': '2', 'menu_parent': data[i].id },
            dataType: 'json',
            async: false,
            success: function(response) {
              me[i].children = response
            }
          })
        }
        resolve(me)
      }
    })
  })
}

export function coputedData(tempData, tempTime) {
  let temp = []
  for(let i = 0; i < 24; i++) {
    let time = (i < 10) ? ('0'+i+':00') : (i+':00')
    if(tempTime.includes(time)) {
      let index = tempTime.findIndex((val, index, arr) => {
        return val === time
      })
      if(tempData[index].create_count !== '') {
        temp[i] = parseInt(tempData[index].create_count)
      }else {
        temp[i] = parseInt(tempData[index].join_count)
      }
      
    }else {
      temp[i] = 0
    }
  }
  return temp
}
