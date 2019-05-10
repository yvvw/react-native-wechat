import { PromiseResult } from "../module";
export interface IOpenBusinessWebViewOption {
    type: number;
    query: {
        [key: string]: string;
    };
}
export declare function openBusinessWebView(option: IOpenBusinessWebViewOption): PromiseResult<{}>;
