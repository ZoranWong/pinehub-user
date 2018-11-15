import App from './index';
import Merchandises from '@/models/Merchandises';
import NearestStore from '@/models/NearestStore';
import StoreCategories from '@/models/StoreCategories';
import Vue from 'vue';
import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';
import GetStoreCategoriesCommand from '@/commands/GetStoreCategoriesCommand';
import GetNearestStoreCommand from '@/commands/GetNearestStoreCommand';
import ClearMerchandiseCommand from '@/commands/ClearMerchandiseCommand';

import NearestStoreService from '@/services/http/NearestStoreService';
import StoreCategoriesService from '@/services/http/StoreCategoriesService';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerModel('model.today.merchandises', Merchandises);
    this.registerModel('model.nearestStore', NearestStore);
    this.registerModel('model.storeCategories', StoreCategories);

    this.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    this.registerCommand(AddMerchandiseCommand.commandName(), AddMerchandiseCommand);
    this.registerCommand(ReduceMerchandiseCommand.commandName(), ReduceMerchandiseCommand);
    this.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);

    this.registerCommand(GetNearestStoreCommand.commandName(), GetNearestStoreCommand);
    this.registerCommand(GetStoreCategoriesCommand.commandName(), GetStoreCategoriesCommand);
    this.registerCommand(ClearMerchandiseCommand.commandName(), ClearMerchandiseCommand);
    this.register('http.nearestStore', NearestStoreService);
    this.register('http.storeCategories', StoreCategoriesService);
    this.route = 'todayOrder';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
