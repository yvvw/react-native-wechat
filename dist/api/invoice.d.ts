import { PromiseResult } from "../module";
export interface IInvoice {
    id: string;
    message: string;
    state?: 0 | 1;
    code?: string;
    appID?: string;
}
export interface IChooseInvoiceOption {
    appID: string;
    shopID: number;
    signType: string;
    cardSign: string;
    timeStamp: number;
    nonceStr: string;
}
export declare function chooseInvoice(option: IChooseInvoiceOption): PromiseResult<IInvoice[]>;
