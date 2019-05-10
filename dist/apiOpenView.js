import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { RNWModule } from "./module";
const defaultOpenTempSessionOption = {
    username: "",
    session: "",
};
export function openTempSession(option) {
    return invokeWrapper(RNWModule.openTempSession(parseOpenTempSessionOption(option)));
}
function parseOpenTempSessionOption(o) {
    const option = Object.assign({}, defaultOpenTempSessionOption);
    if (typeof o.username === "string") {
        option.username = o.username;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected username is string, but get ${o.username}.`);
    }
    if (typeof o.session === "string") {
        option.session = o.session;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected session is string, but get ${o.session}.`);
    }
    return option;
}
// openRankList
export function openRankList() {
    return invokeWrapper(RNWModule.openRankList());
}
const defaultOpenWebViewOption = {
    url: "",
};
export function openWebView(option) {
    return invokeWrapper(RNWModule.openWebView(parseOpenWebViewOption(option)));
}
function parseOpenWebViewOption(o) {
    const option = Object.assign({}, defaultOpenWebViewOption);
    if (typeof o.url === "string") {
        option.url = o.url;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected url is string, but get ${o.url}.`);
    }
    return option;
}
const defaultOpenBusinessViewOption = {
    type: "",
    query: "",
    ext: "",
};
export function openBusinessView(option) {
    return invokeWrapper(RNWModule.openBusinessView(parseOpenBusinessViewOption(option)));
}
function parseOpenBusinessViewOption(o) {
    const option = Object.assign({}, defaultOpenBusinessViewOption);
    if (typeof o.type === "string") {
        option.type = o.type;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected type is string, but get ${o.type}.`);
    }
    if (typeof o.query === "string") {
        option.query = o.query;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected query is string, but get ${o.query}.`);
    }
    if (typeof o.ext === "string") {
        option.ext = o.ext;
    }
    return option;
}
const defaultOpenBusinessWebViewOption = {
    type: 0,
    query: {},
};
export function openBusinessWebView(option) {
    return invokeWrapper(RNWModule.openBusinessWebView(parseOpenBusinessWebViewOption(option)));
}
function parseOpenBusinessWebViewOption(o) {
    const option = Object.assign({}, defaultOpenBusinessWebViewOption);
    if (typeof o.type === "number") {
        option.type = o.type;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected type is number, but get ${o.type}.`);
    }
    if (typeof o.query === "object") {
        const query = {};
        Object.getOwnPropertyNames(o.query).forEach((key) => {
            query[key] = o.query[key];
        });
        option.query = query;
    }
    return option;
}
// jumpToBizProfile
export var BizProfileType;
(function (BizProfileType) {
    // 普通公众号
    BizProfileType[BizProfileType["Normal"] = 0] = "Normal";
    // 硬件公众号
    BizProfileType[BizProfileType["Device"] = 1] = "Device";
})(BizProfileType || (BizProfileType = {}));
const defaultJumpToBizProfileOption = {
    username: "",
    type: BizProfileType.Normal,
    ext: "",
};
export function jumpToBizProfile(option) {
    return RNWModule.jumpToBizProfile(parseJumpToBizProfileOption(option));
}
function parseJumpToBizProfileOption(o) {
    const option = Object.assign({}, defaultJumpToBizProfileOption);
    if (typeof o.username === "string") {
        option.username = o.username;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected username is string, but get ${o.username}.`);
    }
    if (typeof o.type === "number") {
        option.type = o.type;
    }
    if (typeof o.ext === "string") {
        option.ext = o.ext;
    }
    return option;
}
// jumpToBizWebView
export var MPWebViewType;
(function (MPWebViewType) {
    // 广告网页
    MPWebViewType[MPWebViewType["Ad"] = 0] = "Ad";
})(MPWebViewType || (MPWebViewType = {}));
const defaultJumpToBizWebViewOption = {
    username: "",
    type: MPWebViewType.Ad,
    ext: "",
};
export function jumpToBizWebView(option) {
    return RNWModule.jumpToBizWebView(parseJumpToBizWebViewOption(option));
}
function parseJumpToBizWebViewOption(o) {
    const option = Object.assign({}, defaultJumpToBizWebViewOption);
    if (typeof o.username === "string") {
        option.username = o.username;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected username is string, but get ${o.username}.`);
    }
    if (typeof o.type === "number") {
        option.type = o.type;
    }
    if (typeof o.ext === "string") {
        option.ext = o.ext;
    }
    return option;
}
