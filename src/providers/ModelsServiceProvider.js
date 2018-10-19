import ServiceProvider from './ServiceProvider';
import Model from '../models'
export default class ModelServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
  	let models = new Model(this.app);
  	this.app.register('models', models);
  }
  boot() {

  }
}
