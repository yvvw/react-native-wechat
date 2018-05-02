package com.rnlib.wechat.helper;

import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;

public class SendMessageToWXHelper {

    public static SendMessageToWX.Req getInstance(WXMediaMessage message, int scene) {
        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.message = message;
        req.scene = scene;

        return req;
    }
}
