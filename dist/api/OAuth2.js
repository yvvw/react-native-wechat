import * as HelperModule from "../helper";
import * as RNWModule from "../module";
import * as InitializeModule from "./initialize";
export var OAuth2Scope;
(function (OAuth2Scope) {
    OAuth2Scope["UserInfo"] = "snsapi_userinfo";
})(OAuth2Scope || (OAuth2Scope = {}));
export function OAuth2(option) {
    InitializeModule.checkInitialize();
    return HelperModule.invokeWrapper(RNWModule.OAuth2(parseOption(option)));
}
const defaultOption = {
    scope: OAuth2Scope.UserInfo,
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
