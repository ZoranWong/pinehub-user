import Command from './Command';
export default class RouterCommand extends Command {
	handle(route, method, options) {
		this.service('mp.router')[method](route, options);
	}
	static commandName() {
		return 'REDIRECT_TO';
	}
}
