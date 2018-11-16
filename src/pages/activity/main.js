import App from './index';
import Vue from 'vue';
// 产品模型和产品服务
import Merchandises from '@/models/Merchandises';
import MerchandisesService from '@/services/http/MerchandisesService';
// 购物车相关
import ActivityLoadingMerchandisesCommand from '@/commands/ActivityLoadingMerchandisesCommand';
import ActivityShoppingCartChangeMerchandiseCommand from '@/commands/ActivityShoppingCartChangeMerchandiseCommand';
import ActivityShoppingCartLoadMerchandisesCommand from '@/commands/ActivityShoppingCartLoadMerchandisesCommand';
import ActivityShoppingCartClearMerchandisesCommand from '@/commands/ActivityShoppingCartClearMerchandisesCommand';
// 获取常用地址
import ActivityUsuallyAddressService from '@/services/http/ActivityUsuallyAddressService';
import LoadActivityUsuallyAddressCommand from '@/commands/LoadActivityUsuallyAddressCommand';
const application = wx.$app;
application.setComponent(App).run(function() {
	// 产品模型和产品服务
	this.models.addModel('model.activity.merchandises', Merchandises)
	this.register('http.merchandises', MerchandisesService)
	// 注册购物车命令
	this.registerCommand(ActivityLoadingMerchandisesCommand.commandName(), ActivityLoadingMerchandisesCommand);
	this.registerCommand(ActivityShoppingCartChangeMerchandiseCommand.commandName(), ActivityShoppingCartChangeMerchandiseCommand);
	this.registerCommand(ActivityShoppingCartLoadMerchandisesCommand.commandName(), ActivityShoppingCartLoadMerchandisesCommand);
	this.registerCommand(ActivityShoppingCartClearMerchandisesCommand.commandName(), ActivityShoppingCartClearMerchandisesCommand);
	// 获取常用地址
	this.register('http.activityUsuallyAddress', ActivityUsuallyAddressService);
	this.registerCommand(LoadActivityUsuallyAddressCommand.commandName(), LoadActivityUsuallyAddressCommand);
	this.route = 'activity';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});