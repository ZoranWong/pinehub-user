import Mock from './Mock';
export default class MyStoreCategorys extends Mock {
	constructor(application) {
		super(application);
		this.total = 12;
	}
	data(storeId, page = 1, limit = 20) {
		console.log('myStoreCategorys-mock')
		return {
			"data": [{
				"id": 1,
				"name": "早餐"
			},{
				"id": 2,
				"name": "中餐"
			},{
				"id": 3,
				"name": "晚餐"
			},{
				"id": 4,
				"name": "熟食"
			},{
				"id": 5,
				"name": "面点"
			}],
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
