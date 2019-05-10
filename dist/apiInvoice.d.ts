import { Result } from "./module";
interface IInvoiceResult {
    id: string;
    ext: string;
    state: 0 | 1;
    encryptCode: string;
    appID: string;
}
interface IChooseInvoiceOption {
    appID?: string;
    shopID?: number;
    signType?: string;
    cardSign?: string;
    timestamp?: number;
    nonce?: string;
}
interface IChooseInvoiceResult {
    invoices: IInvoiceResult[];
}
export declare function chooseInvoice(option: IChooseInvoiceOption): Result<IChooseInvoiceResult>;
interface IInvoiceAuthInsertOption {
    url: string;
}
interface IInvoiceAuthInsertResult {
    orderID: string;
}
export declare function invoiceAuthInsert(option: IInvoiceAuthInsertOption): Result<IInvoiceAuthInsertResult>;
export {};
