import Mock from './Mock';
export default class MyStoreCategorys extends Mock {
	constructor(application) {
		super(application);
		this.total = 12;
	}
	data(storeId, page = 1, limit = 20) {
		console.log('myStoreCategorys-mock')
		return {
			"data|5": [{
				"id|+1": 1,
				"name": "早餐"
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
