#import <React/RCTConvert.h>

#import "RNLWeChatReq.h"
#import "RNLWeChatAPIObjectConvert.h"

@implementation RNLWeChatReq

+ (SendAuthReq *)getSendAuthReqWithOption:(NSDictionary *)option
{
    SendAuthReq *req = [SendAuthReq new];
    req.scope = [RCTConvert NSString:option[@"scope"]];
    req.state = [RCTConvert NSString:option[@"state"]];
    return req;
}

+ (PayReq *)getPayReqWithOption:(NSDictionary *)option
{
    PayReq *req = [PayReq new];
    req.partnerId = [RCTConvert NSString:option[@"partnerId"]];
    req.prepayId = [RCTConvert NSString:option[@"prepayId"]];
    req.nonceStr = [RCTConvert NSString:option[@"nonce"]];
    req.timeStamp = (UInt32)[RCTConvert NSUInteger:option[@"timestamp"]];
    req.package = [RCTConvert NSString:option[@"package"]];
    req.sign = [RCTConvert NSString:option[@"sign"]];
    return req;
}

+ (WXOfflinePayReq *)getWXOfflinePayReqWithOption:(NSDictionary *)option;
{
    WXOfflinePayReq *req = [WXOfflinePayReq new];
    return req;
}

+ (WXNontaxPayReq *)getWXNontaxPayReqWithOption:(NSDictionary *)option;
{
    WXNontaxPayReq *req = [WXNontaxPayReq new];
    req.urlString = [RCTConvert NSString:option[@"url"]];
    return req;
}

+ (WXPayInsuranceReq *)getWXPayInsuranceReqWithOption:(NSDictionary *)option;
{
    WXPayInsuranceReq *req = [WXPayInsuranceReq new];
    req.urlString = [RCTConvert NSString:option[@"url"]];
    return req;
}

+ (OpenTempSessionReq *)getOpenTempSessionReqWithOption:(NSDictionary *)option;
{
    OpenTempSessionReq *req = [OpenTempSessionReq new];
    req.username = [RCTConvert NSString:option[@"username"]];
    req.sessionFrom = [RCTConvert NSString:option[@"session"]];
    return req;
}

+ (OpenRankListReq *)getOpenRankListReqWithOption:(NSDictionary *)option;
{
    OpenRankListReq *req = [OpenRankListReq new];
    return req;
}

+ (OpenWebviewReq *)getOpenWebViewReqWithOption:(NSDictionary *)option;
{
    OpenWebviewReq *req = [OpenWebviewReq new];
    req.url = [RCTConvert NSString:option[@"url"]];
    return req;
}

+ (WXOpenBusinessViewReq *)getWXOpenBusinessViewReqWithOption:(NSDictionary *)option;
{
    WXOpenBusinessViewReq *req = [WXOpenBusinessViewReq new];
    req.businessType = [RCTConvert NSString:option[@"type"]];
    req.query = [RCTConvert NSString:option[@"query"]];
    req.extInfo = [RCTConvert NSString:option[@"ext"]];
    return req;
}

+ (WXOpenBusinessWebViewReq *)getWXOpenBusinessWebViewReqWithOption:(NSDictionary *)option;
{
    WXOpenBusinessWebViewReq *req = [WXOpenBusinessWebViewReq new];
    req.businessType = (UInt32)[RCTConvert NSUInteger:option[@"type"]];
    req.queryInfoDic = [RCTConvert NSDictionary:option[@"query"]];
    return req;
}

+ (JumpToBizProfileReq *)getJumpToBizProfileReqWithOption:(NSDictionary *)option
{
    JumpToBizProfileReq *req = [JumpToBizProfileReq new];
    req.profileType = [RCTConvert int:option[@"type"]];
    req.username = [RCTConvert NSString:option[@"username"]];
    req.extMsg = [RCTConvert NSString:option[@"ext"]];
    return req;
}

+ (JumpToBizWebviewReq *)getJumpToBizWebviewReqWithOption:(NSDictionary *)option
{
    JumpToBizWebviewReq *req = [JumpToBizWebviewReq new];
    req.webType = [RCTConvert int:option[@"type"]];
    req.tousrname = [RCTConvert NSString:option[@"username"]];
    req.extMsg = [RCTConvert NSString:option[@"ext"]];
    return req;
}

