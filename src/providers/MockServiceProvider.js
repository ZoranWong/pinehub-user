/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import Shops from '../mocks/Shops';
import Projects from '../mocks/Projects';
import Coupon from '../mocks/Coupon';
import FullReduce from '../mocks/FullReduce';
import Provinces from '../mocks/Provinces';
/* eslint-disable */
export default class AppServiceProvider extends ServiceProvider{
  constructor(app) {
    super(app);
  }
  register() {
    if(this.app.mock()) {
      console.log('mock data register');
      this.app.register('mock', require('mockjs'));
      this.app.register('shopsMock', Shops);
      this.app.register('projectsMock', Projects);
      this.app.register('couponMock', Coupon);
      this.app.register('fullReduceMock', FullReduce);
      this.app.register('provincesMock', Provinces);
    }
  }
  boot() {

  }
}
