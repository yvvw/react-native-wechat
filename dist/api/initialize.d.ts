export interface IInitializeOption {
    appid: string;
    debug?: boolean;
}
export declare function initialize(option: IInitializeOption): Promise<void>;
export declare function checkInitialize(): void;
