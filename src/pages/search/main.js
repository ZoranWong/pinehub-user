import App from './index';
import Merchandises from '@/models/Merchandises';
import StoreCategories from '@/models/StoreCategories';
import Vue from 'vue';
import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';
import ClearMerchandiseCommand from '@/commands/ClearMerchandiseCommand';
import GetStoreCategoriesCommand from '@/commands/GetStoreCategoriesCommand';

import StoreCategoriesService from '@/services/http/StoreCategoriesService';

const application = wx.$app;
application.setComponent(App).run(function (app) {
    if (this.models) {
      this.registerModel('model.search.merchandises', Merchandises);
      this.registerModel('model.storeCategories', StoreCategories);
    }
    this.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    this.registerCommand(AddMerchandiseCommand.commandName(), AddMerchandiseCommand);
    this.registerCommand(ReduceMerchandiseCommand.commandName(), ReduceMerchandiseCommand);
    this.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);
    this.registerCommand(ClearMerchandiseCommand.commandName(), ClearMerchandiseCommand);

    this.registerCommand(GetStoreCategoriesCommand.commandName(), GetStoreCategoriesCommand);

    this.register('http.storeCategories', StoreCategoriesService);
    this.route = 'search';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
