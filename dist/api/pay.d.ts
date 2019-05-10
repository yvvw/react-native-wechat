import { PromiseResult } from "../module";
export interface IPayOption {
    partnerId: string;
    prepayId: string;
    nonceStr: string;
    timeStamp: number;
    package: string;
    sign: string;
}
export interface IPayResult {
    returnKey?: string;
}
export declare function pay(option: IPayOption): PromiseResult<IPayResult>;
export declare function offlinePay(): PromiseResult<{}>;
