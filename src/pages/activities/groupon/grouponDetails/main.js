import App from './index';
import Vue from 'vue';
import '../../../../styles/iconfont.css'
import LoadGrouponDetails from './commands/LoadGrouponDetails';
import LoadGrouponCateProducts from './commands/LoadGrouponCateProducts';
import AddGrouponGoodsToCartCommand from './commands/AddGoodsToCart';
import ChangeGrouponBuyNumCommand from './commands/ChangeBuyNumCommand';
import ClearGrouponCartCommand from './commands/ClearCartCommand';
import LoadGrouponCartCommand from './commands/LoadCartCommand';
import RenderCanvas from 'vnode2canvas';

Vue.use(RenderCanvas);
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.groupon.details';
    }, function () {
        this.registerCommand(LoadGrouponDetails.commandName(), LoadGrouponDetails);
        this.registerCommand(LoadGrouponCateProducts.commandName(), LoadGrouponCateProducts);
        this.registerCommand(AddGrouponGoodsToCartCommand.commandName(), AddGrouponGoodsToCartCommand);
        this.registerCommand(ChangeGrouponBuyNumCommand.commandName(), ChangeGrouponBuyNumCommand);
        this.registerCommand(ClearGrouponCartCommand.commandName(), ClearGrouponCartCommand);
        this.registerCommand(LoadGrouponCartCommand.commandName(), LoadGrouponCartCommand);
        this.currentPage = new Vue(this.mountComponent);
    });
}
