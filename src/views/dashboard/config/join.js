const joinColumns = [{
  'label': '日期', // 表头及复选框文字
  'prop': 'time',  // 字段名
  'isDefaultHead': true, // 是否默认显示
  'isChart': false
},
{
  'label': '加入房间总数', // 表头及复选框文字
  'prop': 'join_room_total',  // 字段名
  'lineColor': '#377bd0',
  'renderColor': '#aed0fb',
  'isChart': true,
  'defaultShow': true
},{
  'label': '加入房间但等待超时总次数',
  'prop': 'join_room_Timeout_total',
  'lineColor': '#82dedf',
  'renderColor': '#eeffff',
  'isChart': true,
  'defaultShow': true
},{
  'label': '加入房间但被拒绝总次数',
  'prop': 'join_room_refuse_total',
  'lineColor': '#60e0b1',
  'renderColor': '#d3f5e8',
  'isChart': true,
  'defaultShow': true
},{
  'label': '加入奖金赛房间次数',
  'prop': 'join_room_bonus_num',
  'lineColor': '#70bb5e',
  'renderColor': '#c0e8b6',
  'isChart': true,
  'defaultShow': true
},{
  'label': '加入金币赛房间次数（中式黑8）',
  'prop': 'join_room_gold_black8_num',
  'lineColor': '#d271d4',
  'renderColor': '#e9b9ea',
  'isChart': true,
  'defaultShow': true
},{
  'label': '加入金币赛房间次数（23分）',
  'prop': 'join_room_gold_score23_num',
  'lineColor': '#ff0000',
  'renderColor': '#fdcbcb',
  'isChart': true,
  'defaultShow': true
},{
  'label': '加入免费赛房间次数（中式黑8）',
  'prop': 'join_room_free_black8_num',
  'lineColor': '#ffcf21',
  'renderColor': '#f5e7b3',
  'isChart': true,
  'defaultShow': true
},{
  'label': '加入免费赛房间次数（23分）',
  'prop': 'join_room_free_score23_num',
  'lineColor': '#82dedf',
  'renderColor': '#eeffff',
  'isChart': true,
  'defaultShow': true
}]
export { joinColumns }