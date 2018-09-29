import Command from './Command';
export default class ScanCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	handle() {
		console.log(888);
		this.service('scan')['scanCode']();
	}
	static commandName() {
		return 'scan';
	}
}