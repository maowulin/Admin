import Mock from 'mockjs'
import queryAPI from './query'
import statisAPI from './statis'

//获取用户信息相关
Mock.mock(/..\/userL8\/userL8List.json/, 'post', queryAPI.getUserInfo)

//获取用户详细信息相关
Mock.mock(/..\/userL8\/userL8_details.json/, 'post', queryAPI.getUserDetail)

//获取战队信息相关
Mock.mock(/..\/circleL8\/circleL8List.json/, 'post', queryAPI.getTribeData)

//获取战队详细信息相关
Mock.mock(/..\/circleL8\/circleL8_details.json/, 'post', queryAPI.getTribeDetail)

//获取赛事信息相关
Mock.mock(/..\/competitionL8\/competitionL8list.json/, 'post', queryAPI.getCompeData)

//获取赛事详细信息相关
Mock.mock(/..\/competitionL8\/competitionL8_details.json/, 'post', queryAPI.getCompeDetail)

//举报信息相关
Mock.mock(/..\/wb_and_gfb\/whistleBlowingL8list.json/, 'get', queryAPI.getReportData)

//反馈信息相关
Mock.mock(/..\/wb_and_gfb\/giveFeedbackL8list.json/, 'get', queryAPI.getTickingData)

//日志信息相关
//Mock.mock(/..\/wb_and_gfb\/giveFeedbackL8list.json/, 'get', queryAPI.getTickingData)

//订单信息相关
Mock.mock(/..\/game\/game_past_record.json/, 'get', queryAPI.getFightData)

//用户统计，基础指标
Mock.mock(/..\/userL8\/userL8_baseindicators.json/, 'get', statisAPI.getBasied)

//用户统计，活跃度
Mock.mock(/..\/userL8\/userL8_activitydegree.json/, 'get', statisAPI.getActivi)

//用户统计，存留率
Mock.mock(/..\/userL8\/userL8_retainnum.json/, 'get', statisAPI.getReten)

//战队统计
Mock.mock(/..\/circleL8\/circleL8_indicators.json/, 'get', statisAPI.getTribeData)

//圈数据
Mock.mock(/..\/postingsL8\/postings_exportall.json/, 'get', statisAPI.getInviData)

//圈数据二级页面
Mock.mock(/..\/postingsL8\/postings_circlestatisticinfo.json/, 'get', statisAPI.getInviSecData)