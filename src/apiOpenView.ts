import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { Result, RNWModule } from "./module";

// openTempSession

interface IOpenTempSessionOption {
    username: string;
    session: string;
}

const defaultOpenTempSessionOption: IOpenTempSessionOption = {
    username: "",
    session: "",
};

export function openTempSession(option: IOpenTempSessionOption): Result<{}> {
    return invokeWrapper(
        RNWModule.openTempSession(parseOpenTempSessionOption(option)));
}

function parseOpenTempSessionOption(o: IOpenTempSessionOption) {
    const option = Object.assign({}, defaultOpenTempSessionOption);
    if (typeof o.username === "string") {
        option.username = o.username;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected username is string, but get ${o.username}.`);
    }
    if (typeof o.session === "string") {
        option.session = o.session;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected session is string, but get ${o.session}.`);
    }
    return option;
}

// openRankList

export function openRankList(): Result<{}> {
    return invokeWrapper(RNWModule.openRankList());
}

// openWebView

interface IOpenWebViewOption {
    url: string;
}

const defaultOpenWebViewOption: IOpenWebViewOption = {
    url: "",
};

export function openWebView(option: IOpenWebViewOption): Result<{}> {
    return invokeWrapper(RNWModule.openWebView(parseOpenWebViewOption(option)));
}

function parseOpenWebViewOption(o: IOpenWebViewOption) {
    const option = Object.assign({}, defaultOpenWebViewOption);
    if (typeof o.url === "string") {
        option.url = o.url;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected url is string, but get ${o.url}.`);
    }
    return option;
}

// openBusinessView

interface IOpenBusinessViewOption {
    type: string;
    query: string;
    ext?: string; // json string
}

const defaultOpenBusinessViewOption: IOpenBusinessViewOption = {
    type: "",
    query: "",
    ext: "",
};

interface IOpenBusinessViewResult {
    type: string;
    ext: string;
}

export function openBusinessView(option: IOpenBusinessViewOption)
    : Result<IOpenBusinessViewResult> {
    return invokeWrapper(
        RNWModule.openBusinessView(parseOpenBusinessViewOption(option)));
}

function parseOpenBusinessViewOption(o: IOpenBusinessViewOption) {
    const option = Object.assign({}, defaultOpenBusinessViewOption);
    if (typeof o.type === "string") {
        option.type = o.type;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected type is string, but get ${o.type}.`);
    }
    if (typeof o.query === "string") {
        option.query = o.query;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected query is string, but get ${o.query}.`);
    }
    if (typeof o.ext === "string") {
        option.ext = o.ext;
    }
    return option;
}

// openBusinessWebView

interface IOpenBusinessWebViewOption {
    type: number;
    query: {
        [key: string]: any,
    };
}

const defaultOpenBusinessWebViewOption: IOpenBusinessWebViewOption = {
    type: 0,
    query: {},
};

interface IOpenBusinessWebViewResult {
    type: number;
    result: string;
}

export function openBusinessWebView(option: IOpenBusinessWebViewOption)
    : Result<IOpenBusinessWebViewResult> {
    return invokeWrapper(
        RNWModule.openBusinessWebView(parseOpenBusinessWebViewOption(option)));
}

function parseOpenBusinessWebViewOption(o: IOpenBusinessWebViewOption) {
    const option = Object.assign({}, defaultOpenBusinessWebViewOption);
    if (typeof o.type === "number") {
        option.type = o.type;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected type is number, but get ${o.type}.`);
    }
    if (typeof o.query === "object") {
        const query: any = {};
        Object.getOwnPropertyNames(o.query).forEach((key) => {
            query[key] = o.query[key];
        });
        option.query = query;
    }
    return option;
}

// jumpToBizProfile

export enum BizProfileType {
    // 普通公众号
    Normal = 0,
    // 硬件公众号
    Device = 1,
}

interface IJumpToBizProfileOption {
    username: string;
    type?: BizProfileType;
    ext?: string;
}

const defaultJumpToBizProfileOption: IJumpToBizProfileOption = {
    username: "",
    type: BizProfileType.Normal,
    ext: "",
};

export function jumpToBizProfile(option: IJumpToBizProfileOption)
    : Promise<void> {
    return RNWModule.jumpToBizProfile(parseJumpToBizProfileOption(option));
}

function parseJumpToBizProfileOption(o: IJumpToBizProfileOption) {
    const option = Object.assign({}, defaultJumpToBizProfileOption);
    if (typeof o.username === "string") {
        option.username = o.username;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected username is string, but get ${o.username}.`);
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

export enum MPWebViewType {
    // 广告网页
    Ad = 0,
}

interface IJumpToBizWebViewOption {
    username: string;
    type?: MPWebViewType;
    ext?: string;
}

const defaultJumpToBizWebViewOption: IJumpToBizWebViewOption = {
    username: "",
    type: MPWebViewType.Ad,
    ext: "",
};

export function jumpToBizWebView(option: IJumpToBizWebViewOption)
    : Promise<void> {
    return RNWModule.jumpToBizWebView(parseJumpToBizWebViewOption(option));
}

function parseJumpToBizWebViewOption(o: IJumpToBizWebViewOption) {
    const option = Object.assign({}, defaultJumpToBizWebViewOption);
    if (typeof o.username === "string") {
        option.username = o.username;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected username is string, but get ${o.username}.`);
    }
    if (typeof o.type === "number") {
        option.type = o.type;
    }
    if (typeof o.ext === "string") {
        option.ext = o.ext;
    }
    return option;
}
