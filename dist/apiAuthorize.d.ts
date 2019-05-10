import { Result } from "./module";
export declare enum AuthScope {
    UserInfo = "snsapi_userinfo"
}
interface IAuthOption {
    state: string;
    scope?: AuthScope;
    fallback?: boolean;
}
interface IAuthResult {
    code: string;
    state: string;
    lang: string;
    country: string;
}
export declare function auth(option: IAuthOption): Result<IAuthResult>;
export {};
