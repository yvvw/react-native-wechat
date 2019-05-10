import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { RNWModule } from "./module";
export var MiniProgramType;
(function (MiniProgramType) {
    // 正式版
    MiniProgramType[MiniProgramType["Release"] = 0] = "Release";
    // 开发版
    MiniProgramType[MiniProgramType["Test"] = 1] = "Test";
    // 体验版
    MiniProgramType[MiniProgramType["Preview"] = 2] = "Preview";
})(MiniProgramType || (MiniProgramType = {}));
const defaultLaunchMiniProgramOption = {
    username: "",
    type: MiniProgramType.Release,
    path: "",
    ext: "",
};
export function launchMiniProgram(option) {
    return invokeWrapper(RNWModule.launchMiniProgram(parseLaunchMiniProgramOption(option)));
}
function parseLaunchMiniProgramOption(o) {
    const option = Object.assign({}, defaultLaunchMiniProgramOption);
    if (typeof o.username === "string") {
        option.username = o.username;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected username is string, but get ${o.username}.`);
    }
    if (typeof o.type === "number") {
        option.type = o.type;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected type is number, but get ${o.type}.`);
    }
    if (typeof o.path === "string") {
        option.path = o.path;
    }
    if (typeof o.ext === "string") {
        option.ext = o.ext;
    }
    return option;
}
const defaultSubscribeMiniProgramMessageOption = {
    appID: "",
};
export function subscribeMiniProgramMessage(option) {
    return invokeWrapper(RNWModule.subscribeMiniProgramMessage(parseSubscribeMiniProgramMessageOption(option)));
}
function parseSubscribeMiniProgramMessageOption(o) {
    const option = Object.assign({}, defaultSubscribeMiniProgramMessageOption);
    if (typeof o.appID === "string") {
        option.appID = o.appID;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected appID is string, but get ${o.appID}.`);
    }
    return option;
}
