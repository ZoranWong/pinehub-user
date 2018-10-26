import Mock from './Mock';
export default class NearbyStores extends Mock {
	constructor(application) {
		super(application);
		this.total = 12;
	}
	data(lat, lng, page = 1, limit = 20) {
		return {
			"data": [{
				"id": 1,
				"name": "张老板的店铺",
				"lng": lng,
				"lat": lat,
				"address": "安徽省合肥市蜀山区史河路16号",
				"mobile": "15766660000"
			},{
				"id": 2,
				"name": "王老板的店铺",
				"lng": lng + 0.02,
				"lat": lat + 0.06,
				"address": "安徽省合肥市蜀山区史河路22号",
				"mobile": "13888889999"
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
