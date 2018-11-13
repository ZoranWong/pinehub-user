import Service from '@/services/Service';

export default class AuthService extends Service {
	constructor(application) {
		super(application);
	}
	//获取小程序code
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
	//获取token
	async getToken() {
		let token = await this.services('mp.storage').get('token');
		return token;
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