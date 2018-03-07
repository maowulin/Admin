const basiedColumns = [{
  'label': '日期', // 表头及复选框文字
  'prop': 'time',  // 字段名
  'isDefaultHead': true, // 是否默认显示
  'isChart': false
},
{
  'label': '新增用户总数', // 表头及复选框文字
  'prop': 'add_number',  // 字段名
  'lineColor': '#9d82df',
  'renderColor': '#cfbcfd',
  'isChart': true,
  'defaultShow': true
},{
  'label': '游客转注册用户',
  'prop': 'visitor_convert_register_number',
  'lineColor': '#676fd0',
  'renderColor': '#c2c6fb',
  'isChart': true,
  'defaultShow': false
},{
  'label': '注册用户数',
  'prop': 'register_directly',
  'lineColor': '#377bd0',
  'renderColor': '#aed0fb',
  'isChart': true,
  'defaultShow': false
},{
  'label': '游客用户数',
  'prop': 'visitor_number',
  'lineColor': '#82dedf',
  'renderColor': '#eeffff',
  'isChart': true,
  'defaultShow': false
},{
  'label': '最高在线人数',
  'prop': 'max_online_number',
  'lineColor': '#60e0b1',
  'renderColor': '#d3f5e8',
  'isChart': true,
  'defaultShow': true
},{
  'label': '平均在线人数',
  'prop': 'average_online_number',
  'lineColor': '#70bb5e',
  'renderColor': '#c0e8b6',
  'isChart': true,
  'defaultShow': true
},{
  'label': '日活跃用户数',
  'prop': 'dayActiveNum',
  'lineColor': '#d271d4',
  'renderColor': '#e9b9ea',
  'isChart': true,
  'defaultShow': true
},{
  'label': '周活跃用户数',
  'prop': 'weekActiveNum',
  'lineColor': '#ff0000',
  'renderColor': '#fdcbcb',
  'isChart': true,
  'defaultShow': true
},{
  'label': '月活跃用户数',
  'prop': 'monthActiveNum',
  'lineColor': '#ffcf21',
  'renderColor': '#f5e7b3',
  'isChart': true,
  'defaultShow': true
}]

export {basiedColumns}