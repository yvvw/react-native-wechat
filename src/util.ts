import { Image } from 'react-native';
import { WXMiniProgramTypes, WXScenes, WXScopes } from './const';

/**
 * 获取授权类型
 */
export function getWXScope(scope: 'base' | 'userinfo') {
	switch (scope) {
		case 'base':
			return WXScopes.Base;
		case 'userinfo':
			return WXScopes.UserInfo;
		default:
			return WXScopes.Base;
	}
}

/**
 * 获取微信分享场景
 */
export function getWXScene(scene: 'session' | 'timeline' | 'favorite') {
	switch (scene) {
		case 'session':
			return WXScenes.Session;
		case 'timeline':
			return WXScenes.Timeline;
		case 'favorite':
			return WXScenes.Favorite;
		default:
			return WXScenes.Session;
	}
}

/**
 * 获取小程序类型
 */
export function getWXMiniProgramType(type: 'test' | 'preview' | 'release') {
	switch (type) {
		case 'release':
			return WXMiniProgramTypes.Release;
		case 'test':
			return WXMiniProgramTypes.Test;
		case 'preview':
			return WXMiniProgramTypes.Preview;
		default:
			return WXMiniProgramTypes.Release;
	}
}

/**
 * resolve 图片资源
 */
export function resolveImageAsset(asset: string | number) {
	switch (typeof asset) {
		case 'number':
			const result = Image.resolveAssetSource(asset);
			if (result && (result as unknown as { __packager_asset: unknown }).__packager_asset) { return result.uri; }
			break;
		case 'string':
			return asset;
	}
	return null;
}
