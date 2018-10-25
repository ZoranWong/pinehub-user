import Mock from './Mock';
export default class Location extends Mock {
	constructor(application) {
		super(application);
		this.total = 12;
	}
	data(page = 1, search = null, limit = 20) {
		return {
			"data": [{
				"id": 1,
				"name": "张老板的店铺",
				"lng": 31.863563,
				"lat": 117.246094,
				"address": "安徽省合肥市蜀山区史河路16号",
				"mobile": "15766660000"
			},{
				"id": 1,
				"name": "王老板的店铺",
				"lng": 31.860063,
				"lat": 117.248840,
				"address": "安徽省合肥市蜀山区史河路22号",
				"mobile": "13888889999"
			},{
				"id": 1,
				"name": "李老板的店铺",
				"lng": 31.842566,
				"lat": 117.262573,
				"address": "安徽省合肥市蜀山区黄山路316号",
				"mobile": "15999998888"
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
