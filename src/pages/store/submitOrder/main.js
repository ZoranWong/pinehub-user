import App from './index';
import Merchandises from '@/models/Merchandises';
import MyInfo from '@/models/MyInfo';
import NearestStore from '@/models/NearestStore';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';

import MyInfoCommand from '@/commands/MyInfoCommand';
import FillCartMerchandisesCommand from '@/commands/FillCartMerchandisesCommand';
import GetNearestStoreCommand from '@/commands/GetNearestStoreCommand';

import MyInfoService from '@/services/http/MyInfoService';
import NearestStoreService from '@/services/http/NearestStoreService';

import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function (app) {
    if (this.models) {
      this.models.addModel('model.activity.merchandises', Merchandises);
      this.models.addModel('model.my.info', MyInfo);
      this.models.addModel('model.nearestStore', NearestStore);
    }

    this.register('http.myInfo', MyInfoService);
    this.register('http.nearestStore', NearestStoreService);

    this.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    this.registerCommand(AddMerchandiseCommand.commandName(), AddMerchandiseCommand);
    this.registerCommand(ReduceMerchandiseCommand.commandName(), ReduceMerchandiseCommand);
    this.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);
    this.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
    this.registerCommand(FillCartMerchandisesCommand.commandName(), FillCartMerchandisesCommand);
    this.registerCommand(GetNearestStoreCommand.commandName(), GetNearestStoreCommand);
    this.route = 'todaySubmitOrder';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
