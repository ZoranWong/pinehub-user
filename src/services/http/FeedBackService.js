import ApiService from './ApiService';
export default class FeedBackService extends ApiService {
    // 提交反馈数据
    async submitFeedback (mobile, feedback) {
        let response = null;
        if (this.$application.needMock()) {
            response = await this.service('mock.myFeedback').mock(mobile, feedback);
        } else {
            // 服务器交互代码部分
            let data = {
                comment: feedback,
                mobile: mobile
            }
            if (mobile == null) {
                delete data.mobile;
            }
            response = await this.httpPost(`/feed/back/message`, data);
        }
        return response.data;
    }
}
