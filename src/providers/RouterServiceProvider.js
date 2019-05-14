import ServiceProvider from './ServiceProvider';
import Router from '@/services/mp/RouterService';
import MpvueRouterPatch from 'mpvue-router-patch';

export default class RouteServiceProvider extends ServiceProvider {
    register () {
        this.app.use(MpvueRouterPatch);
        this.app.register('mp.router', Router);
    }
}
