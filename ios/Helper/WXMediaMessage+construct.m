#import "WXMediaMessage+construct.h"

@implementation WXMediaMessage (construct)

+ (WXMediaMessage *)messageWithTitle:(NSString *)aTitle
                         description:(NSString *)aDescription
                           thumbData:(NSData *)aThumbData
                         mediaObject:(id)aMediaObject
{
    WXMediaMessage *aMediaMessage = [WXMediaMessage message];
    aMediaMessage.title = aTitle;
    aMediaMessage.description = aDescription;
    aMediaMessage.thumbData = aThumbData;
    aMediaMessage.mediaObject = aMediaObject;

    return aMediaMessage;
}

@end
