#import <React/RCTConvert.h>

#import "RNLWeChatResp.h"
#import "RNLWeChatAPIObjectConvert.h"

@implementation RNLWeChatResp

+ (GetMessageFromWXResp *)getGetMessageFromWXRespWithOption:(NSDictionary *)option
{
    GetMessageFromWXResp *resp = [GetMessageFromWXResp new];
    if ([RCTConvert NSInteger:option[@"messageType"]] == RNLWeChatTextMessage) {
        resp.bText = YES;
        resp.text = [RCTConvert NSString:option[@"content"]];
    } else {
        resp.bText = NO;
    }
    resp.message = [RNLWeChatAPIObjectConvert MediaMessageToWXO:option];
    return resp;
}

+ (ShowMessageFromWXResp *)getShowMessageFromWXRespWithOption:(NSDictionary *)option
{
    ShowMessageFromWXResp *resp = [ShowMessageFromWXResp new];
    return resp;
}

@end
