#import <React/RCTConvert.h>
#import <React/RCTUtils.h>

#import "RNLWeChatAPIObjectConvert.h"

const NSUInteger kWeChatThumbSizeLimit = 65536; // 64 KB

NSData *__nullable RNLParseFileStr(NSString *str) {
    if (!str) {
        return nil;
    }
    if ([str hasPrefix:@"~"] ||
        [str hasPrefix:@"/"] ||
        [str hasPrefix:@"file"] ||
        [str hasPrefix:@"http"]) {
        NSURL *url = [RCTConvert NSURL:str];
        return [NSData dataWithContentsOfURL:url];
    } else if ([str hasPrefix:@"data:"]) {
        str = [str substringFromIndex:[str rangeOfString:@","].location + 1];
    }
    return [[NSData alloc] initWithBase64EncodedString:str
                                               options:NSDataBase64DecodingIgnoreUnknownCharacters];
}

@implementation RNLWeChatAPIObjectConvert

+ (NSDictionary *)CardItemFromWXO:(WXCardItem *)aWXCardItem
{
    NSMutableDictionary *card = [NSMutableDictionary new];
    card[@"id"] = aWXCardItem.cardId;
    card[@"ext"] = aWXCardItem.extMsg;
    card[@"state"] = [NSNumber numberWithUnsignedInteger:aWXCardItem.cardState];
    card[@"encryptCode"] = aWXCardItem.encryptCode;
    card[@"appID"] = aWXCardItem.appID;
    return card;
}

+ (NSDictionary *)InvoiceItemFromWXO:(WXInvoiceItem *)aWXInvoiceItem
{
    NSMutableDictionary *invoice = [NSMutableDictionary new];
    invoice[@"id"] = aWXInvoiceItem.cardId;
    invoice[@"ext"] = aWXInvoiceItem.extMsg;
    invoice[@"state"] = [NSNumber numberWithUnsignedInteger:aWXInvoiceItem.cardState];
    invoice[@"encryptCode"] = aWXInvoiceItem.encryptCode;
    invoice[@"appID"] = aWXInvoiceItem.appID;
    return invoice;
}

+ (NSDictionary *)MediaMessageFromWXO:(WXMediaMessage *)aMediaMessage
{
    NSMutableDictionary *message = [NSMutableDictionary new];
    message[@"messageTitle"] = NSStringNonNull(aMediaMessage.title);
    message[@"messageDesc"] = NSStringNonNull(aMediaMessage.description);
    NSURL *thumb = RCTDataURL(@"image/png", aMediaMessage.thumbData);
    message[@"messageThumb"] = thumb ? [thumb absoluteString] : @"";
    message[@"messageTag"] = NSStringNonNull(aMediaMessage.mediaTagName);
    message[@"messageExt"] = NSStringNonNull(aMediaMessage.messageExt);
    message[@"messageAction"] = NSStringNonNull(aMediaMessage.messageAction);
    
    id mediaObject = aMediaMessage.mediaObject;

    if (mediaObject != nil) {
        if ([mediaObject isKindOfClass:[WXTextObject class]]) {
            [message addEntriesFromDictionary:
             [self TextFromWXO:(WXTextObject *)mediaObject]];

        } else if ([mediaObject isKindOfClass:[WXImageObject class]]) {
            [message addEntriesFromDictionary:
             [self ImageFromWXO:(WXImageObject *)mediaObject]];

        } else if ([mediaObject isKindOfClass:[WXMusicObject class]]) {
            [message addEntriesFromDictionary:
             [self MusicFromWXO:(WXMusicObject *)mediaObject]];

        } else if ([mediaObject isKindOfClass:[WXVideoObject class]]) {
            [message addEntriesFromDictionary:
             [self VideoFromWXO:(WXVideoObject *)mediaObject]];

        } else if ([mediaObject isKindOfClass:[WXFileObject class]]) {
            [message addEntriesFromDictionary:
             [self FileFromWXO:(WXFileObject *)mediaObject]];

        } else if ([mediaObject isKindOfClass:[WXWebpageObject class]]) {
            [message addEntriesFromDictionary:
             [self WebpageFromWXO:(WXWebpageObject *)mediaObject]];

        } else if ([mediaObject isKindOfClass:[WXMiniProgramObject class]]) {
            [message addEntriesFromDictionary:
             [self MiniProgramFromWXO:(WXMiniProgramObject *)mediaObject]];

        } else if ([mediaObject isKindOfClass:[WXAppExtendObject class]]) {
            [message addEntriesFromDictionary:
             [self AppExtendFromWXO:(WXAppExtendObject *)mediaObject]];

        } else if ([mediaObject isKindOfClass:[WXEmoticonObject class]]) {
            [message addEntriesFromDictionary:
             [self EmoticonFromWXO:(WXEmoticonObject *)mediaObject]];

        } else if ([mediaObject isKindOfClass:[WXLocationObject class]]) {
            [message addEntriesFromDictionary:
             [self LocationFromWXO:(WXLocationObject *)mediaObject]];
        }
    }

    return message;
}

