import Command from './Command';
export default class LoadActivityUsuallyAddressCommand extends Command {
	constructor(app) {
		super(app);
	}
	async handle() {
		let activityId = await this.service('mp.storage').get('activityId');
		try {
			let response = await this.service('http.activityUsuallyAddress').list(activityId);
		} catch(e) {
			console.log('异常抛出', e);
			return false;
		}
	}
	static commandName() {
		return 'LOAD_ACTIVITY_USUALLY_ADDRESS';
	}
}
