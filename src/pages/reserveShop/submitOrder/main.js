
import Vue from 'vue';
import App from './index';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import MyInfo from '@/models/MyInfo';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';

import MyInfoCommand from '@/commands/MyInfoCommand';
import FillCartMerchandisesCommand from '@/commands/FillCartMerchandisesCommand';
import MyInfoService from '@/services/http/MyInfoService';

const application = wx.$app;
application.setComponent(App).run(function (app) {
    if (app.models) {
      app.models.addModel('model.activity.merchandises', Merchandises);
      app.models.addModel('model.my.info', MyInfo);
    }
    app.register('http.myInfo', MyInfoService);

    app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    app.registerCommand(AddMerchandiseCommand.commandName(), AddMerchandiseCommand);
    app.registerCommand(ReduceMerchandiseCommand.commandName(), ReduceMerchandiseCommand);
    app.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);

    app.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
    app.registerCommand(FillCartMerchandisesCommand.commandName(), FillCartMerchandisesCommand);
}, function (component) {
    _.extend(App, component);
    let app = new Vue(App);
    app.$mount();
    return app;
});


