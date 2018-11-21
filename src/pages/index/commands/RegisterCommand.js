import Command from '@/commands/Command';
export default class RegisterCommand extends Command {
	// 获取token值
	async handle(e) {
		let mpUserInfoDetail = e.mp.detail;
		let userInfo = mpUserInfoDetail.userInfo;
		let signature = mpUserInfoDetail.signature;
		let rawData = mpUserInfoDetail.rawData;
		let iv = mpUserInfoDetail.iv;
		let encryptedData = mpUserInfoDetail.encryptedData;
		let accessToken = await this.service('mp.storage').get('accessToken');
		let result = await this.service('http.auth').mpRegister(accessToken, userInfo, signature, rawData, iv, encryptedData);
		let token = result['token'];
		userInfo = await this.service('http.auth').getUserInfo(token);
		let refreshTtl = result['refresh_ttl'];
		let ttl = result['ttl'];
		token = {
			'value': token,
			'ttl': ttl.date,
			'refreshTtl': refreshTtl.date
		};
		await this.service('mp.storage').set('token', token);
		if(result) {
			userInfo['token'] = token;
			this.store().dispatch('model.account/setAccount', userInfo);
			wx.showToast({
				title: '用户信息获取成功'
			});
		}
	}
	static commandName() {
		return 'USER_REGISTER';
	}
}