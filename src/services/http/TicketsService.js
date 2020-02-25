import ApiService from '@/services/http/ApiService';

export default class TicketsService extends ApiService {
    // 获取优惠券列表
    async list (status, parameters) {
        let response = null;
        if (this.$application.needMock()) {
            response = await this.service('mock.tickets').mock(parameters);
        } else {
            // 服务器交互代码
            try {
                response = await this.httpGet('api/mp/self/coupon/received/records', parameters);
            } catch (e) {
                console.log('抛出异常', e);
                throw (e);
            }
        }

        let tickets = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        let limit = pagination['pre_page'];
        return [tickets, totalNum, currentPage, totalPage, limit];
    }

    async loadtickets () {
        let response = null;
        response = await this.httpGet(`/tickets/`);
        let tickets = response.data;
        let pagination = response.meta.pagination;
        let totalNum = pagination.total;
        let currentPage = pagination['current_page'];
        let totalPage = pagination['total_pages'];
        let limit = pagination['pre_page'];
        return [tickets, totalNum, currentPage, totalPage, limit];
    }

    async receiveTicket (cardId) {
        let response = null;
        response = await this.httpGet(`/user/receive/ticket/${cardId}/`);
        return response.data;
    }

    async getTicketDetail (id) {
        let response = await this.httpGet('/ticket/' + id);
        return response.data;
    }

    async activityTickets (status, activityId, page) {
        let parameters = {
            activity_id: activityId,
            page: page
        }
        let result = await this.list(status, parameters);
        return result;
    }

    async storeTickets (status, storeId, page) {
        let parameters = {
            store_id: storeId,
            page: page
        }
        let result = await this.list(status, parameters);
        return result;
    }

    async bookingMallTickets (status, page) {
        let parameters = {
            page: page
        }
        let result = await this.list(status, parameters);
        return result;
    }

    async userTickets (status, page, limit) {
        let parameters = {
            page: page,
            limit: limit
        };
        let result = await this.list(status, parameters);
        return result;
    }

    // 优惠券详情
    async ticketDetail (id) {
        let response = await this.httpGet(`api/mp/coupons/${id}`);
        return response.data
    }

    // 可以领取的优惠券列表
    async canReceiveTickets () {
        let response = await this.httpGet('/api/mp/coupons/center/list');
        return response.data
    }

    // 领取优惠券
    async receiveTickets (couponId) {
        console.log(couponId);
        let response = await this.httpPost(`/api/mp/coupons/${couponId}/receive`);
        return response
    }
}
