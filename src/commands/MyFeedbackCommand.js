import Command from './Command';
export default class MyFeedbackCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(mobile, feedback) {
		console.log('FEEDBACK', mobile, feedback);
		if(mobile && !(/^1[34578]\d{9}$/.test(mobile))) {
			wx.showToast({
				title: "手机号填写不正确",
				icon: "none"
			})
			return false;
		} else if(!feedback || feedback.length < 10) {
			wx.showToast({
				title: "意见不得少于10字",
				icon: "none"
			})
			return false;
		}
		let response = await this.service('http.myFeedback').submitFeedback(mobile, feedback);
		if(response) {
			this.$application.$command('router', 'myFeedbackSuccess', 'replace');
		}
	}
	static commandName() {
		return 'MYFEEDBACK';
	}
}