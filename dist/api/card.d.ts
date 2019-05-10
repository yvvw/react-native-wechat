import { PromiseResult } from "../module";
export interface ICard {
    id: string;
    message: string;
    state?: 0 | 1;
    code?: string;
    appID?: string;
}
export interface IAddCardOption {
    cards: ICard[];
}
export declare function addCard(option: IAddCardOption): PromiseResult<ICard[]>;
export interface IChooseCardOption {
    appID: string;
    shopID: number;
    multiSelect: boolean;
    cardType: string;
    cardTpID: string;
    signType: string;
    cardSign: string;
    timeStamp: number;
    nonceStr: string;
}
export declare function chooseCard(option: IChooseCardOption): PromiseResult<ICard[]>;
