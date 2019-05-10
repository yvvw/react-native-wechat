import { Result } from "./module";
interface IOpenTempSessionOption {
    username: string;
    session: string;
}
export declare function openTempSession(option: IOpenTempSessionOption): Result<{}>;
export declare function openRankList(): Result<{}>;
interface IOpenWebViewOption {
    url: string;
}
export declare function openWebView(option: IOpenWebViewOption): Result<{}>;
interface IOpenBusinessViewOption {
    type: string;
    query: string;
    ext?: string;
}
interface IOpenBusinessViewResult {
    type: string;
    ext: string;
}
export declare function openBusinessView(option: IOpenBusinessViewOption): Result<IOpenBusinessViewResult>;
interface IOpenBusinessWebViewOption {
    type: number;
    query: {
        [key: string]: any;
    };
}
interface IOpenBusinessWebViewResult {
    type: number;
    result: string;
}
export declare function openBusinessWebView(option: IOpenBusinessWebViewOption): Result<IOpenBusinessWebViewResult>;
export declare enum BizProfileType {
    Normal = 0,
    Device = 1
}
interface IJumpToBizProfileOption {
    username: string;
    type?: BizProfileType;
    ext?: string;
}
export declare function jumpToBizProfile(option: IJumpToBizProfileOption): Promise<void>;
export declare enum MPWebViewType {
    Ad = 0
}
interface IJumpToBizWebViewOption {
    username: string;
    type?: MPWebViewType;
    ext?: string;
}
export declare function jumpToBizWebView(option: IJumpToBizWebViewOption): Promise<void>;
export {};
