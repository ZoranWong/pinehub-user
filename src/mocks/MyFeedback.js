import Mock from './Mock';
export default class MyFeedback extends Mock {
	constructor(application) {
		super(application);
	}
	data(contact, feedbackContent) {
		console.log('myFeedback-mock')
		return {
			"data": {
				"comment": "好好爱好啊哈哈哦啊哦哦",
				"mobile": "12345678900"
			}
		};
	}
}
