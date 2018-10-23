import Command from './Command';
export default class MyInfoCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle() {
	    let [userInfo,hasStore] = await this.service('http.myInfo').userInfo();
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