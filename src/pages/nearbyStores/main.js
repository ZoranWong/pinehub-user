import App from './index';
import SearchLocation from '@/commands/SearchLocationCommand';

import NearbyStoresService from '@/services/http/NearbyStoresService';
import GetNearbyStoresCommand from '@/commands/GetNearbyStoresCommand';
import NearbyStores from '@/models/NearbyStores';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
    // console.log(this.instances['map']);
    this.registerModel('model.nearbyStores', NearbyStores);

    this.register('http.nearbyStores', NearbyStoresService);
    this.registerCommand(GetNearbyStoresCommand.commandName(), GetNearbyStoresCommand);
    this.registerCommand(SearchLocation.commandName(), SearchLocation);
    this.route = 'nearbyStores';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
