import ServiceProvider from './ServiceProvider';
// import Router from '@/services/mp/RouterService';
import Router from '../services/router/Router';
// import MpvueRouterPatch from 'mpvue-router-patch';
import MpRouterAdapter from '../services/router/MpRouterAdapter';
import Route from '../services/router/Route';
export default class RouteServiceProvider extends ServiceProvider {
    register () {
        // this.app.use(MpvueRouterPatch);
        let routerAdapter = new MpRouterAdapter();
        let routes = this.loadRoutes();
        let application = this.app;

       let $router = new Router({routerAdapter, routes, application});
        this.app.register('$route', $router);
        this.app.register('mp.router', $router);
    }

    loadRoutes () {
        let routes = [];
        for (let key in this.app.config.routes) {
            let page = this.app.config.routes[key];
            routes.push(new Route({name: key, page: page}))
        }
        return routes;
    }
}
