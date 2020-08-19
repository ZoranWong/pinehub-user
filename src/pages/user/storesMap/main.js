import App from './index';
import Vue from 'vue';
import SearchLocation from '@/commands/SearchLocationCommand';
import LoadStoresAroundCommand from './commands/LoadStoresAroundCommand';

import GetSuperiorShop from './commands/GetSuperiorShop';
import SearchPoints from './commands/SearchPoints';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(LoadStoresAroundCommand.commandName(), LoadStoresAroundCommand);
        this.registerCommand(SearchLocation.commandName(), SearchLocation);
        this.registerCommand(GetSuperiorShop.commandName(), GetSuperiorShop);
        this.registerCommand(SearchPoints.commandName(), SearchPoints);
        this.route = 'storesMap';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}

