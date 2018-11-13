import ServiceProvider from './ServiceProvider';
import Model from '../models';
import Account from '@/models/Account';
import ShoppingCarts from '@/models/ShoppingCarts';
export default class ModelServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
  	let models = new Model(this.app);
  	this.app.register('models', models);
  	this.app.models.addModel('model.account', Account);
  	this.app.models.addModel('model.activity.shoppingCarts', ShoppingCarts);
  	this.app.models.addModel('model.store.shoppingCarts', ShoppingCarts);
  	this.app.models.addModel('model.online.shoppingCarts', ShoppingCarts);
  }
  boot() {

  }
}
