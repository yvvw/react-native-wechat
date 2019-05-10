import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { RNWModule } from "./module";
const defaultChooseInvoiceOption = {
    appID: "",
    shopID: 0,
    signType: "",
    cardSign: "",
    timestamp: 0,
    nonce: "",
};
export function chooseInvoice(option) {
    return invokeWrapper(RNWModule.chooseInvoice(parseChooseInvoiceOption(option)));
}
function parseChooseInvoiceOption(o) {
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
const defaultInvoiceAuthInsertOption = {
    url: "",
};
export function invoiceAuthInsert(option) {
    return invokeWrapper(RNWModule.invoiceAuthInsert(parseInvoiceAuthInsertOption(option)));
}
function parseInvoiceAuthInsertOption(o) {
    const option = Object.assign({}, defaultInvoiceAuthInsertOption);
    if (typeof o.url === "string") {
        option.url = o.url;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected url is string, but get ${o.url}.`);
    }
    return option;
}
