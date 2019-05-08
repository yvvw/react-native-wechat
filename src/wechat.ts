import { AppState, AppStateStatus, NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { ErrCode, Errors, WXRespType } from './const';
import { getWXMiniProgramType, getWXScene, getWXScope, resolveImageAsset } from './util';

interface RegisterAppOptions {
	appId: string;
	isDebug?: boolean;
}

/**
 * 注册
 * @param  {String}  appId
 * @param  {Boolean} [isDebug=false}]
 * @return {Promise}
 */
export function registerApp({ appId, isDebug = false }: RegisterAppOptions) {
	return RNWechat.registerApp(appId, isDebug);
}

/**
 * 检测是否安装微信
 * @return {Boolean}
 */
export function isWXAppInstalled() {
	return RNWechat.isWXAppInstalled() as boolean;
}

/**
 * 当前版本微信是否支持 OpenApi iosOnly
 * @return {Boolean}
 */
export function isWXAppSupportApi(): boolean {
	// Android 5.1.6 版本 SDK 移除了该方法
	return Platform.OS === 'ios' ? RNWechat.isWXAppSupportApi() : true;
}

/**
 * 获取微信的itunes安装地址 iosOnly
 * @return {String}
 */
export function getWXAppInstallUrl(): string {
	return Platform.OS === 'ios' ? RNWechat.getWXAppInstallUrl() : null;
}

/**
 * 打开微信
 * @return {Boolean}
 */
export async function openWXApp() {
	await checkWechatModuleIsEnable();
	return RNWechat.openWXApp() as boolean;
}

interface LaunchMiniProgramOptions {
	username: string;
	path: string;
	type?: 'test' | 'preview' | 'release';
}

/**
 * 打开小程序
 * @param  {String}                         username          小程序原始 id
 * @param  {String}                         path              小程序页面路径
 * @param  {'test' | 'preview' | 'release'} [type='release'}] 小程序类型
 * @return {Boolean}
 */
export async function launchMiniProgram({
	username,
	path,
	type = 'release'
}: LaunchMiniProgramOptions) {
	if (Platform.OS === 'android') {
		await checkWechatModuleIsEnable();
	}
	if (
		!await RNWechat.launchMiniProgram(username, path, getWXMiniProgramType(type))
	) { throw new WechatError(Errors.RequestFailed); }
	return listenAndHandleWechatResponse(WXRespType.LaunchMiniProgram);
}

/**
 * 授权
 * @desc 只有 snsapi_userinfo scope 有效
 *       是的，你没看错，不需要 appid，微信文档太久不更新了
 * @param  {String}  [state=''] 验证微信信息标识
 * @return {Object}
 */
export async function sendAuthRequest({ state = '' }) {
	await checkWechatModuleIsEnable();
	if (
		!await RNWechat.sendAuthRequest(getWXScope('userinfo'), state)
	) { throw new WechatError(Errors.RequestFailed); }
	return listenAndHandleWechatResponse(WXRespType.Auth);
}

interface SendTextOptions {
	text: string | number;
	scene?: 'session' | 'timeline' | 'favorite';
}

/**
 * 文字
 * @param  {String}                               text                文字
 * @param  {'session' | 'timeline' | 'favorite'}  [scene='session' }] 场景
 * @return {Object}
 */
export const sendText = async ({
	text,
	scene = 'session'
}: SendTextOptions) => {
	await checkWechatModuleIsEnable();
	if (
		!await RNWechat.sendText(text, getWXScene(scene))
	) { throw new WechatError(Errors.RequestFailed); }
	return listenAndHandleWechatResponse(WXRespType.Message);
};

interface SendImageOptions {
	image: string | number;
	scene?: 'session' | 'timeline' | 'favorite';
}

/**
 * 图片
 * @param  {String | Number}                      image               图片
 * @param  {'session' | 'timeline' | 'favorite'}  [scene='session' }] 场景
 * @return {Object}
 */
export async function sendImage({
	image,
	scene = 'session'
}: SendImageOptions) {
	await checkWechatModuleIsEnable();
	if (
		!await RNWechat.sendImage(resolveImageAsset(image), getWXScene(scene))
	) { throw new WechatError(Errors.RequestFailed); }
	return listenAndHandleWechatResponse(WXRespType.Message);
}

interface SendMusicOptions {
	music: string;
	data: string;
	title: string;
	desc: string;
	thumb: string | number;
	scene?: 'session' | 'timeline' | 'favorite';
}

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
export async function sendMusic({
	music,
	data,
	title,
	desc,
	thumb,
	scene = 'session'
}: SendMusicOptions) {
	await checkWechatModuleIsEnable();
	if (
		!await RNWechat.sendMusic(
			music, data, title, desc, resolveImageAsset(thumb), getWXScene(scene))
	) { throw new WechatError(Errors.RequestFailed); }
	return listenAndHandleWechatResponse(WXRespType.Message);
}

interface SendVideoOptions {
	video: string;
	title: string;
	desc: string;
	thumb: string | number;
	scene?: 'session' | 'timeline' | 'favorite';
}

/**
 * 视频
 * @param  {String}                               video               视频 url
 * @param  {String}                               title               标题
 * @param  {String}                               desc                描述
 * @param  {String | Number}                      thumb               缩略图
 * @param  {'session' | 'timeline' | 'favorite'}  [scene='session' }] 场景
 * @return {Object}
 */
export async function sendVideo({
	video,
	title,
	desc,
	thumb,
	scene = 'session'
}: SendVideoOptions) {
	await checkWechatModuleIsEnable();
	if (
		!await RNWechat.sendVideo(
			video, title, desc, resolveImageAsset(thumb), getWXScene(scene))
	) { throw new WechatError(Errors.RequestFailed); }
	return listenAndHandleWechatResponse(WXRespType.Message);
}

interface SendLinkOptions {
	link: string;
	title: string;
	desc: string;
	thumb: string;
	scene?: 'session' | 'timeline' | 'favorite';
}

/**
 * 链接
 * @param  {String}                              link              链接
 * @param  {String}                              title             标题
 * @param  {String}                              desc              描述
 * @param  {String}                              thumb             缩略图
 * @param  {'session' | 'timeline' | 'favorite'} [scene='session'] 场景
 * @return {Object}
 */
export async function sendLink({
	link,
	title,
	desc,
	thumb,
	scene = 'session'
}: SendLinkOptions) {
	await checkWechatModuleIsEnable();
	if (
		!await RNWechat.sendLink(
			link, title, desc, resolveImageAsset(thumb), getWXScene(scene))
	) { throw new WechatError(Errors.RequestFailed); }
	return listenAndHandleWechatResponse(WXRespType.Message);
}

interface SendMiniProgramOptions {
	username: string;
	path: string;
	hdThumb: string;
	title: string;
	desc: string;
	link: string;
	thumb: string;
	type: 'release' | 'test' | 'preview';
}

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
export async function sendMiniProgram({
	username,
	path,
	hdThumb,
	title,
	desc,
	link,
	thumb,
	type = 'release'
}: SendMiniProgramOptions) {
	await checkWechatModuleIsEnable();
	if (
		!await RNWechat.sendMiniProgram(
			username,
			getWXMiniProgramType(type),
			path,
			resolveImageAsset(hdThumb),
			title,
			desc,
			link,
			resolveImageAsset(thumb)
		)
	) { throw new WechatError(Errors.RequestFailed); }
	return listenAndHandleWechatResponse(WXRespType.Message);
}

interface PayOptions {
	appId: string;
	partnerId: string;
	prepayId: string;
	nonceStr: string;
	timestamp: string | number;
	packageSign: string;
	sign: string;
}

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
export async function pay({
	appId,
	partnerId,
	prepayId,
	nonceStr,
	timestamp,
	packageSign,
	sign
}: PayOptions) {
	await checkWechatModuleIsEnable();
	if (
		!await RNWechat.pay(
			appId,
			partnerId,
			prepayId,
			nonceStr,
			parseInt(timestamp.toString(), 10),
			packageSign,
			sign
		)
	) { throw new WechatError(Errors.RequestFailed); }
	return listenAndHandleWechatResponse(WXRespType.Pay);
}

/**
 * 判断微信是否可用
 * @desc 为了减少不必要的逻辑，在第一次检测通过后，下次检测直接通过，如果用户在调用一次通过后
 *       卸载微信，再次调用，会由微信返回错误信息
 *       安卓必须要先注册 api 才能调用其它方法，所以判断接口注册情况放在第一个
 * @return {Boolean}
 */
let checkWechatModuleIsEnable = async () => {
	if (!await RNWechat.isWXApiRegisteSuccess()) {
		throw new WechatError(Errors.UnRegisteApi);
	}
	if (!await isWXAppInstalled()) {
		throw new WechatError(Errors.UnInstall);
	}
	if (!await isWXAppSupportApi()) {
		throw new WechatError(Errors.UnSupportApi);
	}
	checkWechatModuleIsEnable = () => {
		return Promise.resolve(true);
	};
	return true;
};

const { RNWechat } = NativeModules;

// wechat event emitter
const WXEmitter = new NativeEventEmitter(RNWechat);

function rnWechatEventListener(listenEventType: WXRespType) {
	return new Promise<{
		errCode: ErrCode;
		errMsg: string;
	}>((resolve) => {
		// 微信返回事件处理
		const handleWechatEvent = ({ eventType, ...otherParams }: {
			eventType: string;
			errCode: ErrCode;
			errMsg: string;
		}) => {
			if (listenEventType !== eventType) { return; }
			clearSubscribe();
			resolve(otherParams);
		};
		// 切换形式回到前台，拿不到微信的响应结果
		const handleAppStateChange = (nextAppState: AppStateStatus) => {
			if (nextAppState !== 'active') { return; }
			clearSubscribe();
			resolve(Errors.ActiveSuccess);
		};
		// 清理事件监听
		const clearSubscribe = () => {
			subscription.remove();
			AppState.removeEventListener('change', handleAppStateChange);
		};

		const subscription = WXEmitter.addListener('RNWechatEvent', handleWechatEvent);
		AppState.addEventListener('change', handleAppStateChange);
	});
}

// listen wechat response handler
async function listenAndHandleWechatResponse(event: WXRespType) {
	const response = await rnWechatEventListener(event);

	const { errCode } = response;
	if (errCode === ErrCode.Success) {
		return response;
	} else if (errCode === ErrCode.ActiveSuccess) {
		return response;
	} else if (errCode === ErrCode.Common) {
		throw new WechatError(Errors.Common);
	} else if (errCode === ErrCode.UserCancel) {
		throw new WechatError(Errors.UserCancel);
	} else if (errCode === ErrCode.SentFail) {
		throw new WechatError(Errors.SentFail);
	} else if (errCode === ErrCode.AuthDeny) {
		throw new WechatError(Errors.AuthDeny);
	} else if (errCode === ErrCode.Unsupport) {
		throw new WechatError(Errors.Unsupport);
	} else if (errCode === ErrCode.Ban) {
		throw new WechatError(Errors.Ban);
	}
	throw new WechatError(Errors.Unknow);
}

export class WechatError extends Error {
	public errCode: ErrCode;
	public errMsg: string;
	public __proto__: WechatError | undefined;
	constructor({ errCode, errMsg }: { errCode: ErrCode; errMsg: string; }) {
		super(errMsg);

		this.name = 'WechatError';
		this.errCode = errCode;
		this.errMsg = errMsg;

		if (typeof Object.setPrototypeOf === 'function') {
			Object.setPrototypeOf(this, WechatError.prototype);
		} else {
			this.__proto__ = WechatError.prototype;
		}
	}
}