+ (WXMediaMessage *)MediaMessageToWXO:(NSDictionary *)aMessageData
{
    NSInteger messageType = [RCTConvert NSInteger:aMessageData[@"messageType"]];

    switch (messageType) {
        case RNLWeChatTextMessage:
        {
            return nil;
        }
        case RNLWeChatImageMessage:
        {
            WXMediaMessage *message = [WXMediaMessage message];
            message.mediaObject = [self ImageToWXO:aMessageData];
            // 发送到收藏时, 预览显示用此数据
            if ([[((WXImageObject *) message.mediaObject) imageData] length] < kWeChatThumbSizeLimit) {
                [message setThumbData:((WXImageObject *)message.mediaObject).imageData];
            }
            return message;
        }
        case RNLWeChatMusicMessage:
        {
            WXMediaMessage *message = [WXMediaMessage message];
            message.title = [RCTConvert NSString:aMessageData[@"messageTitle"]];
            message.description = [RCTConvert NSString:aMessageData[@"messageDesc"]];
            [message setThumbData:RNLParseFileStr(aMessageData[@"messageThumb"])];
            message.mediaObject = [self MusicToWXO:aMessageData];
            return message;
        }
        case RNLWeChatVideoMessage:
        {
            WXMediaMessage *message = [WXMediaMessage message];
            message.title = [RCTConvert NSString:aMessageData[@"messageTitle"]];
            message.description = [RCTConvert NSString:aMessageData[@"messageDesc"]];
            [message setThumbData:RNLParseFileStr(aMessageData[@"messageThumb"])];
            message.mediaObject = [self VideoToWXO:aMessageData];
            return message;
        }
        case RNLWeChatFileMessage:
        {
            WXMediaMessage *message = [WXMediaMessage message];
            message.title = [RCTConvert NSString:aMessageData[@"messageTitle"]];
            message.mediaObject = [self FileToWXO:aMessageData];
            return message;
        }
        case RNLWeChatWebpageMessage:
        {
            WXMediaMessage *message = [WXMediaMessage message];
            message.title = [RCTConvert NSString:aMessageData[@"messageTitle"]];
            message.description = [RCTConvert NSString:aMessageData[@"messageDesc"]];
            [message setThumbData:RNLParseFileStr(aMessageData[@"messageThumb"])];
            message.mediaObject = [self WebpageToWXO:aMessageData];
            return message;
        }
        case RNLWeChatMiniProgramMessage:
        {
            WXMediaMessage *message = [WXMediaMessage message];
            message.title = [RCTConvert NSString:aMessageData[@"messageTitle"]];
            message.description = [RCTConvert NSString:aMessageData[@"messageDesc"]];
            [message setThumbData:RNLParseFileStr(aMessageData[@"messageThumb"])];
            message.mediaObject = [self MiniProgramToWXO:aMessageData];
            return message;
        }
        case RNLWeChatAppExtendMessage:
        {
            WXMediaMessage *message = [WXMediaMessage message];
            message.title = [RCTConvert NSString:aMessageData[@"messageTitle"]];
            message.description = [RCTConvert NSString:aMessageData[@"messageDesc"]];
            [message setThumbData:RNLParseFileStr(aMessageData[@"messageThumb"])];
            message.mediaTagName = [RCTConvert NSString:aMessageData[@"messageTag"]];
            message.messageExt = [RCTConvert NSString:aMessageData[@"messageExt"]];
            message.messageAction = [RCTConvert NSString:aMessageData[@"messageAction"]];
            message.mediaObject = [self AppExtendToWXO:aMessageData];
            return message;
        }
        case RNLWeChatEmoticonMessage:
        {
            WXMediaMessage *message = [WXMediaMessage message];
            [message setThumbData:RNLParseFileStr(aMessageData[@"image"])];
            message.mediaObject = [self EmoticonToWXO:aMessageData];
            return message;
        }
        case RNLWeChatLocationMessage:
        {
            WXMediaMessage *message = [WXMediaMessage message];
            message.title = [RCTConvert NSString:aMessageData[@"messageTitle"]];
            message.description = [RCTConvert NSString:aMessageData[@"messageDesc"]];
            [message setThumbData:RNLParseFileStr(aMessageData[@"messageThumb"])];
            message.mediaObject = [self LocationToWXO:aMessageData];
            return message;
        }
    }
    
    return nil;
}

