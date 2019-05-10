import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { RNWModule } from "./module";
const defaultAddCardOption = {
    cards: [],
};
export function addCard(option) {
    return invokeWrapper(RNWModule.addCard(parseAddCardOption(option)));
}
function parseAddCardOption(o) {
    const option = Object.assign({}, defaultAddCardOption);
    if (Array.isArray(o.cards)) {
        const cards = [];
        o.cards.forEach((card) => {
            if (typeof card === "object" &&
                typeof card.id === "string" &&
                typeof card.ext === "string") {
                cards.push(card);
            }
            else {
                throwError(Errors.InvokeFailed, `Expected card is an object include id and ext fields, but get ${card}.`);
            }
        });
        option.cards = cards;
    }
    return option;
}
const defaultChooseCardOption = {
    appID: "",
    shopID: 0,
    multiSelect: true,
    cardType: "",
    cardTpID: "",
    signType: "",
    cardSign: "",
    timestamp: 0,
    nonce: "",
};
export function chooseCard(option) {
    return invokeWrapper(RNWModule.chooseCard(parseChooseCardOption(option)));
}
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
    if (typeof o.timestamp === "number") {
        option.timestamp = o.timestamp;
    }
    if (typeof o.nonce === "string") {
        option.nonce = o.nonce;
    }
    return option;
}
