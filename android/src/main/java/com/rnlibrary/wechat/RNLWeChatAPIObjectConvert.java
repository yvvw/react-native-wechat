package com.rnlibrary.wechat;

import android.content.Context;
import android.util.Base64;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.tencent.mm.opensdk.modelbiz.AddCardToWXCardPackage;
import com.tencent.mm.opensdk.modelmsg.WXAppExtendObject;
import com.tencent.mm.opensdk.modelmsg.WXEmojiObject;
import com.tencent.mm.opensdk.modelmsg.WXFileObject;
import com.tencent.mm.opensdk.modelmsg.WXImageObject;
import com.tencent.mm.opensdk.modelmsg.WXLocationObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXMiniProgramObject;
import com.tencent.mm.opensdk.modelmsg.WXMusicObject;
import com.tencent.mm.opensdk.modelmsg.WXTextObject;
import com.tencent.mm.opensdk.modelmsg.WXVideoObject;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

import javax.annotation.Nullable;

class RNLWeChatAPIObjectConvert {
    static WritableMap cardItemFromWXO(AddCardToWXCardPackage.WXCardItem cardItem) {
        WritableMap message = Arguments.createMap();
        message.putString("id", cardItem.cardId);
        message.putString("ext", cardItem.cardExtMsg);
        message.putInt("state", cardItem.cardState);
        return message;
    }

    static WritableMap mediaMessageFromWXO(WXMediaMessage mediaMessage) {
        WritableMap message = Arguments.createMap();
        message.putString("messageTitle", mediaMessage.title);
        message.putString("messageDesc", mediaMessage.description);
        try {
            message.putString("messageThumb",
                    Base64.encodeToString(mediaMessage.thumbData, Base64.DEFAULT));
        } catch (Exception ignored) {
        }
        message.putString("messageTag", mediaMessage.mediaTagName);
        message.putString("messageExt", mediaMessage.messageExt);
        message.putString("messageAction", mediaMessage.messageAction);

        WXMediaMessage.IMediaObject object = mediaMessage.mediaObject;

        if (object != null) {
            if (object instanceof WXTextObject) {
                message = textFromWXO(message, (WXTextObject) object);
            } else if (object instanceof WXImageObject) {
                message = imageFromWXO(message, (WXImageObject) object);
            } else if (object instanceof WXMusicObject) {
                message = musicFromWXO(message, (WXMusicObject) object);
            } else if (object instanceof WXVideoObject) {
                message = videoFromWXO(message, (WXVideoObject) object);
            } else if (object instanceof WXFileObject) {
                message = fileFromWXO(message, (WXFileObject) object);
            } else if (object instanceof WXWebpageObject) {
                message = webpageFromWXO(message, (WXWebpageObject) object);
            } else if (object instanceof WXMiniProgramObject) {
                message = miniProgramFromWXO(message, (WXMiniProgramObject) object);
            } else if (object instanceof WXAppExtendObject) {
                message = appExtendFromWXO(message, (WXAppExtendObject) object);
            } else if (object instanceof WXEmojiObject) {
                message = emoticonFromWXO(message, (WXEmojiObject) object);
            } else if (object instanceof WXLocationObject) {
                message = locationFromWXO(message, (WXLocationObject) object);
            }
        }

        return message;
    }

