const createColumns = [{
  'label': '日期', // 表头及复选框文字
  'prop': 'time',  // 字段名
  'isDefaultHead': true, // 是否默认显示
  'isChart': false
},
{
  'label': '创建房间总数  ', // 表头及复选框文字
  'prop': 'create_room_total',  // 字段名
  'isDefaultHead': true, // 是否默认显示
  'lineColor': '#da0b0b',
  'renderColor': '#f7a5a5',
  'isChart': true,
  'defaultShow': true
},{
  'label': '创建奖金赛房间数',
  'prop': 'create_bonus_num',
  'lineColor': '#e4aa04',
  'renderColor': '#f1dca1',
  'isChart': true,
  'defaultShow': true
},{
  'label': '创建金币赛房间数（中式黑8）',
  'prop': 'create_gold_black8_num',
  'lineColor': '#98bd06',
  'renderColor': '#ebfbcb',
  'isChart': true,
  'defaultShow': true
},{
  'label': '创建金币赛房间数（23分）',
  'prop': 'create_gold_score23_num',
  'lineColor': '#4aab23',
  'renderColor': '#a6f188',
  'isChart': true,
  'defaultShow': true
},{
  'label': '创建免费赛房间数（中式黑8）',
  'prop': 'create_free_black8_num',
  'lineColor': '#2ebf62',
  'renderColor': '#93f7b7',
  'isChart': true,
  'defaultShow': true
},{
  'label': '创建免费赛房间数（23分）',
  'prop': 'create_free_score23_num',
  'lineColor': '#13adad',
  'renderColor': '#a5efef',
  'isChart': true,
  'defaultShow': true
},{
  'label': '创建好友赛房间数',
  'prop': 'create_pk_num',
  'lineColor': '#0f6aab',
  'renderColor': '#82c2f1',
  'isChart': true,
  'defaultShow': true
}]

export { createColumns } 