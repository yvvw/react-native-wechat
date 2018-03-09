const WXScopes = {
  Base:     'snsapi_base',     // 获取用户基本信息
  UserInfo: 'snsapi_userinfo', // 获取用户个人信息
}

const WXScenes = {
  Session:  0, // 聊天界面
  Timeline: 1, // 朋友圈
  Favorite: 2, // 收藏
}

const WXMiniProgramTypes = {
  Release:  0, // 正式版
  Test:     1, // 开发版
  Preview:  2, // 体验版
}

const WXErrCode = {
  Success:          0, // 成功
  AppActiveSuccess: 1, // 应用唤起返回无法判断成功失败**非微信提供错误类型**
  Common:          -1, // 普通错误类型
  UserCancel:      -2, // 用户点击取消并返回
  SentFail:        -3, // 发送失败
  AuthDeny:        -4, // 授权失败
  Unsupport:       -5, // 微信不支持
}

const UserErrs = {
  // 微信错误并附带错误提示
  Success: {
    errCode: 0,
    errMsg: '',
  },
  Common: {
    errCode: -1,
    errMsg: '微信普通错误',
  },
  UserCancel: {
    errCode: -2,
    errMsg: '用户取消并返回',
  },
  SentFail: {
    errCode: -3,
    errMsg: '微信响应发送失败',
  },
  AuthDeny: {
    errCode: -4,
    errMsg: '微信响应授权失败',
  },
  Unsupport: {
    errCode: -5,
    errMsg: '微信不支持',
  },
  // 其它可能会产生的错误
  AppActiveSuccess: {
    errCode: 1,
    errMsg: '应用唤起返回无法判断成功失败',
  },
  Uninstall: {
    errCode: -6,
    errMsg: '当前设备未安装微信',
  },
  ApiUnregiste: {
    errCode: -7,
    errMsg: '微信Api未注册',
  },
  RequestSentFail: {
    errCode: -8,
    errMsg: '向微信发送请求失败',
  },
  Unknow: {
    errCode: -9,
    errMsg: '未知错误',
  },
}

export {
  WXScopes,
  WXScenes,
  WXMiniProgramTypes,
  WXErrCode,
  UserErrs,
}
