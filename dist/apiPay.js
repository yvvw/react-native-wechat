import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { RNWModule } from "./module";
const defaultPayOption = {
    partnerId: "",
    prepayId: "",
    nonce: "",
    timestamp: 0,
    package: "",
    sign: "",
};
export function pay(option) {
    return invokeWrapper(RNWModule.pay(parsePayOption(option)));
}
function parsePayOption(o) {
    const option = Object.assign({}, defaultPayOption);
    if (typeof o.partnerId === "string") {
        option.partnerId = o.partnerId;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected partnerId is string, but get ${o.partnerId}.`);
    }
    if (typeof o.prepayId === "string") {
        option.prepayId = o.prepayId;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected prepayId is string, but get ${o.prepayId}.`);
    }
    if (typeof o.nonce === "string") {
        option.nonce = o.nonce;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected nonce is string, but get ${o.nonce}.`);
    }
    if (typeof o.timestamp === "number") {
        option.timestamp = o.timestamp;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected timestamp is number, but get ${o.timestamp}.`);
    }
    if (typeof o.package === "string") {
        option.package = o.package;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected package is string, but get ${o.package}.`);
    }
    if (typeof o.sign === "string") {
        option.sign = o.sign;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected sign is string, but get ${o.sign}.`);
    }
    return option;
}
// offlinePay
export function offlinePay() {
    return invokeWrapper(RNWModule.offlinePay());
}
const defaultNontaxPayOption = {
    url: "",
};
export function nontaxPay(option) {
    return invokeWrapper(RNWModule.nontaxPay(parseNontaxPayOption(option)));
}
function parseNontaxPayOption(o) {
    const option = Object.assign({}, defaultNontaxPayOption);
    if (typeof o.url === "string") {
        option.url = o.url;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected url is string, but get ${o.url}.`);
    }
    return option;
}
const defaultPayInsuranceOption = {
    url: "",
};
export function payInsurance(option) {
    return invokeWrapper(RNWModule.payInsurance(parsePayInsuranceOption(option)));
}
function parsePayInsuranceOption(o) {
    const option = Object.assign({}, defaultPayInsuranceOption);
    if (typeof o.url === "string") {
        option.url = o.url;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected url is string, but get ${o.url}.`);
    }
    return option;
}
