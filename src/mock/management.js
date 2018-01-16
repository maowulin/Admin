const dataConfigMap = {
  data: [
    {
      explain: '约球签到基础金币',
      upper_limit: '',
      v_key: 'yq_signIn_gold_value',
      v_value: '0'
    },
    {
      explain: '帖子解锁金币',
      upper_limit: '',
      v_key: 'post_unLock_gold_value',
      v_value: '200'
    },
    {
      explain: 'VIP每日赠送银币',
      upper_limit: '',
      v_key: 'vip_everyday_login_zs_silver_value',
      v_value: '500'
    },
    {
      explain: '自由赛金币',
      upper_limit: '',
      v_key: 'competition_1_system_gold_value',
      v_value: '25'
    },
    {
      explain: '用金币购买会员\r\n（金币，月）仅从大到小',
      upper_limit: '',
      v_key: 'buy_vip_member_value_gold',
      v_value: '1200,12;600,6;300,3;100,1'
    },
    {
      explain: '金币-自由赛获胜',
      upper_limit: '',
      v_key: 'competition_1_system_award_gold_value',
      v_value: '10'
    },
    {
      explain: '邀请好友次数',
      upper_limit: '',
      v_key: 'invite_friends_time_value',
      v_value: '10'
    },
    {
      explain: '签到奖励数值',
      upper_limit: '',
      v_key: 'signIn_up_value',
      v_value: '1,1;2,1,3,1;4,1;5,1;6,1;7,20'
    },
    {
      explain: '用RMB购买金币（RMB,金币）',
      upper_limit: '',
      v_key: 'buy_gold_member_value',
      v_value: '1,10;3,30;6,60;12,120'
    },
    {
      explain: '用RMB购买会员（RME,月）\r\n',
      upper_limit: '',
      v_key: 'buy_vip_member_value_rmb',
      v_value: '10,1;30,3;60,6;120,12'
    },
    {
      explain: 'PK赛-自由之战',
      upper_limit: '',
      v_key: 'competition_1_system_pk_value',
      v_value: '0'
    },
    {
      explain: '定时赛战队vip红包奖励金额',
      upper_limit: '',
      v_key: 'competition_timing_vip_value',
      v_value: '5'
    },
    {
      explain: '定时赛非vip红包(暂不用)',
      upper_limit: '',
      v_key: 'competition_timing_not_vip_value',
      v_value: '10'
    },
    {
      explain: 'vip每天登陆赠送金币数',
      upper_limit: '',
      v_key: 'vip_everyday_login_zs_gold_value',
      v_value: '10'
    },
    {
      explain: '购买表情包金币',
      upper_limit: '',
      v_key: 'emoticon_package_buy_value',
      v_value: '50'
    },
    {
      explain: '使用期限日期',
      upper_limit: '',
      v_key: 'emoticon_package_limit_time',
      v_value: '7'
    },
    {
      explain: '在线人数基数',
      upper_limit: '',
      v_key: 'online_number_base_value',
      v_value: '28'
    },
    {
      explain: '不在线倒计时',
      upper_limit: '',
      v_key: 'the_countdown_value',
      v_value: '30'
    },
    {
      explain: '擂主每日在线时长',
      upper_limit: '',
      v_key: 'champion_online_time_day',
      v_value: '2'
    },
    {
      explain: '擂主每日创建房间并游戏的场次数',
      upper_limit: '',
      v_key: 'champion_create_start_room',
      v_value: '9'
    },
    {
      explain: '擂主月基本工资',
      upper_limit: '',
      v_key: 'champion_basic_month_salary',
      v_value: '250'
    },
    {
      explain: '擂主任务天数第一梯度',
      upper_limit: '',
      v_key: 'champion_first_level_day_num',
      v_value: '0:15'
    },
    {
      explain: '擂主任务天数第二梯度',
      upper_limit: '',
      v_key: 'champion_second_level_day_num',
      v_value: '16:25'
    },
    {
      explain: '擂主任务天数第三梯度',
      upper_limit: '',
      v_key: 'champion_third_level_day_num',
      v_value: '26'
    },
    {
      explain: '擂主游戏每局基本金币',
      upper_limit: '',
      v_key: 'champion_game_basic_gold_num',
      v_value: '20'
    },
    {
      explain: '每天加成总场次',
      upper_limit: '',
      v_key: 'champion_game_total_num',
      v_value: '20'
    },
    {
      explain: '一级局数限制',
      upper_limit: '',
      v_key: 'champion_game_first_level_num',
      v_value: '0:20'
    },
    {
      explain: '一级金币加成比例',
      upper_limit: '',
      v_key: 'champion_game_first_level_gold_ratio',
      v_value: '1'
    },
    {
      explain: '二级局数限制',
      upper_limit: '',
      v_key: 'champion_game_sec_level_num',
      v_value: '20:50'
    },
    {
      explain: '二级金币加成比例',
      upper_limit: '',
      v_key: 'champion_game_sec_level_gold_ratio',
      v_value: '50'
    },
    {
      explain: '擂主金币兑换红包比率',
      upper_limit: '',
      v_key: 'champion_gold_to_balance_ratio',
      v_value: '0.7'
    },
    {
      explain: '擂主任务天数第一梯度对应工资比率',
      upper_limit: '',
      v_key: 'champion_first_level_day_num_salary_ratio',
      v_value: '0'
    },
    {
      explain: '擂主任务天数第二梯度对应工资比率',
      upper_limit: '',
      v_key: 'champion_sec_level_day_num_salary_ratio',
      v_value: '50'
    },
    {
      explain: '2人游戏匹配等待时间',
      upper_limit: '',
      v_key: 'wait_time_two_person_match',
      v_value: '30'
    },
    {
      explain: '2人普通模式消耗货币类型 1:金币   2:银币',
      upper_limit: '',
      v_key: 'two_common_mode_consume_currency_type',
      v_value: '1'
    },
    {
      explain: '2人普通模式胜利奖励货币类型 1:金币   2:银币',
      upper_limit: '',
      v_key: 'two_common_mode_reward_currency_type',
      v_value: '1'
    },
    {
      explain: '2人普通模式胜利奖励货币数量',
      upper_limit: '',
      v_key: 'two_common_mode_reward_currency_count',
      v_value: '50'
    },
    {
      explain: '2人普通模式胜利消耗货币数量',
      upper_limit: '',
      v_key: 'two_common_mode_consume_currency_count',
      v_value: '25'
    },
    {
      explain: '2人红包模式消耗货币类型1:金币   2:银币',
      upper_limit: '',
      v_key: 'two_redpack_mode_consume_currency_type',
      v_value: '1'
    },
    {
      explain: '2人红包模式胜利奖励货币类型 1:金币   2:银币 3：红包',
      upper_limit: '',
      v_key: 'two_repack_mode_reward_currency_type',
      v_value: '3'
    },
    {
      explain: '2人红包模式奖励货币数量',
      upper_limit: '',
      v_key: 'two_redpack_mode_reward_currency_count',
      v_value: '0.88'
    },
    {
      explain: '2人红包模式消耗货币数量',
      upper_limit: '',
      v_key: 'two_redpack_mode_consume_currency_count',
      v_value: '50'
    },
    {
      explain: 'VIP免费使用基础表情包  0关闭  1:开启',
      upper_limit: '',
      v_key: 'vip_use_basic_expression_pack_free',
      v_value: '0'
    },
    {
      explain: 'VIP可不限制次数修改头像与绰号  0关闭  1:开启',
      upper_limit: '',
      v_key: 'vip_change_icon_uname_no_limit',
      v_value: '1'
    },
    {
      explain: '网络不好，服务器等待时间值',
      upper_limit: '',
      v_key: 'public_message_interval_value',
      v_value: '20'
    },
    {
      explain: '最小红包',
      upper_limit: '',
      v_key: 'competition_hb_award_min',
      v_value: '1'
    },
    {
      explain: '最大红包',
      upper_limit: '',
      v_key: 'competition_hb_award_max',
      v_value: '5'
    },
    {
      explain: '红包赛消耗积分',
      upper_limit: '',
      v_key: 'competition_hb_expend_integral',
      v_value: '70'
    },
    {
      explain: '积分赛--金币模式---奖励积分',
      upper_limit: '',
      v_key: 'tournament_gold_integral_award_value',
      v_value: '10'
    },
    {
      explain: '积分赛--金币模式---失败---扣除金币',
      upper_limit: '',
      v_key: 'tournament_gold_integral_expend_value',
      v_value: '50'
    },
    {
      explain: '1-5元随机奖金赛（概率）',
      upper_limit: '',
      v_key: 'competition_hb_award_value',
      v_value: '1:0.90,2:0.04,3:0.03,4:0.02,5:0.01'
    },
    {
      explain: '最低积分限制',
      upper_limit: '',
      v_key: 'lowest_integral_limit_value',
      v_value: '10'
    },
    {
      explain: '免费积分赛每场赠送(普通用户)',
      upper_limit: '',
      v_key: 'competition_free_integral_award',
      v_value: '1'
    },
    {
      explain: '免费积分赛每场赠送（vip会员）',
      upper_limit: '',
      v_key: 'competition_free_integral_vip_award',
      v_value: '3'
    },
    {
      explain: '普通用户每日积分赠送上限',
      upper_limit: '',
      v_key: 'competition_free_integral_limit',
      v_value: '4'
    },
    {
      explain: 'vip用户每日积分赠送上限',
      upper_limit: '',
      v_key: 'competition_free_integral_limit_vip',
      v_value: '12'
    },
    {
      explain: '积分赛--免费模式---奖励金币',
      upper_limit: '',
      v_key: 'tournament_free_integral_award_value',
      v_value: '5'
    },
    {
      explain: '积分赛--金币模式---奖励金币',
      upper_limit: '',
      v_key: 'tournament_gold_integral_award_gold_value',
      v_value: '40'
    },
    {
      explain: '新手引导奖励的金币',
      upper_limit: '',
      v_key: 'game_guidance_award_gold',
      v_value: '5'
    },
    {
      explain: '新手引导奖励奖金',
      upper_limit: '',
      v_key: 'game_guidance_award_bonus',
      v_value: '0.88'
    },
    { explain: 'ios状态', upper_limit: '', v_key: 'ios_status', v_value: '0' }
  ],
  error: 0,
  error_message: '',
  pid: 0,
  result: 1
}
const boundsMap = {
  currentPage: 0,
  items: [
    {
      apply_for_date: '2017-11-10 00:56:11',
      approver: 'admin',
      approverID: 1,
      id: 3,
      phone: 15829258626,
      status: 1,
      sum: 1,
      userID: 12,
      userName: '8626nt'
    },
    {
      apply_for_date: '2017-12-02 13:02:21',
      approver: 'admin',
      approverID: 1,
      id: 4,
      phone: 15829258626,
      status: 1,
      sum: 1,
      userID: 12,
      userName: '8626nt'
    },
    {
      apply_for_date: '2017-12-26 17:54:39',
      approver: 'admin',
      approverID: 1,
      id: 5,
      phone: 18035909806,
      status: 1,
      sum: 9,
      userID: 6,
      userName: '馒头'
    }
  ],
  recordsPerPage: 10,
  totalRecords: 3
}
const premisMap = {
  currentPage: 0,
  items: [
    {
      deptName: '财务部',
      id: 1,
      createTime: '2017-06-12 14:10:55',
      lastLoginIp: '1.85.217.245',
      phone: '18000000000',
      status: 0,
      uname: 'admin',
      name: '林紫华',
      lastLoginTime: '2018-01-12 09:12:32',
      roleNames: '管理员'
    },
    {
      deptName: '产品部',
      id: 2,
      createTime: '2017-08-11 14:17:53',
      lastLoginIp: '1.85.219.3',
      phone: '17789194209',
      status: 0,
      uname: 'dengjuan',
      name: '邓娟',
      lastLoginTime: '2017-12-18 11:46:30',
      roleNames: '产品管理员'
    },
    {
      deptName: '市场',
      id: 3,
      createTime: '2017-08-11 14:19:38',
      lastLoginIp: '1.85.217.245',
      phone: '18516214029',
      status: 0,
      uname: 'yinle',
      name: '尹乐',
      lastLoginTime: '2018-01-12 09:35:06',
      roleNames: '市场管理员'
    },
    {
      deptName: '产品部',
      id: 4,
      createTime: '2017-08-11 14:20:37',
      lastLoginIp: '36.46.48.235',
      phone: '18035909806',
      status: 0,
      uname: '薛亚伟',
      name: '薛亚伟',
      lastLoginTime: '2017-10-02 19:09:12',
      roleNames: '产品管理员'
    },
    {
      deptName: '技术部',
      id: 5,
      createTime: '2017-08-11 14:53:27',
      lastLoginIp: '1.83.125.52',
      phone: '17792816009',
      status: 0,
      uname: 'fengruilong',
      name: '冯瑞龙',
      lastLoginTime: '2017-12-28 20:22:23',
      roleNames: '技术管理员'
    },
    {
      deptName: 'CEO',
      id: 6,
      createTime: '2017-08-12 12:55:02',
      lastLoginIp: '1.83.125.52',
      phone: '18066666066',
      status: 0,
      uname: '石延明',
      name: '石延明',
      lastLoginTime: '2018-01-06 12:37:29',
      roleNames: '管理员'
    },
    {
      deptName: '行政',
      id: 8,
      createTime: '2017-08-29 14:54:40',
      lastLoginIp: '1.83.125.52',
      phone: '18035909806',
      status: 0,
      uname: '李文雅',
      name: '李文雅',
      lastLoginTime: '2018-01-08 11:25:11',
      roleNames: '行政管理'
    },
    {
      deptName: '市场',
      id: 9,
      createTime: '2017-12-25 09:04:59',
      lastLoginIp: '1.80.71.7',
      phone: '13609161336',
      status: 0,
      uname: '梁晶',
      name: '梁晶',
      lastLoginTime: '2018-01-10 09:03:09',
      roleNames: '假期公用,市场管理员'
    }
  ],
  recordsPerPage: 10,
  totalRecords: 8
}
const roleMap = [
  {
    createTime: '2017-08-11 14:11:16',
    id: 1,
    isInner: 0,
    roleDesc: '产品管理员',
    roleName: '产品管理员'
  },
  {
    createTime: '2017-08-11 14:11:50',
    id: 2,
    isInner: 0,
    roleDesc: '市场管理员',
    roleName: '市场管理员'
  },
  {
    createTime: '2017-08-11 14:12:49',
    id: 3,
    isInner: 0,
    roleDesc: '技术管理员',
    roleName: '技术管理员'
  },
  {
    createTime: '2017-08-12 12:53:04',
    id: 4,
    isInner: 0,
    roleDesc: '最高权限',
    roleName: '管理员'
  },
  {
    createTime: '2017-08-14 09:18:37',
    id: 5,
    isInner: 0,
    roleDesc: '主要用户设备发货',
    roleName: '行政管理'
  },
  {
    createTime: '2017-09-29 15:33:41',
    id: 6,
    isInner: 0,
    roleDesc: '假期公用',
    roleName: '假期公用'
  }
]
const roleListMap = {
  roleList: [
    {
      createTime: '2017-08-11 14:11:16',
      id: 1,
      isInner: 0,
      roleDesc: '产品管理员',
      roleName: '产品管理员'
    }
  ],
  deptName: '产品部',
  createTime: '2017-08-11 14:17:53',
  lastLoginIp: '1.85.219.3',
  phone: '17789194209',
  status: 0,
  uname: 'dengjuan',
  name: '邓娟',
  comfirmPassword: '******',
  password: '******',
  lastLoginTime: '2017-12-18 11:46:30'
}
const tokenMap = {
  data: 'Yjz+zvHjtCiDSwcj8GtH2g==',
  error: 0,
  error_message: '',
  pid: 0,
  result: 1
}
const managerMap = {
  currentPage: 0,
  items: [
    {
      createTime: '2017-08-11 14:11:16',
      id: 1,
      isInner: 0,
      roleDesc: '产品管理员',
      roleName: '产品管理员'
    },
    {
      createTime: '2017-08-11 14:11:50',
      id: 2,
      isInner: 0,
      roleDesc: '市场管理员',
      roleName: '市场管理员'
    },
    {
      createTime: '2017-08-11 14:12:49',
      id: 3,
      isInner: 0,
      roleDesc: '技术管理员',
      roleName: '技术管理员'
    },
    {
      createTime: '2017-08-12 12:53:04',
      id: 4,
      isInner: 0,
      roleDesc: '最高权限',
      roleName: '管理员'
    },
    {
      createTime: '2017-08-14 09:18:37',
      id: 5,
      isInner: 0,
      roleDesc: '主要用户设备发货',
      roleName: '行政管理'
    },
    {
      createTime: '2017-09-29 15:33:41',
      id: 6,
      isInner: 0,
      roleDesc: '假期公用',
      roleName: '假期公用'
    }
  ],
  recordsPerPage: 10,
  totalRecords: 6
}
const versionMap = {
  currentPage: 0,
  items: [
    {
      apkUrl:
        'http://www.butterfly-8.com/version/file_version_20171228203246779.apk',
      id: 20,
      minimumVersion: '16',
      newFileName: 'file_version_20171228203246779.apk',
      number: 0,
      oriFileName: 'app-butterfly-release_115_jiagu_sign.apk',
      releaseTime: '2017-12-28 20:32:46',
      releaseUser: 'fengruilong',
      type: '2',
      updateContent: '1:修复一些bug，提高用户体验\r\n',
      version: '16'
    },
    {
      apkUrl:
        'http://www.butterfly-8.com/version/file_version_20171221021742788.apk',
      id: 19,
      minimumVersion: '15',
      newFileName: 'file_version_20171221021742788.apk',
      number: 0,
      oriFileName: 'app-butterfly-release_114_jiagu_sign.apk',
      releaseTime: '2017-12-21 02:17:42',
      releaseUser: 'fengruilong',
      type: '2',
      updateContent:
        '1、优化游戏模式\r\n2、游戏新增23分模式（2人）\r\n3、新手引导优化，增加每步点击记录及统计\r\n4、游戏中增加聊天\r\n5、游戏操作方式优化及增加手机滑动击打',
      version: '15'
    },
    {
      apkUrl:
        'http://www.butterfly-8.com/version/file_version_20171207181555426.apk',
      id: 18,
      minimumVersion: '14',
      newFileName: 'file_version_20171207181555426.apk',
      number: 0,
      oriFileName: 'app-butterfly-release_113_jiagu_sign.apk',
      releaseTime: '2017-12-07 18:15:55',
      releaseUser: 'fengruilong',
      type: '2',
      updateContent:
        '更新内容\r\n1：优化击球力度\r\n2：修复创建房间bug\r\n3：游客增加退出功能',
      version: '14'
    },
    {
      apkUrl:
        'http://www.butterfly-8.com/version/file_version_20171202180859226.apk',
      id: 17,
      minimumVersion: '13',
      newFileName: 'file_version_20171202180859226.apk',
      number: 0,
      oriFileName: 'app-butterfly-release_112_jiagu_sign.apk',
      releaseTime: '2017-12-02 18:08:59',
      releaseUser: 'fengruilong',
      type: '2',
      updateContent:
        '1、游戏取消【断线判输】规则，启用断线自动重连\r\n2、房主拒绝或者不接受，自动为加入者创建房间\r\n3、游客权限增加\r\n4、抽奖功能重做\r\n5、优化观战内容\r\n6、优化界面展示\r\n7、开放战队创建功能',
      version: '13'
    },
    {
      apkUrl:
        'http://www.butterfly-8.com/version/file_version_20171110023012929.apk',
      id: 15,
      minimumVersion: '12',
      newFileName: 'file_version_20171110023012929.apk',
      number: 0,
      oriFileName: 'app-butterfly-release_111_jiagu_sign.apk',
      releaseTime: '2017-11-10 02:30:12',
      releaseUser: 'fengruilong',
      type: '2',
      updateContent:
        '1、增加游客模式，无需账号也可登录进行匹配\r\n2、增加【观战】功能，可实时观看正在进行的比赛\r\n3、增加更多排行：积分增量排行、财富榜、收益榜、战绩榜、胜率榜\r\n4、增加每日抽奖功能，只有每日积分增量排名的前10名才有抽奖机会\r\n5、新增积分赛与奖金赛，奖金高达10元，人人都有机会赢取\r\n6、新增官方公告，关于版本最新的动态，更新内容，功能等都可以在这里查看\r\n7、取消银币内容\r\n',
      version: '12'
    },
    {
      apkUrl:
        'http://www.butterfly-8.com/version/file_version_20170930223408457.apk',
      id: 14,
      minimumVersion: '11',
      newFileName: 'file_version_20170930223408457.apk',
      number: 0,
      oriFileName: 'app-butterfly-release_110_jiagu_sign.apk',
      releaseTime: '2017-09-30 22:34:08',
      releaseUser: 'fengruilong',
      type: '2',
      updateContent:
        '1.增加擂主模式，千元红包等你拿；\r\n2.优化游戏主界面的布局及其他页面；\r\n3.开放红包赛的权限，所有人都可打比赛，赢红包；\r\n4.优化游戏中操作逻辑；\r\n5.修复其他bug并优化体验;',
      version: '11'
    },
    {
      apkUrl:
        'http://www.butterfly-8.com/version/file_version_20170905232041103.apk',
      id: 13,
      minimumVersion: '10',
      newFileName: 'file_version_20170905232041103.apk',
      number: 0,
      oriFileName: 'ball正式正式.apk',
      releaseTime: '2017-09-05 23:20:41',
      releaseUser: 'admin',
      type: '4',
      updateContent:
        '游戏资源包又有更新啦~\r\n1、新增按钮点击效果，再也不用懵懵的了~\r\n2、新增加入房间通知，再也不用担心与对手擦肩而过啦~\r\n3、优化同步问题以及其他bug，可以开心的与好友决战到天亮~\r\n(*^__^*) 嘻嘻……',
      version: '10'
    },
    {
      apkUrl:
        'http://www.butterfly-8.com/version/file_version_20170902190243001.apk',
      id: 12,
      minimumVersion: '10',
      newFileName: 'file_version_20170902190243001.apk',
      number: 0,
      oriFileName: '游戏包正式版V1.0.9.apk',
      releaseTime: '2017-09-02 19:02:43',
      releaseUser: 'admin',
      type: '1',
      updateContent:
        '1、好友PK赛限时免费啦。\r\n2、修复网络异常及提示。\r\n3、修复无金币时不能参与赢金币赛。\r\n4、修复关注问题。\r\n5、修复及优化其他bug',
      version: '10'
    },
    {
      apkUrl:
        'http://www.butterfly-8.com/version/file_version_20170929235028777.apk',
      id: 11,
      minimumVersion: '10',
      newFileName: 'file_version_20170929235028777.apk',
      number: 0,
      oriFileName: 'app-taptap-release.apk',
      releaseTime: '2017-09-02 18:13:31',
      releaseUser: 'fengruilong',
      type: '2',
      updateContent:
        '1、增加游戏通知，当有人进入房间时，您可以及时收到通知。\r\n2、优化及统一主界面。\r\n3、优化竞技页面与招募页面。\r\n4、调整战队人员上限。',
      version: '10'
    },
    {
      apkUrl:
        'http://www.butterfly-8.com/version/file_version_20170831182941177.apk',
      id: 10,
      minimumVersion: '8',
      newFileName: 'file_version_20170831182941177.apk',
      number: 0,
      oriFileName: 'butterfly_app_v1.0.8.apk',
      releaseTime: '2017-08-31 18:29:41',
      releaseUser: 'fengruilong',
      type: '2',
      updateContent:
        '1、优化游戏入口，增加宣传视频\r\n2、新增最新战报列表\r\n3、优化用户体验，修复其他bug',
      version: '9'
    }
  ],
  recordsPerPage: 10,
  totalRecords: 19
}
const versionInfoMap = {
  apkUrl: 'http://113.141.64.53:80/version/file_version_20171228203246779.apk',
  id: 20,
  minimumVersion: '16',
  newFileName: 'file_version_20171228203246779.apk',
  number: 0,
  oriFileName: 'app-butterfly-release_115_jiagu_sign.apk',
  releaseTime: '2017-12-28 20:32:46',
  releaseUser: 'fengruilong',
  type: '2',
  updateContent: '1:修复一些bug，提高用户体验\r\n',
  version: '16'
}
export default {
  getConfig: config => {
    console.log(config)
    return dataConfigMap
  },
  getBounds: config => {
    console.log(config)
    return boundsMap
  },
  getPremis: config => {
    console.log(config)
    return premisMap
  },
  getRole: config => {
    return roleMap
  },
  getRoleList: config => {
    console.log(config)
    return roleListMap
  },
  getToken: config => {
    return tokenMap
  },
  getManager: config => {
    return managerMap
  },
  getVersion: config => {
    return versionMap
  },
  getVerionInfo: config => {
    return versionInfoMap
  }
}