+ (NSDictionary *)TextFromWXO:(WXTextObject *)anObject
{
    NSMutableDictionary *result = [NSMutableDictionary new];
    result[@"content"] = NSStringNonNull(anObject.contentText);
    return result;
}

+ (WXTextObject *)TextToWXO:(NSDictionary *)aData
{
    WXTextObject *object = [WXTextObject object];
    object.contentText = [RCTConvert NSString:aData[@"content"]];
    return object;
}

+ (NSDictionary *)ImageFromWXO:(WXImageObject *)anObject
{
    NSMutableDictionary *result = [NSMutableDictionary new];
    NSURL *image = RCTDataURL(@"image/png", anObject.imageData);
    result[@"image"] = image ? [image absoluteString] : @"";
    return result;
}

+ (WXImageObject *)ImageToWXO:(NSDictionary *)aData
{
    WXImageObject *object = [WXImageObject object];
    object.imageData = RNLParseFileStr(aData[@"image"]);
    return object;
}

+ (NSDictionary *)MusicFromWXO:(WXMusicObject *)anObject
{
    NSMutableDictionary *result = [NSMutableDictionary new];
    result[@"url"] = NSStringNonNull(anObject.musicUrl);
    result[@"lowBandURL"] = NSStringNonNull(anObject.musicLowBandUrl);
    result[@"dataURL"] = NSStringNonNull(anObject.musicDataUrl);
    result[@"lowBandDataURL"] = NSStringNonNull(anObject.musicLowBandDataUrl);
    return result;
}

+ (WXMusicObject *)MusicToWXO:(NSDictionary *)aData
{
    WXMusicObject *object = [WXMusicObject object];
    object.musicUrl = [RCTConvert NSString:aData[@"url"]];
    object.musicLowBandUrl = [RCTConvert NSString:aData[@"lowBandURL"]];
    object.musicDataUrl = [RCTConvert NSString:aData[@"dataURL"]];
    object.musicLowBandDataUrl = [RCTConvert NSString:aData[@"lowBandDataURL"]];
    return object;
}

+ (NSDictionary *)VideoFromWXO:(WXVideoObject *)anObject
{
    NSMutableDictionary *result = [NSMutableDictionary new];
    result[@"url"] = NSStringNonNull(anObject.videoUrl);
    result[@"lowBandURL"] = NSStringNonNull(anObject.videoLowBandUrl);
    return result;
}

+ (WXVideoObject *)VideoToWXO:(NSDictionary *)aData
{
    WXVideoObject *object = [WXVideoObject object];
    object.videoUrl = [RCTConvert NSString:aData[@"url"]];
    object.videoLowBandUrl = [RCTConvert NSString:aData[@"lowBandURL"]];
    return object;
}

+ (NSDictionary *)FileFromWXO:(WXFileObject *)anObject
{
    NSMutableDictionary *result = [NSMutableDictionary new];
    result[@"ext"] = NSStringNonNull(anObject.fileExtension);
    NSURL *file = RCTDataURL(anObject.fileExtension, anObject.fileData);
    result[@"file"] = file ? [file absoluteString] : @"";
    return result;
}

