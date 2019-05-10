import * as HelperModule from "../helper";
import * as RNWModule from "../module";
import { Scenes } from "../scene";
import * as InitializeModule from "./initialize";
export function sendMessage(option) {
    InitializeModule.checkInitialize();
    return HelperModule.invokeWrapper(RNWModule.sendMessage(parseOption(option)));
}
const defaultOption = {
    text: "",
    scene: Scenes.Session,
    userOpenId: "",
};
function parseOption(o) {
    const option = Object.assign({}, defaultOption);
    if (typeof o.text === "string") {
        option.text = o.text;
    }
    if (typeof o.scene === "number") {
        option.scene = o.scene;
    }
    if (typeof o.userOpenId === "string") {
        option.userOpenId = o.userOpenId;
    }
    return option;
}
