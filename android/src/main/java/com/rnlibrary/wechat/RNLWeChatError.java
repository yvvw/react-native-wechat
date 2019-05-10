package com.rnlibrary.wechat;

public enum RNLWeChatError {
    InvokeFailed(1);

    private Integer code;

    RNLWeChatError(Integer code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return String.valueOf(code);
    }
}
