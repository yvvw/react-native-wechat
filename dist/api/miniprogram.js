import * as HelperModule from "../helper";
import * as RNWModule from "../module";
import * as InitializeModule from "./initialize";
export function subscribeMiniProgramMessage(option) {
    InitializeModule.checkInitialize();
    return HelperModule.invokeWrapper(RNWModule.subscribeMiniProgramMessage(parseSubscribeMessgeOption(option)));
}
const defaultSubscribeMiniProgramMessageOption = {
    appID: "",
};
function parseSubscribeMessgeOption(o) {
    const option = Object.assign({}, defaultSubscribeMiniProgramMessageOption);
    if (typeof o.appID === "string") {
        option.appID = o.appID;
    }
    return option;
}
