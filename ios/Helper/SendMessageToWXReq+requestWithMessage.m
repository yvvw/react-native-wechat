#import "SendMessageToWXReq+requestWithMessage.h"

@implementation SendMessageToWXReq (requestWithMessage)

+ (SendMessageToWXReq *)requestWithMessage:(id)aMessage
                                     bText:(BOOL)aBText
                                     scene:(enum WXScene)aScene
{
    SendMessageToWXReq *req = [[SendMessageToWXReq alloc] init];
    req.bText = aBText;
    req.scene = aScene;
    if (aBText) {
        req.text = aMessage;
    } else {
        req.message = aMessage;
    }

    return req;
}

@end
