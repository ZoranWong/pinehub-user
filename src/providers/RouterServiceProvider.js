import ServiceProvider from './ServiceProvider';
import Router from '@/services/mp/RouterService';
import MpvueRouterPatch from 'mpvue-router-patch';

export default class RouteServiceProvider extends ServiceProvider {
    constructor (app) {
        super(app);
    }

    register () {
        this.app.use(MpvueRouterPatch);
        this.app.register('mp.router', Router);
    }
}
