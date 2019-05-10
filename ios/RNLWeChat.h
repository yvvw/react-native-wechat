#ifndef RNLWeChat_h
#define RNLWeChat_h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

typedef NS_ENUM(NSInteger, RNLWeChatError) {
    RNLWeChatInvokeFailedError = 1,
};

@interface RNLWeChat : RCTEventEmitter <RCTBridgeModule>

@end

#endif /* RNLWeChat_h */
