import ServiceProvider from './ServiceProvider';
import Model from '../models';
import Account from '@/models/Account';
import ShoppingCarts from '@/models/ShoppingCarts';
import NearestStore from '@/models/NearestStore';
import Stores from '@/models/Stores';
import Tickets from '@/models/Tickets';
import App from '@/models/App';

export default class ModelServiceProvider extends ServiceProvider {
    register () {
        let models = new Model(this.app);
        this.app.register('models', models);

        this.app.registerModel('model.app', App);


        this.app.registerModel('model.bookingMall.shoppingCarts', ShoppingCarts);
        this.app.registerModel('model.storeMarket.shoppingCarts', ShoppingCarts);
        this.app.registerModel('model.newEvents.shoppingCarts', ShoppingCarts);
        this.app.registerModel('model.purchase.shoppingCarts', ShoppingCarts);

        this.app.registerModel('model.storeMarket.tickets', Tickets);
        this.app.registerModel('model.bookingMall.tickets', Tickets);
        this.app.registerModel('model.newEvents.tickets', Tickets);

        this.app.registerModel('model.account', Account);
        this.app.registerModel('model.stores', Stores);
        this.app.registerModel('model.nearestStore', NearestStore);
    }
    boot () {

    }
}
