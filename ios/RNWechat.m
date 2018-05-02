#import "RNWechat.h"
#import "FormatConversion.h"

#define ASSIGN_EMPTY_STRING(assign, string) \
if (string != nil) { \
    assign = string; \
} else { \
    assign = @""; \
}

@implementation RNWechat {
    BOOL _isWXApiRegisteSuccess;
}

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}


#pragma lifecycle

- (instancetype)init
{
    self = [super init];
    if (self) {
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


#pragma 初始化

RCT_REMAP_METHOD(registerApp,
                    appId:(NSString *)anAppId
                  isDebug:(BOOL)isDebug
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    if(![anAppId isEqualToString:@""]) {
        if (isDebug) {
            [WXApi startLogByLevel:WXLogLevelDetail
                          logBlock:^(NSString *log) { NSLog(@"WXApi: %@", log); }];
        }
        _isWXApiRegisteSuccess = [WXApi registerApp:anAppId];
        if (_isWXApiRegisteSuccess) {
            NSLog(@"WXApi register success. appId: %@", anAppId);
        } else {
            NSLog(@"WXApi register failed. appId: %@", anAppId);
        }
    } else {
        _isWXApiRegisteSuccess = NO;
        NSLog(@"There is no appId for WXApi.");
    }

    resolve([self getResolveResFromBool:_isWXApiRegisteSuccess]);
}

RCT_REMAP_METHOD(isWXApiRegisteSuccess,
                 isWXApiRegisteSuccessResolver:(RCTPromiseResolveBlock)resolve
                                      rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([self getResolveResFromBool:_isWXApiRegisteSuccess]);
}


#pragma 基本信息

RCT_REMAP_METHOD(isWXAppInstalled,
                 isWXAppInstalledResolver:(RCTPromiseResolveBlock)resolve
                                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([self getResolveResFromBool:[WXApi isWXAppInstalled]]);
}

RCT_REMAP_METHOD(isWXAppSupportApi,
                 isWXAppSupportApiResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([self getResolveResFromBool:[WXApi isWXAppSupportApi]]);
}

RCT_REMAP_METHOD(getWXAppInstallUrl,
                 getWXAppInstallUrlResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([WXApi getWXAppInstallUrl]);
}


#pragma 基本操作

RCT_REMAP_METHOD(openWXApp,
                 openWXAppResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([self getResolveResFromBool:[WXApi openWXApp]]);
}


#pragma OAuth2

RCT_REMAP_METHOD(sendAuthRequest,
                  sendAuthRequestScope:(NSString *)aScope
                                 state:(NSString *)aState
                              resolver:(RCTPromiseResolveBlock)resolve
                              rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([self getResolveResFromBool:[WXApiRequestHandler sendAuthRequestScope:aScope
                                                                            State:aState]]);
}


#pragma Share

RCT_REMAP_METHOD(sendText,
                 sendText:(NSString *)aText
                sceneType:(NSInteger *)aSceneType
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([self getResolveResFromBool:[WXApiRequestHandler sendText:aText
                                                              InScene:(enum WXScene)aSceneType]]);
}

RCT_REMAP_METHOD(sendImage,
                 sendImage:(NSString *)anImageString
                 sceneType:(NSInteger *)aSceneType
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSData *anImageData = [FormatConversion stringToData:anImageString];
    resolve([self getResolveResFromBool:[WXApiRequestHandler sendImage:anImageData
                                                               InScene:(enum WXScene)aSceneType]]);
}

RCT_REMAP_METHOD(sendMusic,
                 musicUrl:(NSString *)aMusicUrl
             musicDataUrl:(NSString *)aMusicDataUrl
                    title:(NSString *)aTitle
              description:(NSString *)aDescription
              thumbString:(NSString *)aThumbString
                sceneType:(NSInteger *)aSceneType
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSData *aThumbData = [FormatConversion stringToData:aThumbString];
    resolve([self getResolveResFromBool:[WXApiRequestHandler sendMusic:aMusicUrl
                                                          musicDataUrl:aMusicDataUrl
                                                                 title:aTitle
                                                           description:aDescription
                                                            thumbImage:aThumbData
                                                               InScene:(enum WXScene)aSceneType]]);
}

RCT_REMAP_METHOD(sendVideo,
                 videoUrl:(NSString *)aVideoUrl
                 title:(NSString *)aTitle
                 description:(NSString *)aDescription
                 thumbString:(NSString *)aThumbString
                 sceneType:(NSInteger *)aSceneType
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSData *aThumbData = [FormatConversion stringToData:aThumbString];
    resolve([self getResolveResFromBool:[WXApiRequestHandler sendVideo:aVideoUrl
                                                                 title:aTitle
                                                           description:aDescription
                                                            thumbImage:aThumbData
                                                               InScene:(enum WXScene)aSceneType]]);
}

RCT_REMAP_METHOD(sendLink,
                  sendLinkString:(NSString *)aLinkString
                           title:(NSString *)aTitle
                     description:(NSString *)aDescription
                     thumbString:(NSString *)aThumbString
                       sceneType:(NSInteger *)aSceneType
                        resolver:(RCTPromiseResolveBlock)resolve
                        rejecter:(RCTPromiseRejectBlock)reject)
{
    NSData *aThumbData = [FormatConversion stringToData:aThumbString];
    resolve([self getResolveResFromBool:[WXApiRequestHandler sendLink:aLinkString
                                                                title:aTitle
                                                          description:aDescription
                                                           thumbImage:aThumbData
                                                              InScene:(enum WXScene)aSceneType]]);
}

RCT_REMAP_METHOD(sendMiniProgram,
               sendMiniProgramUserName:(NSString *)anUserName
                       miniProgramType:(NSInteger *)aMiniProgramType
                                  path:(NSString *)aPath
                         hdThumbString:(NSString *)aHdThumbString
                                 title:(NSString *)aTitle
                           description:(NSString *)aDescription
                            webpageUrl:(NSString *)aWebpageUrl
                           thumbString:(NSString *)aThumbString
                              resolver:(RCTPromiseResolveBlock)resolve
                              rejecter:(RCTPromiseRejectBlock)reject)
{
    // 小程序只支持会话分享
    NSData *aThumbData = [FormatConversion stringToData:aThumbString];
    NSData *aHdThumbData = [FormatConversion stringToData:aHdThumbString];
    resolve([self getResolveResFromBool:[WXApiRequestHandler sendMiniProgram:anUserName
                                                             miniProgramType:(WXMiniProgramType)aMiniProgramType
                                                                        path:aPath
                                                                hdThumbImage:aHdThumbData
                                                                       title:aTitle
                                                                 description:aDescription
                                                                  webpageUrl:aWebpageUrl
                                                                  thumbImage:aThumbData]]);
}


#pragma Pay

RCT_REMAP_METHOD(pay,
              payWithAppId:(NSString *)anAppId
                 partnerId:(NSString *)aPartnerId
                  prepayId:(NSString *)aPrepayId
                  nonceStr:(NSString *)aNonceStr
                 timeStamp:(nonnull NSNumber *)aTimeStamp
                   package:(NSString *)aPackage
                      sign:(NSString *)aSign
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([self getResolveResFromBool:[WXApiRequestHandler pay:aPartnerId
                                                        prepayId:aPrepayId
                                                        nonceStr:aNonceStr
                                                       timeStamp:[aTimeStamp unsignedIntValue]
                                                         package:aPackage
                                                            sign:aSign]]);
}


#pragma WXApiDelegate

// 发送一个sendReq后，收到微信的回应
- (void)onResp:(BaseResp *)resp {
    NSMutableDictionary *body = @{}.mutableCopy;
    body[@"errCode"] = @(resp.errCode);
    ASSIGN_EMPTY_STRING(body[@"errStr"], resp.errStr)

    if ([resp isKindOfClass:[SendAuthResp class]]) {
        // 身份认证
        SendAuthResp *authResp = (SendAuthResp *)resp;
        body[@"eventType"] = @"SendAuthResp";
        ASSIGN_EMPTY_STRING(body[@"code"], authResp.code)
        ASSIGN_EMPTY_STRING(body[@"state"], authResp.state)
        ASSIGN_EMPTY_STRING(body[@"lang"], authResp.lang)
        ASSIGN_EMPTY_STRING(body[@"country"], authResp.country)
    } else if ([resp isKindOfClass:[SendMessageToWXResp class]]) {
        // 发送文字、图片、音乐、视频、链接、小程序
        SendMessageToWXResp *messageResp = (SendMessageToWXResp *)resp;
        body[@"eventType"] = @"SendMessageToWXResp";
        ASSIGN_EMPTY_STRING(body[@"lang"], messageResp.lang)
        ASSIGN_EMPTY_STRING(body[@"country"], messageResp.country)
    } else if ([resp isKindOfClass:[PayResp class]]) {
        // 支付
        PayResp *payResp = (PayResp *)resp;
        body[@"eventType"] = @"PayResp";
        ASSIGN_EMPTY_STRING(body[@"returnKey"], payResp.returnKey);
    }

    [self sendEvent:body];
}

// 收到一个来自微信的请求，第三方应用程序处理完后调用sendResp向微信发送结果
- (void)onReq:(BaseReq *)req {
    // TODO: 收到微信请求，后续处理 可以自动打开，但是没有参数
//    if ([req isKindOfClass:[GetMessageFromWXReq class]]) {
//        GetMessageFromWXReq *getMessageReq = (GetMessageFromWXReq *)req;
//    } else if ([req isKindOfClass:[ShowMessageFromWXReq class]]) {
//        ShowMessageFromWXReq *showMessageReq = (ShowMessageFromWXReq *)req;
//    } else if ([req isKindOfClass:[LaunchFromWXReq class]]) {
//        LaunchFromWXReq *launchReq = (LaunchFromWXReq *)req;
//    }
}

- (NSNumber *)getResolveResFromBool:(BOOL)boolValue
{
    return [NSNumber numberWithBool:boolValue];
}


#pragma event

- (NSArray<NSString *> *)supportedEvents
{
    return @[RNWechatEventName];
}

- (void)sendEvent:(id)body {
    [self sendEventWithName:RNWechatEventName body:body];
}


#pragma wxapi handle url

- (BOOL)openURL:(NSNotification *)aNotification
{
    NSURL *aURL = [NSURL URLWithString:[aNotification userInfo][@"url"]];
    return [WXApi handleOpenURL:aURL delegate:self];
}

@end
