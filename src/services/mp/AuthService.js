import Service from '@/services/Service';

export default class AuthService extends Service {
	constructor(application) {
		super(application);
	}
	// 获取小程序code
	code() {
		return new Promise((resolve, reject) => {
			wx.login({
				success: ({
					code
				}) => {
					return resolve(code)
				},
				fail: (res) => {
					return reject(res)
				}
			});
		});
	}
	// 获取token
	async getToken() {
		let token = await this.services('mp.storage').get('token');
		let ttlTime = new Date(token.ttl).getTime();
		let nowTime = new Date().getTime();
		if(!token || ttlTime <= nowTime) {
			// 获取appId
			let appId = this.$application.config['app']['appId'];
			// 获取appSecret
			let appSecret = this.$application.config['app']['appSecret'];
			// 获取accessToken
			let getAccessToken = await this.services('http.auth').accessToken(appId, appSecret);
			let accessToken = getAccessToken.data.access_token;
			// 存储accessToken
			await this.services('mp.storage').set('accessToken', accessToken);
			// 获取code
			let code = await this.services('mp.auth').code();
			// 存储code
			await this.services('mp.storage').set('code', code);
			// 请求登录接口
			let loginInfo = await this.services('http.auth').login(code, accessToken);
			let token = loginInfo.data.token;
			let openId = loginInfo.data.open_id;
			let mobile = loginInfo.data.mobile;
			let userScore = loginInfo.data.can_use_score;
			let refreshTtl = loginInfo.data.refresh_ttl;
			let ttl = loginInfo.data.ttl;
			if(loginInfo.data.shop_id) {
				let shopId = loginInfo.data.shop_id;
				await this.services('mp.storage').set('shopId', shopId);
			}
			token = {
				'value': token,
				'ttl': ttl.date,
				'refreshTtl': refreshTtl.date
			};
			await this.services('mp.storage').set('token', token);
			await this.services('mp.storage').set('openId', openId);
			if(token === undefined) {
				console.log('用户未注册，无法获取token');
			} else {
				let eventData = {
					openId: openId,
					mobile: mobile,
					userScore: userScore,
					token: token
				};
				this.store().dispatch('model.account/setAccount', eventData);
			}
			return token
		} else {
			return token['value'];
		}
	}
	checkSession() {
		return new Promise((resolve, reject) => {
			wx.checkSession({
				success: () => {
					return resolve(true)
				},
				fail: () => {
					return reject(false)
				}
			});
		});
	}

	code2Session() {

	}
}