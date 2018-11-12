import ServiceProvider from './ServiceProvider';
import Model from '../models'
import ShoppingCarts from '@/models/ShoppingCarts';
export default class ModelServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
  	let models = new Model(this.app);
  	this.app.register('models', models);
  	this.app.models.addModel('model.shoppingCarts', ShoppingCarts);
  }
  boot() {

  }
}
