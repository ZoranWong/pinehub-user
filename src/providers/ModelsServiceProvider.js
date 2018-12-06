import ServiceProvider from './ServiceProvider';
import Model from '../models';
import Account from '@/models/Account';
import Merchandises from '@/models/Merchandises';
import Categories from '@/models/Categories';
import ShoppingCarts from '@/models/ShoppingCarts';
import NearestStore from '@/models/NearestStore';
import Stores from '@/models/Stores';
import Tickets from '@/models/Tickets';

export default class ModelServiceProvider extends ServiceProvider {
  register () {
    let models = new Model(this.app);
    this.app.register('models', models);

    this.app.registerModel('model.categories', Categories);

    this.app.registerModel('model.merchandises', Merchandises);

    this.app.registerModel('model.bookingMall.shoppingCarts', ShoppingCarts);
    this.app.registerModel('model.storeMarket.shoppingCarts', ShoppingCarts);
    this.app.registerModel('model.newEvents.shoppingCarts', ShoppingCarts);

    this.app.registerModel('model.storeMarket.tickets', Tickets);
    this.app.registerModel('model.bookingMall.tickets', Tickets);
    this.app.registerModel('model.newEvents.tickets', Tickets);

    this.app.registerModel('model.account', Account);
    this.app.registerModel('model.shoppingCarts', ShoppingCarts);
    this.app.registerModel('model.stores', Stores);
    this.app.registerModel('model.nearestStore', NearestStore);
  }
  boot () {

  }
}
