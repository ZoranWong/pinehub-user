import ServiceProvider from './ServiceProvider';
import appConfig from '@/configs/app.json';
import routes from '@/configs/routes.json';
export default class ConfigServiceProvider extends ServiceProvider {
  constructor(application) {
    super(application);
  }
  register() {
  	this.app.registerConfig('app', appConfig);
  	this.app.registerConfig('routes', routes);
  }
}
