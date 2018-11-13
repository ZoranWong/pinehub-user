import Vue from 'vue';
import App from './index';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import NearestStore from '@/models/NearestStore';
import StoreCategories from '@/models/StoreCategories';

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
application.setComponent(App).run(function (app) {
    if (app.models) {
      app.registerModel('model.today.merchandises', Merchandises);
      app.registerModel('model.nearestStore', NearestStore);
      app.registerModel('model.storeCategories', StoreCategories);
    }
    app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    app.registerCommand(AddMerchandiseCommand.commandName(), AddMerchandiseCommand);
    app.registerCommand(ReduceMerchandiseCommand.commandName(), ReduceMerchandiseCommand);
    app.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);

    app.registerCommand(GetNearestStoreCommand.commandName(), GetNearestStoreCommand);
    app.registerCommand(GetStoreCategoriesCommand.commandName(), GetStoreCategoriesCommand);
    app.registerCommand(ClearMerchandiseCommand.commandName(), ClearMerchandiseCommand);
    app.register('http.nearestStore', NearestStoreService);
    app.register('http.storeCategories', StoreCategoriesService);
    }, function (mountComponent) {
     _.extend(App, mountComponent);
     const app = new Vue(App);
     app.$mount();
     return app;
});
