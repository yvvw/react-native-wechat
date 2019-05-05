export class WechatError extends Error {
  constructor(options: { errCode: number; errMsg: string; });
  name: string;
  errCode: number;
  errMsg: string;
}

export interface IResults {
  errCode: number;
  errMsg: string;
}

/**
 * 注册
 * @param  {String}  appId
 * @param  {Boolean} [isDebug=false}]
 * @return {Promise}
 */
export function registerApp(options: { appId: string; isDebug?: boolean; }): Promise<boolean>;

/**
 * 检测是否安装微信
 * @return {Boolean}
 */
export function isWXAppInstalled(): Promise<boolean>;

/**
 * 当前版本微信是否支持 OpenApi iosOnly
 * @return {Boolean}
 */
export function isWXAppSupportApi(): Promise<boolean>;


/**
 * 获取微信的itunes安装地址 iosOnly
 * @return {String}
 */
export function getWXAppInstallUrl(): Promise<string>;

/**
 * 打开微信
 * @return {Boolean}
 */
export function openWXApp(): Promise<boolean>;


/**
 * 打开小程序
 * @param  {String}                         username          小程序原始 id
 * @param  {String}                         path              小程序页面路径
 * @param  {'test' | 'preview' | 'release'} [type='release'}] 小程序类型
 * @return {Boolean}
 */
export function launchMiniProgram(options: { username: string; path: string; type?: 'test' | 'preview' | 'release'; }): Promise<boolean>;

/**
 * 授权
 * @desc 只有 snsapi_userinfo scope 有效
 *       是的，你没看错，不需要 appid，微信文档太久不更新了
 * @param  {String}  [state=''] 验证微信信息标识
 * @return {Object}
 */
export function sendAuthRequest(options: { state?: string; }): Promise<IResults>;

/**
 * 文字
 * @param  {String}                               text                文字
 * @param  {'session' | 'timeline' | 'favorite'}  [scene='session' }] 场景
 * @return {Object}
 */
export function sendText(options: { text: string; scene?: 'session' | 'timeline' | 'favorite'; }): Promise<IResults>;

/**
 * 图片
 * @param  {String | Number}                      image               图片
 * @param  {'session' | 'timeline' | 'favorite'}  [scene='session' }] 场景
 * @return {Object}
 */
export function sendImage(options: { image: string; scene?: 'session' | 'timeline' | 'favorite'; }): Promise<IResults>;

/**
 * 音乐
 * @param  {String}                               music               音乐 url
 * @param  {String}                               data                音乐数据 url
 * @param  {String}                               title               标题
 * @param  {String}                               desc                描述
 * @param  {String | Number}                      thumb               缩略图
 * @param  {'session' | 'timeline' | 'favorite'}  [scene='session' }] 场景
 * @return {Object}
 */
export function sendMusic(options: { music: string; data: string; title: string; desc: string; thumb: string; scene?: 'session' | 'timeline' | 'favorite'; }): Promise<IResults>;

/**
 * 视频
 * @param  {String}                               video               视频 url
 * @param  {String}                               title               标题
 * @param  {String}                               desc                描述
 * @param  {String | Number}                      thumb               缩略图
 * @param  {'session' | 'timeline' | 'favorite'}  [scene='session' }] 场景
 * @return {Object}
 */
export function sendVideo(options: { video: string; title: string; desc: string; thumb: string; scene?: 'session' | 'timeline' | 'favorite'; }): Promise<IResults>;

/**
 * 链接
 * @param  {String}                              link              链接
 * @param  {String}                              title             标题
 * @param  {String}                              desc              描述
 * @param  {String}                              thumb             缩略图
 * @param  {'session' | 'timeline' | 'favorite'} [scene='session'] 场景
 * @return {Object}
 */
export function sendLink(options: { link: string; title: string; desc: string; thumb: string; scene?: 'session' | 'timeline' | 'favorite'; }): Promise<IResults>;

/**
 * 小程序
 * @param  {String}                         username         小程序原始 id
 * @param  {String}                         path             小程序页面路径
 * @param  {String}                         hdThumb          小程序缩略图
 * @param  {String}                         title            标题
 * @param  {String}                         desc             描述
 * @param  {String}                         link             兼容旧版本 url
 * @param  {String}                         thumb            兼容旧版本缩略图
 * @param  {'test' | 'preview' | 'release'} [type='release'] 小程序类型
 * @return {Object}
 */
export function sendMiniProgram(options: { username: string; path: string; hdThumb: string; title: string; desc: string; link: string; thumb: string; type?: 'test' | 'preview' | 'release'; }): Promise<IResults>;

/**
 * 支付
 * @param  {String}           appId        应用 id androidOnly
 * @param  {String}           partnerId    商家 id
 * @param  {String}           prepayId     预支付订单 id
 * @param  {String}           nonceStr     随机串
 * @param  {String | Number}  timestamp    时间戳
 * @param  {String}           packageSign  财付通签名
 * @param  {String}           sign         微信开放平台签名
 * @return {Object}
 */
export function pay(options: { appId: string; partnerId: string; prepayId: string; nonceStr: string; timestamp: string; packageSign: string; sign: string; }): Promise<IResults>;

/**
 * 错误代码
 */
export const WXErrCode: {
  Success: number; // 成功
  Common: number; // 普通错误
  UserCancel: number; // 点击取消返回
  SentFail: number; // 发送失败
  AuthDeny: number; // 授权失败
  Unsupport: number; // 不支持
  Ban: number; // 禁止
}

/**
 * 全部错误代码
 */
export const ErrCode: {
  Success: number; // 成功
  Common: number; // 普通错误
  UserCancel: number; // 点击取消返回
  SentFail: number; // 发送失败
  AuthDeny: number; // 授权失败
  Unsupport: number; // 不支持
  Ban: number; // 禁止
  ActiveSuccess: number; // 发送请求后通过系统唤起(任务列表选择唤起)，无法判断成功失败
  RequestFailed: number; // 请求失败
  UnRegisteApi: number; // 未注册接口
  UnInstall: number; // 未安装微信
  UnSupportApi: number; // 不支持 Api
  Unknow: number; // 未知错误
}

/**
 * 授权作用域
 * https://open.weixin.qq.com/cgi-bin/showdocument?action=doc&id=open1419317851
 */
export const WXScopes: {
  Base: string; // 基本信息
  UserInfo: string; // 个人信息
}

/**
 * 会话场景
 */
export const WXScenes: {
  Session: number; // 聊天
  Timeline: number; // 朋友圈
  Favorite: number; // 收藏
}

/**
 * 小程序类型
 */
export const WXMiniProgramTypes: {
  Release: number; // 正式版
  Test: number; // 开发版
  Preview: number; // 体验版
}

/**
 * 微信应答类型
 */
export const WXRespType: {
  Auth: string;
  LaunchMiniProgram: string;
  Message: string;
  Pay: string;
}

/**
 * 错误信息
 */
export const Errors: {
  // 微信 sdk
  Success: IResults;
  Common: IResults;
  UserCancel: IResults;
  SentFail: IResults;
  AuthDeny: IResults;
  Unsupport: IResults;
  Ban: IResults;
  // 其它
  ActiveSuccess: IResults; // 发送请求后通过系统唤起(任务列表选择唤起)，无法判断成功失败
  RequestFailed: IResults; // 发送请求失败
  UnRegisteApi: IResults;
  UnInstall: IResults;
  UnSupportApi: IResults;
  Unknow: IResults;
}

