/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import MpStorageService from '../services/mp/StorageService';
export default class AppServiceProvider extends ServiceProvider{
  constructor(app) {
    super(app);
  }
  register() {
  	this.app.register('mp.storage', MpStorageService);
  }
  boot() {

  }
}
