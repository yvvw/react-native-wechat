import { MiniProgramType } from "./apiMiniProgram";
import { Result } from "./module";
export declare enum MessageType {
    Text = 0,
    Image = 1,
    Music = 2,
    Video = 3,
    File = 4,
    Webpage = 5,
    MiniProgram = 6,
    AppExtend = 7,
    Emoticon = 8,
    Location = 9
}
export declare enum MessageScene {
    Session = 0,
    Timeline = 1,
    Favorite = 2,
    SpecifiedSession = 3
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
    lng: number;
    lat: number;
}
export declare type IMediaMessage = ITextMediaMessage | IImageMediaMessage | IMusicMediaMessage | IVideoMediaMessage | IFileMediaMessage | IWebpageMediaMessage | IMiniProgramMediaMessage | IAppExtendMediaMessage | IEmoticonMediaMessage | ILocationMediaMessage;
declare type ISendMessageOption = IMediaMessage;
interface ISendMessageResult {
    lang: string;
    country: string;
}
export declare function sendMessage(option: ISendMessageOption): Result<ISendMessageResult>;
interface ISubscribeMessageOption {
    scene: MessageScene;
    templateID: string;
    reserved?: string;
}
interface ISubscribeMessageResult {
    scene: MessageScene;
    templateID: string;
    action: string;
    reserved: string;
    openID: string;
}
export declare function subscribeMessage(option: ISubscribeMessageOption): Result<ISubscribeMessageResult>;
declare type ISendMessageRespOption = IMediaMessage;
export declare function sendMessageResp(option: ISendMessageRespOption): Promise<void>;
export declare function showMessageResp(): Promise<void>;
export {};
