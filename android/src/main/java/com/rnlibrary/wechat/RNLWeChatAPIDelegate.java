package com.rnlibrary.wechat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelbiz.AddCardToWXCardPackage;
import com.tencent.mm.opensdk.modelbiz.ChooseCardFromWXCardPackage;
import com.tencent.mm.opensdk.modelbiz.OpenWebview;
import com.tencent.mm.opensdk.modelbiz.SubscribeMessage;
import com.tencent.mm.opensdk.modelbiz.SubscribeMiniProgramMsg;
import com.tencent.mm.opensdk.modelbiz.WXInvoiceAuthInsert;
import com.tencent.mm.opensdk.modelbiz.WXLaunchMiniProgram;
import com.tencent.mm.opensdk.modelbiz.WXNontaxPay;
import com.tencent.mm.opensdk.modelbiz.WXOpenBusinessView;
import com.tencent.mm.opensdk.modelbiz.WXOpenBusinessWebview;
import com.tencent.mm.opensdk.modelbiz.WXPayInsurance;
import com.tencent.mm.opensdk.modelmsg.GetMessageFromWX;
import com.tencent.mm.opensdk.modelmsg.LaunchFromWX;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.ShowMessageFromWX;
import com.tencent.mm.opensdk.modelpay.JumpToOfflinePay;
import com.tencent.mm.opensdk.modelpay.PayReq;
import com.tencent.mm.opensdk.modelpay.PayResp;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;

import java.lang.ref.WeakReference;

public class RNLWeChatAPIDelegate implements IWXAPIEventHandler {
    private static WeakReference<RNLWeChatAPIReceiver> mReceiver;

    void setReceiver(RNLWeChatAPIReceiver receiver) {
        mReceiver = new WeakReference<>(receiver);
    }

    @Override
    public void onReq(BaseReq baseReq) {
        if (mReceiver == null) return;
        RNLWeChatAPIReceiver receiver = mReceiver.get();
        if (receiver == null) return;

        WritableMap payload = Arguments.createMap();
        payload.putInt("type", baseReq.getType());
        payload.putString("openID", baseReq.openId);

        if (baseReq instanceof GetMessageFromWX.Req) {
            GetMessageFromWX.Req req = (GetMessageFromWX.Req) baseReq;
            payload.putInt("requestType", RNLWeChatRequestType.GetMessage.getType());
            payload.putString("lang", req.lang);
            payload.putString("country", req.country);
            payload.putString("username", req.username);
        } else if (baseReq instanceof ShowMessageFromWX.Req) {
            ShowMessageFromWX.Req req = (ShowMessageFromWX.Req) baseReq;
            payload.putInt("requestType", RNLWeChatRequestType.ShowMessage.getType());
            payload.putString("lang", req.lang);
            payload.putString("country", req.country);
            payload.putMap("result", RNLWeChatAPIObjectConvert.mediaMessageFromWXO(req.message));
        } else if (baseReq instanceof LaunchFromWX.Req) {
            LaunchFromWX.Req req = (LaunchFromWX.Req) baseReq;
            payload.putInt("requestType", RNLWeChatRequestType.LaunchFromWX.getType());
            payload.putString("lang", req.lang);
            payload.putString("country", req.country);
            WritableMap result = Arguments.createMap();
            result.putString("action", req.messageAction);
            result.putString("ext", req.messageExt);
            payload.putMap("result", result);
        }

        receiver.onReqFromWeChat(payload);
    }

