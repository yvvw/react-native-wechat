var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { invokeWrapper } from "./helper";
import { RNWModule } from "./module";
// isAppInstalled
export function isAppInstalled() {
    return __awaiter(this, void 0, void 0, function* () {
        return Boolean(yield RNWModule.isAppInstalled());
    });
}
// getAppInstallUrl
export function getAppInstallUrl() {
    return RNWModule.getAppInstallUrl();
}
// openApp
export function openApp() {
    return invokeWrapper(RNWModule.openApp());
}
// isSupportOpenApi
export function isSupportOpenApi() {
    return __awaiter(this, void 0, void 0, function* () {
        return Boolean(yield RNWModule.isSupportOpenApi());
    });
}
// getSDKVersion
export function getSDKVersion() {
    return RNWModule.getSDKVersion();
}
