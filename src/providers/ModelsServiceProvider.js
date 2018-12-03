import ServiceProvider from './ServiceProvider';
import Model from '../models';
import Account from '@/models/Account';
import Merchandises from '@/models/Merchandises';
import Categories from '@/models/Categories'
;import ShoppingCarts from '@/models/ShoppingCarts';
import NearbyStores from '@/models/NearbyStores';
import NearestStore from '@/models/NearestStore';
import Stores from '@/models/Stores';
import Tickets from '@/models/Tickets';

export default class ModelServiceProvider extends ServiceProvider {
  register () {
    let models = new Model(this.app);
    this.app.register('models', models);

    this.app.models.addModel('model.categories', Categories);

    this.app.models.addModel('model.merchandises', Merchandises);

    this.app.registerModel('model.bookingMall.shoppingCarts', ShoppingCarts);

    this.app.models.addModel('model.tickets', Tickets);

    this.app.models.addModel('model.account', Account);
    this.app.models.addModel('model.shoppingCarts', ShoppingCarts);
    this.app.models.addModel('model.nearbyStores', NearbyStores);
    this.app.models.addModel('model.stores', Stores);
    this.app.models.addModel('model.nearestStore', NearestStore);
  }
  boot () {

  }
}
