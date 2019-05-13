import { MiniProgramType } from "./apiMiniProgram";
import { Errors } from "./error";
import { invokeWrapper, resolveImage, throwError } from "./helper";
import { Result, RNWModule } from "./module";

export enum MessageType {
    Text = 0,
    Image = 1,
    Music = 2,
    Video = 3,
    File = 4,
    Webpage = 5,
    MiniProgram = 6,
    AppExtend = 7,
    Emoticon = 8,
    Location = 9,
}

export enum MessageScene {
    // 聊天界面
    Session = 0,
    // 朋友圈
    Timeline = 1,
    // 收藏
    Favorite = 2,
    // 指定联系人
    SpecifiedSession = 3,
}

interface IBaseMediaMessage {
    scene: MessageScene;
    messageType: MessageType;
    messageTitle?: string;
    messageDesc?: string;
    messageThumb?: string;
    messageTag?: string;
    messageExt?: string;
    messageAction?: string;
    userOpenID?: string;
}

interface ITextMediaMessage extends IBaseMediaMessage {
    content: string;
}

interface IImageMediaMessage extends IBaseMediaMessage {
    image: string;
}

interface IMusicMediaMessage extends IBaseMediaMessage {
    url: string;
    lowBandURL: string;
    dataURL: string;
    lowBandDataURL: string;
}

interface IVideoMediaMessage extends IBaseMediaMessage {
    url: string;
    lowBandURL: string;
}

interface IFileMediaMessage extends IBaseMediaMessage {
    file: string;
    ext: string;
}

interface IWebpageMediaMessage extends IBaseMediaMessage {
    url: string;
}

interface IMiniProgramMediaMessage extends IBaseMediaMessage {
    type: MiniProgramType;
    username: string;
    path?: string;
    hdImage?: string;
    url?: string;
    shareTicket?: boolean;
}

interface IAppExtendMediaMessage extends IBaseMediaMessage {
    url: string;
    ext: string;
    file: string;
}

interface IEmoticonMediaMessage extends IBaseMediaMessage {
    image: string;
}

interface ILocationMediaMessage extends IBaseMediaMessage {
    // 经度
    lng: number;
    // 维度
    lat: number;
}

export type IMediaMessage = ITextMediaMessage |
    IImageMediaMessage | IMusicMediaMessage | IVideoMediaMessage |
    IFileMediaMessage | IWebpageMediaMessage | IMiniProgramMediaMessage |
    IAppExtendMediaMessage | IEmoticonMediaMessage | ILocationMediaMessage;

const defaultMessage = {
    scene: -1,
    messageType: -1,
    messageTitle: "",
    messageDesc: "",
    messageThumb: "",
    messageTag: "",
    messageExt: "",
    messageAction: "",
    userOpenID: "",
    content: "",
    type: "",
    url: "",
    dataURL: "",
    lowBandURL: "",
    lowBandDataURL: "",
    ext: "",
    username: "",
    path: "",
    image: "",
    hdImage: "",
    file: "",
    shareTicket: false,
    lng: 0,
    lat: 0,
};

// sendMessage

type ISendMessageOption = IMediaMessage;

interface ISendMessageResult {
    lang: string;
    country: string;
}

export function sendMessage(option: ISendMessageOption)
    : Result<ISendMessageResult> {
    return invokeWrapper(RNWModule.sendMessage(parseSendMessageOption(option)));
}

function parseSendMessageOption(o: ISendMessageOption) {
    const option = Object.assign({}, defaultMessage, o);

    if (typeof o.scene !== "number") {
        throwError(Errors.InvokeFailed,
            `Expected scene is number, but get ${o.scene}.`);
    }

    if (typeof o.messageType !== "number") {
        throwError(Errors.InvokeFailed,
            `Expected messageType is number, but get ${o.messageType}.`);
    }

    if (o.messageThumb !== undefined) {
        option.messageThumb = resolveImage(o.messageThumb as string);
    }

    // @ts-ignore
    if (o.image !== undefined) {
        // @ts-ignore
        option.image = resolveImage(o.image);
    }

    // @ts-ignore
    if (o.hdImage !== undefined) {
        // @ts-ignore
        option.hdImage = resolveImage(o.hdImage);
    }

    return option;
}

// subscribeMessage

interface ISubscribeMessageOption {
    scene: MessageScene;
    templateID: string;
    reserved?: string;
}

const defaultSubscribeMessageOption: ISubscribeMessageOption = {
    scene: -1,
    templateID: "",
    reserved: "",
};

interface ISubscribeMessageResult {
    scene: MessageScene;
    templateID: string;
    action: string;
    reserved: string;
    openID: string;
}

export function subscribeMessage(option: ISubscribeMessageOption)
    : Result<ISubscribeMessageResult> {
    return invokeWrapper(
        RNWModule.subscribeMessage(parseSubscribeMessageOption(option)));
}

function parseSubscribeMessageOption(o: ISubscribeMessageOption) {
    const option = Object.assign({}, defaultSubscribeMessageOption);
    if (typeof o.scene === "number") {
        option.scene = o.scene;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected scene is number, but get ${o.scene}.`);
    }
    if (typeof o.templateID === "string") {
        option.templateID = o.templateID;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected templateID is number, but get ${o.templateID}.`);
    }
    if (typeof o.reserved === "string") {
        option.reserved = o.reserved;
    }
    return option;
}

// sendMessageResp

type ISendMessageRespOption = IMediaMessage;

export function sendMessageResp(option: ISendMessageRespOption): Promise<void> {
    return RNWModule.sendMessageResp(parseSendMessageRespOption(option));
}

function parseSendMessageRespOption(o: ISendMessageRespOption) {
    const option = Object.assign({}, defaultMessage, o);

    if (typeof o.messageType !== "number") {
        throwError(Errors.InvokeFailed,
            `Expected messageType is number, but get ${o.messageType}.`);
    }

    // @ts-ignore
    if (o.image !== undefined) {
        // @ts-ignore
        option.image = resolveImage(o.image);
    }

    // @ts-ignore
    if (o.hdImage !== undefined) {
        // @ts-ignore
        option.hdImage = resolveImage(o.hdImage);
    }

    return option;
}

// showMessageResp

export function showMessageResp(): Promise<void> {
    return RNWModule.showMessageResp();
}
