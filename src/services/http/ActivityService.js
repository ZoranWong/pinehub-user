import ApiService from './ApiService';

export default class ActivityService extends ApiService {
    // 获取活动信息
    async getActivityInfo () {
        let response = await this.httpGet('/new/events');
        return response.data;
    }

    async usuallyUseAddress (activityId) {
        let response = null;
        // 服务器交互代码
        try {
            response = await this.httpGet(`/receiving/shop/address/${activityId}`);
        } catch (e) {
            console.log('抛出异常', e);
            throw e;
        }
        return response;
    }
}
