import ServiceProvider from './ServiceProvider';
import MerchandisesService from '../services/http/MerchandisesService';
export default class HttpServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
	this.app.register('http.merchandises', MerchandisesService);
  }
}
