import { AppState, Image } from "react-native";
import { WeChatError } from "./error";
export function invokeWrapper(promise, timeout = 1000) {
    return new Promise((resolve, reject) => {
        let tid;
        const listener = (state) => {
            if (state === "active") {
                AppState.removeEventListener("change", listener);
                tid = setTimeout(resolve, timeout, { result: "unknow" });
            }
        };
        AppState.addEventListener("change", listener);
        promise
            .then(resolve)
            .catch((e) => {
            throwError(parseInt(e.code, 10), e.message);
        })
            .catch(reject)
            .finally(() => {
            clearTimeout(tid);
            AppState.removeEventListener("change", listener);
        });
    });
}
export function throwError(code, message) {
    throw new WeChatError(code, message);
}
export function resolveImage(asset) {
    if (typeof asset === "number") {
        const r = Image.resolveAssetSource(asset);
        // @ts-ignore
        if (r && r.__packager_asset) {
            return r.uri;
        }
    }
    return `${asset}`;
}
