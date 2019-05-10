import * as HelperModule from "../helper";
import * as RNWModule from "../module";
export function openTempSession(option) {
    return HelperModule.invokeWrapper(RNWModule.openTempSession(parseOption(option)));
}
const defaultOption = {
    username: "",
    sessionFrom: "",
};
function parseOption(o) {
    const option = Object.assign({}, defaultOption);
    if (typeof o.username === "string") {
        option.username = o.username;
    }
    if (typeof o.username === "string") {
        option.username = o.username;
    }
    return option;
}
