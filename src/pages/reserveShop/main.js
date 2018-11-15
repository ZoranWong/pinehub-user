import App from './index';
import Merchandises from '@/models/Merchandises';
import Categories from '@/models/Categories';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';

import GetCategoriesCommand from '@/commands/GetCategoriesCommand';

import CategoriesService from '@/services/http/CategoriesService';
import ClearMerchandiseCommand from '@/commands/ClearMerchandiseCommand';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
    if (this.models) {
      this.registerModel('model.reserveShop.merchandises', Merchandises);
      this.registerModel('model.categories', Categories);
    }
    this.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    this.registerCommand(AddMerchandiseCommand.commandName(), AddMerchandiseCommand);
    this.registerCommand(ReduceMerchandiseCommand.commandName(), ReduceMerchandiseCommand);
    this.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);

    this.registerCommand(GetCategoriesCommand.commandName(), GetCategoriesCommand);
    this.registerCommand(ClearMerchandiseCommand.commandName(), ClearMerchandiseCommand);

    this.register('http.categories', CategoriesService);
    this.route = 'reserveShop';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
