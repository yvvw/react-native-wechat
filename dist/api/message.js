import * as HelperModule from "../helper";
import * as RNWModule from "../module";
import { Scenes } from "../scene";
import * as InitializeModule from "./initialize";
export function sendMessage(option) {
    InitializeModule.checkInitialize();
    return HelperModule.invokeWrapper(RNWModule.sendMessage(parseSendMessgeOption(option)));
}
const defaultSendMessageOption = {
    text: "",
    scene: Scenes.Session,
    userOpenId: "",
};
function parseSendMessgeOption(o) {
    const option = Object.assign({}, defaultSendMessageOption);
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
export function subscribeMessage(option) {
    InitializeModule.checkInitialize();
    return HelperModule.invokeWrapper(RNWModule.subscribeMessage(parseSubscribeMessgeOption(option)));
}
const defaultSubscribeMessageOption = {
    scene: Scenes.Session,
    templateId: "",
    reserved: "",
};
function parseSubscribeMessgeOption(o) {
    const option = Object.assign({}, defaultSubscribeMessageOption);
    if (typeof o.scene === "number") {
        option.scene = o.scene;
    }
    if (typeof o.templateId === "string") {
        option.templateId = o.templateId;
    }
    if (typeof o.reserved === "string") {
        option.reserved = o.reserved;
    }
    return option;
}
