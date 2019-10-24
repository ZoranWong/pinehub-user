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
    
        console.log(response, 'oooooooooo');
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
    async cartGoodsList () {
        let response = await this.httpGet('api/mp/mall/carts');
        console.log('^^^^^^^^^^^^', response);
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
        return response.data
    }
    
    // 常用自提车
    async commonlyUsedPoints () {
        let response = await this.httpGet('api/mp/pick_up/shops');
        return response.data
    }
    
    // 附近自提车
    async nearbyPoints (lng, lat) {
        let response = await this.httpGet('api/mp/around/shops', {
            lng,
            lat,
            distance: 10000
        });
        return response.data
    }
    
    // 商城购物车可用优惠券
    async availableCoupons () {
        let response = await this.httpGet('api/mal/mall/coupons');
        return response.data
    }
}
