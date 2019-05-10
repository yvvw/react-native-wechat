export var Scenes;
(function (Scenes) {
    // 聊天界面
    Scenes[Scenes["Session"] = 0] = "Session";
    // 朋友圈
    Scenes[Scenes["Timeline"] = 1] = "Timeline";
    // 收藏
    Scenes[Scenes["Favorite"] = 2] = "Favorite";
    // 指定联系人
    Scenes[Scenes["SpecifiedSession"] = 3] = "SpecifiedSession";
})(Scenes || (Scenes = {}));
