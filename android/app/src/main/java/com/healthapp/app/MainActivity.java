package com.healthapp.app;

import android.os.Bundle;
import android.util.Log;
import android.webkit.CookieManager;
import android.webkit.WebSettings;
import android.webkit.WebStorage;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "HealthApp";
    private static final String DATA_RESET_VERSION = "7.19";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        hardenWebView();
    }

    private void hardenWebView() {
        try {
            WebView.setWebContentsDebuggingEnabled(true);

            WebView webView = getBridge() != null ? getBridge().getWebView() : null;
            if (webView == null) {
                Log.w(TAG, "WebView not ready; skip settings");
                return;
            }

            WebSettings settings = webView.getSettings();
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setDatabaseEnabled(true);
            settings.setAllowFileAccess(true);
            settings.setAllowContentAccess(true);
            settings.setMediaPlaybackRequiresUserGesture(false);
            settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);

            // During testing, stale Service Worker / WebView cache has repeatedly served old pages.
            // Clear WebView storage once for this native build version so JS/HTML changes really load.
            String lastReset = getSharedPreferences("health_app_native", MODE_PRIVATE)
                    .getString("data_reset_version", "");
            if (!DATA_RESET_VERSION.equals(lastReset)) {
                webView.clearCache(true);
                webView.clearHistory();
                WebStorage.getInstance().deleteAllData();
                CookieManager.getInstance().removeAllCookies(null);
                CookieManager.getInstance().flush();
                getSharedPreferences("health_app_native", MODE_PRIVATE)
                        .edit()
                        .putString("data_reset_version", DATA_RESET_VERSION)
                        .apply();
                Log.i(TAG, "Cleared WebView cache/storage for v" + DATA_RESET_VERSION);
            }

            Log.i(TAG, "WebView hardened: JS + DOM storage enabled, cache disabled");
        } catch (Exception e) {
            Log.e(TAG, "Failed to harden WebView", e);
        }
    }
}
