import Mock from './Mock';
export default class GatherOrder extends Mock {
	constructor(application) {
		super(application);
		this.total = 12;
	}
	data(paidStartTime, paidEndTime, type, status, page = 1, search = null, limit=15) {
		return {
			"data|12": [{
				"id|+1": 1,
				"code|+10":  parseInt(Math.random() *100000),
				"merchandies_num": 6,
				"payment_amount": 12,
				"total_amount": 12,
				"card_id":"124321",
				"reveiver_address": "合肥市蜀山区",
				"reduce_cost": "满十减一",
				"sell_point":"56",
				"order_item_merchandises": [{
					"name": "包子",
					"sell_price": 2,
					"quality": 6,
					"total_amount": 12
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
		}
	}
}