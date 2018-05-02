package com.rnlib.wechat.helper;

import android.app.ActivityManager;
import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;

public class ActivityHelper {

    public static void moveTop(ReactApplicationContext context) throws NullPointerException {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        activityManager.moveTaskToFront(
                context.getCurrentActivity().getTaskId(),
                ActivityManager.MOVE_TASK_NO_USER_ACTION);
    }
}
