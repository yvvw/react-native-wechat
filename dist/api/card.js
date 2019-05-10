import * as HelperModule from "../helper";
import * as RNWModule from "../module";
import * as InitializeModule from "./initialize";
export function addCard(option) {
    InitializeModule.checkInitialize();
    return HelperModule.invokeWrapper(RNWModule.addCard(parseAddCardOption(option)));
}
const defaultAddCardOption = {
    cards: [],
};
function parseAddCardOption(o) {
    const option = Object.assign({}, defaultAddCardOption);
    if (Array.isArray(o.cards)) {
        option.cards = o.cards;
    }
    return option;
}
export function chooseCard(option) {
    InitializeModule.checkInitialize();
    return HelperModule.invokeWrapper(RNWModule.chooseCard(parseChooseCardOption(option)));
}
const defaultChooseCardOption = {
    appID: "",
    shopID: 0,
    multiSelect: true,
    cardType: "",
    cardTpID: "",
    signType: "",
    cardSign: "",
    timeStamp: 0,
    nonceStr: "",
};
function parseChooseCardOption(o) {
    const option = Object.assign({}, defaultChooseCardOption);
    if (typeof o.appID === "string") {
        option.appID = o.appID;
    }
    if (typeof o.shopID === "number") {
        option.shopID = o.shopID;
    }
    if (typeof o.multiSelect === "boolean") {
        option.multiSelect = o.multiSelect;
    }
    if (typeof o.cardType === "string") {
        option.cardType = o.cardType;
    }
    if (typeof o.cardTpID === "string") {
        option.cardTpID = o.cardTpID;
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
