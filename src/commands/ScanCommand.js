import Command from './Command';
export default class ScanCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	handle() {
		this.service('scan')['scanCode']();
	}
	static commandName() {
		return 'scan';
	}
}