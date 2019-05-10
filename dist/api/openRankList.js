import * as HelperModule from "../helper";
import * as RNWModule from "../module";
import * as InitializeModule from "./initialize";
export function openRankList() {
    InitializeModule.checkInitialize();
    return HelperModule.invokeWrapper(RNWModule.openRankList());
}
