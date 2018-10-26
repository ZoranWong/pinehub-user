import Mock from './Mock';
export default class MyOrder extends Mock {
	constructor(application) {
		super(application);
		this.total = 12;
	}
	data(status, page = 1, limit = 15) {
		return {
			"data|12": [{
				"id|+1": 1,
				"code|+1": parseInt(Math.random() *100000),
				"type": this.mockMethod('integer', 0, 4),
				"merchandies_num": 6,
				"payment_amount": 12,
				"total_amount": 12,
				"status": 300,
				"reveiver_address": "合肥市蜀山区",
				"created_at": "2018-10-11 15:43:02",
				"order_item_merchandises": [{
					"name": "包子",
					"sell_price": 2,
					"quality": 6,
					"total_amount": 12,
					'main_image':"http://img07.tooopen.com/images/20170316/tooopen_sy_201956178977.jpg"
				}]
			}],
			"meta": {
				"pagination": {
					"total": this.total,
					"count": 1,
					"per_page": limit,
					"current_page": page,
					"total_pages": Math.ceil(this.total / limit),
					"links": []
				}
			}
		};
	}
}