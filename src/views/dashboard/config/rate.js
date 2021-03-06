const rateColumns = [{
  'label': '', // 表头及复选框文字
  'prop': 'time',  // 字段名
  'isDefaultHead': true, // 是否默认显示
  'isChart': false
},{
  'label': '次日',
  'prop': 'one_retention_rate',
  'lineColor': '#9d82df',
  'renderColor': '#cfbcfd',
  'isPercent': true,
  'isChart': true,
  'defaultShow': true
},{
  'label': '第2天',
  'prop': 'two_retention_rate',
  'lineColor': '#676fd0',
  'renderColor': '#c2c6fb',
  'isPercent': true,
  'isChart': true,
  'defaultShow': true
},{
  'label': '第3天',
  'prop': 'three_retention_rate',
  'lineColor': '#377bd0',
  'renderColor': '#aed0fb',
  'isPercent': true,
  'isChart': true,
  'defaultShow': true
},{
  'label': '第4天',
  'prop': 'four_retention_rate',
  'lineColor': '#82dedf',
  'renderColor': '#eeffff',
  'isPercent': true,
  'isChart': true,
  'defaultShow': true
},{
  'label': '第5天',
  'prop': 'five_retention_rate',
  'lineColor': '#60e0b1',
  'renderColor': '#d3f5e8',
  'isPercent': true,
  'isChart': true,
  'defaultShow': true
},{
  'label': '第6天',
  'prop': 'six_retention_rate',
  'lineColor': '#70bb5e',
  'renderColor': '#c0e8b6',
  'isPercent': true,
  'isChart': true,
  'defaultShow': true
},{
  'label': '第7天',
  'prop': 'seven_retention_rate',
  'lineColor': '#d271d4',
  'renderColor': '#e9b9ea',
  'isPercent': true,
  'isChart': true,
  'defaultShow': true
},{
  'label': '第15天',
  'prop': 'fifteen_retention_rate',
  'lineColor': '#ff0000',
  'renderColor': '#fdcbcb',
  'isPercent': true,
  'isChart': true,
  'defaultShow': true
},{
  'label': '第30天',
  'prop': 'thirty_retention_rate',
  'lineColor': '#ffcf21',
  'renderColor': '#f5e7b3',
  'isPercent': true,
  'isChart': true,
  'defaultShow': true
}]

export { rateColumns }