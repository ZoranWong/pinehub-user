import ServiceProvider from './ServiceProvider';
import Model from '../models';
import Account from '@/models/Account';
import ShoppingCarts from '@/models/ShoppingCarts';
import NearestStore from '@/models/NearestStore';
import Stores from '@/models/Stores';
import Tickets from '@/models/Tickets';
import Cards from '@/models/Cards';
import App from '@/models/App';
import Activity from '@/models/Activity';
import ChargeCards from '@/models/ChargeCards';
import TradeOrderItems from '@/models/TradeOrderItems';
import BarHeight from '../models/BarHeight';
import Store from '@/models/Store';
import OrderPayment from '../models/OrderPayment';
import GoodDetail from '../models/GoodDetail';

export default class ModelServiceProvider extends ServiceProvider {
    register () {
        let models = new Model(this.app);
        this.app.register('models', models);
        this.app.registerModel('model.global.barHeight', BarHeight);

        this.app.registerModel('model.activity', Activity);
        this.app.registerModel('model.app', App);
        this.app.registerModel('model.user.store', Store);
        this.app.registerModel('model.user.goodDetail', GoodDetail);

        // this.app.registerModel('model.bookingMall.shoppingCarts', ShoppingCarts);
        // this.app.registerModel('model.storeMarket.shoppingCarts', ShoppingCarts);
        this.app.registerModel('model.newEvents.shoppingCarts', ShoppingCarts);
        // this.app.registerModel('model.purchase.shoppingCarts', ShoppingCarts);


        // this.app.registerModel('model.storeMarket.tickets', Tickets);
        // this.app.registerModel('model.bookingMall.tickets', Tickets);
        this.app.registerModel('model.newEvents.tickets', Tickets);
        this.app.registerModel('model.user.tickets', Tickets);
        this.app.registerModel('model.user.order.payment', OrderPayment);

        this.app.registerModel('model.cards', Cards);

        this.app.registerModel('model.account', Account);
        this.app.registerModel('model.stores', Stores);
        this.app.registerModel('model.nearestStore', NearestStore);
        this.app.registerModel('model.chargeCards', ChargeCards);
        this.app.registerModel('model.tradeOrderItems', TradeOrderItems);
    }

    boot () {

    }
}
