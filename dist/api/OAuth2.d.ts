import { PromiseResult } from "../module";
export interface IOAuth2Option {
    scope?: OAuth2Scope;
    state: string;
    supportWeb?: boolean;
}
export declare enum OAuth2Scope {
    UserInfo = "snsapi_userinfo"
}
export interface IOAuth2Result {
    code?: string;
    state?: string;
    lang?: string;
    country?: string;
}
export declare function OAuth2(option: IOAuth2Option): PromiseResult<IOAuth2Result>;
