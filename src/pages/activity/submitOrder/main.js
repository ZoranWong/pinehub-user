import Vue from 'vue';
import App from './index';
import Merchandises from '@/models/Merchandises';
import MyInfo from '@/models/MyInfo';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';

import MyInfoCommand from '@/commands/MyInfoCommand';
import FillCartMerchandisesCommand from '@/commands/FillCartMerchandisesCommand';

import MyInfoService from '@/services/http/MyInfoService';
import ActivityShoppingCartAddMerchandiseCommand from '@/commands/ActivityShoppingCartAddMerchandiseCommand';
import ActivityShoppingCartReduceMerchandiseCommand from '@/commands/ActivityShoppingCartReduceMerchandiseCommand';
import ActivityShoppingCartLoadMerchandisesCommand from '@/commands/ActivityShoppingCartLoadMerchandisesCommand';

const application = wx.$app;
application.setComponent(App).run(function () {
    if (this.models) {
      this.models.addModel('model.activity.merchandises', Merchandises);
      this.models.addModel('model.my.info', MyInfo);
    }
    this.register('http.myInfo', MyInfoService);

    this.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
    this.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    this.registerCommand(AddMerchandiseCommand.commandName(), AddMerchandiseCommand);
    this.registerCommand(ReduceMerchandiseCommand.commandName(), ReduceMerchandiseCommand);
    this.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);
    this.registerCommand(FillCartMerchandisesCommand.commandName(), FillCartMerchandisesCommand);
    /**
    * 徐钰添加的开始
    * */
    this.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
    this.registerCommand(ActivityShoppingCartAddMerchandiseCommand.commandName(), ActivityShoppingCartAddMerchandiseCommand);
    this.registerCommand(ActivityShoppingCartReduceMerchandiseCommand.commandName(), ActivityShoppingCartReduceMerchandiseCommand);
    this.registerCommand(ActivityShoppingCartLoadMerchandisesCommand.commandName(), ActivityShoppingCartLoadMerchandisesCommand);
    this.route = 'activitySubmitOrder';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
