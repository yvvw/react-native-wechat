import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { Result, RNWModule } from "./module";

export enum AuthScope {
    UserInfo = "snsapi_userinfo",
}

interface IAuthOption {
    state: string;
    scope?: AuthScope;
    // 是否在未安装微信情况下使用网页授权
    fallback?: boolean;
}

const defaultOption: IAuthOption = {
    state: "",
    scope: AuthScope.UserInfo,
    fallback: false,
};

interface IAuthResult {
    code: string;
    state: string;
    lang: string;
    country: string;
}

// auth

export function auth(option: IAuthOption): Result<IAuthResult> {
    return invokeWrapper(RNWModule.auth(parseOption(option)), 60000);
}

function parseOption(o: IAuthOption) {
    const option = Object.assign({}, defaultOption);
    if (typeof o.state === "string") {
        option.state = o.state;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected state is string, but get ${o.state}.`);
    }
    if (typeof o.scope === "string") {
        option.scope = o.scope;
    }
    if (typeof o.fallback === "boolean") {
        option.fallback = o.fallback;
    }
    return option;
}
