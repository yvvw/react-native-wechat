import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { Result, RNWModule } from "./module";

interface ICardItem {
    id: string;
    ext: string;
}

interface ICardResult {
    id: string;
    ext: string;
    state: 0 | 1; // 0为未添加 1为已添加
    encryptCode: string;
    appID: string;
}

// addCard

interface IAddCardOption {
    cards: ICardItem[];
}

const defaultAddCardOption: IAddCardOption = {
    cards: [],
};

interface IAddCardResult {
    cards: ICardResult[];
}

export function addCard(option: IAddCardOption): Result<IAddCardResult> {
    return invokeWrapper(RNWModule.addCard(parseAddCardOption(option)));
}

function parseAddCardOption(o: IAddCardOption) {
    const option = Object.assign({}, defaultAddCardOption);
    if (Array.isArray(o.cards)) {
        const cards: ICardItem[] = [];
        o.cards.forEach((card) => {
            if (
                typeof card === "object" &&
                typeof card.id === "string" &&
                typeof card.ext === "string") {
                    cards.push(card);
            } else {
                throwError(Errors.InvokeFailed,
    `Expected card is an object include id and ext fields, but get ${card}.`);
            }
        });
        option.cards = cards;
    }
    return option;
}

// chooseCard

interface IChooseCardOption {
    appID?: string;
    shopID?: number;
    multiSelect?: boolean;
    cardType?: string;
    cardTpID?: string;
    signType?: string;
    cardSign?: string;
    timestamp?: number;
    nonce?: string;
}

const defaultChooseCardOption: IChooseCardOption = {
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

interface IChooseCardResult {
    cards: ICardResult[];
}

export function chooseCard(option: IChooseCardOption)
    : Result<IChooseCardResult> {
    return invokeWrapper(RNWModule.chooseCard(parseChooseCardOption(option)));
}

function parseChooseCardOption(o: IChooseCardOption) {
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
