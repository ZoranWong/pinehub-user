import Command from './Command';
export default class MyInfoCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle() {
		console.log('个人中心数据获取');
		let hasStore = false;
		let token = await this.service('mp.storage').get('token');
		let response = await this.service('http.auth').getUserInfo(token);
		console.log('HASSTORE', response);
		let userInfo = response.data;
		if(userInfo.shop_id) {
			hasStore = true;
			let setShopId = await this.service('mp.storage').set('shopId', userInfo.shop_id);
		} else {
			hasStore = false;
		}
		this.store().dispatch({
			type: 'model.my.info/userInfo',
			userInfo: userInfo,
			hasStore: hasStore
		});

	}
	static commandName() {
		return 'MYINFO';
	}
}