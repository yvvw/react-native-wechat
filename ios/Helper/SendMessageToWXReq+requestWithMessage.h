#ifndef SendMessageToWXReq_requestWithMessage_h
#define SendMessageToWXReq_requestWithMessage_h

#import "WXApiObject.h"

@interface SendMessageToWXReq (requestWithMessage)

+ (SendMessageToWXReq *)requestWithMessage:(id)aMessage
                                     bText:(BOOL)aBText
                                     scene:(enum WXScene)aScene;

@end

#endif
