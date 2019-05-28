import * as HelperModule from "../helper";
import * as RNWModule from "../module";
import * as InitializeModule from "./initialize";
export var AuthScope;
(function (AuthScope) {
    AuthScope["UserInfo"] = "snsapi_userinfo";
})(AuthScope || (AuthScope = {}));
export function auth(option) {
    InitializeModule.checkInitialize();
    return HelperModule.invokeWrapper(RNWModule.auth(parseOption(option)));
}
const defaultOption = {
    scope: AuthScope.UserInfo,
    state: "",
    fallback: false,
};
function parseOption(o) {
    const option = Object.assign({}, defaultOption);
    if (typeof o.scope === "string") {
        option.scope = o.scope;
    }
    if (typeof o.state === "string") {
        option.state = o.state;
    }
    if (typeof o.fallback === "boolean") {
        option.fallback = o.fallback;
    }
    return option;
}
