import { Image } from 'react-native'
import { WXScopes, WXScenes, WXMiniProgramTypes } from './const'

/**
 * 获取授权类型
 * @param  {'base' | 'userinfo'} scope
 * @return {Number}
 */
export const getWXScope = scope => {
  switch (scope) {
    case 'base':
      return WXScopes.Base
    case 'userinfo':
      return WXScopes.UserInfo
    default:
      return WXScopes.Base
  }
}

/**
 * 获取微信分享场景
 * @param  {'session' | 'timeline' | 'favorite'} scene
 * @return {Number}
 */
export const getWXScene = scene => {
  switch (scene) {
    case 'session':
      return WXScenes.Session
    case 'timeline':
      return WXScenes.Timeline
    case 'favorite':
      return WXScenes.Favorite
    default:
      return WXScenes.Session
  }
}

/**
 * 获取小程序类型
 * @param  {'test' | 'preview' | 'release'} type
 * @return {Number}
 */
export const getWXMiniProgramType = type => {
  switch (type) {
    case 'release':
      return WXMiniProgramTypes.Release
    case 'test':
      return WXMiniProgramTypes.Test
    case 'preview':
      return WXMiniProgramTypes.Preview
    default:
      return WXMiniProgramTypes.Release
  }
}

/**
 * resolve 图片资源
 * @param {String | Number} asset
 */
export const resolveImageAsset = asset => {
  switch (typeof asset) {
    case 'number':
      const result = Image.resolveAssetSource(asset)
      if (result && result.__packager_asset) return result.uri
      break
    case 'string':
      return asset
  }
  return null
}
