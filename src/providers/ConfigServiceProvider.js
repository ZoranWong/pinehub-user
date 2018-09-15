import ServiceProvider from './ServiceProvider';
import appConfig from '@/configs/app.json';
import routes from '@/configs/routes.json';
//import httpConfig from '../configs/http';
export default class ConfigServiceProvider extends ServiceProvider {
  constructor(application) {
    super(application);
  }
  register() {
//	console.log(appConfig);
      this.app.registerConfig('app', appConfig);
      this.app.registerConfig('routes', routes);
//    console.log(this.app.config);
//  this.app.registerConfig('http', httpConfig);
  }
}
