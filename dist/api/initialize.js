var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as ErrorModule from "../error";
import * as HelperModule from "../helper";
import * as RNWModule from "../module";
export function initialize(option) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield HelperModule.invokeWrapper(RNWModule.initialize(parseOption(option)));
            isInitializeSuccess = true;
        }
        catch (e) {
            isInitializeSuccess = false;
            throw e;
        }
    });
}
let isInitializeSuccess;
export function checkInitialize() {
    if (isInitializeSuccess === undefined) {
        HelperModule.throwError(ErrorModule.Errors.Initialize, "WeChat api didn't initialize, please invoke initilize function firstly.");
    }
    else if (isInitializeSuccess === false) {
        HelperModule.throwError(ErrorModule.Errors.Initialize, "WeChat api initialize failed.");
    }
}
const defaultOption = {
    appid: "",
    debug: false,
};
function parseOption(o) {
    const option = Object.assign({}, defaultOption);
    if (typeof o.appid === "string") {
        option.appid = o.appid;
    }
    if (typeof o.debug === "boolean") {
        option.debug = o.debug;
    }
    return option;
}
