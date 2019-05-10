package com.rnlibrary.wechat;

import android.content.Context;

import com.facebook.react.bridge.ReadableMap;
import com.tencent.mm.opensdk.modelmsg.GetMessageFromWX;
import com.tencent.mm.opensdk.modelmsg.ShowMessageFromWX;

public class RNLWeChatResp {
    static GetMessageFromWX.Resp getGetMessageFromWXResp(Context context, ReadableMap option) throws Exception {
        GetMessageFromWX.Resp resp = new GetMessageFromWX.Resp();
        resp.message = RNLWeChatAPIObjectConvert.mediaMessageToWXO(context, option);
        return resp;
    }

    static ShowMessageFromWX.Resp getShowMessageFromWXResp(ReadableMap option) {
        return new ShowMessageFromWX.Resp();
    }
}
