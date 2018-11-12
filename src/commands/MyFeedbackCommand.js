import Command from './Command';
export default class MyFeedbackCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(contact, feedbackContent) {
	    let [res] = await this.service('http.myFeedback').submitFeedback(contact, feedbackContent);
	}
	static commandName() {
		return 'MYFEEDBACK';
	}
}