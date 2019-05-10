import * as HelperModule from "../helper";
import * as RNWModule from "../module";
export function openWebView(option) {
    return HelperModule.invokeWrapper(RNWModule.openWebView(parseOption(option)));
}
const defaultOption = {
    url: "",
};
function parseOption(o) {
    const option = Object.assign({}, defaultOption);
    if (typeof o.url === "string") {
        option.url = o.url;
    }
    return option;
}
