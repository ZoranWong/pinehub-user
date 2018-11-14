import Command from './Command';
export default class SetMobileCommand extends Command {
	constructor(app) {
		super(app);
	}
	//获取token值
	async handle(e) {
		let getValue = e.mp.detail;
		console.log('SETMOBILE', getValue);
		let iv = getValue.iv;
		let encryptedData = getValue.encryptedData;
		let token = await this.service('mp.storage').get('token')['token'];
		let accessToken = await this.service('mp.storage').get('accessToken');
		let result = await this.service('http.auth').setMobile(encryptedData, iv, token, accessToken);
		console.log('OPENID-setMobile', result);
		let mobile = result.data.mobile;
		if(result) {
			let eventData = {
				mobile: mobile
			};
			this.store().dispatch('model.account/setAccount', eventData);
		}
		wx.showToast({
			title: "手机号获取成功",
			icon: "none"
		})
	}
	static commandName() {
		return 'SET_MOBILE';
	}
}