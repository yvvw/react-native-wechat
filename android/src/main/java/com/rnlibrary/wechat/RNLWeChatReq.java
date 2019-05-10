package com.rnlibrary.wechat;

import android.content.Context;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.tencent.mm.opensdk.modelbiz.AddCardToWXCardPackage;
import com.tencent.mm.opensdk.modelbiz.ChooseCardFromWXCardPackage;
import com.tencent.mm.opensdk.modelbiz.JumpToBizProfile;
import com.tencent.mm.opensdk.modelbiz.JumpToBizTempSession;
import com.tencent.mm.opensdk.modelbiz.JumpToBizWebview;
import com.tencent.mm.opensdk.modelbiz.OpenRankList;
import com.tencent.mm.opensdk.modelbiz.OpenWebview;
import com.tencent.mm.opensdk.modelbiz.SubscribeMessage;
import com.tencent.mm.opensdk.modelbiz.SubscribeMiniProgramMsg;
import com.tencent.mm.opensdk.modelbiz.WXInvoiceAuthInsert;
import com.tencent.mm.opensdk.modelbiz.WXLaunchMiniProgram;
import com.tencent.mm.opensdk.modelbiz.WXNontaxPay;
import com.tencent.mm.opensdk.modelbiz.WXOpenBusinessView;
import com.tencent.mm.opensdk.modelbiz.WXOpenBusinessWebview;
import com.tencent.mm.opensdk.modelbiz.WXPayInsurance;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelpay.JumpToOfflinePay;
import com.tencent.mm.opensdk.modelpay.PayReq;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class RNLWeChatReq {
    static SendAuth.Req getSendAuthReq(ReadableMap option) {
        SendAuth.Req req = new SendAuth.Req();
        req.scope = option.getString("scope");
        req.state = option.getString("state");
        return req;
    }

    static PayReq getPayReq(ReadableMap option, String appID) {
        PayReq req = new PayReq();
        req.appId = appID;
        req.partnerId = option.getString("partnerId");
        req.prepayId = option.getString("prepayId");
        req.nonceStr = option.getString("nonce");
        req.timeStamp = String.valueOf(option.getInt("timestamp"));
        req.packageValue = option.getString("package");
        req.sign = option.getString("sign");
        return req;
    }

    static JumpToOfflinePay.Req getJumpToOfflinePayReq() {
        return new JumpToOfflinePay.Req();
    }

    static WXNontaxPay.Req getWXNontaxPayReq(ReadableMap option) {
        WXNontaxPay.Req req = new WXNontaxPay.Req();
        req.url = option.getString("url");
        return req;
    }

    static WXPayInsurance.Req getWXPayInsuranceReq(ReadableMap option) {
        WXPayInsurance.Req req = new WXPayInsurance.Req();
        req.url = option.getString("url");
        return req;
    }

    static JumpToBizTempSession.Req getJumpToBizTempSessionReq(ReadableMap option) {
        JumpToBizTempSession.Req req = new JumpToBizTempSession.Req();
        req.toUserName = option.getString("username");
        req.sessionFrom = option.getString("session");
        return req;
    }

    static OpenRankList.Req getOpenRankListReq() {
        return new OpenRankList.Req();
    }

    static OpenWebview.Req getOpenWebviewReq(ReadableMap option) {
        OpenWebview.Req req = new OpenWebview.Req();
        req.url = option.getString("url");
        return req;
    }

    static WXOpenBusinessView.Req getWXOpenBusinessViewReq(ReadableMap option) {
        WXOpenBusinessView.Req req = new WXOpenBusinessView.Req();
        req.businessType = option.getString("type");
        req.query = option.getString("type");
        req.extInfo = option.getString("ext");
        return req;
    }

    static WXOpenBusinessWebview.Req getWXOpenBusinessWebviewReq(ReadableMap option) {
        WXOpenBusinessWebview.Req req = new WXOpenBusinessWebview.Req();
        req.businessType = option.getInt("type");
        HashMap<String, String> query = new HashMap<>();
        for (Map.Entry<String, Object> item : option.getMap("query").toHashMap().entrySet()) {
            query.put(item.getKey(), (String) item.getValue());
        }
        req.queryInfo = query;
        return req;
    }

    static JumpToBizProfile.Req getJumpToBizProfileReq(ReadableMap option) {
        JumpToBizProfile.Req req = new JumpToBizProfile.Req();
        req.profileType = option.getInt("type");
        req.toUserName = option.getString("username");
        req.extMsg = option.getString("ext");
        return req;
    }

    static JumpToBizWebview.Req getJumpToBizWebviewReq(ReadableMap option) {
        JumpToBizWebview.Req req = new JumpToBizWebview.Req();
        req.webType = option.getInt("type");
        req.toUserName = option.getString("username");
        req.extMsg = option.getString("ext");
        return req;
    }

    static AddCardToWXCardPackage.Req getAddCardToWXCardPackageReq(ReadableMap option) {
        AddCardToWXCardPackage.Req req = new AddCardToWXCardPackage.Req();
        ReadableArray cardsData = option.getArray("cards");
        if (cardsData != null) {
            List<AddCardToWXCardPackage.WXCardItem> cards = new ArrayList<>();
            for (int i = 0; i < cardsData.size(); i++) {
                ReadableMap cardItem = cardsData.getMap(i);
                AddCardToWXCardPackage.WXCardItem item = new AddCardToWXCardPackage.WXCardItem();
                item.cardId = cardItem.getString("id");
                item.cardExtMsg = cardItem.getString("ext");
                cards.add(item);
            }
            req.cardArrary = cards;
        }
        return req;
    }

    static ChooseCardFromWXCardPackage.Req getChooseCardFromWXCardPackageReq(ReadableMap option) {
        ChooseCardFromWXCardPackage.Req req = new ChooseCardFromWXCardPackage.Req();
        req.appId = option.getString("appID");
        req.locationId = String.valueOf(option.getInt("shopID"));
        req.canMultiSelect = String.valueOf(option.getBoolean("multiSelect"));
        req.cardType = option.getString("cardType");
        req.cardId = option.getString("cardTpID");
        req.signType = option.getString("signType");
        req.cardSign = option.getString("cardSign");
        req.timeStamp = String.valueOf(option.getInt("timestamp"));
        req.nonceStr = option.getString("nonce");
        return req;
    }

    static WXInvoiceAuthInsert.Req getWXInvoiceAuthInsertReq(ReadableMap option) {
        WXInvoiceAuthInsert.Req req = new WXInvoiceAuthInsert.Req();
        req.url = option.getString("url");
        return req;
    }

    static WXLaunchMiniProgram.Req getWXLaunchMiniProgramReq(ReadableMap option) {
        WXLaunchMiniProgram.Req req = new WXLaunchMiniProgram.Req();
        req.userName = option.getString("username");
        req.path = option.getString("path");
        req.miniprogramType = option.getInt("type");
        req.extData = option.getString("ext");
        return req;
    }

    static SubscribeMiniProgramMsg.Req getSubscribeMiniProgramMsgReq(ReadableMap option) {
        SubscribeMiniProgramMsg.Req req = new SubscribeMiniProgramMsg.Req();
        req.miniProgramAppId = option.getString("appID");
        return req;
    }

    static SendMessageToWX.Req getSendMessageToWXReq(Context context, ReadableMap option) throws Exception {
        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.scene = option.getInt("scene");
        req.message = RNLWeChatAPIObjectConvert.mediaMessageToWXO(context, option);
        req.userOpenId = option.getString("userOpenID");
        return req;
    }

    static SubscribeMessage.Req getSubscribeMessageReq(ReadableMap option) {
        SubscribeMessage.Req req = new SubscribeMessage.Req();
        req.scene = option.getInt("scene");
        req.templateID = option.getString("templateID");
        req.reserved = option.getString("reserved");
        return req;
    }
}
