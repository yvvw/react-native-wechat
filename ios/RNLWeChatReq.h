#ifndef RNLWeChatReqHandler_h
#define RNLWeChatReqHandler_h

#import "WXApiObject.h"

@interface RNLWeChatReq : NSObject

+ (SendAuthReq *)getSendAuthReqWithOption:(NSDictionary *)option;

+ (PayReq *)getPayReqWithOption:(NSDictionary *)option;

+ (WXOfflinePayReq *)getWXOfflinePayReqWithOption:(NSDictionary *)option;

+ (WXNontaxPayReq *)getWXNontaxPayReqWithOption:(NSDictionary *)option;

+ (WXPayInsuranceReq *)getWXPayInsuranceReqWithOption:(NSDictionary *)option;

+ (OpenTempSessionReq *)getOpenTempSessionReqWithOption:(NSDictionary *)option;

+ (OpenRankListReq *)getOpenRankListReqWithOption:(NSDictionary *)option;

+ (OpenWebviewReq *)getOpenWebViewReqWithOption:(NSDictionary *)option;

+ (WXOpenBusinessViewReq *)getWXOpenBusinessViewReqWithOption:(NSDictionary *)option;

+ (WXOpenBusinessWebViewReq *)getWXOpenBusinessWebViewReqWithOption:(NSDictionary *)option;

+ (JumpToBizProfileReq *)getJumpToBizProfileReqWithOption:(NSDictionary *)option;

+ (JumpToBizWebviewReq *)getJumpToBizWebviewReqWithOption:(NSDictionary *)option;

+ (AddCardToWXCardPackageReq *)getAddCardToWXCardPackageReqWithOption:(NSDictionary *)option;

+ (WXChooseCardReq *)getWXChooseCardReqWithOption:(NSDictionary *)option;

+ (WXChooseInvoiceReq *)getWXChooseInvoiceReqWithOption:(NSDictionary *)option;

+ (WXInvoiceAuthInsertReq *)getWXInvoiceAuthInsertReqWithOption:(NSDictionary *)option;

+ (WXLaunchMiniProgramReq *)getWXLaunchMiniProgramReqWithOption:(NSDictionary *)option;

+ (WXSubscribeMiniProgramMsgReq *)getWXSubscribeMiniProgramMsgReqWithOption:(NSDictionary *)option;

+ (SendMessageToWXReq *)getSendMessageToWXReqWithOption:(NSDictionary *)option;

+ (WXSubscribeMsgReq *)getWXSubscribeMsgReqWithOption:(NSDictionary *)option;

@end

#endif /* RNLWeChatReqHandler_h */
