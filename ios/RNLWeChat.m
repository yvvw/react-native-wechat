#import <React/RCTConvert.h>
#import <React/RCTUtils.h>
#import <React/RCTLog.h>

#import "WXApi.h"
#import "RNLWeChat.h"
#import "RNLWeChatAPIDelegate.h"
#import "RNLWeChatReq.h"
#import "RNLWeChatResp.h"

static NSString* RNLWeChatGetErrorCode(RNLWeChatError error) {
    return [NSString stringWithFormat:@"%ld", (long)error];
}

@interface RNLWeChat () <RNLWeChatAPIReceiver>

- (void)addResponseHandleWithName:(NSString *)aName andResolver:(RCTPromiseResolveBlock)resolve andRejecter:(RCTPromiseRejectBlock)reject;

- (void)removeResponseHandleByName:(NSString *)aName;

@end

@implementation RNLWeChat {
    RNLWeChatAPIDelegate *mWeChatAPIDelegate;
    NSMutableDictionary *mResponseHandle;
    BOOL isListeningWeChatRequest;
    NSMutableArray *mPendingRequests;
}

static NSString *const kOpenURLNotification = @"RCTOpenURLNotification";

- (instancetype)init
{
    self = [super init];
    if (self) {
        mWeChatAPIDelegate = [RNLWeChatAPIDelegate new];
        __weak RNLWeChat *weakSelf = self;
        [mWeChatAPIDelegate setReceiverDelegate:weakSelf];
        mResponseHandle = [NSMutableDictionary new];
        mPendingRequests = [NSMutableArray new];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(handleOpenURLNotification:)
                                                     name:kOpenURLNotification
                                                   object:nil];
    }
    return self;
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - export methods

#pragma mark - initialize
RCT_REMAP_METHOD(initialize,
                 initializeWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    BOOL debug = [RCTConvert BOOL:option[@"debug"]];
    if (debug) {
        [WXApi startLogByLevel:WXLogLevelDetail logBlock:^(NSString * _Nonnull log) {
            RCTLogInfo(@"RNLWeChat %@", log);
        }];
    } else {
        [WXApi stopLog];
    }

    NSString *appID = [RCTConvert NSString:option[@"appID"]];
    if ([WXApi registerApp:appID enableMTA:NO]) {
        resolve(nil);
    } else {
        reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
               @"APP register failed.", nil);
    }
}

#pragma mark - isAppInstalled
RCT_REMAP_METHOD(isAppInstalled,
                 isAppInstalledWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        resolve([NSNumber numberWithBool:[WXApi isWXAppInstalled]]);
    });
}

#pragma mark - getAppInstallUrl
RCT_REMAP_METHOD(getAppInstallUrl,
                 getAppInstallUrlWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([WXApi getWXAppInstallUrl]);
}

#pragma mark - openApp
RCT_REMAP_METHOD(openApp,
                 openAppWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi openWXApp]) {
            resolve(nil);
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Open APP failed.", nil);
        }
    });
}

#pragma mark - isSupportOpenApi
RCT_REMAP_METHOD(isSupportOpenApi,
                 isSupportOpenApiWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        resolve([NSNumber numberWithBool:[WXApi isWXAppSupportApi]]);
    });
}

#pragma mark - getSDKVersion
RCT_REMAP_METHOD(getSDKVersion,
                 getApiVersionWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([WXApi getApiVersion]);
}

#pragma mark - auth
RCT_REMAP_METHOD(auth,
                 authWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    SendAuthReq *req = [RNLWeChatReq getSendAuthReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL aResult;
        if([RCTConvert BOOL:option[@"fallback"]]) {
            UIViewController *controller = RCTPresentedViewController();
            if (controller) {
                aResult = [WXApi sendAuthReq:req
                              viewController:controller
                                    delegate:mWeChatAPIDelegate];
            } else {
                reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                       @"Root view controller isn't exist.", nil);
                return;
            }
        } else {
            aResult = [WXApi sendReq:req];
        }
        if (aResult) {
            [self addResponseHandleWithName:NSStringFromClass([SendAuthReq class])
                                     andResolver:resolve
                                     andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Send authorize request failed.", nil);
        }
    });
}

#pragma mark - pay
RCT_REMAP_METHOD(pay,
                 payWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    PayReq *req = [RNLWeChatReq getPayReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([PayReq class])
                                     andResolver:resolve
                                     andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Send pay request failed.", nil);
        }
    });
}

#pragma mark - offlinePay
RCT_REMAP_METHOD(offlinePay,
                 offlinePayWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    WXOfflinePayReq *req = [RNLWeChatReq getWXOfflinePayReqWithOption:nil];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([WXOfflinePayReq class])
                                     andResolver:resolve
                                     andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Send offline pay request failed.", nil);
        }
    });
}

