import * as HelperModule from "../helper";
import * as RNWModule from "../module";
import * as InitializeModule from "./initialize";
export function chooseInvoice(option) {
    InitializeModule.checkInitialize();
    return HelperModule.invokeWrapper(RNWModule.chooseInvoice(parseOption(option)));
}
const defaultOption = {
    appID: "",
    shopID: 0,
    signType: "",
    cardSign: "",
    timeStamp: 0,
    nonceStr: "",
};
function parseOption(o) {
    const option = Object.assign({}, defaultOption);
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
    if (typeof o.timeStamp === "number") {
        option.timeStamp = o.timeStamp;
    }
    if (typeof o.nonceStr === "string") {
        option.nonceStr = o.nonceStr;
    }
    return option;
}
