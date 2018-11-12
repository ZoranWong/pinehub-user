import Service from '../Service';
export default class SelfextraOrderService extends Service {
	constructor($application) {
		super($application);
	}
	//获取订单列表
	async list(startTime, endTime, page = 1) {
		let Selforders = null;
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let response = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.selfextraOrder').mock(startTime, endTime, page);
		} else {
			response = await this.httpGet(`/store/buffet/orders`, {
				paid_start_time: startTime,
				paid_end_time: endTime,
				page:page
			});
		}
		//console.log('getRes',response);
		Selforders = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		//console.log('ne-----',[Selforders, totalNum, currentPage, totalPage]);
		return [Selforders, totalNum, currentPage, totalPage];
	}
	
	async x() {
		
	}
	
	async y() {
		
	}

}