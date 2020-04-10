import ApiService from './ApiService';

export default class StoreService extends ApiService {
    // 获取店铺产品分类列表
    async categories () {
        let response = await this.httpGet('api/mp/mall/categories');
        return response.data;
    }

    // 获取分类下的商品
    async products (id, page = 1, limit = 15) {
        let response = await this.httpGet(`/api/mp/mall/category/${id}/products`, {
            page: page,
            limit: limit
        });
        return response.data
    }

    // 获取早餐预定商品详情
    async breakfastGoodDetail (id) {
        let response = await this.httpGet(`/api/mp/breakfast/booking/products/${id}`);
        return response.data
    }

    // 获取商城商品详情
    async mallGoodDetail (id) {
        let response = await this.httpGet(`/api/mp/mall/products/${id}`);
        return response.data
    }

    // 添加商城商品到购物车
    async addMallGoodToCart (id, num) {
        let response = await this.httpPost('api/mp/mall/carts', {
            product_stock_id: id,
            buy_num: num
        });

        return response.data
    }

    // 添加早餐商品到购物车
    async addBreakfastGoodToCart (id, num) {
        let response = await this.httpPost('api/mp/breakfast/booking/carts', {
            product_stock_id: id,
            buy_num: num
        });
        return response.data
    }

    // 删除购物车某一项
    async deleteItem (id) {
        let response = await this.httpDelete(`api/mp/mall/carts/${id}`);
        return response.data
    }

    // 商城购物车商品列表
    async cartGoodsList (unchecked, changed) {
        console.log(unchecked, 'unchecked ====== ');
        let response = await this.httpGet('api/mp/mall/carts', {
            ids: unchecked,
            changed: changed
        });
        return response
    }

    // 早餐预订购物车商品列表
    async cartBreakfastGoodsList () {
        let response = await this.httpGet('api/mp/breakfast/booking/carts');
        return response
    }

    // 清空商城购物车
    async clearMallCart () {
        let response = await this.httpDelete('api/mp/mall/carts');
        return response.data
    }

    // 清空早餐预定购物车
    async clearBreakfastCart () {
        let response = await this.httpDelete('api/mp/breakfast/booking/carts');
        return response.data
    }

    //  修改商城购物车某一项数量
    async changeBuyNum (cart, num) {
        let response = await this.httpPut(`api/mp/mall/carts/${cart}`, {
            buy_num: num
        });
        return response
    }

    // 常用自提车
    async commonlyUsedPoints (sLng, sLat) {
        let response = await this.httpGet('api/mp/pick_up/shops', {
            self_lat: sLat,
            self_lng: sLng
        });
        return response.data
    }

    // 附近自提车
    async nearbyPoints (lng, lat, channel, sLng, sLat, page, search = '') {
        let response = await this.httpGetWithNoLoading('api/mp/around/shops', {
            lng,
            lat,
            channel,
            distance: 10000,
            self_lat: sLat,
            self_lng: sLng,
            page,
            search
        });
        return response
    }

    // 搜索自提点
    async searchPoints (self_lng, self_lat, channel, page = 1, search = '') {
        let response = await this.httpGet('api/mp/pick_up/shops/search', {
            channel,
            self_lat,
            self_lng,
            search,
            page
        });
        return response
    }

    // 商城购物车可用优惠券
    async availableCoupons (page) {
        let response = await this.httpGet('api/mp/mall/coupons', {
            page
        });
        return response
    }

    // 商城商品搜索
    async productsSearch (search) {
        let response = await this.httpGet('/api/mp/mall/products/search', {
            search
        });
        return response.data
    }

    // 获取起送价
    async getDeliveryPrice () {
        let response = await this.httpGet('/api/mp/orders/settings/all');
        return response.data
    }
}
