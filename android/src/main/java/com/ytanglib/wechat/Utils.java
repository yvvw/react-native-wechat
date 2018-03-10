package com.ytanglib.wechat;

import java.net.URL;
import java.net.HttpURLConnection;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;

import android.content.Context;
import android.app.ActivityManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;

import com.facebook.react.bridge.ReactApplicationContext;

/**
 * Created by dayudong on 08/03/2018.
 */

public class Utils {
    public static String checkNullableString(String str) {
        return str != null ? str : "";
    }

    public static byte[] getByteArrayFromUrlStringWithScale(String urlString, int width, int height) {
        Bitmap bitmap = getBitmapFromUrlString(urlString);
        Bitmap resizeBitmap = getResizeBitmapFromBitmap(bitmap, width, height);
        return transformBitmapToByteArray(resizeBitmap);
    }

    public static void moveCurrentActivityToTop(ReactApplicationContext context) throws NullPointerException {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        activityManager.moveTaskToFront(
                context.getCurrentActivity().getTaskId(),
                ActivityManager.MOVE_TASK_NO_USER_ACTION);
    }

    private static Bitmap getBitmapFromUrlString(String urlString) {
        if (urlString.isEmpty()) {
            return null;
        }
        Bitmap imageBitmap = null;
        try {
            URL imageUrl = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) imageUrl.openConnection();
            conn.setDoInput(true);
            conn.setConnectTimeout(5000);
            conn.connect();
            InputStream imageStream = conn.getInputStream();
            imageBitmap = BitmapFactory.decodeStream(imageStream);
        } catch (Exception ignored) {}
        return imageBitmap;
    }

    private static Bitmap getResizeBitmapFromBitmap(Bitmap bitmap, int newWidth, int newHeight) {
        if (bitmap == null) {
            return null;
        }
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();
        float scaleWidth = ((float) newWidth) / width;
        float scaleHeight = ((float) newHeight) / height;
        Matrix matrix = new Matrix();
        matrix.postScale(scaleWidth, scaleHeight);
        return Bitmap.createBitmap(bitmap, 0, 0, width, height, matrix, false);
    }

    private static byte[] transformBitmapToByteArray(Bitmap bitmap) {
        if (bitmap == null) {
            return null;
        }
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream);
        return stream.toByteArray();
    }

}
