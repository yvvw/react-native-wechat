import React, { Component } from "react";
import { View, ScrollView, Button } from "react-native";
import * as RNWechat from "@yyyyu/react-native-wechat";
import Constants, { IMAGES } from "./Constants";

// 部分测试数据来源于微信提供示例应用, 但依然有些不能用
// 没有足够的信息或服务与微信交互, 部分api调用会失败, 没有条件测试
// 修改 Constants.js 配置信息进行调试

export default class App extends Component {
  initialize = async () => {
    try {
      // interface IInitializeOption {
      //   appID: string;
      //   debug?: boolean;
      // }
      console.log("invoke initialize");
      await RNWechat.initialize({
        appID: Constants.APP_ID,
        debug: true
      });
      console.log("initialize invoke success");
    } catch (e) {
      console.warn(
        "initialize failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  misc = async () => {
    try {
      console.log("invoke isAppInstalled");
      const isAppInstalled = await RNWechat.isAppInstalled();
      console.log("isAppInstalled invoke success: result %o", isAppInstalled);

      console.log("invoke getAppInstallUrl");
      console.log(
        "getAppInstallUrl invoke success: result %o",
        await RNWechat.getAppInstallUrl()
      );

      console.log("invoke isSupportOpenApi");
      console.log(
        "isSupportOpenApi invoke success: result %o",
        await RNWechat.isSupportOpenApi()
      );

      console.log("invoke getSDKVersion");
      console.log(
        "getSDKVersion invoke success: result %o",
        await RNWechat.getSDKVersion()
      );

      // if (isAppInstalled) {
      //   console.log("invoke openApp");
      //   console.log("openApp invoke success: result %o", await RNWechat.openApp());
      // }
    } catch (e) {
      console.warn(
        "invoke failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  auth = async () => {
    try {
      // interface IAuthOption {
      //   state: string;
      //   scope?: AuthScope;
      //   supportWeb?: boolean;
      // }
      console.log("invoke auth");
      console.log(
        "auth invoke success: result %o",
        await RNWechat.auth({
          state: "random_string",
          scope: RNWechat.AuthScope.UserInfo,
          fallback: true
        })
      );
    } catch (e) {
      console.warn(
        "auth failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  pay = async () => {
    try {
      // interface IPayOption {
      //   partnerId: string;
      //   prepayId: string;
      //   nonce: string;
      //   timestamp: number;
      //   package: string;
      //   sign: string;
      // }
      console.log("invoke pay");
      console.log(
        "pay invoke success: result %o",
        await RNWechat.pay({
          partnerId: "partnerId",
          prepayId: "prepayId",
          nonce: "nonce",
          timestamp: 0,
          package: "package",
          sign: "sign"
        })
      );
    } catch (e) {
      console.warn(
        "pay failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  offlinePay = async () => {
    try {
      console.log("invoke offlinePay");
      console.log(
        "offlinePay invoke success: result %o",
        await RNWechat.offlinePay()
      );
    } catch (e) {
      console.warn(
        "offlinePay failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  nontaxPay = async () => {
    try {
      // interface INontaxPayOption {
      //   url: string;
      // }
      console.log("invoke nontaxPay");
      console.log(
        "nontaxPay invoke success: result %o",
        await RNWechat.nontaxPay({
          url: ""
        })
      );
    } catch (e) {
      console.warn(
        "nontaxPay failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  payInsurance = async () => {
    try {
      // interface IPayInsuranceOption {
      //   url: string;
      // }
      console.log("invoke payInsurance");
      console.log(
        "payInsurance invoke success: result %o",
        await RNWechat.payInsurance({
          url: ""
        })
      );
    } catch (e) {
      console.warn(
        "payInsurance failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  openTempSession = async () => {
    try {
      // interface IOpenTempSessionOption {
      //   username: string;
      //   session: string;
      // }
      console.log("invoke openTempSession");
      console.log(
        "openTempSession invoke success: result %o",
        await RNWechat.openTempSession({
          username: "",
          session: ""
        })
      );
    } catch (e) {
      console.warn(
        "openTempSession failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  openRankList = async () => {
    try {
      console.log("invoke openRankList");
      console.log(
        "openRankList invoke success: result %o",
        await RNWechat.openRankList()
      );
    } catch (e) {
      console.warn(
        "openRankList failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  openWebView = async () => {
    try {
      // interface IOpenWebViewOption {
      //   url: string;
      // }
      console.log("invoke openWebView");
      console.log(
        "openWebView invoke success: result %o",
        await RNWechat.openWebView({
          url: "https://www.example.com"
        })
      );
    } catch (e) {
      console.warn(
        "openWebView failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  openBusinessView = async () => {
    try {
      // interface IOpenBusinessViewOption {
      //   type: string;
      //   query: string;
      //   ext?: string; // json string
      // }
      console.log("invoke openBusinessView");
      console.log(
        "openBusinessView invoke success: result %o",
        await RNWechat.openBusinessView({
          type: "type",
          query: "query",
          ext: '{"field":"content"}'
        })
      );
    } catch (e) {
      console.warn(
        "openBusinessView failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  openBusinessWebView = async () => {
    try {
      // interface IOpenBusinessWebViewOption {
      //   type: string;
      //   query: {
      //       [key: string]: any,
      //   };
      // }
      console.log("invoke openBusinessWebView");
      console.log(
        "openBusinessWebView invoke success: result %o",
        await RNWechat.openBusinessWebView({
          type: 1,
          query: {
            field: "content"
          }
        })
      );
    } catch (e) {
      console.warn(
        "openBusinessWebView failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  jumpToBizProfile = async () => {
    try {
      // interface IJumpToBizProfileOption {
      //   username: string;
      //   type?: BizProfileType;
      //   ext?: string;
      // }
      console.log("invoke jumpToBizProfile");
      console.log(
        "jumpToBizProfile invoke success: result %o",
        await RNWechat.jumpToBizProfile({
          username: "username",
          type: RNWechat.BizProfileType.Normal,
          ext: '{"field":"content"}'
        })
      );
    } catch (e) {
      console.warn(
        "jumpToBizProfile failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  jumpToBizWebView = async () => {
    try {
      // interface IJumpToBizWebViewOption {
      //   tousrname: string;
      //   type?: MPWebViewType;
      //   ext?: string;
      // }
      console.log("invoke jumpToBizWebView");
      console.log(
        "jumpToBizWebView invoke success: result %o",
        await RNWechat.jumpToBizWebView({
          tousrname: "tousrname",
          type: RNWechat.MPWebViewType.Ad,
          ext: '{"field":"content"}'
        })
      );
    } catch (e) {
      console.warn(
        "jumpToBizWebView failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  addCard = async () => {
    try {
      // interface ICardItem {
      //   id: string;
      //   ext: string;
      // }
      console.log("invoke addCard");
      console.log(
        "addCard invoke success: result %o",
        await RNWechat.addCard({
          cards: [
            {
              id: "pDF3iY9tv9zCGCj4jTXFOo1DxHdo",
              ext:
                '{"code":"","openid":"","timestamp":"1418301401","signature":"ad9cf9463610bc8752c95084716581d52cd33aa0"}'
            }
          ]
        })
      );
    } catch (e) {
      console.warn(
        "addCard failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  chooseCard = async () => {
    try {
      // interface IChooseCardOption {
      //   appID?: string;
      //   shopID?: number;
      //   multiSelect?: boolean;
      //   cardType?: string;
      //   cardTpID?: string;
      //   signType?: string;
      //   cardSign?: string;
      //   timestamp?: number;
      //   nonce?: string;
      // }
      console.log("invoke chooseCard");
      console.log(
        "chooseCard invoke success: result %o",
        await RNWechat.chooseCard({
          appID: Constants.APP_ID,
          shopID: 0,
          multiSelect: true,
          cardType: "",
          cardTpID: "",
          signType: "SHA1",
          cardSign: "6caa49f4a5af3d64ac247e1f563e5b5eb94619ad",
          timestamp: 1437997723,
          nonce: "k0hGdSXKZEj3Min5"
        })
      );
    } catch (e) {
      console.warn(
        "chooseCard failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  chooseInvoice = async () => {
    try {
      // interface IChooseInvoiceOption {
      //   appID?: string;
      //   shopID?: number;
      //   signType?: string;
      //   cardSign?: string;
      //   timestamp?: number;
      //   nonce?: string;
      // }
      console.log("invoke chooseInvoice");
      console.log(
        "chooseInvoice invoke success: result %o",
        await RNWechat.chooseInvoice({
          appID: Constants.APP_ID,
          shopID: 0,
          signType: "SHA1",
          cardSign: "b00b633cbe44c3d35b5cc8015691b341ada81592",
          timestamp: 1557210976,
          nonce: "Fh76HgNJYXVSXieh"
        })
      );
    } catch (e) {
      console.warn(
        "chooseInvoice failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  invoiceAuthInsert = async () => {
    try {
      // interface IInvoiceAuthInsertOption {
      //   url: string;
      // }
      console.log("invoke invoiceAuthInsert");
      console.log(
        "invoiceAuthInsert invoke success: result %o",
        await RNWechat.invoiceAuthInsert({
          url:
            "https://mp.weixin.qq.com/bizmall/authinvoice?action=list&s_pappid=d3g1YjVkOTM3MWM3MzMwMmRjX1MbTXulxSJ%2BUckPKeOzT5sOW03JCEfhGLW%2Bq0iGP%2Bo9&appid=wxc0b84a53ed8e8d29&num=1&o1=1508750288&m1=100&t1=1502072789&source=web&type=1&redirect_url=https%3A%2F%2Fmp.weixin.qq.com%3Fabc%3D123%26aaa%3Dtest&signature=c8ef50d09dc6f711b1bb7bfcc474cb947281bc0a#wechat_redirect"
        })
      );
    } catch (e) {
      console.warn(
        "invoiceAuthInsert failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  launchMiniProgram = async () => {
    try {
      // interface ILaunchMiniProgramOption {
      //   username: string;
      //   type: number;
      //   path?: string;
      //   ext?: string; // json
      // }
      console.log("invoke launchMiniProgram");
      console.log(
        "launchMiniProgram invoke success: result %o",
        await RNWechat.launchMiniProgram({
          username: Constants.MP_ORIGIN_ID,
          type: RNWechat.MiniProgramType.Test,
          path: "",
          ext: ""
        })
      );
    } catch (e) {
      console.warn(
        "launchMiniProgram failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  subscribeMiniProgramMessage = async () => {
    try {
      // interface ISubscribeMiniProgramMessageOption {
      //   appID: string;
      // }
      console.log("invoke subscribeMiniProgramMessage");
      console.log(
        "subscribeMiniProgramMessage invoke success: result %o",
        await RNWechat.subscribeMiniProgramMessage({
          appID: Constants.MP_APP_ID
        })
      );
    } catch (e) {
      console.warn(
        "subscribeMiniProgramMessage failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  sendTextObjectMessage = async () => {
    try {
      // interface ITextMediaMessage extends IBaseMediaMessage {
      //   content: string;
      // }
      console.log("invoke sendTextObjectMessage");
      console.log(
        "sendTextObjectMessage invoke success: result %o",
        await RNWechat.sendMessage({
          scene: Constants.SCENE,
          messageType: RNWechat.MessageType.Text,
          content:
            "人文的东西并不是体现在你看得到的方面，它更多的体现在你看不到的那些方面，它会影响每一个功能，这才是最本质的。但是，对这点可能很多人没有思考过，以为人文的东西就是我们搞一个很小清新的图片什么的。”综合来看，人文的东西其实是贯穿整个产品的脉络，或者说是它的灵魂所在。"
        })
      );
    } catch (e) {
      console.warn(
        "sendTextObjectMessage failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  sendImageObjectMessage = async () => {
    try {
      // interface IImageMediaMessage extends IBaseMediaMessage {
      //   image: string;
      // }
      console.log("invoke sendImageObjectMessage");
      console.log(
        "sendImageObjectMessage invoke success: result %o",
        await RNWechat.sendMessage({
          scene: Constants.SCENE,
          messageType: RNWechat.MessageType.Image,
          image: IMAGES.url
        })
      );
    } catch (e) {
      console.warn(
        "sendImageObjectMessage failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  sendMusicObjectMessage = async () => {
    try {
      // interface IMusicMediaMessage extends IBaseMediaMessage {
      //   url: string;
      //   lowBandURL: string;
      //   dataURL: string;
      //   lowBandDataURL: string;
      // }
      console.log("invoke sendMusicObjectMessage");
      console.log(
        "sendMusicObjectMessage invoke success: result %o",
        await RNWechat.sendMessage({
          scene: Constants.SCENE,
          messageType: RNWechat.MessageType.Music,
          messageTitle: "一无所有",
          messageDesc: "崔健",
          messageThumb: IMAGES.base64,
          url:
            "http://y.qq.com/i/song.html#p=7B22736F6E675F4E616D65223A22E4B880E697A0E68980E69C89222C22736F6E675F5761704C69766555524C223A22687474703A2F2F74736D7573696334382E74632E71712E636F6D2F586B30305156342F4141414130414141414E5430577532394D7A59344D7A63774D4C6735586A4C517747335A50676F47443864704151526643473444442F4E653765776B617A733D2F31303130333334372E6D34613F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D30222C22736F6E675F5769666955524C223A22687474703A2F2F73747265616D31342E71716D757369632E71712E636F6D2F33303130333334372E6D7033222C226E657454797065223A2277696669222C22736F6E675F416C62756D223A22E4B880E697A0E68980E69C89222C22736F6E675F4944223A3130333334372C22736F6E675F54797065223A312C22736F6E675F53696E676572223A22E5B494E581A5222C22736F6E675F576170446F776E4C6F616455524C223A22687474703A2F2F74736D757369633132382E74632E71712E636F6D2F586C464E4D313574414141416A41414141477A4C36445039536A457A525467304E7A38774E446E752B6473483833344843756B5041576B6D48316C4A434E626F4D34394E4E7A754450444A647A7A45304F513D3D2F33303130333334372E6D70333F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D3026616D703B73747265616D5F706F733D35227D",
          // lowBandURL: '',
          dataURL: "http://stream20.qqmusic.qq.com/32464723.mp3"
          // lowBandDataURL: '',
        })
      );
    } catch (e) {
      console.warn(
        "sendMusicObjectMessage failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  sendVideoObjectMessage = async () => {
    try {
      // interface IVideoMediaMessage extends IBaseMediaMessage {
      //   url: string;
      //   lowBandURL: string;
      // }
      console.log("invoke sendVideoObjectMessage");
      console.log(
        "sendVideoObjectMessage invoke success: result %o",
        await RNWechat.sendMessage({
          scene: Constants.SCENE,
          messageType: RNWechat.MessageType.Video,
          messageTitle: "乔布斯访谈",
          messageDesc: "乔布斯访谈",
          messageThumb: IMAGES.require,
          url: "http://v.youku.com/v_show/id_XNTUxNDY1NDY4.html"
          // lowBandURL: '',
        })
      );
    } catch (e) {
      console.warn(
        "sendVideoObjectMessage failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  sendFileObjectMessage = async () => {
    try {
      // interface IFileMediaMessage extends IBaseMediaMessage {
      //   file: string;
      //   ext: string;
      // }
      console.log("invoke sendFileObjectMessage");
      console.log(
        "sendFileObjectMessage invoke success: result %o",
        await RNWechat.sendMessage({
          scene: Constants.SCENE,
          messageType: RNWechat.MessageType.File,
          messageTitle: "图片文件",
          file: IMAGES.url,
          ext: "png"
        })
      );
    } catch (e) {
      console.warn(
        "sendFileObjectMessage failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  sendWebpageObjectMessage = async () => {
    try {
      // interface IWebpageMediaMessage extends IBaseMediaMessage {
      //   url: string;
      // }
      console.log("invoke sendWebpageObjectMessage");
      console.log(
        "sendWebpageObjectMessage invoke success: result %o",
        await RNWechat.sendMessage({
          scene: Constants.SCENE,
          messageType: RNWechat.MessageType.Webpage,
          messageTitle: "专访张小龙：产品之上的世界观",
          messageDesc:
            "微信的平台化发展方向是否真的会让这个原本简洁的产品变得臃肿？在国际化发展方向上，微信面临的问题真的是文化差异壁垒吗？腾讯高级副总裁、微信产品负责人张小龙给出了自己的回复。",
          messageThumb: IMAGES.base64,
          url: '"http://tech.qq.com/zt2012/tmtdecode/252.htm'
        })
      );
    } catch (e) {
      console.warn(
        "sendWebpageObjectMessage failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  sendMiniProgramObjectMessage = async () => {
    try {
      // interface IMiniProgramMediaMessage extends IBaseMediaMessage {
      //   type: MiniProgramType;
      //   username: string;
      //   path?: string;
      //   hdImage?: string;
      //   url?: string;
      //   shareTicket?: boolean;
      // }
      console.log("invoke sendMiniProgramObjectMessage");
      console.log(
        "sendMiniProgramObjectMessage invoke success: result %o",
        await RNWechat.sendMessage({
          scene: Constants.SCENE,
          messageType: RNWechat.MessageType.MiniProgram,
          type: RNWechat.MiniProgramType.Test,
          username: Constants.MP_ORIGIN_ID,
          messageTitle: "messageTitle",
          hdImage: IMAGES.require,
          path: "",
          url: "https://www.example.com",
          messageDesc: "messageDesc",
          messageThumb: IMAGES.url,
          shareTicket: false
        })
      );
    } catch (e) {
      console.warn(
        "sendMiniProgramObjectMessage failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  sendAppExtendObjectMessage = async () => {
    try {
      // interface IAppExtendMediaMessage extends IBaseMediaMessage {
      //   url: string;
      //   ext: string;
      //   file: string;
      // }
      console.log("invoke sendAppExtendObjectMessage");
      console.log(
        "sendAppExtendObjectMessage invoke success: result %o",
        await RNWechat.sendMessage({
          scene: Constants.SCENE,
          messageType: RNWechat.MessageType.AppExtend,
          messageTitle: "App消息",
          messageDesc: "这种消息只有App自己才能理解，由App指定打开方式",
          url: "http://weixin.qq.com",
          ext: "ext info",
          file: IMAGES.url,
          messageThumb: IMAGES.base64,
          messageTag: "tag",
          messageExt: "这是第三方带的测试字段",
          messageAction: "action"
        })
      );
    } catch (e) {
      console.warn(
        "sendAppExtendObjectMessage failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  sendEmoticonObjectMessage = async () => {
    try {
      // interface IEmoticonMediaMessage extends IBaseMediaMessage {
      //   image: string;
      // }
      console.log("invoke sendEmoticonObjectMessage");
      console.log(
        "sendEmoticonObjectMessage invoke success: result %o",
        await RNWechat.sendMessage({
          scene: Constants.SCENE,
          messageType: RNWechat.MessageType.Emoticon,
          image: IMAGES.require
        })
      );
    } catch (e) {
      console.warn(
        "sendEmoticonObjectMessage failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  sendLocationObjectMessage = async () => {
    try {
      // interface ILocationMediaMessage extends IBaseMediaMessage {
      //   lng: number;
      //   lat: number;
      // }
      console.log("invoke sendLocationObjectMessage");
      console.log(
        "sendLocationObjectMessage invoke success: result %o",
        await RNWechat.sendMessage({
          scene: Constants.SCENE,
          messageType: RNWechat.MessageType.Location,
          lng: 31.227247,
          lat: 121.470144,
          messageTitle: "messageTitle",
          messageDesc: "messageDesc"
        })
      );
    } catch (e) {
      console.warn(
        "sendLocationObjectMessage failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  subscribeMessage = async () => {
    try {
      // interface ISubscribeMessageOption {
      //   scene: MessageScene;
      //   templateID: string;
      //   reserved?: string;
      // }
      console.log("invoke subscribeMessage");
      console.log(
        "subscribeMessage invoke success: result %o",
        await RNWechat.subscribeMessage({
          scene: Constants.SCENE,
          templateID: "7YuTL__ilzyZB9DXcDt2mHx-CAS_E7KtsQkhIGVhhRM",
          reserved: ""
        })
      );
    } catch (e) {
      console.warn(
        "subscribeMessage failed, error: %s, message: %s",
        RNWechat.Errors[e.code],
        e.message
      );
    }
  };

  listenWeChatRequest = async () => {
    // enum WeChatRequestType {
    //   GetMessage = 0,
    //   ShowMessage = 1,
    //   LaunchFromWX = 2,
    // }
    // interface IWeChatRequestData {
    //   requestType: WeChatRequestType;
    //   type: number;
    //   openID: string;
    //   lang: string;
    //   country: string;
    //   result: IMediaMessage;
    // }
    console.log("invoke listenRequest");
    this.stopListen = RNWechat.listenRequest(data => {
      console.log(
        "WeChat request type: %s, data: %o",
        RNWechat.WeChatRequestType[data.requestType],
        data
      );
      switch (data.requestType) {
        case RNWechat.WeChatRequestType.GetMessage:
          // RNWechat.sendMessageResp({
          //   messageType: RNWechat.MessageType.Text,
          //   content: 'text',
          // })
          //   .then((res) => {
          //     console.log('sendMessageResp', res)
          //   })
          //   .catch((e) => {
          //     console.warn("error: %s, message: %s", RNWechat.Errors[e.code], e.message)
          //   })
          break;
        case RNWechat.WeChatRequestType.ShowMessage:
          // RNWechat.showMessageResp()
          //   .then(() => {
          //     console.log('showMessageResp')
          //   })
          //   .catch((e) => {
          //     console.warn("error: %s, message: %s", RNWechat.Errors[e.code], e.message)
          //   })
          break;
      }
    });
  };

  stopListenRequest = async () => {
    if (this.stopListen) {
      console.log("invoke stopListenRequest");
      this.stopListen();
      this.stopListen = null;
    }
  };

  render() {
    return (
      <View style={{ flex: 1, paddingVertical: 50 }}>
        <ScrollView>
          <Button
            title="initialize 初始化API"
            onPress={this.initialize}
            color="#0f0"
          />
          <Button title="misc 其它" onPress={this.misc} color="#0f0" />
          <Button title="auth 授权登录" onPress={this.auth} color="#0f0" />
          <Button title="pay 支付" onPress={this.pay} color="#f00" />
          <Button
            title="offlinePay 离线支付"
            onPress={this.offlinePay}
            color="#0f0"
          />
          <Button
            title="nontaxPay 无税支付"
            onPress={this.nontaxPay}
            color="#f00"
          />
          <Button
            title="payInsurance 医保支付"
            onPress={this.payInsurance}
            color="#f00"
          />
          <Button
            title="openTempSession 打开临时会话"
            onPress={this.openTempSession}
            color="#f00"
          />
          <Button
            title="openRankList 打开硬件排行"
            onPress={this.openRankList}
            color="#f00"
          />
          <Button
            title="openWebView 打开网页"
            onPress={this.openWebView}
            color="#f00"
          />
          <Button
            title="openBusinessView 打开业务页面"
            onPress={this.openBusinessView}
            color="#f00"
          />
          <Button
            title="openBusinessWebView 打开业务网页"
            onPress={this.openBusinessWebView}
            color="#f00"
          />
          <Button
            title="jumpToBizProfile 跳转到公众号"
            onPress={this.jumpToBizProfile}
            color="#f00"
          />
          <Button
            title="jumpToBizWebView 跳转到公众号网页"
            onPress={this.jumpToBizWebView}
            color="#f00"
          />
          <Button
            title="addCard 添加到卡包"
            onPress={this.addCard}
            color="#f00"
          />
          <Button
            title="chooseCard 选择优惠券"
            onPress={this.chooseCard}
            color="#f00"
          />
          <Button
            title="chooseInvoice 选择发票"
            onPress={this.chooseInvoice}
            color="#0f0"
          />
          <Button
            title="invoiceAuthInsert 添加发票授权"
            onPress={this.invoiceAuthInsert}
            color="#f00"
          />
          <Button
            title="launchMiniProgram 启动小程序"
            onPress={this.launchMiniProgram}
            color="#0f0"
          />
          <Button
            title="subscribeMiniProgramMessage 订阅小程序消息"
            onPress={this.subscribeMiniProgramMessage}
            color="#f00"
          />
          <Button
            title="sendTextObjectMessage 发送文字"
            onPress={this.sendTextObjectMessage}
            color="#0f0"
          />
          <Button
            title="sendImageObjectMessage 发送图片"
            onPress={this.sendImageObjectMessage}
            color="#0f0"
          />
          <Button
            title="sendMusicObjectMessage 发送音乐"
            onPress={this.sendMusicObjectMessage}
            color="#0f0"
          />
          <Button
            title="sendVideoObjectMessage 发送视频"
            onPress={this.sendVideoObjectMessage}
            color="#0f0"
          />
          <Button
            title="sendFileObjectMessage 发送文件"
            onPress={this.sendFileObjectMessage}
            color="#0f0"
          />
          <Button
            title="sendWebpageObjectMessage 发送链接"
            onPress={this.sendWebpageObjectMessage}
            color="#0f0"
          />
          <Button
            title="sendMiniProgramObjectMessage 发送小程序"
            onPress={this.sendMiniProgramObjectMessage}
            color="#0f0"
          />
          <Button
            title="sendAppExtendObjectMessage 发送应用消息"
            onPress={this.sendAppExtendObjectMessage}
            color="#0f0"
          />
          <Button
            title="sendEmoticonObjectMessage 发送表情"
            onPress={this.sendEmoticonObjectMessage}
            color="#0f0"
          />
          <Button
            title="sendLocationObjectMessage 发送定位"
            onPress={this.sendLocationObjectMessage}
            color="#f00"
          />
          <Button
            title="subscribeMessage 订阅消息"
            onPress={this.subscribeMessage}
            color="#f00"
          />
          <Button
            title="listenWeChatRequest 监听微信请求"
            onPress={this.listenWeChatRequest}
            color="#0f0"
          />
          <Button
            title="stopListenRequest 停止监听微信请求"
            onPress={this.stopListenRequest}
            color="#0f0"
          />
        </ScrollView>
      </View>
    );
  }
}
