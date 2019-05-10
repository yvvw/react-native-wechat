import { Result } from "./module";
interface ICardItem {
    id: string;
    ext: string;
}
interface ICardResult {
    id: string;
    ext: string;
    state: 0 | 1;
    encryptCode: string;
    appID: string;
}
interface IAddCardOption {
    cards: ICardItem[];
}
interface IAddCardResult {
    cards: ICardResult[];
}
export declare function addCard(option: IAddCardOption): Result<IAddCardResult>;
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
interface IChooseCardResult {
    cards: ICardResult[];
}
export declare function chooseCard(option: IChooseCardOption): Result<IChooseCardResult>;
export {};
