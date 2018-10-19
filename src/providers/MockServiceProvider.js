/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import MyOrder from '@/mocks/MyOrder';
import Merchandises from '@/mocks/Merchandises';
/* eslint-disable */
export default class MockServiceProvider extends ServiceProvider {
	constructor(app) {
		super(app);
	}
	register() {
		if(this.app.needMock()) {
			this.app.register('mock', require('mockjs'));
			this.app.register('mock.myOrdersMock', MyOrder);
			this.app.register('mock.merchandises', Merchandises);
		}
	}
	boot() {

	}
}