import Command from './Command';
export default class SignInCommand extends Command {
	constructor(app) {
		super(app);
	}
	// 获取token值
	async handle() {
		// 获取appId
		let appId = this.$application.config['app']['appId'];
		// 存储appId
		//		await this.service('mp.storage').set('appId', appId);
		// 获取appSecret
		let appSecret = this.$application.config['app']['appSecret'];
		// 存储appSecret
		//		await this.service('mp.storage').set('appSecret', appSecret);
		console.log('======= app info =======', [appId, appSecret]);
		// 获取accessToken
		try {
			let accessToken = await this.service('http.auth').accessToken(appId, appSecret);
			console.log('======= accessToken =======', accessToken);
			let code = await this.service('mp.auth').code();
			// 存储code
			//		await this.service('mp.storage').set('code', code);

			// 请求登录接口
			let loginInfo = await this.service('http.auth').login(code, accessToken);
			let token = loginInfo.data.token;
			let openId = loginInfo.data.open_id;
			let mobile = loginInfo.data.mobile;
			let userScore = loginInfo.data.can_use_score;
			let refreshTtl = loginInfo.data.refresh_ttl;
			let ttl = loginInfo.data.ttl;
			if(loginInfo.data.shop_id) {
				let shopId = loginInfo.data.shop_id;
				await this.service('mp.storage').set('shopId', shopId);
			}
			token = {
				'value': token,
				'ttl': ttl.date,
				'refreshTtl': refreshTtl.date
			};
			await this.service('mp.storage').set('token', token);
			await this.service('mp.storage').set('openId', openId);
			console.log('LOGININFO', loginInfo);
			let eventData = {
				openId: openId,
				mobile: mobile,
				userScore: userScore,
				token: token
			};
			this.$store.dispatch('model.account/setAccount', eventData);
		} catch(e) {
			console.log(e);
			return;
		}

	}
	static commandName() {
		return 'SIGN_IN';
	}
}