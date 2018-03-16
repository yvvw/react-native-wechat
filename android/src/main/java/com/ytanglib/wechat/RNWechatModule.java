package com.ytanglib.wechat;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.ShowMessageFromWX;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXMiniProgramObject;
import com.tencent.mm.opensdk.modelmsg.WXTextObject;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

public class RNWechatModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext mReactContext;
    private static final String Tag = "RNWechat";
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

    @ReactMethod
    public void registerApp(String appId, String isDebug, Promise promise) {
        if (!appId.isEmpty()) {
            api = WXAPIFactory.createWXAPI(mReactContext, appId, true);
            isWXApiRegisteSuccess = api.registerApp(appId);
            if (isWXApiRegisteSuccess) {
                Log.i(Tag, "WXApi register success. appId: " + appId);
            } else {
                Log.i(Tag, "WXApi register failed. appId: " + appId);
            }

        } else {
            Log.i(Tag, "There is no appId for WXApi.");
        }
        promise.resolve(getOperateResult(isWXApiRegisteSuccess));
    }

    @ReactMethod
    public void isWXApiRegisteSuccess(Promise promise) {
        promise.resolve(getOperateResult(isWXApiRegisteSuccess));
    }

    @ReactMethod
    public void isWXAppInstalled(Promise promise) {
        promise.resolve(getOperateResult(api.isWXAppInstalled()));
    }

    @ReactMethod
    public void sendAuthRequestScope(
            String scope,
            String state,
            String openId,
            Promise promise) {
        final SendAuth.Req req = new SendAuth.Req();
        req.scope = scope;
        req.state = state;
        req.openId = openId;
        boolean res = api.sendReq(req);
        promise.resolve(getOperateResult(res));
    }

    @ReactMethod
    public void sendText(
            String text,
            Integer sceneType,
            Promise promise) {
        WXTextObject textObject = new WXTextObject();
        textObject.text = text;

        WXMediaMessage mediaMessage = getMediaMessageWithData(null, null, null, textObject);
        promise.resolve(getOperateResult(sendMessageRequest(mediaMessage, sceneType)));
    }

    @ReactMethod
    public void sendLinkURL(
            String urlString,
            String title,
            String description,
            String thumbUrlString,
            Integer sceneType,
            Promise promise) {
        WXWebpageObject webObj = new WXWebpageObject();
        webObj.webpageUrl = urlString;

        byte[] thumbByteArray = Utils.getByteArrayFromUrlStringWithScale(thumbUrlString, 100, 100);

        WXMediaMessage mediaMessage = getMediaMessageWithData(title, description, thumbByteArray, webObj);
        promise.resolve(getOperateResult(sendMessageRequest(mediaMessage, sceneType)));
    }

    @ReactMethod
    public void sendMiniProgramWebpageUrl(
            String webpageUrl,
            String userName,
            String path,
            String title,
            String description,
            String thumbUrlString,
            String hdImageUrlString,
            Integer programType,
            Promise promise) {
        WXMiniProgramObject miniObj = new WXMiniProgramObject();
        miniObj.webpageUrl = webpageUrl;
        miniObj.userName = userName;
        miniObj.path = path;
        miniObj.miniprogramType = programType;
        miniObj.withShareTicket = true;

        String imageUrlString = hdImageUrlString.isEmpty() ? thumbUrlString : hdImageUrlString;
        byte[] thumbByteArray = Utils.getByteArrayFromUrlStringWithScale(imageUrlString, 500, 400);

        WXMediaMessage mediaMessage = getMediaMessageWithData(title, description, thumbByteArray, miniObj);
        promise.resolve(getOperateResult(sendMessageRequest(mediaMessage, SendMessageToWX.Req.WXSceneSession)));
    }

    private String getOperateResult(boolean isOperateSucc) {
        return isOperateSucc ? "true" : "false";
    }

    private WXMediaMessage getMediaMessageWithData(
            String title,
            String description,
            byte[] thumbData,
            WXMediaMessage.IMediaObject mediaObject) {
        WXMediaMessage mediaMessage = new WXMediaMessage();
        mediaMessage.title = title;
        mediaMessage.description = description;
        mediaMessage.thumbData = thumbData;
        mediaMessage.mediaObject = mediaObject;
        return mediaMessage;
    }

    private boolean sendMessageRequest(WXMediaMessage mediaMessage, Integer scene) {
        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.message = mediaMessage;
        req.scene = scene;
        return api.sendReq(req);
    }

    public static void handleIntent(Intent intent) {
        api.handleIntent(intent, new IWXAPIEventHandler() {
            @Override
            public void onReq(BaseReq baseReq) {
                if (baseReq instanceof ShowMessageFromWX.Req) {
                    try {
                        Utils.moveCurrentActivityToTop(mReactContext);
                    } catch (NullPointerException ignored) {
                    }
                }
            }

            @Override
            public void onResp(BaseResp baseResp) {
                WritableMap body = Arguments.createMap();
                body.putInt("errCode", baseResp.errCode);
                body.putString("errStr", Utils.checkNullableString(baseResp.errStr));
                // body.putString("transaction", Utils.checkNullableString(baseResp.transaction));
                // body.putString("openId", Utils.checkNullableString(baseResp.openId));

                if (baseResp instanceof SendMessageToWX.Resp) {
                    SendMessageToWX.Resp resp = (SendMessageToWX.Resp) baseResp;
                    body.putString("eventType", "SendMessageToWXResp");

                } else if (baseResp instanceof SendAuth.Resp) {
                    SendAuth.Resp resp = (SendAuth.Resp) baseResp;
                    body.putString("eventType", "SendAuthResp");
                    body.putString("code", Utils.checkNullableString(resp.code));
                    body.putString("state", Utils.checkNullableString(resp.state));
                    body.putString("url", Utils.checkNullableString(resp.url));
                    body.putString("lang", Utils.checkNullableString(resp.lang));
                    body.putString("country", Utils.checkNullableString(resp.country));
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
