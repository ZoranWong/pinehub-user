import Vue from 'vue';
import App from './index';
import Merchandises from '@/models/Merchandises';
import MyInfo from '@/models/MyInfo';

import MyInfoCommand from '@/commands/MyInfoCommand';

import MyInfoService from '@/services/http/MyInfoService';
import ActivityShoppingCartChangeMerchandiseCommand from '../commands/ActivityShoppingCartChangeMerchandiseCommand';
import ActivityShoppingCartLoadMerchandisesCommand from '../commands/ActivityShoppingCartLoadMerchandisesCommand';
import LoadActivityTicketsCommand from '../commands/LoadActivityTicketsCommand';
import CreateActivityOrderCommand from '../commands/CreateActivityOrderCommand';

const application = wx.$app;
application.setComponent(App).run(function () {
    if (this.models) {
      this.models.addModel('model.activity.merchandises', Merchandises);
      this.models.addModel('model.my.info', MyInfo);
    }
    this.register('http.myInfo', MyInfoService);

    this.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
    /**
    * 徐钰添加的开始
    * */
    this.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
    this.registerCommand(ActivityShoppingCartChangeMerchandiseCommand.commandName(), ActivityShoppingCartChangeMerchandiseCommand);
    this.registerCommand(ActivityShoppingCartLoadMerchandisesCommand.commandName(), ActivityShoppingCartLoadMerchandisesCommand);
    this.registerCommand(LoadActivityTicketsCommand.commandName(), LoadActivityTicketsCommand);
    this.registerCommand(CreateActivityOrderCommand.commandName(), CreateActivityOrderCommand);
    this.route = 'activitySubmitOrder';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
