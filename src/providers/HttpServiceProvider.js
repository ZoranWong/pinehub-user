import ServiceProvider from './ServiceProvider';
//import MerchandisesService from '@/services/http/MerchandisesService';
import UriService from '@/services/http/UriService';

import Fly from 'flyio/dist/npm/wx';

export default class HttpServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
  	let http = function() {
  		this.fly = Fly;
  	}
  	this.app.register('$http', http);
  	this.app.register('uri', UriService);
//	this.app.register('http.merchandises', MerchandisesService);
  }
}
