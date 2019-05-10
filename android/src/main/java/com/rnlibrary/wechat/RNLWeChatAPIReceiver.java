package com.rnlibrary.wechat;

import com.facebook.react.bridge.ReadableMap;

public interface RNLWeChatAPIReceiver {
    void onReqFromWeChat(ReadableMap payload);

    void onRespFromWeChat(String name, boolean isSuccess, ReadableMap payload);
}
