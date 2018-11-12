import Command from './Command';
export default class GetTokenCommand extends Command {
	constructor(app) {
		super(app);
	}
	//获取token值
	async handle() {
		let token = await this.service('mp.storage').get('token');
		if(!token) {
//			this.$command('');
		}
	}
	static commandName() {
		return 'GETTOKEN';
	}
}