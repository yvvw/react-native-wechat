export var Errors;
(function (Errors) {
    // 普通错误类型
    Errors[Errors["Common"] = -1] = "Common";
    // 用户点击取消并返回
    Errors[Errors["UserCancel"] = -2] = "UserCancel";
    // 发送失败
    Errors[Errors["SentFail"] = -3] = "SentFail";
    // 授权失败
    Errors[Errors["AuthDeny"] = -4] = "AuthDeny";
    // 微信不支持
    Errors[Errors["Unsupport"] = -5] = "Unsupport";
    // 签名校验失败
    Errors[Errors["Ban"] = -6] = "Ban";
    // 调用失败(参数不正确, 图片太大, 文字过长, 没有初始化)
    Errors[Errors["InvokeFailed"] = 1] = "InvokeFailed";
})(Errors || (Errors = {}));
export class WeChatError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this, WeChatError);
        }
        this.name = "WeChatError";
    }
}
