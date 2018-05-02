package com.rnlib.wechat.helper;

import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;

public class WXMediaMessageHelper {

    public static WXMediaMessage getInstance(String title,
                                             String description,
                                             byte[] thumbData,
                                             WXMediaMessage.IMediaObject mediaObject) {
        WXMediaMessage mediaMessage = new WXMediaMessage(mediaObject);
        mediaMessage.title = title;
        mediaMessage.description = description;
        mediaMessage.thumbData = thumbData;

        return mediaMessage;
    }
}
