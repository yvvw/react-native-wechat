import { IMediaMessage } from "./apiMessage";
export declare enum WeChatRequestType {
    GetMessage = 0,
    ShowMessage = 1,
    LaunchFromWX = 2
}
interface IWeChatRequestData {
    requestType: WeChatRequestType;
    type: number;
    openID: string;
    lang: string;
    country: string;
    result: IMediaMessage;
}
declare type IWeChatRequestCallback = (data: IWeChatRequestData) => void;
export declare function listenRequest(callback: IWeChatRequestCallback): () => void;
export {};
