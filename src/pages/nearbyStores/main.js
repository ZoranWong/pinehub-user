import Vue from 'vue';
import App from './index';
import _ from 'underscore';
import SearchLocation from '@/commands/SearchLocationCommand';

import NearbyStoresService from '@/services/http/NearbyStoresService';
import GetNearbyStoresCommand from '@/commands/GetNearbyStoresCommand';
import NearbyStores from '@/models/NearbyStores';
const application = wx.$app;
application.setComponent(App).run((app) => {
    // console.log(app.instances['map']);
    app.registerModel('model.nearbyStores', NearbyStores);

    app.register('http.nearbyStores', NearbyStoresService);
    app.registerCommand(GetNearbyStoresCommand.commandName(), GetNearbyStoresCommand);
    app.registerCommand(SearchLocation.commandName(), SearchLocation);
}, (mountComponent) => {
    _.extend(App, mountComponent);
    let app = new Vue(App);
    app.$mount();
    return app;
});
