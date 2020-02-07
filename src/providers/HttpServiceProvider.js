import ServiceProvider from './ServiceProvider';
import MerchandisesService from '@/services/http/MerchandisesService';
import UriService from '@/services/http/UriService';
import HttpAuthService from '@/services/http/AuthService';
import HttpOrdersService from '@/services/http/OrdersService';
import ShoppingCartService from '@/services/http/ShoppingCartService';
import StoreService from '@/services/http/StoreService';
import TicketsService from '@/services/http/TicketsService';
import CategoriesService from '@/services/http/CategoriesService';
import Fly from 'flyio/dist/npm/wx';
import AccountService from '@/services/http/AccountService';
import ChargeCardService from '@/services/http/ChargeCardService';
import IntegralService from '@/services/http/IntegralService';
import AddressService from '@/services/http/AddressService';
import ActivityService from '../services/http/ActivityService';
import NewIndexService from '../services/http/NewIndexService';


export default class HttpServiceProvider extends ServiceProvider {
    register () {
        let http = function () {
            this.fly = Fly;
        };
        this.app.register('$http', http);
        this.app.register('uri', UriService);
        // 产品模型和产品服务
        this.app.register('http.categories', CategoriesService);
        this.app.register('http.merchandises', MerchandisesService);
        this.app.register('http.auth', HttpAuthService);
        this.app.register('http.orders', HttpOrdersService);
        this.app.register('http.shoppingCart', ShoppingCartService);
        this.app.register('http.tickets', TicketsService);
        this.app.register('http.store', StoreService);
        this.app.register('http.account', AccountService);
        this.app.register('http.chargeCard', ChargeCardService);
        this.app.register('http.integral', IntegralService);
        this.app.register('http.address', AddressService);
        this.app.register('http.activities', ActivityService);
        this.app.register('http.newIndex', NewIndexService);
    }
}
