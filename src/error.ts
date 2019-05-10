export enum Errors {
    // 普通错误类型
    Common = -1,
    // 用户点击取消并返回
    UserCancel = -2,
    // 发送失败
    SentFail = -3,
    // 授权失败
    AuthDeny = -4,
    // 微信不支持
    Unsupport = -5,
    // 签名校验失败
    Ban = -6,
    // 调用失败(参数不正确, 图片太大, 文字过长, 没有初始化)
    InvokeFailed = 1,
}

export class WeChatError extends Error {
    constructor(readonly code: number, readonly message: string) {
        super(message);
        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this, WeChatError);
        }
        this.name = "WeChatError";
    }
}
