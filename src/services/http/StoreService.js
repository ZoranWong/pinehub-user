import ApiService from './ApiService';
export default class StoreService extends ApiService {
    // 获取店铺产品分类列表
    async categories (storeId, page = 1, limit = 15) {
        let response = await this.httpGet(`store/${storeId}/categories`, {
            page: page,
            limit: limit
        });
        let categories = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        return [categories, totalNum, currentPage, totalPage];
    }

    // 提交反馈数据
    async modifyStock (id, primaryStockNum, modifyStockNum, reason, comment) {
        let response = await this.httpPut(`/store/merchandise/${id}/stock`, {
            primary_stock_num: primaryStockNum,
            modify_stock_num: modifyStockNum,
            reason: reason,
            comment: comment
        });
        return [response.data];
    }

    // 获取进货统计
    async purchaseInfo (date) {
        let response = await this.httpGet('store/purchase/statistics', {'date': date });
        let list = response.data;
        let pagination = response.meta.pagination;
        // 总数
        let totalNum = pagination.total;
        // 当前页
        let currentPage = pagination['current_page'];
        // 总页数
        let totalPage = pagination['total_pages'];
        return [list, totalNum, currentPage, totalPage];
    }


    async scanCode (code) {
        let response = await this.httpGet('store/code/order/merchandise/up', {
            order_code: code
        });
        let codeNum = response.data.code;
        let status = response.data.status;
        return [codeNum, status];
    }

    async nearestStore (lng, lat) {
        let response = await this.httpGet(`/nearest/store`, {lng: lng, lat: lat});
        return response.data;
    }

    // 获取进货统计
    async salesInfo (selectTime) {
        let response = await this.httpGet('store/sales/statistics', { 'date': selectTime });
        let [salesInfo, consumptionRanking, merchandiseSalesRanking, orderStatistics] = [response, response['consumption_ranking'], response['merchandise_sales_ranking'], response['order_statistics']];
        return [salesInfo, consumptionRanking, merchandiseSalesRanking, orderStatistics];
    }

    // 获取店铺信息
    async storeInfo () {
        let response = await this.httpGet('store/info');
        let sellAmountCharts = response['order_count_statistics'];
        let buyNumCharts = response['order_payment_amount_statistics'];
        return [response, sellAmountCharts, buyNumCharts];
    }

    // 店铺商品
    async merchandises (storeId, categoryId, page = 1, limit = 15) {
        let response = await this.httpGet(`/store/${storeId}/category/${categoryId}/merchandises`, {
            page: page,
            limit: limit
        });
        let merchandises = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        let pageCount = pagination['per_page'];
        return [merchandises, totalNum, currentPage, totalPage, pageCount];
    }

    // 获取订单列表
    async nearbyStores (lng, lat, page = 1, limit = 100) {
        let response = await this.httpGet('/nearby/stores', {
            lng: lng,
            lat: lat,
            limit: limit,
            page: page
        });
        let stores = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        let pageCount = pagination['per_page'];
        return [stores, totalNum, currentPage, totalPage, pageCount];
    }
}
