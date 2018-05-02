#ifndef WXMediaMessage_construct_h
#define WXMediaMessage_construct_h

#import "WXApiObject.h"

@interface WXMediaMessage (construct)

+ (WXMediaMessage *)messageWithTitle:(NSString *)aTitle
                         description:(NSString *)aDescription
                           thumbData:(NSData *)aThumbData
                         mediaObject:(id)aMediaObject;

@end

#endif
