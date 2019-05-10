import { invokeWrapper } from "./helper";
import { RNWModule } from "./module";

// isAppInstalled

export async function isAppInstalled(): Promise<boolean> {
    return Boolean(await RNWModule.isAppInstalled());
}

// getAppInstallUrl

export function getAppInstallUrl(): Promise<string> {
    return RNWModule.getAppInstallUrl();
}

// openApp

export function openApp(): Promise<void> {
    return invokeWrapper(RNWModule.openApp());
}

// isSupportOpenApi

export async function isSupportOpenApi(): Promise<boolean> {
    return Boolean(await RNWModule.isSupportOpenApi());
}

// getSDKVersion

export function getSDKVersion(): Promise<string> {
    return RNWModule.getSDKVersion();
}
