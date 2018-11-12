import ServiceProvider from './ServiceProvider';
import Router from '@/services/mp/RouterService';
import MpvueRouterPatch from 'mpvue-router-patch';

import _ from 'underscore';
export default class RouteServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register(){
  	this.app.use(MpvueRouterPatch);
  	this.app.register('mp.router', Router);
  }
}
