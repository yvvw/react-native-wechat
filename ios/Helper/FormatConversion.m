#import "FormatConversion.h"

@implementation FormatConversion

+ (NSData *)stringToData:(NSString *)aString
{
    NSURL *aUrl;
    if ([self isPath:aString]) {
        aUrl = [NSURL fileURLWithPath:aString];
    } else {
        aUrl = [NSURL URLWithString:aString];
    }
    
    return [NSData dataWithContentsOfURL:aUrl];
}

+ (NSData *)uiImageToData:(UIImage *)anUIImage
{
    if (anUIImage) {
        return UIImagePNGRepresentation(anUIImage);
    }
    return nil;
}

+ (UIImage *)imageString:(NSString *)anImageString toUIImageWithSize:(CGSize)aSize
{
    NSData *imageData = [self stringToData:anImageString];
    UIImage *image = nil;
    if (imageData != nil) {
        image = [self scaleImage:[UIImage imageWithData:imageData] toSize:aSize];
    }
    return image;
}

+ (BOOL)isPath:(NSString *)aString
{
    NSString *fullPath = aString.stringByStandardizingPath;
    return [fullPath hasPrefix:@"/"] || [fullPath hasPrefix:@"file:/"];
}

+ (UIImage *)scaleImage:(UIImage *)anImage toSize:(CGSize)aNewSize
{
    // UIGraphicsBeginImageContext(newSize);
    // In next line, pass 0.0 to use the current device's pixel scaling factor (and thus account for Retina resolution).
    // Pass 1.0 to force exact pixel size.
    UIGraphicsBeginImageContextWithOptions(aNewSize, NO, 0.0);
    [anImage drawInRect:CGRectMake(0, 0, aNewSize.width, aNewSize.height)];
    UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return newImage;
}

@end