    @Override
    public void onResp(BaseResp baseResp) {
        if (mReceiver == null) return;
        RNLWeChatAPIReceiver receiver = mReceiver.get();
        if (receiver == null) return;

        String name = "";
        boolean success = baseResp.errCode == BaseResp.ErrCode.ERR_OK;
        WritableMap payload = Arguments.createMap();
        payload.putInt("type", baseResp.getType());
        payload.putString("openID", baseResp.openId);
        if (!success) {
            payload.putInt("errorCode", baseResp.errCode);
            payload.putString("errorMessage", baseResp.errStr);
        }

        if (baseResp instanceof SendAuth.Resp) {
            SendAuth.Resp resp = (SendAuth.Resp) baseResp;
            name = SendAuth.Req.class.getName();
            if (success) {
                payload.putString("code", resp.code);
                payload.putString("state", resp.state);
                payload.putString("lang", resp.lang);
                payload.putString("country", resp.country);
                payload.putString("url", resp.url);
            }
        }

        // pay
        else if (baseResp instanceof PayResp) {
            PayResp resp = (PayResp) baseResp;
            name = PayReq.class.getName();
            if (success) {
                payload.putString("prepayId", resp.prepayId);
                payload.putString("returnKey", resp.returnKey);
                payload.putString("ext", resp.extData);
            }
        } else if (baseResp instanceof JumpToOfflinePay.Resp) {
            name = JumpToOfflinePay.Req.class.getName();
        } else if (baseResp instanceof WXNontaxPay.Resp) {
            WXNontaxPay.Resp resp = (WXNontaxPay.Resp) baseResp;
            name = WXNontaxPay.Req.class.getName();
            if (success) {
                payload.putString("orderID", resp.wxOrderId);
            }
        } else if (baseResp instanceof WXPayInsurance.Resp) {
            WXPayInsurance.Resp resp = (WXPayInsurance.Resp) baseResp;
            name = WXPayInsurance.Req.class.getName();
            if (success) {
                payload.putString("orderID", resp.wxOrderId);
            }
        }

        // open ...
        else if (baseResp instanceof OpenWebview.Resp) {
            OpenWebview.Resp resp = (OpenWebview.Resp) baseResp;
            name = OpenWebview.Req.class.getName();
            if (success) {
                payload.putString("result", resp.result);
            }
        } else if (baseResp instanceof WXOpenBusinessView.Resp) {
            WXOpenBusinessView.Resp resp = (WXOpenBusinessView.Resp) baseResp;
            name = WXOpenBusinessView.Req.class.getName();
            if (success) {
                payload.putString("type", resp.businessType);
                payload.putString("ext", resp.extMsg);
            }
        } else if (baseResp instanceof WXOpenBusinessWebview.Resp) {
            WXOpenBusinessWebview.Resp resp = (WXOpenBusinessWebview.Resp) baseResp;
            name = WXOpenBusinessWebview.Req.class.getName();
            if (success) {
                payload.putInt("type", resp.businessType);
                payload.putString("result", resp.resultInfo);
            }
        }

        // card ...
        else if (baseResp instanceof AddCardToWXCardPackage.Resp) {
            AddCardToWXCardPackage.Resp resp = (AddCardToWXCardPackage.Resp) baseResp;
            name = AddCardToWXCardPackage.Req.class.getName();
            if (success) {
                WritableArray cards = Arguments.createArray();
                for (AddCardToWXCardPackage.WXCardItem item : resp.cardArrary) {
                    cards.pushMap(RNLWeChatAPIObjectConvert.cardItemFromWXO(item));
                }
                payload.putArray("cards", cards);
            }
        } else if (baseResp instanceof ChooseCardFromWXCardPackage.Resp) {
            ChooseCardFromWXCardPackage.Resp resp = (ChooseCardFromWXCardPackage.Resp) baseResp;
            name = ChooseCardFromWXCardPackage.Req.class.getName();
            if (success) {
                payload.putString("cards", resp.cardItemList);
            }
        }

        // invoice ...
        else if (baseResp instanceof WXInvoiceAuthInsert.Resp) {
            WXInvoiceAuthInsert.Resp resp = (WXInvoiceAuthInsert.Resp) baseResp;
            name = WXInvoiceAuthInsert.Req.class.getName();
            if (success) {
                payload.putString("orderID", resp.wxOrderId);
            }
        }

        // mini program
        else if (baseResp instanceof WXLaunchMiniProgram.Resp) {
            WXLaunchMiniProgram.Resp resp = (WXLaunchMiniProgram.Resp) baseResp;
            name = WXLaunchMiniProgram.Req.class.getName();
            if (success) {
                payload.putString("ext", resp.extMsg);
            }
        } else if (baseResp instanceof SubscribeMiniProgramMsg.Resp) {
            SubscribeMiniProgramMsg.Resp resp = (SubscribeMiniProgramMsg.Resp) baseResp;
            name = SubscribeMiniProgramMsg.Req.class.getName();
            if (success) {
                payload.putString("unionID", resp.unionId);
                payload.putString("nickname", resp.nickname);
            }
        }

        // message
        else if (baseResp instanceof SendMessageToWX.Resp) {
            SendMessageToWX.Resp resp = (SendMessageToWX.Resp) baseResp;
            name = SendMessageToWX.Req.class.getName();
        } else if (baseResp instanceof SubscribeMessage.Resp) {
            SubscribeMessage.Resp resp = (SubscribeMessage.Resp) baseResp;
            name = SubscribeMessage.Req.class.getName();
            if (success) {
                payload.putInt("scene", resp.scene);
                payload.putString("templateID", resp.templateID);
                payload.putString("action", resp.action);
                payload.putString("reserved", resp.reserved);
            }
        }

        if (!name.equals("")) {
            receiver.onRespFromWeChat(name, success, payload);
        }
    }
}
