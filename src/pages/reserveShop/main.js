import Vue from 'vue';
import App from './index';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import Categories from '@/models/Categories';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';

import GetCategoriesCommand from '@/commands/GetCategoriesCommand';

import CategoriesService from '@/services/http/CategoriesService';
import ClearMerchandiseCommand from '@/commands/ClearMerchandiseCommand';

const application = wx.$app;
application.setComponent(App).run(function (app) {
    if (app.models) {
      app.registerModel('model.reserveShop.merchandises', Merchandises);
      app.registerModel('model.categories', Categories);
    }
    app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    app.registerCommand(AddMerchandiseCommand.commandName(), AddMerchandiseCommand);
    app.registerCommand(ReduceMerchandiseCommand.commandName(), ReduceMerchandiseCommand);
    app.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);

    app.registerCommand(GetCategoriesCommand.commandName(), GetCategoriesCommand);
    app.registerCommand(ClearMerchandiseCommand.commandName(), ClearMerchandiseCommand);

    app.register('http.categories', CategoriesService);
    }, function (component) {
    _.extend(App, component);
    let app = new Vue(App);
    app.$mount();
    return app;
});
