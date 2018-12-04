import ApiService from './ApiService';
export default class OrdersService extends ApiService {
    // 获取订单列表
    async userOrders (status, page = 1, limit = 15) {
        let response = await this.httpGet(`/${status}/orders`, {
            page: page,
            limit: limit
        });
        let orders = response.data;
        let pagination = response.meta.pagination;
        // 总数
        let totalNum = pagination.total;
        // 当前页
        let currentPage = pagination['current_page'];
        // 总页数
        let totalPage = pagination['total_pages'];

        let pageCount = pagination['per_page'];

        return [orders, totalNum, currentPage, totalPage, pageCount];
    }

    // 创建订单
    async createPaymentOrder (params) {
        let response = await this.httpPost(`/create/order`, params);
        return response.data;
    }

    // 重新创建订单
    async orderPayById (id) {
        let response = await this.httpGet(`/again/order/${id}`, {});
        return response.data;
    }

    async summaryOrders (paidDate, type, status, page, limit = 15) {
        let response = await this.httpGet(`/store/orders/summary`, {
            paid_date: paidDate,
            type: type,
            status: status,
            page: page,
            limit: limit
        });
        let orders = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        let pageCount = pagination['per_page'];
        return [orders, totalNum, currentPage, totalPage, pageCount];
    }

    // 取消订单
    async cancelOrder (id) {
        let response = await this.httpGet(`/cancel/order/${id}`, {});
        return response;
    }

    // 确认收货 确认核销
    async confirmOrder (id) {
        let response = await this.httpGet(`/confirm/order/${id}`, {});
        return response;
    }

    // 店铺-自提订单
    async pickedUpOrders (pickDate, page, limit = 15) {
        let response = await this.httpGet(`store/buffet/orders`, {
            pick_date: pickDate,
            page: page,
            limit: limit
        });
        let orders = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        let pageCount = pagination['per_page'];
        return [orders, totalNum, currentPage, totalPage, pageCount];
    }

    // 获取订单列表
    async sendOrders (sendDate, batch, page, limit = 15) {
        let response = await this.httpGet(`/store/send/orders`, {
            send_date: sendDate,
            batch: batch,
            page: page,
            limit: limit
        });
        let orders = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        let pageCount = pagination['per_page'];
        return [orders, totalNum, currentPage, totalPage, pageCount];
    }
}
