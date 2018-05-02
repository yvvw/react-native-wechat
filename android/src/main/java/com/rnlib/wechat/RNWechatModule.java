package com.rnlib.wechat;

import android.content.Intent;
import android.graphics.Bitmap;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.rnlib.wechat.helper.ActivityHelper;
import com.rnlib.wechat.helper.FormatConversion;
import com.rnlib.wechat.helper.SendMessageToWXHelper;
import com.rnlib.wechat.helper.WXMediaMessageHelper;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.WXImageObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXMiniProgramObject;
import com.tencent.mm.opensdk.modelmsg.WXMusicObject;
import com.tencent.mm.opensdk.modelmsg.WXTextObject;
import com.tencent.mm.opensdk.modelmsg.WXVideoObject;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.modelpay.PayReq;
import com.tencent.mm.opensdk.modelpay.PayResp;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
import com.tencent.mm.opensdk.utils.ILog;

public class RNWechatModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext mReactContext;
    private static final String TAG = "RNWechat";
    private static final String RNWechatEventName = "RNWechatEvent";
    private static IWXAPI api;
    private boolean isWXApiRegisteSuccess = false;

    public RNWechatModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNWechat";
    }

    /**
     * 注册 api
     */
    @ReactMethod
    public void registerApp(String appId, Boolean isDebug, Promise promise) {
        if (!appId.isEmpty()) {
            api = WXAPIFactory.createWXAPI(mReactContext, appId, true);

            if (isDebug) {
                api.setLogImpl(new ILog() {
                    @Override
                    public void v(String s, String s1) {
                        Log.d(TAG, s1);
                    }

                    @Override
                    public void d(String s, String s1) {
                        Log.d(TAG, s1);
                    }

                    @Override
                    public void i(String s, String s1) {
                        Log.i(TAG, s1);
                    }

                    @Override
                    public void w(String s, String s1) {
                        Log.w(TAG, s1, null);
                    }

                    @Override
                    public void e(String s, String s1) {
                        Log.e(TAG, s1, null);
                    }
                });
            }

            isWXApiRegisteSuccess = api.registerApp(appId);
            if (isWXApiRegisteSuccess) {
                Log.d(TAG, "WXApi register success. appId: " + appId);
            } else {
                Log.d(TAG, "WXApi register failed. appId: " + appId);
            }

        } else {
            Log.d(TAG, "There is no appId for WXApi.");
        }

        promise.resolve(isWXApiRegisteSuccess);
    }

    /**
     * api 注册是否成功
     */
    @ReactMethod
    public void isWXApiRegisteSuccess(Promise promise) {
        promise.resolve(isWXApiRegisteSuccess);
    }

    /**
     * 微信是否安装
     */
    @ReactMethod
    public void isWXAppInstalled(Promise promise) {
        promise.resolve(api.isWXAppInstalled());
    }

    /**
     * 安装版本微信是否支持 api
     */
    @ReactMethod
    public void isWXAppSupportApi(Promise promise) {
        promise.resolve(api.isWXAppSupportAPI());
    }

    /**
     * 打开微信
     */
    @ReactMethod
    public void openWXApp(Promise promise) {
        promise.resolve(api.openWXApp());
    }

    /**
     * OAuth2
     */
    @ReactMethod
    public void sendAuthRequest(
            String scope,
            String state,
            Promise promise) {

        final SendAuth.Req req = new SendAuth.Req();
        req.scope = scope;
        req.state = state;

        promise.resolve(api.sendReq(req));
    }

    /**
     * 发送文字
     */
    @ReactMethod
    public void sendText(
            String text,
            Integer sceneType,
            Promise promise) {

        WXTextObject textObject = new WXTextObject(text);

        WXMediaMessage mediaMessage = WXMediaMessageHelper.getInstance(null, null, null, textObject);

        SendMessageToWX.Req req = SendMessageToWXHelper.getInstance(mediaMessage, sceneType);

        promise.resolve(api.sendReq(req));
    }

    /**
     * 发送图片
     */
    @ReactMethod
    public void sendImage(
            String imageString,
            Integer sceneType,
            Promise promise) {

        WXImageObject imageObject = new WXImageObject(FormatConversion.stringToBitmap(imageString));

        WXMediaMessage mediaMessage = WXMediaMessageHelper.getInstance(null, null, null, imageObject);

        SendMessageToWX.Req req = SendMessageToWXHelper.getInstance(mediaMessage, sceneType);

        promise.resolve(api.sendReq(req));
    }

    /**
     * 发送音乐
     */
    @ReactMethod
    public void sendMusic(
            String musicUrl,
            String musicDataUrl,
            String title,
            String description,
            String thumbString,
            Integer sceneType,
            Promise promise) {

        WXMusicObject musicObject = new WXMusicObject();
        musicObject.musicUrl = musicUrl;
        musicObject.musicDataUrl = musicDataUrl;

        Bitmap thumb = FormatConversion.stringToBitmapWithScale(thumbString, 100, 100);

        WXMediaMessage mediaMessage = WXMediaMessageHelper.getInstance(
                title, description, FormatConversion.bitmapToByteArray(thumb), musicObject);

        SendMessageToWX.Req req = SendMessageToWXHelper.getInstance(mediaMessage, sceneType);

        promise.resolve(api.sendReq(req));
    }

    /**
     * 发送视频
     */
    @ReactMethod
    public void sendVideo(
            String videoUrl,
            String title,
            String description,
            String thumbString,
            Integer sceneType,
            Promise promise) {

        WXVideoObject videoObject = new WXVideoObject();
        videoObject.videoUrl = videoUrl;

        Bitmap thumb = FormatConversion.stringToBitmapWithScale(thumbString, 100, 100);

        WXMediaMessage mediaMessage = WXMediaMessageHelper.getInstance(
                title, description, FormatConversion.bitmapToByteArray(thumb), videoObject);

        SendMessageToWX.Req req = SendMessageToWXHelper.getInstance(mediaMessage, sceneType);

        promise.resolve(api.sendReq(req));
    }

    /**
     * 发送链接
     */
    @ReactMethod
    public void sendLink(
            String linkString,
            String title,
            String description,
            String thumbString,
            Integer sceneType,
            Promise promise) {

        WXWebpageObject webpageObj = new WXWebpageObject(linkString);

        Bitmap thumb = FormatConversion.stringToBitmapWithScale(thumbString, 100, 100);

        WXMediaMessage mediaMessage = WXMediaMessageHelper.getInstance(
                title, description, FormatConversion.bitmapToByteArray(thumb), webpageObj);

        SendMessageToWX.Req req = SendMessageToWXHelper.getInstance(mediaMessage, sceneType);

        promise.resolve(api.sendReq(req));
    }

    /**
     * 发送小程序
     */
    @ReactMethod
    public void sendMiniProgram(
            String userName,
            Integer miniprogramType,
            String path,
            String hdThumbString,
            String title,
            String description,
            String webpageUrl,
            String thumbString,
            Promise promise) {

        WXMiniProgramObject miniprogramObject = new WXMiniProgramObject();
        miniprogramObject.userName = userName;
        miniprogramObject.miniprogramType = miniprogramType;
        miniprogramObject.path = path;
        miniprogramObject.webpageUrl = webpageUrl;
        miniprogramObject.withShareTicket = true;

        String realThumbString = hdThumbString.isEmpty() ? thumbString : hdThumbString;
        Bitmap realThumb = FormatConversion.stringToBitmapWithScale(realThumbString, 500, 400);

        WXMediaMessage mediaMessage = WXMediaMessageHelper.getInstance(
                title, description, FormatConversion.bitmapToByteArray(realThumb), miniprogramObject);

        SendMessageToWX.Req req = SendMessageToWXHelper.getInstance(mediaMessage, SendMessageToWX.Req.WXSceneSession);

        promise.resolve(api.sendReq(req));
    }

    /**
     * 支付
     */
    @ReactMethod
    public void pay(
            String appId,
            String partnerId,
            String prepayId,
            String nonceStr,
            Integer timeStamp,
            String packageValue,
            String sign,
            Promise promise) {

        PayReq req = new PayReq();
        req.appId = appId;
        req.partnerId = partnerId;
        req.prepayId = prepayId;
        req.nonceStr = nonceStr;
        req.timeStamp = timeStamp.toString();
        req.packageValue = packageValue;
        req.sign = sign;

        promise.resolve(api.sendReq(req));
    }

    public static void handleIntent(Intent intent) {
        api.handleIntent(intent, new IWXAPIEventHandler() {
            @Override
            public void onReq(BaseReq baseReq) {
                // TODO: 2018/5/2 微信小程序唤醒 App 参数传递
//                if (baseReq instanceof ShowMessageFromWX.Req) {
//                    ShowMessageFromWX.Req req = (ShowMessageFromWX.Req) baseReq;
//                    WritableMap reqBody = Arguments.createMap();
//                    reqBody.putString("messageExt", req.message.messageExt);
//                }

                try {
                    ActivityHelper.moveTop(mReactContext);
                } catch (NullPointerException ignored) {
                }
            }

            @Override
            public void onResp(BaseResp baseResp) {
                WritableMap body = Arguments.createMap();
                body.putInt("errCode", baseResp.errCode);
                body.putString("errStr", FormatConversion.getNonNullString(baseResp.errStr));

                if (baseResp instanceof SendMessageToWX.Resp) {
                    // 分享
                    body.putString("eventType", "SendMessageToWXResp");
                } else if (baseResp instanceof SendAuth.Resp) {
                    // OAuth2
                    SendAuth.Resp resp = (SendAuth.Resp) baseResp;
                    body.putString("eventType", "SendAuthResp");
                    body.putString("code", FormatConversion.getNonNullString(resp.code));
                    body.putString("state", FormatConversion.getNonNullString(resp.state));
                    body.putString("url", FormatConversion.getNonNullString(resp.url));
                    body.putString("lang", FormatConversion.getNonNullString(resp.lang));
                    body.putString("country", FormatConversion.getNonNullString(resp.country));
                } else if (baseResp instanceof PayResp) {
                    // 支付
                    PayResp resp = (PayResp) baseResp;
                    body.putString("eventType", "PayResp");
                    body.putString("prepayId", FormatConversion.getNonNullString(resp.prepayId));
                    body.putString("returnKey", FormatConversion.getNonNullString(resp.returnKey));
                }

                RNWechatModule.sendEvent(body);
            }
        });
    }

    private static void sendEvent(WritableMap mBody) {
        mReactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(RNWechatEventName, mBody);
    }
}
