import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { Result, RNWModule } from "./module";

// pay

interface IPayOption {
    partnerId: string;
    prepayId: string;
    nonce: string;
    timestamp: number;
    package: string;
    sign: string;
}

const defaultPayOption: IPayOption = {
    partnerId: "",
    prepayId: "",
    nonce: "",
    timestamp: 0,
    package: "",
    sign: "",
};

interface IPayResult {
    returnKey: string;
}

export function pay(option: IPayOption): Result<IPayResult> {
    return invokeWrapper(RNWModule.pay(parsePayOption(option)));
}

function parsePayOption(o: IPayOption) {
    const option = Object.assign({}, defaultPayOption);
    if (typeof o.partnerId === "string") {
        option.partnerId = o.partnerId;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected partnerId is string, but get ${o.partnerId}.`);
    }
    if (typeof o.prepayId === "string") {
        option.prepayId = o.prepayId;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected prepayId is string, but get ${o.prepayId}.`);
    }
    if (typeof o.nonce === "string") {
        option.nonce = o.nonce;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected nonce is string, but get ${o.nonce}.`);
    }
    if (typeof o.timestamp === "number") {
        option.timestamp = o.timestamp;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected timestamp is number, but get ${o.timestamp}.`);
    }
    if (typeof o.package === "string") {
        option.package = o.package;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected package is string, but get ${o.package}.`);
    }
    if (typeof o.sign === "string") {
        option.sign = o.sign;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected sign is string, but get ${o.sign}.`);
    }
    return option;
}

// offlinePay

export function offlinePay(): Result<{}> {
    return invokeWrapper(RNWModule.offlinePay());
}

// nontaxPay

interface INontaxPayOption {
    url: string;
}

const defaultNontaxPayOption: INontaxPayOption = {
    url: "",
};

interface INontaxPayPayResult {
    orderID: string;
}

export function nontaxPay(option: INontaxPayOption)
    : Result<INontaxPayPayResult> {
    return invokeWrapper(RNWModule.nontaxPay(parseNontaxPayOption(option)));
}

function parseNontaxPayOption(o: INontaxPayOption) {
    const option = Object.assign({}, defaultNontaxPayOption);
    if (typeof o.url === "string") {
        option.url = o.url;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected url is string, but get ${o.url}.`);
    }
    return option;
}

// payInsurance

interface IPayInsuranceOption {
    url: string;
}

const defaultPayInsuranceOption: IPayInsuranceOption = {
    url: "",
};

interface IPayInsurancePayResult {
    orderID: string;
}

export function payInsurance(option: IPayInsuranceOption)
    : Result<IPayInsurancePayResult> {
    return invokeWrapper(
        RNWModule.payInsurance(parsePayInsuranceOption(option)));
}

function parsePayInsuranceOption(o: IPayInsuranceOption) {
    const option = Object.assign({}, defaultPayInsuranceOption);
    if (typeof o.url === "string") {
        option.url = o.url;
    } else {
        throwError(Errors.InvokeFailed,
            `Expected url is string, but get ${o.url}.`);
    }
    return option;
}
