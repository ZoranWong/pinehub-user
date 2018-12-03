import Mock from './Mock';
export default class MyStoreStatusPurchase extends Mock {
	constructor(application) {
		super(application);
		this.total = 12;
	}
	data(status, page = 1, search = null, limit = 20) {
		return {
			"data": {
				"total_amount": 34,
				"orders|12": [{
					"code|+1": 2018091208310565,
					"paid_at": "2018-09-18 17:04:54",
					"type": this.mockMethod('integer', 1, 2),
					"status": 1,
					"payment_amount": 6
				}]
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
