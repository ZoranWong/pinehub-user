import Mock from './Mock';
export default class MyStoreCategoryMerchandises extends Mock {
	constructor(application) {
		super(application);
		this.total = 12;
	}
	data(storeId, page = 1, limit = 20) {
		console.log('myStoreCategorys-mock')
		return {
			"data|15": [{
				"id|+1": 1,
				"name": "包子",
				"sell_price": 20,
				"stock_num|+1": Math.ceil(Math.random()*100),
				"code|+1": 8801989283
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
