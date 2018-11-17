import Command from './Command';
export default class MyInfoCommand extends Command {
	async handle(isShowLoadingPopup = true) {
		try {
			let userInfo = await this.service('http.auth').showLoading(isShowLoadingPopup).getUserInfo();
			this.store().dispatch('model.account/setAccount', userInfo);
		} catch(e) {
			console.log(e);
		}

	}
	static commandName() {
		return 'LOAD_ACCOUNT';
	}
}