+ (AddCardToWXCardPackageReq *)getAddCardToWXCardPackageReqWithOption:(NSDictionary *)option;
{
    AddCardToWXCardPackageReq *req = [AddCardToWXCardPackageReq new];
    NSMutableArray *cards = [NSMutableArray new];
    for (NSDictionary *cardData in [RCTConvert NSArray:option[@"cards"]]) {
        WXCardItem *card = [WXCardItem new];
        card.cardId = [RCTConvert NSString:cardData[@"id"]];
        card.extMsg = [RCTConvert NSString:cardData[@"ext"]];
        [cards addObject:card];
    }
    req.cardAry = cards;
    return req;
}

+ (WXChooseCardReq *)getWXChooseCardReqWithOption:(NSDictionary *)option;
{
    WXChooseCardReq *req = [WXChooseCardReq new];
    req.appID = [RCTConvert NSString:option[@"appID"]];
    req.shopID = (UInt32)[RCTConvert NSUInteger:option[@"shopID"]];
    req.canMultiSelect = (UInt32)[RCTConvert BOOL:option[@"multiSelect"]];
    req.cardType = [RCTConvert NSString:option[@"cardType"]];
    req.cardTpID = [RCTConvert NSString:option[@"cardTpID"]];
    req.signType = [RCTConvert NSString:option[@"signType"]];
    req.cardSign = [RCTConvert NSString:option[@"cardSign"]];
    req.timeStamp = (UInt32)[RCTConvert NSUInteger:option[@"timestamp"]];
    req.nonceStr = [RCTConvert NSString:option[@"nonce"]];
    return req;
}

+ (WXChooseInvoiceReq *)getWXChooseInvoiceReqWithOption:(NSDictionary *)option;
{
    WXChooseInvoiceReq *req = [WXChooseInvoiceReq new];
    req.appID = [RCTConvert NSString:option[@"appID"]];
    req.shopID = (UInt32)[RCTConvert NSUInteger:option[@"shopID"]];
    req.signType = [RCTConvert NSString:option[@"signType"]];
    req.cardSign = [RCTConvert NSString:option[@"cardSign"]];
    req.timeStamp = (UInt32)[RCTConvert NSUInteger:option[@"timestamp"]];
    req.nonceStr = [RCTConvert NSString:option[@"nonce"]];
    return req;
}

+ (WXInvoiceAuthInsertReq *)getWXInvoiceAuthInsertReqWithOption:(NSDictionary *)option;
{
    WXInvoiceAuthInsertReq *req = [WXInvoiceAuthInsertReq new];
    req.urlString = [RCTConvert NSString:option[@"url"]];
    return req;
}

+ (WXLaunchMiniProgramReq *)getWXLaunchMiniProgramReqWithOption:(NSDictionary *)option;
{
    WXLaunchMiniProgramReq *req = [WXLaunchMiniProgramReq new];
    req.userName = [RCTConvert NSString:option[@"username"]];
    req.path = [RCTConvert NSString:option[@"path"]];
    req.miniProgramType = [RCTConvert NSUInteger:option[@"type"]];
    req.extMsg = [RCTConvert NSString:option[@"ext"]];
    return req;
}

+ (WXSubscribeMiniProgramMsgReq *)getWXSubscribeMiniProgramMsgReqWithOption:(NSDictionary *)option;
{
    WXSubscribeMiniProgramMsgReq *req = [WXSubscribeMiniProgramMsgReq new];
    req.miniProgramAppid = [RCTConvert NSString:option[@"appID"]];
    return req;
}

+ (SendMessageToWXReq *)getSendMessageToWXReqWithOption:(NSDictionary *)option;
{
    SendMessageToWXReq *req = [SendMessageToWXReq new];
    req.scene = [RCTConvert int:option[@"scene"]];
    if ([RCTConvert NSInteger:option[@"messageType"]] == RNLWeChatTextMessage) {
        req.bText = YES;
        req.text = [RCTConvert NSString:option[@"content"]];
    } else {
        req.bText = NO;
    }
    req.message = [RNLWeChatAPIObjectConvert MediaMessageToWXO:option];
    req.toUserOpenId = [RCTConvert NSString:option[@"userOpenID"]];
    return req;
}

+ (WXSubscribeMsgReq *)getWXSubscribeMsgReqWithOption:(NSDictionary *)option;
{
    WXSubscribeMsgReq *req = [WXSubscribeMsgReq new];
    req.scene = (UInt32)[RCTConvert NSUInteger:option[@"scene"]];
    req.templateId = [RCTConvert NSString:option[@"templateID"]];
    req.reserved = [RCTConvert NSString:option[@"reserved"]];
    return req;
}

@end
