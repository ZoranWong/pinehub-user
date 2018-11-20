import ServiceProvider from './ServiceProvider';
import Model from '../models';
import Account from '@/models/Account';
import Merchandises from '@/models/Merchandises';
import Categories from '@/models/Categories'
;import ShoppingCarts from '@/models/ShoppingCarts';
import NearbyStores from '@/models/NearbyStores';
import NearestStore from '@/models/NearestStore';
import Tickets from '@/models/Tickets';

export default class ModelServiceProvider extends ServiceProvider {
  register () {
    let models = new Model(this.app);
    this.app.register('models', models);

    this.app.models.addModel('model.categories', Categories)

    this.app.models.addModel('model.bookingMall.merchandises', Merchandises)
    this.app.models.addModel('model.store.merchandises', Merchandises)
    this.app.models.addModel('model.activity.merchandises', Merchandises)

    this.app.models.addModel('model.activity.tickets', Tickets);
    this.app.models.addModel('model.store.tickets', Tickets);
    this.app.models.addModel('model.bookingMall.tickets', Tickets);
    this.app.models.addModel('model.account', Account);
    this.app.models.addModel('model.activity.shoppingCarts', ShoppingCarts);
    this.app.models.addModel('model.bookingMall.shoppingCarts', ShoppingCarts);
    this.app.models.addModel('model.store.shoppingCarts', ShoppingCarts);
    this.app.models.addModel('model.online.shoppingCarts', ShoppingCarts);
    this.app.models.addModel('model.nearbyStores', NearbyStores);
    
    this.app.models.addModel('model.nearestStore', NearestStore);
  }
  boot () {

  }
}
