import { Errors } from "./error";
import { invokeWrapper, resolveImage, throwError } from "./helper";
import { RNWModule } from "./module";
export var MessageType;
(function (MessageType) {
    MessageType[MessageType["Text"] = 0] = "Text";
    MessageType[MessageType["Image"] = 1] = "Image";
    MessageType[MessageType["Music"] = 2] = "Music";
    MessageType[MessageType["Video"] = 3] = "Video";
    MessageType[MessageType["File"] = 4] = "File";
    MessageType[MessageType["Webpage"] = 5] = "Webpage";
    MessageType[MessageType["MiniProgram"] = 6] = "MiniProgram";
    MessageType[MessageType["AppExtend"] = 7] = "AppExtend";
    MessageType[MessageType["Emoticon"] = 8] = "Emoticon";
    MessageType[MessageType["Location"] = 9] = "Location";
})(MessageType || (MessageType = {}));
export var MessageScene;
(function (MessageScene) {
    // 聊天界面
    MessageScene[MessageScene["Session"] = 0] = "Session";
    // 朋友圈
    MessageScene[MessageScene["Timeline"] = 1] = "Timeline";
    // 收藏
    MessageScene[MessageScene["Favorite"] = 2] = "Favorite";
    // 指定联系人
    MessageScene[MessageScene["SpecifiedSession"] = 3] = "SpecifiedSession";
})(MessageScene || (MessageScene = {}));
const defaultMessage = {
    scene: -1,
    messageType: -1,
    messageTitle: "",
    messageDesc: "",
    messageThumb: "",
    messageTag: "",
    messageExt: "",
    messageAction: "",
    userOpenID: "",
    content: "",
    type: "",
    url: "",
    dataURL: "",
    lowBandURL: "",
    lowBandDataURL: "",
    ext: "",
    username: "",
    path: "",
    image: "",
    hdImage: "",
    file: "",
    shareTicket: false,
    lng: 0,
    lat: 0,
};
export function sendMessage(option) {
    return invokeWrapper(RNWModule.sendMessage(parseSendMessageOption(option)));
}
function parseSendMessageOption(o) {
    const option = Object.assign({}, defaultMessage, o);
    if (typeof o.scene !== "number") {
        throwError(Errors.InvokeFailed, `Expected scene is number, but get ${o.scene}.`);
    }
    if (typeof o.messageType !== "number") {
        throwError(Errors.InvokeFailed, `Expected messageType is number, but get ${o.messageType}.`);
    }
    if (typeof o.messageThumb !== undefined) {
        option.messageThumb = resolveImage(o.messageThumb);
    }
    // @ts-ignore
    if (typeof o.image !== undefined) {
        // @ts-ignore
        option.image = resolveImage(o.image);
    }
    // @ts-ignore
    if (typeof o.hdImage !== undefined) {
        // @ts-ignore
        option.hdImage = resolveImage(o.hdImage);
    }
    return option;
}
const defaultSubscribeMessageOption = {
    scene: -1,
    templateID: "",
    reserved: "",
};
export function subscribeMessage(option) {
    return invokeWrapper(RNWModule.subscribeMessage(parseSubscribeMessageOption(option)));
}
function parseSubscribeMessageOption(o) {
    const option = Object.assign({}, defaultSubscribeMessageOption);
    if (typeof o.scene === "number") {
        option.scene = o.scene;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected scene is number, but get ${o.scene}.`);
    }
    if (typeof o.templateID === "string") {
        option.templateID = o.templateID;
    }
    else {
        throwError(Errors.InvokeFailed, `Expected templateID is number, but get ${o.templateID}.`);
    }
    if (typeof o.reserved === "string") {
        option.reserved = o.reserved;
    }
    return option;
}
export function sendMessageResp(option) {
    return RNWModule.sendMessageResp(parseSendMessageRespOption(option));
}
function parseSendMessageRespOption(o) {
    const option = Object.assign({}, defaultMessage, o);
    if (typeof o.messageType !== "number") {
        throwError(Errors.InvokeFailed, `Expected messageType is number, but get ${o.messageType}.`);
    }
    // @ts-ignore
    if (typeof o.image !== undefined) {
        // @ts-ignore
        option.image = resolveImage(o.image);
    }
    // @ts-ignore
    if (typeof o.hdImage !== undefined) {
        // @ts-ignore
        option.hdImage = resolveImage(o.hdImage);
    }
    return option;
}
// showMessageResp
export function showMessageResp() {
    return RNWModule.showMessageResp();
}
