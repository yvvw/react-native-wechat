#ifndef RNLWeChatDelegate_h
#define RNLWeChatDelegate_h

#import "WXApi.h"

@protocol RNLWeChatAPIReceiver;

@interface RNLWeChatAPIDelegate : NSObject <WXApiDelegate>

- (void)setReceiverDelegate:(id<RNLWeChatAPIReceiver>)aReceiverDelegate;

@end

@protocol RNLWeChatAPIReceiver <NSObject>

/*! @brief 收到微信的请求后, 发送相应的响应
 */
- (void)onReqFromWeChatWithPayload:(NSDictionary *)aPayload;

/*! @brief 向微信发送请求后, 收到微信的响应
 */
- (void)onRespFromWeChatWithReqName:(NSString *)aName
                         andSuccess:(BOOL)isSuccess
                         andPayload:(NSDictionary *)aPayload;

@end

#endif /* RNLWeChatDelegate_h */
