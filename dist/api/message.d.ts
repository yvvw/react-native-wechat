import { PromiseResult } from "../module";
import { Scenes } from "../scene";
export interface ISendMessageOption {
    text: string;
    scene?: Scenes;
    userOpenId?: string;
}
export interface ISendMessageResult {
    lang: string;
    country: string;
}
export declare function sendMessage(option: ISendMessageOption): PromiseResult<ISendMessageResult>;
export interface ISubscribeMessageOption {
    scene: Scenes;
    templateId: string;
    reserved: string;
}
export interface ISubscribeMessageResult {
    scene: Scenes;
    templateId: string;
    action: string;
    reserved: string;
    openId: string;
}
export declare function subscribeMessage(option: ISubscribeMessageOption): PromiseResult<ISubscribeMessageResult>;
