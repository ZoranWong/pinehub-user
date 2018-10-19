/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import MyOrder from '@/mocks/MyOrder';
import Merchandises from '@/mocks/Merchandises';
import AddMerchandises from '@/mocks/AddMerchandises';
import Categories from '@/mocks/Categories';
import NearestStore from '@/mocks/NearestStore';             
/* eslint-disable */

export default class MockServiceProvider extends ServiceProvider{
  constructor(app) {
    super(app);
  }
  register() {
    if(this.app.needMock()) {
      this.app.register('mock', require('mockjs'));
      this.app.register('mock.merchandises', Merchandises);
      this.app.register('mock.addmerchandises',AddMerchandises);
      this.app.register('mock.categories', Categories);
      this.app.register('mock.neareststore',NearestStore);
    }
  }
  boot() {
	}
}