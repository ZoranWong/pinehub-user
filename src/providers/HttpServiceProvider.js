import ServiceProvider from './ServiceProvider';
import MerchandisesService from '@/services/http/MerchandisesService';
import UriService from '@/services/http/UriService';
import HttpAuthService from '@/services/http/AuthService';
import HttpOrdersService from '@/services/http/OrdersService';
import ShoppingCartService from '@/services/http/ShoppingCartService';
import MyStoreScanCodeService from '@/services/http/MyStoreScanCodeService';
import TicketsService from '@/services/Http/TicketsService';
import Fly from 'flyio/dist/npm/wx';


export default class HttpServiceProvider extends ServiceProvider {
  register () {
    let http = function () {
      this.fly = Fly;
    };
    this.app.register('$http', http);
    this.app.register('uri', UriService);
    // 产品模型和产品服务
    this.app.register('http.merchandises', MerchandisesService);
    this.app.register('http.auth', HttpAuthService);
    this.app.register('http.orders', HttpOrdersService);
    this.app.register('http.shoppingCart', ShoppingCartService);
    this.app.register('http.tickets', TicketsService);
    this.app.register('scanCodeService', MyStoreScanCodeService);
  }
}
