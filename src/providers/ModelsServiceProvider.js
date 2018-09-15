import ServiceProvider from './ServiceProvider';
import Vuex from 'vuex';
//import Models from '../models'
export default class ModelServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
    this.app.use(Vuex);
  }
  register() {
//  this.app.register('vue-store', new Vuex.Store(new Models(this.app)));
  }
  boot() {

  }
}
