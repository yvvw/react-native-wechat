export declare enum Errors {
    Common = -1,
    UserCancel = -2,
    SentFail = -3,
    AuthDeny = -4,
    Unsupport = -5,
    Ban = -6,
    InvokeFailed = 1
}
export declare class WeChatError extends Error {
    readonly code: number;
    readonly message: string;
    constructor(code: number, message: string);
}
