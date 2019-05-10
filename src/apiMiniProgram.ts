import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { Result, RNWModule } from "./module";

export enum MiniProgramType {
    // 正式版
    Release = 0,
    // 开发版
    Test = 1,
    // 体验版
    Preview = 2,
}

// launchMiniProgram

interface ILaunchMiniProgramOption {
    username: string;
    type: number;
    path?: string;
    ext?: string; // json
}

const defaultLaunchMiniProgramOption: ILaunchMiniProgramOption = {
    username: "",
    type: MiniProgramType.Release,
    path: "",
    ext: "",
};

interface ILaunchMiniProgramResult {
    ext: string;
}

export function launchMiniProgram(option: ILaunchMiniProgramOption)
    : Result<ILaunchMiniProgramResult> {
    return invokeWrapper(
        RNWModule.launchMiniProgram(parseLaunchMiniProgramOption(option)));
}

function parseLaunchMiniProgramOption(o: ILaunchMiniProgramOption) {
    const option = Object.assign({}, defaultLaunchMiniProgramOption);
    if (typeof o.username === "string") {
        option.username = o.username;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected username is string, but get ${o.username}.`);
    }
    if (typeof o.type === "number") {
        option.type = o.type;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected type is number, but get ${o.type}.`);
    }
    if (typeof o.path === "string") {
        option.path = o.path;
    }
    if (typeof o.ext === "string") {
        option.ext = o.ext;
    }
    return option;
}

// subscribeMiniProgramMessage

interface ISubscribeMiniProgramMessageOption {
    appID: string;
}

const defaultSubscribeMiniProgramMessageOption:
    ISubscribeMiniProgramMessageOption = {
    appID: "",
};

interface ISubscribeMiniProgramMessageResult {
    openID: string;
    unionID: string;
    nickname: string;
}

export function subscribeMiniProgramMessage(
    option: ISubscribeMiniProgramMessageOption)
        : Result<ISubscribeMiniProgramMessageResult> {
    return invokeWrapper(
        RNWModule.subscribeMiniProgramMessage(
            parseSubscribeMiniProgramMessageOption(option)));
}

function parseSubscribeMiniProgramMessageOption(
    o: ISubscribeMiniProgramMessageOption) {
    const option = Object.assign({}, defaultSubscribeMiniProgramMessageOption);
    if (typeof o.appID === "string") {
        option.appID = o.appID;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected appID is string, but get ${o.appID}.`);
    }
    return option;
}
