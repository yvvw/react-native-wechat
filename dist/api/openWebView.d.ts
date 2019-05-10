import { PromiseResult } from "../module";
export interface IOpenWebViewOption {
    url: string;
}
export declare function openWebView(option: IOpenWebViewOption): PromiseResult<{}>;
