import Mock from './Mock';
export default class MY_STORE_INFO extends Mock {
	constructor(application) {
		super(application);
	}
	data() {
		return {
			"data": {
				"today_buy_num": 2,
				"week_buy_num": 2,
				"today_sell_amount": 24,
				"week_sell_amount": 24,
				"buy_mum": [
					0,
					1,
					0,
					0,
					1,
					0,
					0
				],
				"sell_amount": [
					0,
					12,
					0,
					0,
					12,
					0,
					0
				]
			}
		};
	}
}
