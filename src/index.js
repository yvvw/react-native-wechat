import { NativeModules, NativeEventEmitter, AppState } from 'react-native'
import { getWXScope, getWXScene, getWXMiniProgramType } from './util'
import { WXErrCode, UserErrs } from './const'

const { RNWechat } = NativeModules

// wechat event emitter
const rnWechatEmitter = new NativeEventEmitter(RNWechat)
const rnWechatAddEventListener = listenEventType => {
  return new Promise(resolve => {
    let subscription = null
    // 微信返回事件处理
    const handleWechatEvent = ({ eventType, ...otherParams }) => {
      if (listenEventType !== eventType) return
      clearSubscribe()
      resolve(otherParams)
    }
    // 切换形式回到前台，拿不到微信的响应结果
    const handleAppStateChange = nextAppState => {
      if (nextAppState !== 'active') return
      clearSubscribe()
      resolve(UserErrs.AppActiveSuccess)
    }
    // 清理事件监听
    const clearSubscribe = () => {
      subscription.remove()
      AppState.removeEventListener('change', handleAppStateChange)
    }

    subscription = rnWechatEmitter.addListener('RNWechatEvent', handleWechatEvent)
    AppState.addEventListener('change', handleAppStateChange)
  })
}

// wechat response handler
const handleWechatResponse = response => {
  const { errCode } = response
  if (errCode === WXErrCode.Success) {
    return response
  } else if (errCode === WXErrCode.AppActiveSuccess) {
    return response
  } else if (errCode === WXErrCode.Common) {
    throw UserErrs.Common
  } else if (errCode === WXErrCode.UserCancel) {
    throw UserErrs.UserCancel
  } else if (errCode === WXErrCode.SentFail) {
    throw UserErrs.SentFail
  } else if (errCode === WXErrCode.AuthDeny) {
    throw UserErrs.AuthDeny
  } else if (errCode === WXErrCode.Unsupport) {
    throw UserErrs.Unsupport
  } else {
    throw UserErrs.Unknow
  }
}

/**
 * 判断微信是否可用
 * @return {Promise}
 */
let checkWechatEnable = async () => {
  let isWXAppInstalled = await RNWechat.isWXAppInstalled()
  if (isWXAppInstalled === 'false') {
    throw UserErrs.Uninstall
  }
  let isWXApiRegisteSuccess = await RNWechat.isWXApiRegisteSuccess()
  if (isWXApiRegisteSuccess === 'false') {
    throw UserErrs.ApiUnregiste
  }
  checkWechatEnable = () => true
  return true
}

/**
 * 注册微信
 * @param  {String}  appId
 * @param  {Boolean}  [isDebug=false}]
 * @return {Promise}
 */
const registerApp = async ({
  appId,
  isDebug = false
}) => {
  const res = await RNWechat.registerApp(appId, isDebug ? 'true' : 'false')
  return res === 'true'
}

/**
 * 发送授权请求
 * @param  {String}  appId              appId
 * @param  {String}  state              用于验证微信返回信息
 * @param  {String}  [scope='userinfo'] 授权类型
 * @return {Promise}
 */
const sendAuthRequestScope = async ({
  appId,
  state,
  scope = 'userinfo',
}) => {
  await checkWechatEnable()
  const mScope = getWXScope(scope)
  const sendRes = await RNWechat.sendAuthRequestScope(mScope, state, appId)
  if (sendRes === 'false') {
    throw UserErrs.RequestSentFail
  }
  const response = await rnWechatAddEventListener('SendAuthResp')
  return handleWechatResponse(response)
}


/**
 * 发送文字
 * @param  {String}  text                文字
 * @param  {String}  [scene='session' }] 场景
 * @return {Promise}
 */
const sendText = async ({
  text,
  scene = 'session',
}) => {
  await checkWechatEnable()
  const mScene = getWXScene(scene)
  const sendRes = await RNWechat.sendText(text, mScene)
  if (sendRes === 'false') {
    throw UserErrs.RequestSentFail
  }
  const response = await rnWechatAddEventListener('SendMessageToWXResp')
  return handleWechatResponse(response)
}

/**
 * 发送链接
 * @param  {String}  url               点击后跳转的 url
 * @param  {String}  title             标题
 * @param  {String}  desc              描述
 * @param  {String}  thumb             缩略图
 * @param  {String}  [scene='session'] 场景
 * @return {Promise}
 */
const sendLinkURL = async ({
  url,
  title,
  desc,
  thumb,
  scene = 'session',
}) => {
  await checkWechatEnable()
  const mScene = getWXScene(scene)
  const sendRes = await RNWechat.sendLinkURL(url, title, desc, thumb, mScene)
  if (sendRes === 'false') {
    throw UserErrs.RequestSentFail
  }
  const response = await rnWechatAddEventListener('SendMessageToWXResp')
  return handleWechatResponse(response)
}

/**
 * 发送小程序或 url
 * @param  {String}  originId         小程序原始 id
 * @param  {String}  miniPgPath       小程序页面路径
 * @param  {String}  title            标题
 * @param  {String}  desc             描述
 * @param  {String}  hdImage          小程序缩略图
 * @param  {String}  url              旧版本替代用 url
 * @param  {String}  thumb            旧版本替代缩略图
 * @param  {String}  [type='release'] 小程序发布类型
 * @return {Promise}
 */
const sendMiniProgramWebpageUrl = async ({
  originId,
  miniPgPath,
  title,
  desc,
  hdImage,
  url,
  thumb,
  type = 'release',
}) => {
  await checkWechatEnable()
  const mType = getWXMiniProgramType(type)
  const sendRes = await RNWechat.sendMiniProgramWebpageUrl(
    url,
    originId,
    miniPgPath,
    title,
    desc,
    thumb,
    hdImage,
    mType,
  )
  if (sendRes === 'false') {
    throw UserErrs.RequestSentFail
  }
  const response = await rnWechatAddEventListener('SendMessageToWXResp')
  return handleWechatResponse(response)
}

export default {
  registerApp,
  sendAuthRequestScope,
  sendText,
  sendLinkURL,
  sendMiniProgramWebpageUrl,
}
