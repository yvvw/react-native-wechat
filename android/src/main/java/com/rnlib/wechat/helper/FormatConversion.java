package com.rnlib.wechat.helper;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public final class FormatConversion {

    public static String getNonNullString(Object obj) {
        return obj instanceof String ? obj.toString() : "";
    }

    public static Bitmap stringToBitmap(String string) {
        return stringToBitmapWithScale(string, 0, 0);
    }

    public static Bitmap stringToBitmapWithScale(String string, int width, int height) {
        Bitmap result = null;

        if (isPath(string)) {
            result = BitmapFactory.decodeFile(string);
        } else {
            try {
                URL url = new URL(string);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setDoInput(true);
                conn.setConnectTimeout(3000);
                conn.connect();
                InputStream stream = conn.getInputStream();
                result = BitmapFactory.decodeStream(stream);
                conn.disconnect();
            } catch (Exception ignored) {
            }
        }

        return resizeBitmap(result, width, height);
    }

    public static byte[] bitmapToByteArray(Bitmap bitmap) {
        if (bitmap == null) {
            return null;
        }
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream);
        try {
            stream.close();
        } catch (IOException ignore) {
        }
        return stream.toByteArray();
    }

    private static boolean isPath(String string) {
        return string.startsWith("/") || string.startsWith("file:/");
    }

    private static Bitmap resizeBitmap(Bitmap bitmap, int newWidth, int newHeight) {
        if (bitmap == null) {
            return null;
        }
        if (newWidth <= 0 || newHeight <= 0) {
            return bitmap;
        }
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();
        float scaleWidth = ((float) newWidth) / width;
        float scaleHeight = ((float) newHeight) / height;
        Matrix matrix = new Matrix();
        matrix.postScale(scaleWidth, scaleHeight);
        return Bitmap.createBitmap(bitmap, 0, 0, width, height, matrix, false);
    }
}
