import ApiService from './ApiService';

export default class OrdersService extends ApiService {
    // 余额支付订单
    async paymentByBalance (id) {
        let response = await this.httpGet(`api/mp/orders/${id}/balance/pay`);
        return response;
    }
    
    // 获取订单列表
    async userOrders (status, page = 1, limit = 15) {
        let response = await this.httpGet('api/mp/orders', {
            status: status,
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

    // 创建商城订单
    async createPaymentOrder (params) {
        console.log('----- payment order ---------', params);
        let response = await this.httpPost('api/mp/mall/orders', params);
        return response.data;
    }
    
    // 订单详情
    async orderDetail (id) {
        console.log(id, 'ioiooii');
        let response = await this.httpGet(`api/mp/orders/${id}`);
        return response.data;
    }
    
    // 创建早餐订单
    async createBreakfastPaymentOrder (params) {
        console.log('----- payment order ---------', params);
        let response = await this.httpPost('api/mp/breakfast/booking/orders', params);
        return response.data;
    }
    
    // 计算商城购物车金额
    async calculateMallPrice (params) {
        console.log('-------calculate mall price-------');
        console.log(params, '++++++++++++++++++++++++++');
        let response = await this.httpGet('api/mp/mall/calculate/carts', params);
        return response.data;
    }
    
    // 计算早餐车购物车金额
    async calculateBreakfastPrice (params) {
        console.log('-------calculate breakfast price-------');
        let response = await this.httpGet('api/mp/breakfast/booking/calculate/carts', params);
        return response.data;
    }
    
    // 获取支付参数　
    async getPaymentParams (id) {
        let response = await this.httpPost(`api/mp/orders/${id}/payment_config`);
        return response.data;
    }

    // 重新创建订单
    async orderPayById (id) {
        let response = await this.httpGet(`api/mp/orders/${id}/payment_config`, {});
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

    // 店铺订单
    async storeOrders (storeId, paidDate, type, payType, page, limit = 15) {
        let response = null;
        if (payType === 0) {
            response = await this.httpGet(`/shop/${storeId}/orders`, {
                paid_date: paidDate,
                type: type,
                page: page,
                limit: limit
            });
        } else {
            response = await this.httpGet(`/shop/${storeId}/orders`, {
                paid_date: paidDate,
                pay_type: payType,
                type: type,
                page: page,
                limit: limit
            });
        }
        let orders = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        let pageCount = pagination['per_page'];
        let totalAmount = response.meta['total_amount'];
        return [orders, totalNum, currentPage, totalPage, pageCount, totalAmount];
    }

    // 取消订单
    async cancelOrder (order) {
        let response = await this.httpPut(`api/mp/orders/${order}/cancel`, {});
        return response;
    }

    // 确认收货 确认核销
    async confirmOrder (id) {
        let response = await this.httpGet(`/confirm/order/${id}`, {});
        return response;
    }

    // 店铺-自提订单
    async pickedUpOrders (date, page, limit = 15) {
        let response = await this.httpGet(`store/buffet/orders`, {
            date: date,
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
            date: sendDate,
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

    // 获取用户订单信息 :: C端用户
    async getOrder (id) {
        let response = await this.httpGet(`/order/${id}`, {});
        return response;
    }

    // 通过订单ID获取广告信息
    async getAdvertisementByOrder (id) {
        let response = await this.httpGet(`/advertisement/latest?order_id=${id}&include=ticket`, {});
        return response.data;
    }
    
    // 申请售后
    async orderFeedBack (content) {
        console.log(content, '*************8');
        let response = await this.httpPost('api/mp/feed/back', {content});
        return response.data;
    }
}
