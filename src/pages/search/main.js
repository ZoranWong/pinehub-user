import App from './index';
import Merchandises from '@/models/Merchandises';
import Vue from 'vue';
import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';
import ClearMerchandiseCommand from '@/commands/ClearMerchandiseCommand';
import GetStoreCategoriesCommand from '@/commands/GetStoreCategoriesCommand';

const application = wx.$app;
application.setComponent(App).run(function (app) {
    if (this.models) {
      this.registerModel('model.search.merchandises', Merchandises);
    }
    this.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    this.registerCommand(AddMerchandiseCommand.commandName(), AddMerchandiseCommand);
    this.registerCommand(ReduceMerchandiseCommand.commandName(), ReduceMerchandiseCommand);
    this.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);
    this.registerCommand(ClearMerchandiseCommand.commandName(), ClearMerchandiseCommand);

    this.registerCommand(GetStoreCategoriesCommand.commandName(), GetStoreCategoriesCommand);
    this.route = 'search';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
