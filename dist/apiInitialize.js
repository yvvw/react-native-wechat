import { Errors } from "./error";
import { invokeWrapper, throwError } from "./helper";
import { RNWModule } from "./module";
const defaultOption = {
    appID: "",
    debug: false,
};
export function initialize(option) {
    return invokeWrapper(RNWModule.initialize(parseOption(option)));
}
function parseOption(o) {
    const option = Object.assign({}, defaultOption);
    if (typeof o.appID === "string") {
        option.appID = o.appID;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected appID is string, but get ${o.appID}.`);
    }
    if (typeof o.debug === "boolean") {
        option.debug = o.debug;
    }
    return option;
}
