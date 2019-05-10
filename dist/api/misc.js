var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as HelperModule from "../helper";
import * as RNWModule from "../module";
import * as InitializeModule from "./initialize";
export function isAppInstalled() {
    return __awaiter(this, void 0, void 0, function* () {
        InitializeModule.checkInitialize(); // 没有注册应用情况下会返回 false
        return Boolean(yield RNWModule.isAppInstalled());
    });
}
export function getAppInstallUrl() {
    return RNWModule.getAppInstallUrl();
}
export function openApp() {
    return HelperModule.invokeWrapper(RNWModule.openApp());
}
export function isApiSupport() {
    return __awaiter(this, void 0, void 0, function* () {
        return Boolean(yield RNWModule.isApiSupport());
    });
}
export function getApiVersion() {
    return RNWModule.getApiVersion();
}
