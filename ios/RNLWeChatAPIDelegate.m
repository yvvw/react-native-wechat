#import "WXApiObject.h"
#import "RNLWeChatAPIDelegate.h"
#import "RNLWeChatAPIObjectConvert.h"

@implementation RNLWeChatAPIDelegate {
    _Nullable id<RNLWeChatAPIReceiver> mReceiverDelegate;
}

- (void)setReceiverDelegate:(id<RNLWeChatAPIReceiver>)aReceiverDelegate
{
    mReceiverDelegate = aReceiverDelegate;
}

#pragma mark - WeChat api delegate

- (void)onReq:(BaseReq*)req
{
    if (mReceiverDelegate == nil) {
        return;
    }

    NSMutableDictionary *payload = [NSMutableDictionary new];
    payload[@"type"] = [NSNumber numberWithInt:req.type];
    payload[@"openID"] = NSStringNonNull(req.openID);

    if ([req isKindOfClass:[GetMessageFromWXReq class]]) {
        payload[@"requestType"] = [NSNumber numberWithUnsignedInteger:RNLWeChatGetMessageRequest];
        GetMessageFromWXReq *aReq = (GetMessageFromWXReq *)req;
        payload[@"lang"] = NSStringNonNull(aReq.lang);
        payload[@"country"] = NSStringNonNull(aReq.country);

    } else if ([req isKindOfClass:[ShowMessageFromWXReq class]]) {
        payload[@"requestType"] = [NSNumber numberWithUnsignedInteger:RNLWeChatShowMessageRequest];
        ShowMessageFromWXReq *aReq = (ShowMessageFromWXReq *)req;
        payload[@"lang"] = NSStringNonNull(aReq.lang);
        payload[@"country"] = NSStringNonNull(aReq.country);
        payload[@"result"] = [RNLWeChatAPIObjectConvert MediaMessageFromWXO:aReq.message];

    } else if ([req isKindOfClass:[LaunchFromWXReq class]]) {
        payload[@"requestType"] = [NSNumber numberWithUnsignedInteger:RNLWeChatLaunchFromWXRequest];
        LaunchFromWXReq *aReq = (LaunchFromWXReq *)req;
        payload[@"lang"] = NSStringNonNull(aReq.lang);
        payload[@"country"] = NSStringNonNull(aReq.country);
        payload[@"result"] = [RNLWeChatAPIObjectConvert MediaMessageFromWXO:aReq.message];
    }
    
    [mReceiverDelegate onReqFromWeChatWithPayload:payload];
}

