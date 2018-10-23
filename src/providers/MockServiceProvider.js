/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import MyInfo from '@/mocks/MyInfo';
import MyFeedback from '@/mocks/MyFeedback';
import MyStoreInfo from '@/mocks/MyStoreInfo';
import MyOrder from '@/mocks/MyOrder';
import Merchandises from '@/mocks/Merchandises';
import AddMerchandises from '@/mocks/AddMerchandises';
import Categories from '@/mocks/Categories';
import EmptyMerchandises from '@/mocks/EmptyMerchandises';
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
			this.app.register('mock.myInfo', MyInfo);
			this.app.register('mock.myFeedback', MyFeedback);
			this.app.register('mock.myStoreInfo', MyStoreInfo);
      this.app.register('mock.myOrders', MyOrder);
      this.app.register('mock.emptyMerchandises', EmptyMerchandises);
    }
  }
  boot() {
	}
}

