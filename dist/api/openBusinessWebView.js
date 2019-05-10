import * as HelperModule from "../helper";
import * as RNWModule from "../module";
export function openBusinessWebView(option) {
    return HelperModule.invokeWrapper(RNWModule.openBusinessWebView(parseOption(option)));
}
const defaultOption = {
    type: 0,
    query: {},
};
function parseOption(o) {
    const option = Object.assign({}, defaultOption);
    if (typeof o.type === "number") {
        option.type = o.type;
    }
    if (typeof o.query === "object") {
        const query = {};
        Object.getOwnPropertyNames(o.query).forEach((key) => {
            query[key] = o.query[key];
        });
        option.query = query;
    }
    return option;
}
