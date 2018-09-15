import ServiceProvider from './ServiceProvider';
import Router from '@/services/router/Router';

import _ from 'underscore';
export default class RouteServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register(){
  	this.app.register('$router', new Router({
  		routes: []
  	}));
  }
}
