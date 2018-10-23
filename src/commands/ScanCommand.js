import Command from './Command';
export default class ScanCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	handle() {
		let res = this.service('scan')['scanCode']();
		wx.showToast({
			title: res.result,
			icon: "none"
		})
	}
	static commandName() {
		return 'scan';
	}
}