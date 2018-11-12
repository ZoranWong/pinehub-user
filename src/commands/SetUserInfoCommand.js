import Command from './Command';
export default class SetUserInfoCommand extends Command {
	constructor(app) {
		super(app);
	}
	//获取token值
	async handle(e) {
		let getValue = e.mp.detail;
		console.log('SETUSERINFO', getValue);
		let userInfo = getValue.userInfo;
		let signature = getValue.signature;
		let rawData = getValue.rawData;
		let iv = getValue.iv;
		let encryptedData = getValue.encryptedData;
		let accessToken = await this.service('mp.storage').get('accessToken');
		console.log('info', accessToken, userInfo, signature, rawData, iv, encryptedData);
		let result = await this.service('http.auth').setUserInfo(accessToken, userInfo, signature, rawData, iv, encryptedData);
		console.log('diyici', result);
		let openId = await this.service('mp.storage').get('openId');
		let token = result.data.token;
		console.log('TOKEN1', token);
		let refreshUserinfo = await this.service('http.auth').getUserInfo(token);
		console.log('userInfouserInfouserInfouserInfo', refreshUserinfo);
		let userScore = refreshUserinfo.data.can_use_score;
		let refreshTtl = result.data.refresh_ttl;
		let setDataToken = await this.service('mp.storage').set('token', token);
		let setrefreshTtl = await this.service('mp.storage').set('refreshTtl', refreshTtl);
		console.log('OPENID-OPENID', openId, result);
		if(result) {
			let eventData = {
				openId: openId,
				userScore: userScore
			};
			this.store().dispatch('model.account/setAccount', eventData);
			wx.showToast({
				title: "用户信息获取成功",
				icon: "none"
			})
		}
	}
	static commandName() {
		return 'SET_USERINFO';
	}
}