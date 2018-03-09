import { WXScopes, WXScenes, WXMiniProgramTypes } from './const'

/**
 * 获取场景
 */
const getWXScene = scene => {
  switch (scene) {
    case 'session':
      return WXScenes.Session
      break
    case 'timeline':
      return WXScenes.Timeline
      break
    case 'favorite':
      return WXScenes.Favorite
      break
    default:
      return WXScenes.Session
  }
}

/**
 * 获取授权类型
 */
const getWXScope = scope => {
  switch (scope) {
    case 'base':
      return WXScopes.Base
      break
    case 'userinfo':
      return WXScopes.UserInfo
      break
    default:
      return WXScopes.Base
  }
}

/**
 * 获取小程序类型
 */
const getWXMiniProgramType = type => {
  switch (type) {
    case 'release':
      return WXMiniProgramTypes.Release
      break
    case 'test':
      return WXMiniProgramTypes.Test
      break
    case 'preview':
      return WXMiniProgramTypes.Preview
      break
    default:
      return WXMiniProgramTypes.Release
  }
}

export {
  getWXScope,
  getWXScene,
  getWXMiniProgramType,
}