    static WXMediaMessage mediaMessageToWXO(Context context, ReadableMap data) throws Exception {
        WXMediaMessage message = new WXMediaMessage();

        int messageType = data.getInt("messageType");
        if (RNLWeChatMessageType.Text.getType() == messageType) {
            message.mediaObject = textToWXO(data);
            message.description = ((WXTextObject) message.mediaObject).text;
        } else if (RNLWeChatMessageType.Image.getType() == messageType) {
            message.mediaObject = imageToWXO(context, data);
        } else if (RNLWeChatMessageType.Music.getType() == messageType) {
            message.title = data.getString("messageTitle");
            message.description = data.getString("messageDesc");
            message.thumbData = parseFileStr(context, data.getString("messageThumb"));
            message.mediaObject = musicToWXO(data);
        } else if (RNLWeChatMessageType.Video.getType() == messageType) {
            message.title = data.getString("messageTitle");
            message.description = data.getString("messageDesc");
            message.thumbData = parseFileStr(context, data.getString("messageThumb"));
            message.mediaObject = videoToWXO(data);
        } else if (RNLWeChatMessageType.File.getType() == messageType) {
            message.title = data.getString("messageTitle");
            message.mediaObject = fileToWXO(context, data);
        } else if (RNLWeChatMessageType.Webpage.getType() == messageType) {
            message.title = data.getString("messageTitle");
            message.description = data.getString("messageDesc");
            message.thumbData = parseFileStr(context, data.getString("messageThumb"));
            message.mediaObject = webpageToWXO(data);
        } else if (RNLWeChatMessageType.MiniProgram.getType() == messageType) {
            message.title = data.getString("messageTitle");
            message.description = data.getString("messageDesc");
            message.thumbData = parseFileStr(context, data.getString("hdImage"));
            message.mediaObject = miniProgramToWXO(data);
        } else if (RNLWeChatMessageType.AppExtend.getType() == messageType) {
            message.title = data.getString("messageTitle");
            message.description = data.getString("messageDesc");
            message.thumbData = parseFileStr(context, data.getString("messageThumb"));
            message.mediaTagName = data.getString("messageTag");
            message.messageExt = data.getString("messageExt");
            message.messageAction = data.getString("messageAction");
            message.mediaObject = appExtendToWXO(context, data);
        } else if (RNLWeChatMessageType.Emoticon.getType() == messageType) {
            message.thumbData = parseFileStr(context, data.getString("image"));
            message.mediaObject = emoticonToWXO(context, data);
        } else if (RNLWeChatMessageType.Location.getType() == messageType) {
            message.title = data.getString("messageTitle");
            message.description = data.getString("messageDesc");
            message.thumbData = parseFileStr(context, data.getString("messageThumb"));
            message.mediaObject = locationToWXO(data);
        }

        return message;
    }

    static WritableMap textFromWXO(WritableMap message, WXTextObject object) {
        message.putString("content", object.text);
        return message;
    }

    static WXTextObject textToWXO(ReadableMap data) {
        WXTextObject object = new WXTextObject();
        object.text = data.getString("content");
        return object;
    }

    static WritableMap imageFromWXO(WritableMap message, WXImageObject object) {
        message.putString("path", object.imagePath);
        try {
            message.putString("data", Base64.encodeToString(object.imageData, Base64.DEFAULT));
        } catch (Exception ignored) {
        }
        return message;
    }

    static WXImageObject imageToWXO(Context context, ReadableMap data) throws Exception {
        WXImageObject object = new WXImageObject();
        object.imageData = parseFileStr(context, data.getString("image"));
        return object;
    }

    static WritableMap musicFromWXO(WritableMap message, WXMusicObject object) {
        message.putString("url", object.musicUrl);
        message.putString("lowBandURL", object.musicLowBandUrl);
        message.putString("dataURL", object.musicDataUrl);
        message.putString("lowBandDataURL", object.musicLowBandDataUrl);
        return message;
    }

    static WXMusicObject musicToWXO(ReadableMap data) {
        WXMusicObject object = new WXMusicObject();
        object.musicUrl = data.getString("url");
        object.musicLowBandUrl = data.getString("lowBandURL");
        object.musicDataUrl = data.getString("dataURL");
        object.musicLowBandDataUrl = data.getString("lowBandDataURL");
        return object;
    }

    static WritableMap videoFromWXO(WritableMap message, WXVideoObject object) {
        message.putString("url", object.videoUrl);
        message.putString("lowBandURL", object.videoLowBandUrl);
        return message;
    }

    static WXVideoObject videoToWXO(ReadableMap data) {
        WXVideoObject object = new WXVideoObject();
        object.videoUrl = data.getString("url");
        object.videoLowBandUrl = data.getString("lowBandURL");
        return object;
    }

    static WritableMap fileFromWXO(WritableMap message, WXFileObject object) {
        message.putString("path", object.filePath);
        try {
            message.putString("file", Base64.encodeToString(object.fileData, Base64.DEFAULT));
        } catch (Exception ignored) {
        }
        return message;
    }

