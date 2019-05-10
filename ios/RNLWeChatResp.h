#ifndef RNLWeChatResp_h
#define RNLWeChatResp_h

#import "WXApiObject.h"

@interface RNLWeChatResp : NSObject

+ (GetMessageFromWXResp *)getGetMessageFromWXRespWithOption:(NSDictionary *)option;

+ (ShowMessageFromWXResp *)getShowMessageFromWXRespWithOption:(NSDictionary *)option;

@end

#endif /* RNLWeChatResp_h */