#pragma mark - nontaxPay
RCT_REMAP_METHOD(nontaxPay,
                 nontaxPayWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    WXNontaxPayReq *req = [RNLWeChatReq getWXNontaxPayReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([WXNontaxPayReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Nontax pay request failed.", nil);
        }
    });
}

#pragma mark - payInsurance
RCT_REMAP_METHOD(payInsurance,
                 payInsuranceWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    WXPayInsuranceReq *req = [RNLWeChatReq getWXPayInsuranceReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([WXPayInsuranceReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Pay insurance request failed.", nil);
        }
    });
}

#pragma mark - openTempSession
RCT_REMAP_METHOD(openTempSession,
                 openTempSessionWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    OpenTempSessionReq *req = [RNLWeChatReq getOpenTempSessionReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([OpenTempSessionReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Open temp session request failed.", nil);
        }
    });
}

#pragma mark - openRankList
RCT_REMAP_METHOD(openRankList,
                 openRankListWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    OpenRankListReq *req = [RNLWeChatReq getOpenRankListReqWithOption:nil];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([OpenRankListReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Open rank list request failed.", nil);
        }
    });
}

#pragma mark - openWebView
RCT_REMAP_METHOD(openWebView,
                 openWebViewWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    OpenWebviewReq *req = [RNLWeChatReq getOpenWebViewReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([OpenWebviewReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Open webview request failed.", nil);
        }
    });
}

#pragma mark - openBusinessView
RCT_REMAP_METHOD(openBusinessView,
                 openBusinessViewWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    WXOpenBusinessViewReq *req = [RNLWeChatReq getWXOpenBusinessViewReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([WXOpenBusinessViewReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Open business view request failed.", nil);
        }
    });
}

#pragma mark - openBusinessWebView
RCT_REMAP_METHOD(openBusinessWebView,
                 openBusinessWebViewWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    WXOpenBusinessWebViewReq *req = [RNLWeChatReq getWXOpenBusinessWebViewReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([WXOpenBusinessWebViewReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Open business webview request failed.", nil);
        }
    });
}

#pragma mark - jumpToBizProfile
RCT_REMAP_METHOD(jumpToBizProfile,
                 jumpToBizProfileWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    JumpToBizProfileReq *req = [RNLWeChatReq getJumpToBizProfileReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if (![WXApi sendReq:req]) {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Jump to biz profile request failed.", nil);
        } else {
            resolve(nil);
        }
    });
}

#pragma mark - jumpToBizWebView
RCT_REMAP_METHOD(jumpToBizWebView,
                 jumpToBizWebViewWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    JumpToBizWebviewReq *req = [RNLWeChatReq getJumpToBizWebviewReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if (![WXApi sendReq:req]) {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Jump to biz webview request failed.", nil);
        } else {
            resolve(nil);
        }
    });
}

#pragma mark - addCard
RCT_REMAP_METHOD(addCard,
                 addCardWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    AddCardToWXCardPackageReq *req = [RNLWeChatReq getAddCardToWXCardPackageReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([AddCardToWXCardPackageReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Add card to card package request failed.", nil);
        }
    });
}

#pragma mark - chooseCard
RCT_REMAP_METHOD(chooseCard,
                 chooseCardWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    WXChooseCardReq *req = [RNLWeChatReq getWXChooseCardReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([WXChooseCardReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Choose card request failed.", nil);
        }
    });
}

#pragma mark - chooseInvoice
RCT_REMAP_METHOD(chooseInvoice,
                 chooseInvoiceWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    WXChooseInvoiceReq *req = [RNLWeChatReq getWXChooseInvoiceReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([WXChooseInvoiceReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Choose invoice request failed.", nil);
        }
    });
}

#pragma mark - invoiceAuthInsert
RCT_REMAP_METHOD(invoiceAuthInsert,
                 invoiceAuthInsertWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    WXInvoiceAuthInsertReq *req = [RNLWeChatReq getWXInvoiceAuthInsertReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([WXInvoiceAuthInsertReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Invoice auth insert request failed.", nil);
        }
    });
}

#pragma mark - launchMiniProgram
RCT_REMAP_METHOD(launchMiniProgram,
                 launchMiniProgramWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    WXLaunchMiniProgramReq *req = [RNLWeChatReq getWXLaunchMiniProgramReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([WXLaunchMiniProgramReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Launch mini program request failed.", nil);
        }
    });
}

