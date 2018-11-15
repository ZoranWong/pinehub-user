import App from './index';
import Merchandises from '@/models/Merchandises';
import MyInfo from '@/models/MyInfo';
import Vue from 'vue';
import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';

import MyInfoCommand from '@/commands/MyInfoCommand';
import FillCartMerchandisesCommand from '@/commands/FillCartMerchandisesCommand';

import MyInfoService from '@/services/http/MyInfoService';

const application = wx.$app;
application.setComponent(App).run(function () {
    if (this.models) {
      this.models.addModel('model.activity.merchandises', Merchandises);
      this.models.addModel('model.my.info', MyInfo);
    }
    this.register('http.myInfo', MyInfoService);

    this.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    this.registerCommand(AddMerchandiseCommand.commandName(), AddMerchandiseCommand);
    this.registerCommand(ReduceMerchandiseCommand.commandName(), ReduceMerchandiseCommand);
    this.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);

    this.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
    this.registerCommand(FillCartMerchandisesCommand.commandName(), FillCartMerchandisesCommand);
    this.route = 'orderSelf';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});


