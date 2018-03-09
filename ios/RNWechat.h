
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

#import "WXApi.h"
#import "WXApiRequestHandler.h"

#define RNWechatEventName @"RNWechatEvent"

#define RNWechatOperateSuccess @"true"
#define RNWechatOperateFailed @"false"

@interface RNWechat : RCTEventEmitter <RCTBridgeModule, WXApiDelegate>

+ (void)registerApp:(NSString *)appId IsDebug:(BOOL)isDebug;

@end
  
