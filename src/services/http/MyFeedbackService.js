import Service from '../Service';
export default class MyFeedbackService extends Service {
	constructor($application) {
		super($application);
	}	
	// 提交反馈数据
	async submitFeedback(contact,feedbackContent) {
		let response = null;
		let status = null;
		if(this.$application.needMock()){
			response = await this.services('mock.myFeedback').mock(contact, feedbackContent);
		}else{
			//服务器交互代码部分
			response = await this.httpPost(`/feed/back/message`, {
				comment: contact,
				mobile: feedbackContent
			});
		}
		if(response.data){
			console.log('this',this);
			this.$application.$command('router', 'myfeedbacksuccess', 'push');
		}
	}

}