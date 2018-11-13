import Vue from 'vue';
import App from './index';
import _ from 'underscore';
// 产品模型和产品服务
import Merchandises from '@/models/Merchandises';
import MerchandisesService from '@/services/http/MerchandisesService';
// 购物车相关

import ActivityLoadingMerchandisesCommand from '@/commands/ActivityLoadingMerchandisesCommand'
import ActivityShoppingCartAddMerchandiseCommand from '@/commands/ActivityShoppingCartAddMerchandiseCommand'
import ActivityShoppingCartReduceMerchandiseCommand from '@/commands/ActivityShoppingCartReduceMerchandiseCommand'
import ActivityShoppingCartLoadMerchandisesCommand from '@/commands/ActivityShoppingCartLoadMerchandisesCommand'
const application = wx.$app;
application.setComponent(App).run(function (app) {
    // 产品模型和产品服务
    app.models.addModel('model.activity.merchandises', Merchandises)
    app.register('http.merchandises', MerchandisesService)
    // 注册购物车命令
    app.registerCommand(ActivityLoadingMerchandisesCommand.commandName(), ActivityLoadingMerchandisesCommand)
    app.registerCommand(ActivityShoppingCartAddMerchandiseCommand.commandName(), ActivityShoppingCartAddMerchandiseCommand)
    app.registerCommand(ActivityShoppingCartReduceMerchandiseCommand.commandName(), ActivityShoppingCartReduceMerchandiseCommand)
    app.registerCommand(ActivityShoppingCartLoadMerchandisesCommand.commandName(), ActivityShoppingCartLoadMerchandisesCommand)
}, function (mountComponent) {
    _.extend(App, mountComponent)
    const app = new Vue(App)
    app.$mount()
    return app
});
