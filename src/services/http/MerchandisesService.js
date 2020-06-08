import ApiService from './ApiService';

export default class MerchandisesService extends ApiService {
    async list (route, query) {
        // 结果
        let response = await this.httpGet(route, query);

        console.log(response, '-----------------------------');

        let merchandises = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        let limit = pagination['pre_page'];
        return [merchandises, totalNum, currentPage, totalPage, limit];
    }

    // 获取新品预定所有商品信息 parameters = []
    async activityMerchandises (page) {
        let route = '/api/mp/breakfast/booking/products';
        let query = {
            page: page
        }
        return await this.list(route, query);
    }

    // 获取今日店铺分类下的商品信息
    async storeMerchandises (storeId, categoryId, page = 1, search = null, limit = 15) {
        let route = `/store/${storeId}/category/${categoryId}/merchandises`;
        let query = {
            page: page,
            searchJson: search,
            limit: limit
        };
        return await this.list(route, query);
    }

    // 获取商家订货中的全部商品信息
    async purchaseMerchandises (categoryId, page = 1, search = null, limit = 10) {
        let route = `/categories/${categoryId}/merchandises`;
        let query = {
            page: page,
            searchJson: search,
            limit: limit
        };
        return await this.list(route, query);
    }

    // 获取预定商城的指定分类下的所有商品信息
    async bookingMerchandises (categoryId, page = 1, search = null, limit = 10) {
        let route = `/categories/${categoryId}/merchandises`;
        let query = {
            page: page,
            searchJson: search,
            limit: limit
        };
        return await this.list(route, query);
    }

    async storeNewMerchandises (storeId, page = 1, search = null, limit = 10) {
        let route = `/store/${storeId}/new/merchandises`;
        let query = {
            page: page,
            searchJson: search,
            limit: limit
        };
        return await this.list(route, query);
    }

    // 早餐预定可用优惠券
    async availableCoupons (page) {
        let response = await this.httpGet('api/mp/breakfast/booking/coupons', {
            page
        });
        return response
    }
}
