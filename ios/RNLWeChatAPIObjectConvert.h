#ifndef RNLWeChatAPIObjectConvert_h
#define RNLWeChatAPIObjectConvert_h

#import "WXApiObject.h"

#define NSStringNonNull(s) s ? s : @""

typedef NS_ENUM(NSUInteger, RNLWeChatRequestType) {
    RNLWeChatGetMessageRequest = 0,
    RNLWeChatShowMessageRequest = 1,
    RNLWeChatLaunchFromWXRequest = 2,
};

typedef NS_ENUM(NSUInteger, RNLWeChatMessageType) {
    RNLWeChatTextMessage = 0,
    RNLWeChatImageMessage = 1,
    RNLWeChatMusicMessage = 2,
    RNLWeChatVideoMessage = 3,
    RNLWeChatFileMessage = 4,
    RNLWeChatWebpageMessage = 5,
    RNLWeChatMiniProgramMessage = 6,
    RNLWeChatAppExtendMessage = 7,
    RNLWeChatEmoticonMessage = 8,
    RNLWeChatLocationMessage = 9,
};

@interface RNLWeChatAPIObjectConvert : NSObject

+ (NSDictionary *)CardItemFromWXO:(WXCardItem *)aWXCardItem;

+ (NSDictionary *)InvoiceItemFromWXO:(WXInvoiceItem *)aWXInvoiceItem;

// Media Message

+ (NSDictionary *)MediaMessageFromWXO:(WXMediaMessage *)aMessage;

+ (WXMediaMessage *)MediaMessageToWXO:(NSDictionary *)aData;

// Text

+ (NSDictionary *)TextFromWXO:(WXTextObject *)anObject;

+ (WXTextObject *)TextToWXO:(NSDictionary *)aData;

// Image

+ (NSDictionary *)ImageFromWXO:(WXImageObject *)anObject;

+ (WXImageObject *)ImageToWXO:(NSDictionary *)aData;

// Music

+ (NSDictionary *)MusicFromWXO:(WXMusicObject *)anObject;

+ (WXMusicObject *)MusicToWXO:(NSDictionary *)aData;

// Video

+ (NSDictionary *)VideoFromWXO:(WXVideoObject *)anObject;

+ (WXVideoObject *)VideoToWXO:(NSDictionary *)aData;

// File

+ (NSDictionary *)FileFromWXO:(WXFileObject *)anObject;

+ (WXFileObject *)FileToWXO:(NSDictionary *)aData;

// Webpage

+ (NSDictionary *)WebpageFromWXO:(WXWebpageObject *)anObject;

+ (WXWebpageObject *)WebpageToWXO:(NSDictionary *)aData;

// MiniProgram

+ (NSDictionary *)MiniProgramFromWXO:(WXMiniProgramObject *)anObject;

+ (WXMiniProgramObject *)MiniProgramToWXO:(NSDictionary *)aData;

// AppExtend

+ (NSDictionary *)AppExtendFromWXO:(WXAppExtendObject *)anObject;

+ (WXAppExtendObject *)AppExtendToWXO:(NSDictionary *)aData;

// Emoticon

+ (NSDictionary *)EmoticonFromWXO:(WXEmoticonObject *)anObject;

+ (WXEmoticonObject *)EmoticonToWXO:(NSDictionary *)aData;

// Location

+ (NSDictionary *)LocationFromWXO:(WXLocationObject *)anObject;

+ (WXLocationObject *)LocationToWXO:(NSDictionary *)aData;

@end

#endif /* RNLWeChatAPIObjectConvert_h */
