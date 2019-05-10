import { PromiseResult } from "../module";
export interface ISubscribeMiniProgramMessageOption {
    appID: string;
}
export interface ISubscribeMiniProgramMessageResult {
    openId: string;
    unionId: string;
    nickName: string;
}
export declare function subscribeMiniProgramMessage(option: ISubscribeMiniProgramMessageOption): PromiseResult<ISubscribeMiniProgramMessageResult>;