- (void)onResp:(BaseResp*)resp
{
    if (mReceiverDelegate == nil) {
        return;
    }

    NSString *aReqName;
    BOOL isSuccess = resp.errCode == WXSuccess;
    NSMutableDictionary *aPayload = [NSMutableDictionary new];
    aPayload[@"type"] = [NSNumber numberWithInt:resp.type];
    if (!isSuccess) {
        aPayload[@"errorCode"] = [NSNumber numberWithInt:resp.errCode];
        aPayload[@"errorMessage"] = NSStringNonNull(resp.errStr);
    }

    // auth
    if ([resp isKindOfClass:[SendAuthResp class]]) {
        aReqName = NSStringFromClass([SendAuthReq class]);
        SendAuthResp *aResp = (SendAuthResp *)resp;
        if (isSuccess) {
            aPayload[@"code"] = NSStringNonNull(aResp.code);
            aPayload[@"state"] = NSStringNonNull(aResp.state);
            aPayload[@"lang"] = NSStringNonNull(aResp.lang);
            aPayload[@"country"] = NSStringNonNull(aResp.country);
        }
    }

    // pay
    else if ([resp isKindOfClass:[PayResp class]]) {
        aReqName = NSStringFromClass([PayReq class]);
        PayResp *aResp = (PayResp *)resp;
        if (isSuccess) {
            aPayload[@"returnKey"] = NSStringNonNull(aResp.returnKey);
        }
    } else if ([resp isKindOfClass:[WXOfflinePayResp class]]) {
        aReqName = NSStringFromClass([WXOfflinePayReq class]);
    } else if ([resp isKindOfClass:[WXNontaxPayResp class]]) {
        aReqName = NSStringFromClass([WXNontaxPayReq class]);
        WXNontaxPayResp *aResp = (WXNontaxPayResp *)resp;
        if (isSuccess) {
            aPayload[@"orderID"] = NSStringNonNull(aResp.wxOrderId);
        }
    } else if ([resp isKindOfClass:[WXPayInsuranceResp class]]) {
        aReqName = NSStringFromClass([WXPayInsuranceReq class]);
        WXPayInsuranceResp *aResp = (WXPayInsuranceResp *)resp;
        if (isSuccess) {
            aPayload[@"orderID"] = NSStringNonNull(aResp.wxOrderId);
        }
    }

    // open ...
    else if ([resp isKindOfClass:[OpenTempSessionResp class]]) {
        aReqName = NSStringFromClass([OpenTempSessionReq class]);
    } else if ([resp isKindOfClass:[OpenRankListResp class]]) {
        aReqName = NSStringFromClass([OpenRankListReq class]);
    } else if ([resp isKindOfClass:[OpenWebviewResp class]]) {
        aReqName = NSStringFromClass([OpenWebviewReq class]);
    } else if ([resp isKindOfClass:[WXOpenBusinessViewResp class]]) {
        aReqName = NSStringFromClass([WXOpenBusinessViewReq class]);
        WXOpenBusinessViewResp *aResp = (WXOpenBusinessViewResp *)resp;
        if (isSuccess) {
            aPayload[@"type"] = NSStringNonNull(aResp.businessType);
            aPayload[@"ext"] = NSStringNonNull(aResp.extMsg);
        }
    } else if ([resp isKindOfClass:[WXOpenBusinessWebViewResp class]]) {
        aReqName = NSStringFromClass([WXOpenBusinessWebViewReq class]);
        WXOpenBusinessWebViewResp *aResp = (WXOpenBusinessWebViewResp *)resp;
        if (isSuccess) {
            aPayload[@"type"] = [NSNumber numberWithUnsignedInteger:aResp.businessType];
            aPayload[@"result"] = NSStringNonNull(aResp.result);
        }
    }

    // card
    else if ([resp isKindOfClass:[AddCardToWXCardPackageResp class]]) {
        aReqName = NSStringFromClass([AddCardToWXCardPackageReq class]);
        AddCardToWXCardPackageResp *aResp = (AddCardToWXCardPackageResp *)resp;
        if (isSuccess) {
            NSMutableArray *cards = [NSMutableArray new];
            if (aResp.cardAry != nil) {
                for (WXCardItem *card in aResp.cardAry) {
                    [cards addObject:[RNLWeChatAPIObjectConvert CardItemFromWXO:card]];
                }
            }
            aPayload[@"cards"] = cards;
        }
    } else if ([resp isKindOfClass:[WXChooseCardResp class]]) {
        aReqName = NSStringFromClass([WXChooseCardReq class]);
        WXChooseCardResp *aResp = (WXChooseCardResp *)resp;
        if (isSuccess) {
            NSMutableArray *cards = [NSMutableArray new];
            if (aResp.cardAry != nil) {
                for (WXCardItem *card in aResp.cardAry) {
                    [cards addObject:[RNLWeChatAPIObjectConvert CardItemFromWXO:card]];
                }
            }
            aPayload[@"cards"] = cards;
        }
    }

    // invoice
    else if ([resp isKindOfClass:[WXChooseInvoiceResp class]]) {
        aReqName = NSStringFromClass([WXChooseInvoiceReq class]);
        WXChooseInvoiceResp *aResp = (WXChooseInvoiceResp *)resp;
        if (isSuccess) {
            NSMutableArray *invoices = [NSMutableArray new];
            if (aResp.cardAry != nil) {
                for (WXInvoiceItem *invoice in aResp.cardAry) {
                    [invoices addObject:[RNLWeChatAPIObjectConvert InvoiceItemFromWXO:invoice]];
                }
            }
            aPayload[@"invoices"] = invoices;
        }
    } else if ([resp isKindOfClass:[WXInvoiceAuthInsertResp class]]) {
        aReqName = NSStringFromClass([WXInvoiceAuthInsertReq class]);
        WXInvoiceAuthInsertResp *aResp = (WXInvoiceAuthInsertResp *)resp;
        if (isSuccess) {
            aPayload[@"orderID"] = NSStringNonNull(aResp.wxOrderId);
        }
    }

    // mini program
    else if ([resp isKindOfClass:[WXLaunchMiniProgramResp class]]) {
        aReqName = NSStringFromClass([WXLaunchMiniProgramReq class]);
        WXLaunchMiniProgramResp *aResp = (WXLaunchMiniProgramResp *)resp;
        if (isSuccess) {
            aPayload[@"ext"] = NSStringNonNull(aResp.extMsg);
        }
    } else if ([resp isKindOfClass:[WXSubscribeMiniProgramMsgResp class]]) {
        aReqName = NSStringFromClass([WXSubscribeMiniProgramMsgReq class]);
        WXSubscribeMiniProgramMsgResp *aResp = (WXSubscribeMiniProgramMsgResp *)resp;
        if (isSuccess) {
            aPayload[@"openID"] = NSStringNonNull(aResp.openId);
            aPayload[@"unionID"] = NSStringNonNull(aResp.unionId);
            aPayload[@"nickname"] = NSStringNonNull(aResp.nickName);
        }
    }

    // message
    else if ([resp isKindOfClass:[SendMessageToWXResp class]]) {
        aReqName = NSStringFromClass([SendMessageToWXReq class]);
        SendMessageToWXResp *aResp = (SendMessageToWXResp *)resp;
        if (isSuccess) {
            aPayload[@"lang"] = NSStringNonNull(aResp.lang);
            aPayload[@"country"] = NSStringNonNull(aResp.country);
        }
    } else if ([resp isKindOfClass:[WXSubscribeMsgResp class]]) {
        aReqName = NSStringFromClass([WXSubscribeMsgReq class]);
        WXSubscribeMsgResp *aResp = (WXSubscribeMsgResp *)resp;
        if (isSuccess) {
            aPayload[@"scene"] = [NSNumber numberWithUnsignedInteger:aResp.scene];
            aPayload[@"templateID"] = NSStringNonNull(aResp.templateId);
            aPayload[@"action"] = NSStringNonNull(aResp.action);
            aPayload[@"reserved"] = NSStringNonNull(aResp.reserved);
            aPayload[@"openID"] = NSStringNonNull(aResp.openId);
        }
    }

    if (aReqName) {
        [mReceiverDelegate onRespFromWeChatWithReqName:aReqName
                                         andSuccess:isSuccess
                                         andPayload:aPayload];
    }
}

@end
