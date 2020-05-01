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

    // 获取小程序码
    async getwxacode (scene) {
        let response = await this.httpGet('/wxa/getwxacode', {
            scene
        });
        return response.data;
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

    // 添加购物车
    async addToCart (product_stock_id, shop_shopping_group_id) {
        let response = await this.httpGet('api/mp/group_shopping/addToUserCart', {
            product_stock_id: product_stock_id,
            type: 5,
            shop_shopping_group_id
        });
        return response;
    }

    // 修改购物车
    async changeBuyNum (product_stock_id, shop_shopping_group_id, buy_num) {
        let response = await this.httpGet('api/mp/group_shopping/changeUserCart', {
            product_stock_id,
            type: 5,
            shop_shopping_group_id,
            buy_num
        });
        return response;
    }

    // 删除购物车内商品
    async clearProductCart (product_stock_id, shop_shopping_group_id) {
        let response = await this.httpGet('api/mp/group_shopping/removeUserGroupCart', {
            product_stock_id,
            shop_shopping_group_id
        });
        return response.data;
    }

    // 清空购物车
    async clearCart (shop_shopping_group_id) {
        let response = await this.httpGet('api/mp/group_shopping/removeUserGroupCarts', {
            shop_shopping_group_id
        });
        return response.data;
    }

    // 获取购物车
    async getGrouponCarts (shop_shopping_group_id) {
        let response = await this.httpGet('api/mp/group_shopping/userGroupCartList', {
            shop_shopping_group_id
        });
        return response;
    }

    // 创建拼团
    async createGrouponOrder (params) {
        let response = await this.httpPost('api/mp/group_shopping/ShoppingGroupOrderAdd', params);
        return response.data;
    }

}
