import ApiService from './ApiService';
export default class TicketsService extends ApiService {
	constructor($application) {
		super($application);
	}
	// 获取优惠券列表
	async list(status, parameters) {
		let response = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.tickets').mock(parameters);
		} else {
			// 服务器交互代码
			try {
				response = await this.httpGet(`/user/tickets/${status}`, parameters);
			} catch(e) {
				console.log('抛出异常', e);
				throw(e);
				return false;
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

	async activityTickets(status, activityId, page) {
		let parameters = {
			activity_id: activityId,
			page: page
		}
		return await this.list(status, parameters);
	}
}