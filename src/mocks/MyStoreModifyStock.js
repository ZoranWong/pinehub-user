import Mock from './Mock';
export default class MyStoreModifyStock extends Mock {
	constructor(application) {
		super(application);
	}
	data() {
		return {
			"data": {
				"id": 1,
				"stock_num": "400"
			}
		};
	}
}
