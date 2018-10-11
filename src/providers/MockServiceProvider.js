/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import MyOrder from '../mocks/MyOrder';
/* eslint-disable */
export default class AppServiceProvider extends ServiceProvider{
  constructor(app) {
    super(app);
  }
  register() {
    if(this.app.mock()) {
      console.log('mock data register');
      this.app.register('mock', require('mockjs'));
      this.app.register('myOrdersMock', MyOrder);
    }
  }
  boot() {

  }
}
