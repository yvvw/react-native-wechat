package com.rnlibrary.wechat;

public enum RNLWeChatMessageType {
    Text(0),
    Image(1),
    Music(2),
    Video(3),
    File(4),
    Webpage(5),
    MiniProgram(6),
    AppExtend(7),
    Emoticon(8),
    Location(9);

    private int type;

    RNLWeChatMessageType(int type) {
        this.type = type;
    }

    public int getType() {
        return type;
    }
}
