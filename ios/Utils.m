//
//  Utils.m
//  RNWechat
//
//  Created by dayu dong on 07/03/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "Utils.h"

@implementation Utils

+ (UIImage *)imageWithImage:(UIImage *)image scaledToSize:(CGSize)newSize
{
    // UIGraphicsBeginImageContext(newSize);
    // In next line, pass 0.0 to use the current device's pixel scaling factor (and thus account for Retina resolution).
    // Pass 1.0 to force exact pixel size.
    UIGraphicsBeginImageContextWithOptions(newSize, NO, 0.0);
    [image drawInRect:CGRectMake(0, 0, newSize.width, newSize.height)];
    UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return newImage;
}

+ (NSData *)imageUrlStringToData:(NSString *)imageUrlString
{
    if ([imageUrlString isEqualToString:@""]) {
        return nil;
    }
    NSURL *imageUrl = [NSURL URLWithString:imageUrlString];
    NSData *imageData = [[NSData alloc] initWithContentsOfURL:imageUrl];
    return imageData;
}

+ (UIImage *)imageUrlString:(NSString *)imageUrlString toImageWithSize:(CGSize)size
{
    NSData *imageData = [Utils imageUrlStringToData:imageUrlString];
    UIImage *image = nil;
    if (imageData != nil) {
        image = [Utils imageWithImage:[UIImage imageWithData:imageData] scaledToSize:size];
    }
    return image;
}

@end
