#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif
#if __has_include(<React/RCTEventEmitter.h>)
#import <React/RCTEventEmitter.h>
#else
#import "RCTEventEmitter.h"
#endif

#import "WXApi.h"
#import "WXApiRequestHandler.h"

@interface RNWechat : RCTEventEmitter <RCTBridgeModule, WXApiDelegate>

@end
