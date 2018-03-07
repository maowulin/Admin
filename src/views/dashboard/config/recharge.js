const rechargeColumns = [{
  'label': '日期', // 表头及复选框文字
  'prop': 'time',  // 字段名
  'isDefaultHead': true, // 是否默认显示
  'isChart': false
},
{
  'label': '充值VIP用户数', // 表头及复选框文字
  'prop': 'topUp_vip_num',  // 字段名
  'lineColor': '#676fd0',
  'renderColor': '#c2c6fb',
  'isChart': true,
  'defaultShow': false
},{
  'label': '充值VIP金额',
  'prop': 'topUp_vip_sum',
  'lineColor': '#377bd0',
  'renderColor': '#aed0fb',
  'isChart': true,
  'defaultShow': false
},{
  'label': '购买金币用户数',
  'prop': 'buy_gold_num',
  'lineColor': '#82dedf',
  'renderColor': '#eeffff',
  'isChart': true,
  'defaultShow': false
},{
  'label': '购买金币金额',
  'prop': 'buy_gold_sum',
  'lineColor': '#60e0b1',
  'renderColor': '#d3f5e8',
  'isChart': true,
  'defaultShow': true
},{
  'label': '用户获得金币总数',
  'prop': 'get_gold_sum',
  'lineColor': '#70bb5e',
  'renderColor': '#c0e8b6',
  'isChart': true,
  'defaultShow': true
},{
  'label': '消耗金币总数',
  'prop': 'consume_gold_sum',
  'lineColor': '#d271d4',
  'renderColor': '#e9b9ea',
  'isChart': true,
  'defaultShow': true
},{
  'label': '获得奖金人数',
  'prop': 'get_bonus_num',
  'lineColor': '#ff0000',
  'renderColor': '#fdcbcb',
  'isChart': true,
  'defaultShow': true
},{
  'label': '获得奖金总金额',
  'prop': 'get_bonus_sum',
  'lineColor': '#ffcf21',
  'renderColor': '#f5e7b3',
  'isChart': true,
  'defaultShow': true
},{
  'label': '奖金赛胜利获得奖金数',
  'prop': 'bonus_competition_sum',
  'lineColor': '#82dedf',
  'renderColor': '#eeffff',
  'isChart': true,
  'defaultShow': false
},{
  'label': '新手引导赠送奖金数',
  'prop': 'presented_bonus_sum',
  'lineColor': '#0fd3dc',
  'renderColor': '#b4eef1',
  'isChart': true,
  'defaultShow': true
},{
  'label': '奖金提现申请人数',
  'prop': 'extract_bonus_num',
  'lineColor': '#1fd499',
  'renderColor': '#caffee',
  'isChart': true,
  'defaultShow': false
},{
  'label': '奖金提现申请金额',
  'prop': 'extract_bonus_sum',
  'lineColor': '#0cde13',
  'renderColor': '#bcffbe',
  'isChart': true,
  'defaultShow': false
},{
  'label': '奖金提现申请成功人数',
  'prop': 'extract_bonus_win_num',
  'lineColor': '#83de0b',
  'renderColor': '#deffb3',
  'isChart': true,
  'defaultShow': false
},{
  'label': '奖金提现申请成功金额',
  'prop': 'extract_bonus_win_sum',
  'lineColor': '#e09d07',
  'renderColor': '#f9d78b',
  'isChart': true,
  'defaultShow': false
}]

export {rechargeColumns}
