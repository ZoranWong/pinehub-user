import ApiService from './ApiService';

export default class ActivityService extends ApiService {
    // 获取拼团列表
    async getGrouponList (lng, lat, page = 1) {
        let response = await this.httpGet('/api/mp/getAllShopShoppingGroup', {
            lng: lng,
            lat: lat,
            page: page,
            limit: 10
        });
        return response;
    }


}
