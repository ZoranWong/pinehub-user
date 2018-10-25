import Mock from './Mock';
export default class MyInfo extends Mock {
	constructor(application) {
		super(application);
	}
	data() {
		console.log('myInfo-mock')
		return {
			"data": {
					"id": 1,
					"nickname": this.mockMethod('name'),
					"type": "MINI_PROGRAM",
					"open_id": null,
					"avatar": "http://img07.tooopen.com/images/20170316/tooopen_sy_201956178977.jp",
					"country": "中国",
					"province": "安徽省",
					"city": "合肥市",
					"sex": "MALE",
					"ticket_num": 1,
					"shop_id": 1,
					"mobile": '12222222222',
					"vip_level": 1,
					"total_score": 0,
					"balance": 400
				}
		};
	}
}