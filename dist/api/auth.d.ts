import { PromiseResult } from "../module";
export interface IAuthOption {
    scope?: AuthScope;
    state: string;
    supportWeb?: boolean;
}
export declare enum AuthScope {
    UserInfo = "snsapi_userinfo"
}
export interface IAuthResult {
    code?: string;
    state?: string;
    lang?: string;
    country?: string;
}
export declare function auth(option: IAuthOption): PromiseResult<IAuthResult>;
