import Service from '../Service';
export default class TicketsService extends Service {
	constructor($application) {
		super($application);
	}
    //获取优惠券列表
	async list(status = "all", page, limit = 15){
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let response = null;
	
		if(this.$application.needMock()) {			
			response = await this.services('mock.tickets').mock(status, page, limit);
		} else {
			//服务器交互代码
			response = await this.httpGet(`/user/tickets/status `, {
				page: page,
				limit: limit
			});
		}
		let tickets = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		return [tickets, totalNum, currentPage, totalPage];
		
	}	
}