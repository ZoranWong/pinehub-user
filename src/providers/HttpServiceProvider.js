import ServiceProvider from './ServiceProvider';
import MerchandisesService from '@/services/http/MerchandisesService';
import UriService from '@/services/http/UriService';

import Fly from 'flyio/dist/npm/wx';


export default class HttpServiceProvider extends ServiceProvider {
  register () {
    let http = function () {
      this.fly = Fly;
    };
    this.app.register('$http', http);
    this.app.register('uri', UriService);
    // 产品模型和产品服务
    this.app.register('http.merchandises', MerchandisesService)
  }
}
