import Command from './Command';
export default class RouterCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	handle(url, type) {
		let site = this.$application.config['routes'][url];
		this.service('href')[type](site);
	}
	static commandName() {
		return 'router';
	}
}