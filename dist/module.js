import { NativeEventEmitter, NativeModules } from "react-native";
export const RNWModule = NativeModules.RNLWeChat;
export const RNWEventEmitter = new NativeEventEmitter(RNWModule);
