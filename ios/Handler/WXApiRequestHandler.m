#import "WXApi.h"
#import "WXApiRequestHandler.h"

#import "SendMessageToWXReq+requestWithMessage.h"
#import "WXMediaMessage+construct.h"

@implementation WXApiRequestHandler

#pragma OAuth2
+ (BOOL)sendAuthRequestScope:(NSString *)scope
                       State:(NSString *)state
{
    SendAuthReq* req = [[SendAuthReq alloc] init];
    req.scope = scope;
    req.state = state;

    return [WXApi sendReq:req];
}

#pragma Share
+ (BOOL)sendText:(NSString *)text
         InScene:(enum WXScene)scene
{
    SendMessageToWXReq *req = [SendMessageToWXReq requestWithMessage:text
                                                               bText:YES
                                                             scene:scene];

    return [WXApi sendReq:req];
}

+ (BOOL)sendImage:(NSData *)anImageData InScene:(enum WXScene)aScene
{
    WXImageObject *anImageObject = [WXImageObject object];
    anImageObject.imageData = anImageData;

    WXMediaMessage *aMediaMessage = [WXMediaMessage messageWithTitle:nil
                                                         description:nil
                                                           thumbData:nil
                                                         mediaObject:anImageObject];

    SendMessageToWXReq *req = [SendMessageToWXReq requestWithMessage:aMediaMessage
                                                               bText:NO
                                                             scene:aScene];

    return [WXApi sendReq:req];
}

+ (BOOL)sendMusic:(NSString *)aMusicUrl
             musicDataUrl:(NSString *)aMusicDataUrl
                    title:(NSString *)aTitle
              description:(NSString *)aDescription
               thumbImage:(NSData *)aThumbImageData
                  InScene:(enum WXScene)aScene
{
    WXMusicObject *aMusicObject = [WXMusicObject object];
    aMusicObject.musicUrl = aMusicUrl;
    aMusicObject.musicDataUrl = aMusicDataUrl;

    WXMediaMessage *aMediaMessage = [WXMediaMessage messageWithTitle:aTitle
                                                         description:aDescription
                                                           thumbData:aThumbImageData
                                                         mediaObject:aMusicObject];

    SendMessageToWXReq *req = [SendMessageToWXReq requestWithMessage:aMediaMessage
                                                               bText:NO
                                                             scene:aScene];

    return [WXApi sendReq:req];
}

+ (BOOL)sendVideo:(NSString *)aVideoUrl
            title:(NSString *)aTitle
      description:(NSString *)aDescription
       thumbImage:(NSData *)aThumbImageData
          InScene:(enum WXScene)aScene
{
    WXVideoObject *aVideoObject = [WXVideoObject object];
    aVideoObject.videoUrl = aVideoUrl;

    WXMediaMessage *aMediaMessage = [WXMediaMessage messageWithTitle:aTitle
                                                         description:aDescription
                                                           thumbData:aThumbImageData
                                                         mediaObject:aVideoObject];

    SendMessageToWXReq *req = [SendMessageToWXReq requestWithMessage:aMediaMessage
                                                               bText:NO
                                                             scene:aScene];

    return [WXApi sendReq:req];
}

+ (BOOL)sendLink:(NSString *)aLinkUrl
            title:(NSString *)aTitle
      description:(NSString *)aDescription
       thumbImage:(NSData *)aThumbImageData
          InScene:(enum WXScene)aScene
{
    WXWebpageObject *aWebpageObject = [WXWebpageObject object];
    aWebpageObject.webpageUrl = aLinkUrl;

    WXMediaMessage *aMediaMessage = [WXMediaMessage messageWithTitle:aTitle
                                                         description:aDescription
                                                           thumbData:aThumbImageData
                                                         mediaObject:aWebpageObject];

    SendMessageToWXReq *req = [SendMessageToWXReq requestWithMessage:aMediaMessage
                                                               bText:NO
                                                             scene:aScene];

    return [WXApi sendReq:req];
}

+ (BOOL)sendMiniProgram:(NSString *)aUserName
        miniProgramType:(WXMiniProgramType)aMiniProgramType
                   path:(NSString *)aPath
           hdThumbImage:(NSData *)aHdThumbImageData
                  title:(NSString *)aTitle
            description:(NSString *)aDescription
             webpageUrl:(NSString *)aWebpageUrl
             thumbImage:(NSData *)aThumbImageData
{
    WXMiniProgramObject *aWXMiniProgramObject = [WXMiniProgramObject object];
    aWXMiniProgramObject.userName = aUserName;
    aWXMiniProgramObject.withShareTicket = YES;
    aWXMiniProgramObject.miniProgramType = aMiniProgramType;
    aWXMiniProgramObject.path = aPath;
    aWXMiniProgramObject.hdImageData = aHdThumbImageData;
    aWXMiniProgramObject.webpageUrl = aWebpageUrl;

    WXMediaMessage *aMediaMessage = [WXMediaMessage messageWithTitle:aTitle
                                                         description:aDescription
                                                           thumbData:aThumbImageData
                                                         mediaObject:aWXMiniProgramObject];

    SendMessageToWXReq *req = [SendMessageToWXReq requestWithMessage:aMediaMessage
                                                               bText:NO
                                                             scene:WXSceneSession];

    return [WXApi sendReq:req];
}

+ (BOOL)pay:(NSString *)aPartnerId
   prepayId:(NSString *)aPrepayId
   nonceStr:(NSString *)aNonceStr
  timeStamp:(UInt32)aTimeStamp
    package:(NSString *)aPackage
       sign:(NSString *)aSign
{
    PayReq *aPayReq = [PayReq new];
    aPayReq.partnerId = aPartnerId;
    aPayReq.prepayId = aPrepayId;
    aPayReq.nonceStr = aNonceStr;
    aPayReq.timeStamp = aTimeStamp;
    aPayReq.package = aPackage;
    aPayReq.sign = aSign;

    return [WXApi sendReq:aPayReq];
}

@end
