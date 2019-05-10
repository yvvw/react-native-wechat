import { Result } from "./module";
interface IPayOption {
    partnerId: string;
    prepayId: string;
    nonce: string;
    timestamp: number;
    package: string;
    sign: string;
}
interface IPayResult {
    returnKey: string;
}
export declare function pay(option: IPayOption): Result<IPayResult>;
export declare function offlinePay(): Result<{}>;
interface INontaxPayOption {
    url: string;
}
interface INontaxPayPayResult {
    orderID: string;
}
export declare function nontaxPay(option: INontaxPayOption): Result<INontaxPayPayResult>;
interface IPayInsuranceOption {
    url: string;
}
interface IPayInsurancePayResult {
    orderID: string;
}
export declare function payInsurance(option: IPayInsuranceOption): Result<IPayInsurancePayResult>;
export {};
