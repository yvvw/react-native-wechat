import { Result } from "./module";
export declare enum MiniProgramType {
    Release = 0,
    Test = 1,
    Preview = 2
}
interface ILaunchMiniProgramOption {
    username: string;
    type: number;
    path?: string;
    ext?: string;
}
interface ILaunchMiniProgramResult {
    ext: string;
}
export declare function launchMiniProgram(option: ILaunchMiniProgramOption): Result<ILaunchMiniProgramResult>;
interface ISubscribeMiniProgramMessageOption {
    appID: string;
}
interface ISubscribeMiniProgramMessageResult {
    openID: string;
    unionID: string;
    nickname: string;
}
export declare function subscribeMiniProgramMessage(option: ISubscribeMiniProgramMessageOption): Result<ISubscribeMiniProgramMessageResult>;
export {};