    static WXFileObject fileToWXO(Context context, ReadableMap data) throws Exception {
        WXFileObject object = new WXFileObject();
        object.fileData = parseFileStr(context, data.getString("file"));
        return object;
    }

    static WritableMap webpageFromWXO(WritableMap message, WXWebpageObject object) {
        message.putString("url", object.webpageUrl);
        return message;
    }

    static WXWebpageObject webpageToWXO(ReadableMap data) {
        WXWebpageObject object = new WXWebpageObject();
        object.webpageUrl = data.getString("url");
        return object;
    }

    static WritableMap miniProgramFromWXO(WritableMap message, WXMiniProgramObject object) {
        message.putInt("type", object.miniprogramType);
        message.putString("username", object.userName);
        message.putString("path", object.path);
        message.putString("url", object.webpageUrl);
        message.putBoolean("shareTicket", object.withShareTicket);
        return message;
    }

    static WXMiniProgramObject miniProgramToWXO(ReadableMap data) {
        WXMiniProgramObject object = new WXMiniProgramObject();
        object.miniprogramType = data.getInt("type");
        object.userName = data.getString("username");
        object.path = data.getString("path");
        object.webpageUrl = data.getString("url");
        object.withShareTicket = data.getBoolean("shareTicket");
        return object;
    }

    static WritableMap appExtendFromWXO(WritableMap message, WXAppExtendObject object) {
        message.putString("path", object.filePath);
        try {
            message.putString("file", Base64.encodeToString(object.fileData, Base64.DEFAULT));
        } catch (Exception ignored) {
        }
        message.putString("ext", object.extInfo);
        return message;
    }

    static WXAppExtendObject appExtendToWXO(Context context, ReadableMap data) throws Exception {
        WXAppExtendObject object = new WXAppExtendObject();
        object.fileData = parseFileStr(context, data.getString("file"));
        object.extInfo = data.getString("ext");
        return object;
    }

    static WritableMap emoticonFromWXO(WritableMap message, WXEmojiObject object) {
        message.putString("path", object.emojiPath);
        try {
            message.putString("image", Base64.encodeToString(object.emojiData, Base64.DEFAULT));
        } catch (Exception ignored) {
        }
        return message;
    }

    static WXEmojiObject emoticonToWXO(Context context, ReadableMap data) throws Exception {
        WXEmojiObject object = new WXEmojiObject();
        object.emojiData = parseFileStr(context, data.getString("image"));
        return object;
    }

    static WritableMap locationFromWXO(WritableMap message, WXLocationObject object) {
        message.putDouble("lng", object.lng);
        message.putDouble("lat", object.lat);
        return message;
    }

    static WXLocationObject locationToWXO(ReadableMap data) {
        WXLocationObject object = new WXLocationObject();
        object.lng = data.getDouble("lng");
        object.lat = data.getDouble("lat");
        return object;
    }

    static byte[] parseFileStr(Context context, String str) throws Exception {
        if (str.startsWith("/")) {
            str = "file://" + str;
            return inputStreamToByteArray(new FileInputStream(str));
        } else if (str.startsWith("file")) {
            return inputStreamToByteArray(new FileInputStream(str));
        } else if (str.startsWith("http")) {
            URL url = new URL(str);
            URLConnection connection = url.openConnection();
            connection.connect();
            return inputStreamToByteArray(connection.getInputStream());
        } else if (str.startsWith("data:")) {
            str = str.substring(str.indexOf(",") + 1);
        }
        return Base64.decode(str, Base64.DEFAULT);
    }

    static byte[] inputStreamToByteArray(@Nullable InputStream iStream) throws Exception {
        if (iStream == null) {
            return null;
        }
        ByteArrayOutputStream oStream = null;
        try {
            oStream = new ByteArrayOutputStream();
            int c;
            while ((c = iStream.read()) != -1) {
                oStream.write(c);
            }
        } finally {
            iStream.close();
            if (oStream != null) {
                oStream.close();
            }
        }
        return oStream.toByteArray();
    }
}
