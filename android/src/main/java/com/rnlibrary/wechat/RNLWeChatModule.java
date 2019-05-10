package com.rnlibrary.wechat;

import android.content.Intent;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tencent.mm.opensdk.modelbiz.AddCardToWXCardPackage;
import com.tencent.mm.opensdk.modelbiz.ChooseCardFromWXCardPackage;
import com.tencent.mm.opensdk.modelbiz.OpenWebview;
import com.tencent.mm.opensdk.modelbiz.SubscribeMessage;
import com.tencent.mm.opensdk.modelbiz.SubscribeMiniProgramMsg;
import com.tencent.mm.opensdk.modelbiz.WXInvoiceAuthInsert;
import com.tencent.mm.opensdk.modelbiz.WXLaunchMiniProgram;
import com.tencent.mm.opensdk.modelbiz.WXNontaxPay;
import com.tencent.mm.opensdk.modelbiz.WXOpenBusinessView;
import com.tencent.mm.opensdk.modelbiz.WXOpenBusinessWebview;
import com.tencent.mm.opensdk.modelbiz.WXPayInsurance;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelpay.JumpToOfflinePay;
import com.tencent.mm.opensdk.modelpay.PayReq;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
import com.tencent.mm.opensdk.utils.ILog;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;

public class RNLWeChatModule extends ReactContextBaseJavaModule implements RNLWeChatAPIReceiver {
    private static final String ModuleName = "RNLWeChat";
    private static ReactApplicationContext mReactContext;
    static boolean isInstanced;

    private static IWXAPI mAPI;
    private String mAPPID;
    private final Map<String, Promise> mResponseHandle = new HashMap<>();
    private boolean isListeningWeChatRequest;
    private final List<ReadableMap> mPendingRequests = new ArrayList<>();

    private static IWXAPIEventHandler mAPIDelegate;

    RNLWeChatModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        isInstanced = true;
        mReactContext = reactContext;
        RNLWeChatAPIDelegate delegate = new RNLWeChatAPIDelegate();
        delegate.setReceiver(this);
        mAPIDelegate = delegate;
    }

    static void handleIntent(Intent intent) {
        IWXAPI api = getSingletonAPI();
        api.handleIntent(intent, mAPIDelegate);
    }

    private static IWXAPI getSingletonAPI() {
        if (mAPI == null) {
            mAPI = WXAPIFactory.createWXAPI(mReactContext, null, true);
        }
        return mAPI;
    }

    @Nonnull
    @Override
    public String getName() {
        return ModuleName;
    }

    @ReactMethod
    public void initialize(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();

        if (option.getBoolean("debug")) {
            api.setLogImpl(new Debugger());
        } else {
            api.setLogImpl(null);
        }
        mAPPID = option.getString("appID");
        if (api.registerApp(mAPPID)) {
            promise.resolve(null);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "APP register failed.");
        }
    }

    @ReactMethod
    public void isAppInstalled(Promise promise) {
        IWXAPI api = getSingletonAPI();
        promise.resolve(api.isWXAppInstalled());
    }

    @ReactMethod
    public void getAppInstallUrl(Promise promise) {
        promise.resolve("https://weixin.qq.com/");
    }

    @ReactMethod
    public void openApp(Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.openWXApp()) {
            promise.resolve(null);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Open APP failed.");
        }
    }

    @ReactMethod
    public void isSupportOpenApi(Promise promise) {
        IWXAPI api = getSingletonAPI();
        promise.resolve(api.getWXAppSupportAPI());
    }

    @ReactMethod
    public void getSDKVersion(Promise promise) {
        promise.resolve(com.tencent.mm.opensdk.constants.Build.SDK_VERSION_NAME);
    }

    @ReactMethod
    public void auth(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getSendAuthReq(option))) {
            mResponseHandle.put(SendAuth.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Send authorize request failed.");
        }
    }

    @ReactMethod
    public void pay(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getPayReq(option, mAPPID))) {
            mResponseHandle.put(PayReq.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Send pay request failed.");
        }
    }

    @ReactMethod
    public void offlinePay(Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getJumpToOfflinePayReq())) {
            mResponseHandle.put(JumpToOfflinePay.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Send offline pay request failed.");
        }
    }

    @ReactMethod
    public void nontaxPay(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getWXNontaxPayReq(option))) {
            mResponseHandle.put(WXNontaxPay.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Nontax pay request failed.");
        }
    }

    @ReactMethod
    public void payInsurance(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getWXPayInsuranceReq(option))) {
            mResponseHandle.put(WXPayInsurance.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Pay insurance request failed.");
        }
    }

    @ReactMethod
    public void openTempSession(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getJumpToBizTempSessionReq(option))) {
            promise.resolve(null);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Open temp session request failed.");
        }
    }

    @ReactMethod
    public void openRankList(Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getOpenRankListReq())) {
            promise.resolve(null);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Open rank list request failed.");
        }
    }

    @ReactMethod
    public void openWebView(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getOpenWebviewReq(option))) {
            mResponseHandle.put(OpenWebview.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Open webview request failed.");
        }
    }

    @ReactMethod
    public void openBusinessView(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getWXOpenBusinessViewReq(option))) {
            mResponseHandle.put(WXOpenBusinessView.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Open business view request failed.");
        }
    }

    @ReactMethod
    public void openBusinessWebView(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getWXOpenBusinessWebviewReq(option))) {
            mResponseHandle.put(WXOpenBusinessWebview.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Open business webview request failed.");
        }
    }

    @ReactMethod
    public void jumpToBizProfile(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getJumpToBizProfileReq(option))) {
            promise.resolve(null);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Jump to biz profile request failed.");
        }
    }

    @ReactMethod
    public void jumpToBizWebView(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getJumpToBizWebviewReq(option))) {
            promise.resolve(null);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Jump to biz webview request failed.");
        }
    }

    @ReactMethod
    public void addCard(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getAddCardToWXCardPackageReq(option))) {
            mResponseHandle.put(AddCardToWXCardPackage.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Add card to card package request failed.");
        }
    }

    @ReactMethod
    public void chooseCard(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getChooseCardFromWXCardPackageReq(option))) {
            mResponseHandle.put(ChooseCardFromWXCardPackage.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Choose card request failed.");
        }
    }

    @ReactMethod
    public void chooseInvoice(ReadableMap option, Promise promise) {
        promise.reject(RNLWeChatError.InvokeFailed.toString(),
                "WeChat api not implement for android platform.");
    }

    @ReactMethod
    public void invoiceAuthInsert(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getWXInvoiceAuthInsertReq(option))) {
            mResponseHandle.put(WXInvoiceAuthInsert.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Invoice auth insert request failed.");
        }
    }

    @ReactMethod
    public void launchMiniProgram(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getWXLaunchMiniProgramReq(option))) {
            mResponseHandle.put(WXLaunchMiniProgram.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Launch mini program request failed.");
        }
    }

    @ReactMethod
    public void subscribeMiniProgramMessage(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getSubscribeMiniProgramMsgReq(option))) {
            mResponseHandle.put(SubscribeMiniProgramMsg.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Subscribe mini program message request failed.");
        }
    }

    @ReactMethod
    public void sendMessage(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        try {
            if (api.sendReq(RNLWeChatReq.getSendMessageToWXReq(mReactContext, option))) {
                mResponseHandle.put(SendMessageToWX.Req.class.getName(), promise);
            } else {
                promise.reject(RNLWeChatError.InvokeFailed.toString(),
                        "Send message request failed.");
            }
        } catch (Exception e) {
            promise.reject(RNLWeChatError.InvokeFailed.toString(), e.toString());
        }
    }

    @ReactMethod
    public void subscribeMessage(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendReq(RNLWeChatReq.getSubscribeMessageReq(option))) {
            mResponseHandle.put(SubscribeMessage.Req.class.getName(), promise);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Subscribe message request failed.");
        }
    }

    @ReactMethod
    public void sendMessageResp(ReadableMap option, Promise promise) {
        IWXAPI api = getSingletonAPI();
        try {
            if (api.sendResp(RNLWeChatResp.getGetMessageFromWXResp(mReactContext, option))) {
                promise.resolve(null);
            } else {
                promise.reject(RNLWeChatError.InvokeFailed.toString(),
                        "Send message response failed.");
            }
        } catch (Exception e) {
            promise.reject(RNLWeChatError.InvokeFailed.toString(), e.getMessage());
        }
    }

    @ReactMethod
    public void showMessageResp(Promise promise) {
        IWXAPI api = getSingletonAPI();
        if (api.sendResp(RNLWeChatResp.getShowMessageFromWXResp(null))) {
            promise.resolve(null);
        } else {
            promise.reject(RNLWeChatError.InvokeFailed.toString(),
                    "Show message response failed.");
        }
    }

    @ReactMethod
    public void listenRequest(Promise promise) {
        isListeningWeChatRequest = true;
        if (!mPendingRequests.isEmpty()) {
            WritableArray results = Arguments.createArray();
            for (ReadableMap item : mPendingRequests) {
                results.pushMap((WritableMap) item);
            }
            mPendingRequests.clear();
            promise.resolve(results);
        } else {
            promise.resolve(null);
        }
    }

    @ReactMethod
    public void stopListenRequest(Promise promise) {
        isListeningWeChatRequest = false;
        promise.resolve(null);
    }

    private static final String WeChatRequestEventName = "RNLWeChatRequestEvent";

    @Override
    public void onReqFromWeChat(ReadableMap payload) {
        if (isListeningWeChatRequest) {
            mReactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(WeChatRequestEventName, payload);
        } else {
            mPendingRequests.add(payload);
        }
    }

    @Override
    public void onRespFromWeChat(String name, boolean isSuccess, ReadableMap payload) {
        if (mResponseHandle.containsKey(name)) {
            Promise promise = mResponseHandle.get(name);
            if (promise != null) {
                if (isSuccess) {
                    promise.resolve(payload);
                } else {
                    promise.reject(String.valueOf(payload.getInt("errorCode")),
                            payload.toString());
                }
            }
        }
    }

    private class Debugger implements ILog {
        @Override
        public void v(String s, String s1) {
            FLog.v(s, s1);
        }

        @Override
        public void d(String s, String s1) {
            FLog.d(s, s1);
        }

        @Override
        public void i(String s, String s1) {
            FLog.i(s, s1);
        }

        @Override
        public void w(String s, String s1) {
            FLog.w(s, s1);
        }

        @Override
        public void e(String s, String s1) {
            FLog.e(s, s1);
        }
    }
}
