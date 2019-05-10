interface IInitializeOption {
    appID: string;
    debug?: boolean;
}
export declare function initialize(option: IInitializeOption): Promise<void>;
export {};
