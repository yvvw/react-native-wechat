/**
 * 错误代码
 */
export const WXErrCode = {
  Success: 0, // 成功
  Common: -1, // 普通错误
  UserCancel: -2, // 点击取消返回
  SentFail: -3, // 发送失败
  AuthDeny: -4, // 授权失败
  Unsupport: -5, // 不支持
  Ban: -6 // 禁止
}

/**
 * 全部错误代码
 */
export const ErrCode = {
  ...WXErrCode,
  ActiveSuccess: 1, // 发送请求后通过系统唤起(任务列表选择唤起)，无法判断成功失败
  RequestFailed: -7, // 请求失败
  UnRegisteApi: -8, // 未注册接口
  UnInstall: -9, // 未安装微信
  UnSupportApi: -10, // 不支持 Api
  Unknow: -99 // 未知错误
}

/**
 * 授权作用域
 * https://open.weixin.qq.com/cgi-bin/showdocument?action=doc&id=open1419317851
 */
export const WXScopes = {
  Base: 'snsapi_base', // 基本信息
  UserInfo: 'snsapi_userinfo' // 个人信息
}

/**
 * 会话场景
 */
export const WXScenes = {
  Session: 0, // 聊天
  Timeline: 1, // 朋友圈
  Favorite: 2 // 收藏
}

/**
 * 小程序类型
 */
export const WXMiniProgramTypes = {
  Release: 0, // 正式版
  Test: 1, // 开发版
  Preview: 2 // 体验版
}

/**
 * 微信应答类型
 */
export const WXRespType = {
  Auth: 'SendAuthResp',
  Message: 'SendMessageToWXResp',
  Pay: 'PayResp'
}

/**
 * 错误信息
 */
export const Errors = {
  // 微信 sdk
  Success: { errCode: ErrCode.Success, errMsg: '' },
  Common: { errCode: ErrCode.Common, errMsg: '出错' },
  UserCancel: { errCode: ErrCode.UserCancel, errMsg: '取消' },
  SentFail: { errCode: ErrCode.UserCancel, errMsg: '请求失败' },
  AuthDeny: { errCode: ErrCode.AuthDeny, errMsg: '授权失败' },
  Unsupport: { errCode: ErrCode.Unsupport, errMsg: '不支持' },
  Ban: { errCode: ErrCode.Ban, errMsg: '禁止' },
  // 其它
  ActiveSuccess: { errCode: ErrCode.ActiveSuccess, errMsg: '' }, // 发送请求后通过系统唤起(任务列表选择唤起)，无法判断成功失败
  RequestFailed: { errCode: ErrCode.RequestFailed, errMsg: '发送失败' }, // 发送请求失败
  UnRegisteApi: { errCode: ErrCode.UnRegisteApi, errMsg: 'Api未注册' },
  UnInstall: { errCode: ErrCode.UnInstall, errMsg: '未安装微信' },
  UnSupportApi: { errCode: ErrCode.UnSupportApi, errMsg: '微信不支持Api' },
  Unknow: { errCode: ErrCode.Unknow, errMsg: '未知错误' }
}
