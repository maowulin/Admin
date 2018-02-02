import { menu } from '@/api/login'
import jq from 'jquery'
// 获取日期
export function getDate() {
  var days = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  var time = new Date()
  var tenAgoTime = new Date(time)
  tenAgoTime.setDate(time.getDate() - 9)

  var year = time.getFullYear()
  var month = time.getMonth() + 1
  var date = time.getDate()
  var day = time.getDay()
  var hour = time.getHours()
  var minutes = time.getMinutes()
  var seconds = time.getSeconds()

  var tenAgoYear = tenAgoTime.getFullYear()
  var tenAgoMonth = tenAgoTime.getMonth() + 1
  var tenAgoDate = tenAgoTime.getDate()
  var tenAgoDay = tenAgoTime.getDay()
  var tenAgoHour = tenAgoTime.getHours()
  var tenAgoMinutes = tenAgoTime.getMinutes()
  var tenAgoSeconds = tenAgoTime.getSeconds()

  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  if (tenAgoMonth < 10) {
    tenAgoMonth = '0' + tenAgoMonth
  }
  if (tenAgoDate < 10) {
    tenAgoDate = '0' + tenAgoDate
  }
  var dateLine = year + '-' + month + '-' + date
  var str = year + '-' + month + '-' + date + ' ' + days[day] + ' ' + hour + ':' + minutes + ':' + seconds
  var tenAgo = tenAgoYear + '-' + tenAgoMonth + '-' + tenAgoDate

  return {
    'dateLine': dateLine,
    'str': str,
    'ten': tenAgo
  }
}

// 获取系统版本
export function getSystem() {
  var browser = {
    versions: (function() {
      var u = navigator.userAgent, app = navigator.appVersion
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
    var ua = navigator.userAgent.toLowerCase()// 获取判断用的对象
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
  var tempArray = []
  for (var j = 0; j < columns.length; j++) {
    for (var i = 0; i < checkedVal.length; i++) {
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
      url: 'http://localhost:8090/adminMenu/getMenu.json',
      data: { 'level': '1', 'menu_parent': 0 },
      dataType: 'json',
      async: false,
      success: function(data) {
        me = data
        for (let i = 0; i < data.length; i++) {
          jq.ajax({
            type: 'GET',
            url: 'http://localhost:8090/adminMenu/getMenu.json',
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
