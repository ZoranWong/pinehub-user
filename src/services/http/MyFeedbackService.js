import ApiService from './ApiService';
export default class MyFeedbackService extends ApiService {
	constructor($application) {
		super($application);
	}
	// 提交反馈数据
	async submitFeedback(mobile, feedback) {
		let response = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.myFeedback').mock(mobile, feedback);
		} else {
			console.log('http');
			//服务器交互代码部分
			let sendData = {
				comment: feedback,
				mobile: mobile
			}
			if(mobile == null) {
				delete sendData.mobile;
			}
			response = await this.httpPost(`/feed/back/message`, sendData);
		}
		return response.data;
	}

}