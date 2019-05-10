import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { RNWModule } from "./module";
export var AuthScope;
(function (AuthScope) {
    AuthScope["UserInfo"] = "snsapi_userinfo";
})(AuthScope || (AuthScope = {}));
const defaultOption = {
    state: "",
    scope: AuthScope.UserInfo,
    fallback: false,
};
// auth
export function auth(option) {
    return invokeWrapper(RNWModule.auth(parseOption(option)), 60000);
}
function parseOption(o) {
    const option = Object.assign({}, defaultOption);
    if (typeof o.state === "string") {
        option.state = o.state;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected state is string, but get ${o.state}.`);
    }
    if (typeof o.scope === "string") {
        option.scope = o.scope;
    }
    if (typeof o.fallback === "boolean") {
        option.fallback = o.fallback;
    }
    return option;
}
