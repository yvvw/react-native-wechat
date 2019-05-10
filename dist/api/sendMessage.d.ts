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
