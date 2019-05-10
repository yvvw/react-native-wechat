package com.rnlibrary.wechat;

public enum RNLWeChatRequestType {
    GetMessage(0),
    ShowMessage(1),
    LaunchFromWX(2);

    private int type;

    RNLWeChatRequestType(int type) {
        this.type = type;
    }

    public int getType() {
        return type;
    }
}
