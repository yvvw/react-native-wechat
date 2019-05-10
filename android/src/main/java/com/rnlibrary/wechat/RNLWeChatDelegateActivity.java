package com.rnlibrary.wechat;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;

public class RNLWeChatDelegateActivity extends Activity
        implements ReactInstanceManager.ReactInstanceEventListener {
    private ReactInstanceManager mManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (RNLWeChatModule.isInstanced) {
            RNLWeChatModule.handleIntent(getIntent());
            finish();
        } else {
            ReactApplication application = (ReactApplication) getApplication();
            mManager = application.getReactNativeHost().getReactInstanceManager();
            mManager.addReactInstanceEventListener(this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mManager != null) {
            mManager.removeReactInstanceEventListener(this);
        }
    }

    @Override
    public void onReactContextInitialized(ReactContext context) {
        if (RNLWeChatModule.isInstanced) {
            RNLWeChatModule.handleIntent(getIntent());
        }
        finish();
    }
}
