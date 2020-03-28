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

    // 活动列表
    async activities () {
        let response = await this.httpGet('/api/mp/activities');
        return response.data;
    }

    // 活动banner列表
    async activityBanners (id) {
        let response = await this.httpGet(`/api/mp/activity/${id}/banners`);
        return response.data;
    }

    // 活动分类列表
    async categories (id) {
        let response = await this.httpGet(`/api/mp/activity/${id}/categories/all`);
        return response.data;
    }


    // 活动产品列表
    async activityProducts (id, page, limit, cateId) {
        console.log(page);
        let response = await this.httpGet(`/api/mp/activity/${id}/products`, {
            page,
            limit,
            category_id: cateId
        });
        return response;
    }

    // 活动商品详情
    async activityProductDetails (id, actId) {
        let response = await this.httpGet(`/api/mp/activity/product/${id}?activity_id=${actId}`);
        return response.data;
    }

    // 添加活动商品到购物车
    async addActGoodToCart (id, num, actId) {
        let response = await this.httpPost('api/mp/activity/carts', {
            product_stock_id: id,
            buy_num: num,
            activity_id: actId
        });
        return response.data
    }

    // 删除活动购物车某一项
    async deleteItem (id, activityId) {
        let response = await this.httpDelete(`api/mp/activity/${activityId}/carts/${id}`);
        return response.data
    }

    // 活动购物车商品列表
    async cartGoodsList (id) {
        let response = await this.httpGet(`api/mp/activity/${id}/carts`);
        return response
    }

    // 清空活动购物车
    async clearMallCart (activityId) {
        let response = await this.httpDelete(`api/mp/activity/${activityId}/carts`);
        return response.data
    }

    //  修改活动购物车某一项数量
    async changeBuyNum (cart, num) {
        let response = await this.httpPut(`api/mp/activity/carts/${cart}`, {
            buy_num: num
        });
        return response.data
    }

    // 活动可用优惠券
    async actAvailableCoupons (id, page) {
        let response = await this.httpGet(`api/mp/activity/${id}/coupons`, {
            page
        });
        return response
    }

    // 创建活动订单
    async createActOrder (actId, addId, coupons = [], date, start, end, carts) {
        let response = await this.httpPost('/api/mp/activity/orders', {
            activity_id: actId,
            address_id: addId,
            carts: carts,
            remark: '',
            coupon_records: coupons,
            expect_receive_date: date,
            expect_receive_time_start: start,
            expect_receive_time_end: end,
            delivery_type: 'HOME_DELIVERY',
            order_type: 'ACTIVITY_PRODUCT_ORDER'
        });
        return response.data
    }

    // 购物车金额结算
    async calculateActCart (params) {
        let response = await this.httpGet('api/mp/activity/calculate/carts', {
            coupon_records: params.coupon_records,
            carts: params.carts,
            remark: params.remark,
            activity_id: params.activity_id
        });
        return response.data
    }
}
