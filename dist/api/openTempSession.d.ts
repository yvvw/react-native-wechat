import { PromiseResult } from "../module";
export interface IOpenTempSessionOption {
    username: string;
    sessionFrom: string;
}
export declare function openTempSession(option: IOpenTempSessionOption): PromiseResult<{}>;
