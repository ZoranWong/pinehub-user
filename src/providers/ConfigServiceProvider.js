import ServiceProvider from './ServiceProvider';
import appConfig from '@/configs/app.json';
import routes from '@/configs/routes.json';
// import http from '@/configs/http.json';

export default class ConfigServiceProvider extends ServiceProvider {
    register () {
        this.app.registerConfig('app', appConfig);
        this.app.registerConfig('routes', routes);
        // this.app.registerConfig('http', http);
    }
}
