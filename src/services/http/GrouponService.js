import ApiService from './ApiService';

export default class ActivityService extends ApiService {
    // 获取拼团列表
    async getGrouponList (lng, lat, page = 1) {
        let response = await this.httpGet('/api/mp/group_shopping/pub_shopping_groups', {
            lng: lng,
            lat: lat,
            page: page,
            limit: 10
        });
        return response;
    }

    // 获取拼团详情
    async getGrouponDetails (id) {
        let response = await this.httpGet('api/mp/getShopShoppingGroupDetail', {
            id
        });
        return response.data;
    }

    // 获取拼团下分类商品列表
    async getGrouponCateProducts (shoppingGroupId, categoryId) {
        let response = await this.httpGet(`/api/mp/group_shopping/pub_shopping_groups/${shoppingGroupId}/categories/${categoryId}/products/all`);
        return response.data;
    }

}
