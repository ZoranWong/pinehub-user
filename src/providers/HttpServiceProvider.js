import ServiceProvider from './ServiceProvider';
import MerchandisesService from '../services/http/MerchandisesService';

import Fly from 'flyio/dist/npm/wx';

export default class HttpServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
  	this.app.register('$http', Fly);
	this.app.register('http.merchandises', MerchandisesService);
  }
}
