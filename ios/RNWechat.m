#import "RNWechat.h"
#import "Utils.h"

#define ASSIGN_EMPTY_STRING(assign, string) \
if (string != nil) { \
    assign = string; \
} else { \
    assign = @""; \
}

static NSString *const kOpenURLNotification = @"RCTOpenURLNotification";

@implementation RNWechat

+ (NSString *)getOperateResult:(BOOL)isOperateSucc
{
    return isOperateSucc ? RNWechatOperateSuccess : RNWechatOperateFailed;
}

RCT_EXPORT_MODULE()

- (instancetype)init
{
    self = [super init];
    if (self) {
        _isWXApiRegisteSuccess = false;
        // observe RCTLinking push notification
        [[NSNotificationCenter defaultCenter]
                                        addObserver:self
                                        selector:@selector(openURL:)
                                        name:kOpenURLNotification
                                        object:nil];
    }
    return self;
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (BOOL)openURL:(NSNotification *)aNotification
{
    NSURL *aURL = [NSURL URLWithString:[aNotification userInfo][@"url"]];
    return [WXApi handleOpenURL:aURL delegate:self];
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[RNWechatEventName];
}

- (void)sendEvent:(id)body {
    [self sendEventWithName:RNWechatEventName body:body];
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

#pragma react-native-methods
RCT_REMAP_METHOD(registerApp,
                 appId:(NSString *)appId
                 isDebug:(NSString *)isDebug
                 registerAppResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    if(![appId isEqualToString:@""]) {
        if ([isDebug isEqualToString:@"true"]) {
            [WXApi startLogByLevel:WXLogLevelDetail logBlock:^(NSString *log) {
                NSLog(@"WXApi: %@", log);
            }];
        }
        _isWXApiRegisteSuccess = [WXApi registerApp:appId];
        if (_isWXApiRegisteSuccess) {
            NSLog(@"WXApi register success. appId: %@", appId);
        } else {
            NSLog(@"WXApi register failed. appId: %@", appId);
        }
    } else {
        NSLog(@"There is no appId for WXApi.");
    }

    resolve([RNWechat getOperateResult:_isWXApiRegisteSuccess]);
}

RCT_REMAP_METHOD(isWXApiRegisteSuccess,
                 isWXApiRegisteSuccessWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([RNWechat getOperateResult:_isWXApiRegisteSuccess]);
}

RCT_REMAP_METHOD(isWXAppInstalled,
                 isWXAppInstalledWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([RNWechat getOperateResult:[WXApi isWXAppInstalled]]);
}

RCT_REMAP_METHOD(sendAuthRequestScope,
                  sendAuthRequestScope:(NSString *)scope
                  State:(NSString *)state
                  OpenID:(NSString *)openID
                  Resolver:(RCTPromiseResolveBlock)resolve
                  Rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([RNWechat getOperateResult:[WXApiRequestHandler sendAuthRequestScope:scope State:state OpenID:openID]]);
}

RCT_REMAP_METHOD(sendText,
                 sendText:(NSString *)text
                 SceneType:(NSInteger)sceneType
                 Resolver:(RCTPromiseResolveBlock)resolve
                 Rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([RNWechat getOperateResult:[WXApiRequestHandler sendText:text InScene:(enum WXScene)sceneType]]);
}

RCT_REMAP_METHOD(sendLinkURL,
                 sendLinkURL:(NSString *)urlString
                 Title:(NSString *)title
                 Description:(NSString *)description
                 ThumbImageUrlString:(NSString *)thumbImageUrlString
                 SceneType:(NSInteger)sceneType
                 Resolver:(RCTPromiseResolveBlock)resolve
                 Rejecter:(RCTPromiseRejectBlock)reject)
{
    UIImage *thumbImage = [Utils imageUrlString:thumbImageUrlString toImageWithSize:CGSizeMake(100.0, 100.0)];
    resolve([RNWechat getOperateResult:[WXApiRequestHandler
                                                      sendLinkURL:urlString
                                                      TagName:@""
                                                      Title:title
                                                      Description:description
                                                      ThumbImage:thumbImage
                                                      InScene:(enum WXScene)sceneType ]]);
}

RCT_REMAP_METHOD(sendMiniProgramWebpageUrl,
                 sendMiniProgramWebpageUrl:(NSString *)webpageUrl
                 userName:(NSString *)userName
                 path:(NSString *)path
                 title:(NSString *)title
                 Description:(NSString *)description
                 ThumbImageUrlString:(NSString *)thumbImageUrlString
                 hdImageUrlString:(NSString *)hdImageUrlString
                 miniProgramType:(NSInteger)programType
                 Resolver:(RCTPromiseResolveBlock)resolve
                 Rejecter:(RCTPromiseRejectBlock)reject)
{
    // 小程序只支持会话分享
    UIImage *thumbImage = [Utils imageUrlString:thumbImageUrlString toImageWithSize:CGSizeMake(100.0, 100.0)];
    NSData *hdImageData = [Utils imageUrlStringToData:hdImageUrlString];
    resolve([RNWechat getOperateResult:[WXApiRequestHandler
                                        sendMiniProgramWebpageUrl:webpageUrl
                                        userName:userName path:path
                                        title:title
                                        Description:description
                                        ThumbImage:thumbImage
                                        hdImageData:hdImageData
                                        withShareTicket:YES
                                        miniProgramType:(WXMiniProgramType)programType
                                        InScene:WXSceneSession ]]);
}

#pragma mark - WXApiDelegate
- (void)onResp:(BaseResp *)resp {
    NSMutableDictionary *body = @{}.mutableCopy;
    body[@"errCode"] = @(resp.errCode);
    ASSIGN_EMPTY_STRING(body[@"errStr"], resp.errStr)

    if ([resp isKindOfClass:[SendMessageToWXResp class]]) {
        // 发送文字
        SendMessageToWXResp *messageResp = (SendMessageToWXResp *)resp;
        body[@"eventType"] = @"SendMessageToWXResp";
        ASSIGN_EMPTY_STRING(body[@"lang"], messageResp.lang)
        ASSIGN_EMPTY_STRING(body[@"country"], messageResp.country)
    } else if ([resp isKindOfClass:[SendAuthResp class]]) {
        // 发送验证请求
        SendAuthResp *authResp = (SendAuthResp *)resp;
        body[@"eventType"] = @"SendAuthResp";
        ASSIGN_EMPTY_STRING(body[@"code"], authResp.code)
        ASSIGN_EMPTY_STRING(body[@"state"], authResp.state)
        ASSIGN_EMPTY_STRING(body[@"lang"], authResp.lang)
        ASSIGN_EMPTY_STRING(body[@"country"], authResp.country)
    } else if ([resp isKindOfClass:[AddCardToWXCardPackageResp class]]) {
        // 添加卡片到卡包
        AddCardToWXCardPackageResp *addCardResp = (AddCardToWXCardPackageResp *)resp;
        body[@"eventType"] = @"AddCardToWXCardPackageResp";
        ASSIGN_EMPTY_STRING(body[@"cardAry"], addCardResp.cardAry)
    } else if ([resp isKindOfClass:[WXChooseCardResp class]]) {
        // 选择卡片
        WXChooseCardResp *chooseCardResp = (WXChooseCardResp *)resp;
        body[@"eventType"] = @"WXChooseCardResp";
        ASSIGN_EMPTY_STRING(body[@"cardAry"], chooseCardResp.cardAry)
    } else if ([resp isKindOfClass:[WXChooseInvoiceResp class]]){
        // 选择发票
        WXChooseInvoiceResp *chooseInvoiceResp = (WXChooseInvoiceResp *)resp;
        body[@"eventType"] = @"WXChooseInvoiceResp";
        ASSIGN_EMPTY_STRING(body[@"cardAry"], chooseInvoiceResp.cardAry)
    } else if ([resp isKindOfClass:[WXSubscribeMsgResp class]]){
        // 订阅消息
        WXSubscribeMsgResp *subscribeMsgResp = (WXSubscribeMsgResp *)resp;
        body[@"eventType"] = @"WXSubscribeMsgResp";
        ASSIGN_EMPTY_STRING(body[@"templateId"], subscribeMsgResp.templateId)
        // subscribeMsgResp.scene
        ASSIGN_EMPTY_STRING(body[@"action"], subscribeMsgResp.action)
        ASSIGN_EMPTY_STRING(body[@"reserved"], subscribeMsgResp.reserved)
        ASSIGN_EMPTY_STRING(body[@"openId"], subscribeMsgResp.openId)
    } else if ([resp isKindOfClass:[WXLaunchMiniProgramResp class]]){
        // 启动小程序
        WXLaunchMiniProgramResp *launchMiniProgramResp = (WXLaunchMiniProgramResp *)resp;
        body[@"eventType"] = @"WXLaunchMiniProgramResp";
        ASSIGN_EMPTY_STRING(body[@"extMsg"], launchMiniProgramResp.extMsg)
    } else if([resp isKindOfClass:[WXInvoiceAuthInsertResp class]]){
        WXInvoiceAuthInsertResp *invoiceAuthInsertResp = (WXInvoiceAuthInsertResp *)resp;
        body[@"eventType"] = @"WXInvoiceAuthInsertResp";
        ASSIGN_EMPTY_STRING(body[@"wxOrderId"], invoiceAuthInsertResp.wxOrderId)
    } else if([resp isKindOfClass:[WXNontaxPayResp class]]){
        WXNontaxPayResp *nontaxPayResp = (WXNontaxPayResp *)resp;
        body[@"eventType"] = @"WXNontaxPayResp";
        ASSIGN_EMPTY_STRING(body[@"wxOrderId"], nontaxPayResp.wxOrderId)
    } else if ([resp isKindOfClass:[WXPayInsuranceResp class]]){
        WXPayInsuranceResp *payInsuranceResp = (WXPayInsuranceResp *)resp;
        body[@"eventType"] = @"WXPayInsuranceResp";
        ASSIGN_EMPTY_STRING(body[@"wxOrderId"], payInsuranceResp.wxOrderId)
    }

    [self sendEvent:body];
}

- (void)onReq:(BaseReq *)req {
//    if ([req isKindOfClass:[GetMessageFromWXReq class]]) {
//        GetMessageFromWXReq *getMessageReq = (GetMessageFromWXReq *)req;
//    } else if ([req isKindOfClass:[ShowMessageFromWXReq class]]) {
//        ShowMessageFromWXReq *showMessageReq = (ShowMessageFromWXReq *)req;
//    } else if ([req isKindOfClass:[LaunchFromWXReq class]]) {
//        LaunchFromWXReq *launchReq = (LaunchFromWXReq *)req;
//    }
}

@end
