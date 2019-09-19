import Mock from './Mock';
export default class MyStoreStatusSales extends Mock {
	constructor(application) {
		super(application);
		this.total = 12;
	}
	data(status, page = 1, search = null, limit = 20) {
		return {
			"data": {
				"statics": [
					0,
					12,
					0,
					0,
					12
				],
				"order_amount":500,
				"reservation_order_amount": 24,
				"store_order_amount": null,
				"merchandise_num": 12,
				"sell_point": 32,
				"order_num": 2,
				"sell_top|5": [{
					"customer_nickname": "xcx小强",
					"total_amount": 24
				}],
				"merchandise_top|5": [{
						"name": "馒头",
						"total_amount": 12
					}
				]
			},
			"meta": {
				"pagination": {
					"total": this.total,
					"count": 1,
					"per_page": limit,
					"current_page": page,
					"total_pages": Math.ceil(this.total / limit)
				}
			}
		};
	}
}
