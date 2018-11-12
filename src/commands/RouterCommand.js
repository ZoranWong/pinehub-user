import Command from './Command';
export default class RouterCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	handle(route, method, options) {
		this.service('mp.router')[method](route, options);
	}
	static commandName() {
		return 'router';
	}
}