#pragma mark - subscribeMiniProgramMessage
RCT_REMAP_METHOD(subscribeMiniProgramMessage,
                 subscribeMiniProgramMessageWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    WXSubscribeMiniProgramMsgReq *req = [RNLWeChatReq getWXSubscribeMiniProgramMsgReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([WXSubscribeMiniProgramMsgReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Subscribe mini program message request failed.", nil);
        }
    });
}

#pragma mark - sendMessage
RCT_REMAP_METHOD(sendMessage,
                 sendMessageWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        SendMessageToWXReq *req = [RNLWeChatReq getSendMessageToWXReqWithOption:option];

        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([SendMessageToWXReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Send message request failed.", nil);
        }
    });
}

#pragma mark - subscribeMessage
RCT_REMAP_METHOD(subscribeMessage,
                 subscribeMessageWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    WXSubscribeMsgReq *req = [RNLWeChatReq getWXSubscribeMsgReqWithOption:option];

    dispatch_async(dispatch_get_main_queue(), ^{
        if ([WXApi sendReq:req]) {
            [self addResponseHandleWithName:NSStringFromClass([WXSubscribeMsgReq class])
                                      andResolver:resolve
                                      andRejecter:reject];
        } else {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Subscribe message request failed.", nil);
        }
    });
}

#pragma mark - sendMessageResp
RCT_REMAP_METHOD(sendMessageResp,
                 sendMessageRespWithOption:(NSDictionary *)option
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        GetMessageFromWXResp *resp = [RNLWeChatResp getGetMessageFromWXRespWithOption:option];
        if (![WXApi sendResp:resp]) {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Send message response failed.", nil);
        } else {
            resolve(nil);
        }
    });
}

#pragma mark - showMessageResp
RCT_REMAP_METHOD(showMessageResp,
                 showMessageRespResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    ShowMessageFromWXResp *resp = [RNLWeChatResp getShowMessageFromWXRespWithOption:nil];
    
    dispatch_async(dispatch_get_main_queue(), ^{
        if (![WXApi sendResp:resp]) {
            reject(RNLWeChatGetErrorCode(RNLWeChatInvokeFailedError),
                   @"Show message response failed.", nil);
        } else {
            resolve(nil);
        }
    });
}

#pragma mark - listenRequest
RCT_REMAP_METHOD(listenRequest,
                 listenRequestRresolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    isListeningWeChatRequest = YES;
    if ([mPendingRequests count] > 0) {
        resolve(mPendingRequests);
        [mPendingRequests removeAllObjects];
    } else {
        resolve(nil);
    }
}

#pragma mark - stopListenRequest
RCT_REMAP_METHOD(stopListenRequest,
                 stopListenRequestRresolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    isListeningWeChatRequest = NO;
    resolve(nil);
}

#pragma mark - WeChat App request handle

static NSString* kWeChatRequestEventName = @"RNLWeChatRequestEvent";

- (void)onReqFromWeChatWithPayload:(NSDictionary *)aPayload
{
    dispatch_async(_methodQueue, ^{
        if (isListeningWeChatRequest) {
            [self sendEventWithName:kWeChatRequestEventName body:aPayload];
        } else {
            [mPendingRequests addObject:aPayload];
        }
    });
}

#pragma mark - WeChat App response handle

- (void)addResponseHandleWithName:(NSString *)aName andResolver:(RCTPromiseResolveBlock)resolve andRejecter:(RCTPromiseRejectBlock)reject
{
    mResponseHandle[aName] = @[resolve, reject];
}

- (void)removeResponseHandleByName:(NSString *)aName
{
    [mResponseHandle removeObjectForKey:aName];
}

- (void)onRespFromWeChatWithReqName:(NSString *)aName andSuccess:(BOOL)isSuccess andPayload:(NSDictionary *)aPayload
{
    if (mResponseHandle[aName]) {
        if (isSuccess) {
            RCTPromiseResolveBlock resolve = mResponseHandle[aName][0];
            if (resolve) {
                resolve(aPayload);
            }
        } else {
            RCTPromiseRejectBlock reject = mResponseHandle[aName][1];
            if (reject) {
                reject(aPayload[@"errorCode"],
                       RCTJSONStringify(aPayload, nil), nil);
            }
        }
        [self removeResponseHandleByName:aName];
    }
}

#pragma mark - notification observer

- (void)handleOpenURLNotification:(NSNotification *)notification
{
    NSDictionary *info = [notification userInfo];
    if (info && info[@"url"]) {
        [WXApi handleOpenURL:[NSURL URLWithString:info[@"url"]]
                    delegate:mWeChatAPIDelegate];
    }
}

#pragma mark - Bridge

RCT_EXPORT_MODULE(RNLWeChat)

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

@synthesize methodQueue = _methodQueue;

- (NSArray<NSString *> *)supportedEvents
{
    return @[kWeChatRequestEventName];
}

@end