+ (WXFileObject *)FileToWXO:(NSDictionary *)aData
{
    WXFileObject *object = [WXFileObject object];
    object.fileExtension = [RCTConvert NSString:aData[@"ext"]];
    object.fileData = RNLParseFileStr(aData[@"file"]);
    return object;
}

+ (NSDictionary *)WebpageFromWXO:(WXWebpageObject *)anObject
{
    NSMutableDictionary *result = [NSMutableDictionary new];
    result[@"url"] = NSStringNonNull(anObject.webpageUrl);
    return result;
}

+ (WXWebpageObject *)WebpageToWXO:(NSDictionary *)aData
{
    WXWebpageObject *object = [WXWebpageObject object];
    object.webpageUrl = [RCTConvert NSString:aData[@"url"]];
    return object;
}

+ (NSDictionary *)MiniProgramFromWXO:(WXMiniProgramObject *)anObject
{
    NSMutableDictionary *result = [NSMutableDictionary new];
    result[@"type"] = [NSNumber numberWithUnsignedInteger:anObject.miniProgramType];
    result[@"username"] = NSStringNonNull(anObject.userName);
    result[@"path"] = NSStringNonNull(anObject.path);
    NSURL *hdImage = RCTDataURL(@"image/png", anObject.hdImageData);
    result[@"hdImage"] = hdImage ? [hdImage absoluteString] : @"";
    result[@"url"] = NSStringNonNull(anObject.webpageUrl);
    result[@"shareTicket"] = [NSNumber numberWithBool:anObject.withShareTicket];
    return result;
}

+ (WXMiniProgramObject *)MiniProgramToWXO:(NSDictionary *)aData
{
    WXMiniProgramObject *object = [WXMiniProgramObject object];
    object.miniProgramType = [RCTConvert NSUInteger:aData[@"type"]];
    object.userName = [RCTConvert NSString:aData[@"username"]];
    object.path = [RCTConvert NSString:aData[@"path"]];
    object.hdImageData = RNLParseFileStr(aData[@"hdImage"]);
    object.webpageUrl = [RCTConvert NSString:aData[@"url"]];
    object.withShareTicket = [RCTConvert BOOL:aData[@"shareTicket"]];
    return object;
}

+ (NSDictionary *)AppExtendFromWXO:(WXAppExtendObject *)anObject
{
    NSMutableDictionary *result = [NSMutableDictionary new];
    result[@"url"] = NSStringNonNull(anObject.url);
    result[@"ext"] = NSStringNonNull(anObject.extInfo);
    NSURL *file = RCTDataURL(@"", anObject.fileData);
    result[@"file"] = file ? [file absoluteString] : @"";
    return result;
}

+ (WXAppExtendObject *)AppExtendToWXO:(NSDictionary *)aData
{
    WXAppExtendObject *object = [WXAppExtendObject object];
    object.url = [RCTConvert NSString:aData[@"url"]];
    object.extInfo = [RCTConvert NSString:aData[@"ext"]];
    object.fileData = RNLParseFileStr(aData[@"file"]);
    return object;
}

+ (NSDictionary *)EmoticonFromWXO:(WXEmoticonObject *)anObject
{
    NSMutableDictionary *result = [NSMutableDictionary new];
    NSURL *image = RCTDataURL(@"image/png", anObject.emoticonData);
    result[@"image"] = image ? [image absoluteString] : @"";
    return result;
}

+ (WXEmoticonObject *)EmoticonToWXO:(NSDictionary *)aData
{
    WXEmoticonObject *object = [WXEmoticonObject object];
    object.emoticonData = RNLParseFileStr(aData[@"image"]);
    return object;
}

+ (NSDictionary *)LocationFromWXO:(WXLocationObject *)anObject
{
    NSMutableDictionary *result = [NSMutableDictionary new];
    result[@"lng"] = [NSNumber numberWithDouble:anObject.lng];
    result[@"lat"] = [NSNumber numberWithDouble:anObject.lat];
    return result;
}

+ (WXLocationObject *)LocationToWXO:(NSDictionary *)aData
{
    WXLocationObject *object = [WXLocationObject object];
    object.lng = [RCTConvert double:aData[@"lng"]];
    object.lat = [RCTConvert double:aData[@"lat"]];
    return object;
}

@end
