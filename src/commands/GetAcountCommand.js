import Command from './Command';
export default class GetAcountCommand extends Command {
	constructor(app) {
		super(app);
	}
	//获取token值
	async handle() {
		console.log('登录请求');

		//获取appId
		let appId = this.$application.config['app']['appId'];
		//存储appId
		let setAppId = await this.service('mp.storage').set('appId', appId);
		//获取appSecret
		let appSecret = this.$application.config['app']['appSecret'];
		//存储appSecret
		let setAppSecret = await this.service('mp.storage').set('appSecret', appSecret);
		//获取accessToken
		let getAccessToken = await this.service('http.auth').accessToken(appId, appSecret);
		let accessToken = getAccessToken.data.access_token;
		//存储accessToken
		let setDataAccessToken = await this.service('mp.storage').set('accessToken', accessToken);
		//获取code
		let code = await this.service('mp.auth').code();
		//存储code
		let setCode = await this.service('mp.storage').set('code', code);

		//请求登录接口
		let loginInfo = await this.service('http.auth').login(code, accessToken);
		let token = loginInfo.data.token;
		let openId = loginInfo.data.open_id;
		let mobile = loginInfo.data.mobile;
		let userScore = loginInfo.data.can_use_score;
		let refreshTtl = loginInfo.data.refresh_ttl;
		let ttl = loginInfo.data.ttl;
		if(loginInfo.data.shop_id) {
			let shopId = loginInfo.data.shop_id;
			let setShopId = await this.service('mp.storage').set('shopId', shopId);
		}
		let setDataToken = await this.service('mp.storage').set('token', {
			'value': token,
			'ttl': ttl.date,
			'refreshTtl': refreshTtl.date
		});
		let setDataOpenId = await this.service('mp.storage').set('openId', openId);
		if(token == undefined) {
			console.log('用户未注册，无法获取token');
		} else {
			let eventData = {
				openId: openId,
				mobile: mobile,
				userScore: userScore
			};
			this.store().dispatch('model.account/setAccount', eventData);
		}
		console.log('LOGININFO', loginInfo);
	}
	static commandName() {
		return 'GET_ACCOUNT';
	}
}