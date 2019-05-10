import { RNWEventEmitter, RNWModule } from "./module";
const REQUEST_EVENT = "RNLWeChatRequestEvent";
export var WeChatRequestType;
(function (WeChatRequestType) {
    WeChatRequestType[WeChatRequestType["GetMessage"] = 0] = "GetMessage";
    WeChatRequestType[WeChatRequestType["ShowMessage"] = 1] = "ShowMessage";
    WeChatRequestType[WeChatRequestType["LaunchFromWX"] = 2] = "LaunchFromWX";
})(WeChatRequestType || (WeChatRequestType = {}));
function handle(data, callback) {
    if (data === null || data === undefined) {
        return;
    }
    else if (Array.isArray(data)) {
        data.forEach((item) => callback(item));
    }
    else {
        callback(data);
    }
}
export function listenRequest(callback) {
    const listener = RNWEventEmitter.addListener(REQUEST_EVENT, (data) => handle(data, callback));
    RNWModule.listenRequest().then((data) => handle(data, callback));
    return () => {
        listener.remove();
        RNWModule.stopListenRequest();
    };
}
