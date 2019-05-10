import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { Result, RNWModule } from "./module";

interface IInvoiceResult {
    id: string;
    ext: string;
    state: 0 | 1; // 0为未添加 1为已添加
    encryptCode: string;
    appID: string;
}

// chooseInvoice

interface IChooseInvoiceOption {
    appID?: string;
    shopID?: number;
    signType?: string;
    cardSign?: string;
    timestamp?: number;
    nonce?: string;
}

const defaultChooseInvoiceOption: IChooseInvoiceOption = {
    appID: "",
    shopID: 0,
    signType: "",
    cardSign: "",
    timestamp: 0,
    nonce: "",
};

interface IChooseInvoiceResult {
    invoices: IInvoiceResult[];
}

export function chooseInvoice(option: IChooseInvoiceOption)
    : Result<IChooseInvoiceResult> {
    return invokeWrapper(
        RNWModule.chooseInvoice(parseChooseInvoiceOption(option)));
}

function parseChooseInvoiceOption(o: IChooseInvoiceOption) {
    const option = Object.assign({}, defaultChooseInvoiceOption);
    if (typeof o.appID === "string") {
        option.appID = o.appID;
    }
    if (typeof o.shopID === "number") {
        option.shopID = o.shopID;
    }
    if (typeof o.signType === "string") {
        option.signType = o.signType;
    }
    if (typeof o.cardSign === "string") {
        option.cardSign = o.cardSign;
    }
    if (typeof o.timestamp === "number") {
        option.timestamp = o.timestamp;
    }
    if (typeof o.nonce === "string") {
        option.nonce = o.nonce;
    }
    return option;
}

// invoiceAuthInsert

interface IInvoiceAuthInsertOption {
    url: string;
}

const defaultInvoiceAuthInsertOption: IInvoiceAuthInsertOption = {
    url: "",
};

interface IInvoiceAuthInsertResult {
    orderID: string;
}

export function invoiceAuthInsert(option: IInvoiceAuthInsertOption)
    : Result<IInvoiceAuthInsertResult> {
    return invokeWrapper(
        RNWModule.invoiceAuthInsert(parseInvoiceAuthInsertOption(option)));
}

function parseInvoiceAuthInsertOption(o: IInvoiceAuthInsertOption) {
    const option = Object.assign({}, defaultInvoiceAuthInsertOption);
    if (typeof o.url === "string") {
        option.url = o.url;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected url is string, but get ${o.url}.`);
    }
    return option;
}
