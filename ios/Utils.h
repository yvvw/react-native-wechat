//
//  Utils.h
//  RNWechat
//
//  Created by dayu dong on 07/03/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#ifndef Utils_h
#define Utils_h

#import <UIKit/UIKit.h>

@interface Utils : NSObject

+ (UIImage *)imageWithImage:(UIImage *)image scaledToSize:(CGSize)size;

+ (NSData *)imageUrlStringToData:(NSString *)imageUrlString;

+ (UIImage *)imageUrlString:(NSString *)imageUrlString toImageWithSize:(CGSize)size;

@end

#endif /* Utils_h */
