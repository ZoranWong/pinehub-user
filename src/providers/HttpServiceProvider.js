import ServiceProvider from './ServiceProvider';
import MerchandisesService from '../services/http/MerchandisesService';
//import UriService from '../services/http/UriService';
//import ShopsService from '../services/http/ShopsService';
//import ProjectsService from '../services/http/ProjectsService';
//import CouponService from '../services/http/CouponService';
//import FullReduceService from '../services/http/FullReduceService';
//import AppService from '../services/http/AppService';
//import ProvincesService from '../services/http/ProvincesService';
export default class HttpServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
//    this.app.axios = this.app.$vm.axios.create({
//      headers: this.app.config['http']['headers']
//    });
//    this.app.register('account', AccountService);
//    this.app.register('uri', UriService);
//    this.app.register('shops', ShopsService);
//    this.app.register('projects', ProjectsService);
//    this.app.register('coupon', CouponService);
//    this.app.register('fullReduce', FullReduceService);
//    this.app.register('app', AppService);
//    this.app.register('provinces', ProvincesService);
	this.app.register('http.merchandises', MerchandisesService);
  }
}
