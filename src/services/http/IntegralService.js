import ApiService from './ApiService';

export default class IntegralService extends ApiService {
    // 获取积分商城商品
    async integralProducts (page, limitPerPage = 15) {
        let response = await this.httpGet('api/mp/integral/products', {
            page: page,
            limit: limitPerPage
        });
        let list = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        let limit = pagination['pre_page'];
        return [list, totalNum, currentPage, totalPage, limit];
    }
    
    // 积分商城商品（优惠券）详情
    async integralDetail (id) {
        let response = await this.httpGet(`api/mp/coupons/${id}`);
        return response.data
    }
    
    // 兑换积分商城商品
    async exchangeProducts (id) {
        let response = await this.httpGet(`api/mp/integral/products/${id}/exchange`);
        if (response.message === '兑换成功') {
            this.service('popup').toast(response.message, 'success', 2000);
        }
        return response.message
    }
    
    // 积分兑换记录
    async exchangeRecords () {
        let response = await this.httpGet('api/mp/integral/traces');
        return response.data
    }
}
