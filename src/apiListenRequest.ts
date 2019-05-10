import { EmitterSubscription } from "react-native";
import { IMediaMessage } from "./apiMessage";
import { RNWEventEmitter, RNWModule } from "./module";

const REQUEST_EVENT = "RNLWeChatRequestEvent";

export enum WeChatRequestType {
    GetMessage = 0,
    ShowMessage = 1,
    LaunchFromWX = 2,
}

interface IWeChatRequestData {
    requestType: WeChatRequestType;
    type: number;
    openID: string;
    lang: string;
    country: string;
    result: IMediaMessage;
}

type IWeChatRequestCallback = (data: IWeChatRequestData) => void;

function handle(data: any, callback: IWeChatRequestCallback) {
    if (data === null || data === undefined) {
        return;
    } else if (Array.isArray(data)) {
        data.forEach((item) => callback(item));
    } else {
        callback(data);
    }
}

export function listenRequest(callback: IWeChatRequestCallback): () => void {
    const listener: EmitterSubscription =
        RNWEventEmitter.addListener(
            REQUEST_EVENT, (data) => handle(data, callback));
    RNWModule.listenRequest().then((data: any) => handle(data, callback));
    return () => {
        listener.remove();
        RNWModule.stopListenRequest();
    };
}
