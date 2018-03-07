const gameChesColumns = [{
  'label': '日期', // 表头及复选框文字
  'prop': 'time',  // 字段名
  'isDefaultHead': true, // 是否默认显示
  'isChart': false
},
{
  'label': '游戏总对局数', // 表头及复选框文字
  'prop': 'total_game_num',  // 字段名
  'lineColor': '#da0b0b',
  'renderColor': '#f7a5a5',
  'isChart': true,
  'defaultShow': true
},{
  'label': '奖金赛对局数',
  'prop': 'bonus_game_num',
  'lineColor': '#e4aa04',
  'renderColor': '#f1dca1',
  'isChart': true,
  'defaultShow': false
},{
  'label': '金币赛对局数（中式黑8）',
  'prop': 'gold_game_black8_num',
  'lineColor': '#98bd06',
  'renderColor': '#ebfbcb',
  'isChart': true,
  'defaultShow': false
},{
  'label': '金币赛对局数（23分）',
  'prop': 'gold_game_score23_num',
  'lineColor': '#4aab23',
  'renderColor': '#a6f188',
  'isChart': true,
  'defaultShow': true
},{
  'label': '免费对局数（中式黑8）',
  'prop': 'free_game_black8_num',
  'lineColor': '#2ebf62',
  'renderColor': '#93f7b7',
  'isChart': true,
  'defaultShow': true
},{
  'label': '免费对局数（23分）',
  'prop': 'free_game_score23_num',
  'lineColor': '#13adad',
  'renderColor': '#a5efef',
  'isChart': true,
  'defaultShow': true
},{
  'label': '好友PK赛',
  'prop': 'pk_game_num',
  'lineColor': '#0f6aab',
  'renderColor': '#82c2f1',
  'isChart': true,
  'defaultShow': true
},{
  'label': '正在对局数',
  'prop': '',
  'lineColor': '#232dab',
  'renderColor': '#a4aaf1',
  'isChart': true,
  'defaultShow': true
},{
  'label': '游戏对战人数（去重）',
  'prop': 'game_num',
  'lineColor': '#8236bb',
  'renderColor': '#ce9af5',
  'isChart': true,
  'defaultShow': true
}]

export { gameChesColumns }