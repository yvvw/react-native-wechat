import * as HelperModule from "../helper";
import * as RNWModule from "../module";
import * as InitializeModule from "./initialize";
export function pay(option) {
    InitializeModule.checkInitialize();
    return HelperModule.invokeWrapper(RNWModule.pay(parseOption(option)));
}
export function offlinePay() {
    return HelperModule.invokeWrapper(RNWModule.offlinePay());
}
const defaultOption = {
    partnerId: "",
    prepayId: "",
    nonceStr: "",
    timeStamp: 0,
    package: "",
    sign: "",
};
function parseOption(o) {
    const option = Object.assign({}, defaultOption);
    if (typeof o.partnerId === "string") {
        option.partnerId = o.partnerId;
    }
    if (typeof o.prepayId === "string") {
        option.prepayId = o.prepayId;
    }
    if (typeof o.nonceStr === "string") {
        option.nonceStr = o.nonceStr;
    }
    if (typeof o.timeStamp === "number") {
        option.timeStamp = o.timeStamp;
    }
    if (typeof o.package === "string") {
        option.package = o.package;
    }
    if (typeof o.sign === "string") {
        option.sign = o.sign;
    }
    return option;
}
