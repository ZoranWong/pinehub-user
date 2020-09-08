import App from './index';
import Vue from 'vue';
import SFShopDetailCommand from '../commands/SFShopDetailCommand';
import SFTomorrowShopListCommand from '../commands/SFTomorrowShopListCommand';
import SFClearCartCommand from '../commands/SFClearCartCommand';//清空购物车
import SFGetCartShopListCommand from '../commands/SFGetCartShopListCommand';//获取购物列表
import SFAddCartCommand from '../commands/SFAddCartCommand';//添加购物车
import SFUpdateCartCommand from '../commands/SFUpdateCartCommand';//更新购物车
import SFDelCartShopCommand from '../commands/SFDelCartShopCommand';//社会餐删除购物车内某商品
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'societyFood.fastFoot';
        this.registerCommand(SFShopDetailCommand.commandName(), SFShopDetailCommand);
        this.registerCommand(SFTomorrowShopListCommand.commandName(), SFTomorrowShopListCommand);
        this.registerCommand(SFClearCartCommand.commandName(), SFClearCartCommand);
        this.registerCommand(SFAddCartCommand.commandName(), SFAddCartCommand);
        this.registerCommand(SFGetCartShopListCommand.commandName(), SFGetCartShopListCommand);
        this.registerCommand(SFUpdateCartCommand.commandName(), SFUpdateCartCommand);
        this.registerCommand(SFDelCartShopCommand.commandName(), SFDelCartShopCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
