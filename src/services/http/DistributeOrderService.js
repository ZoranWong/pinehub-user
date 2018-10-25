import Service from '../Service';
export default class DistributeOrderService extends Service {
	constructor($application) {
		super($application);
	}
	//获取订单列表
	async list(startTime, endTime, page) {
		let distributeorders = null;
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let response = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.distributeOrder').mock(startTime, endTime, page);
		} else {
			response = await this.httpGet(`/store/send/orders`, {
				send_start_time: startTime,
				send_end_time: endTime,
				page:page
			});
		}
		console.log('getRes 3413412341',response);
		distributeorders = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		//console.log('nefffffffff-----',[distributeorders, totalNum, currentPage, totalPage]);
		return [distributeorders, totalNum, currentPage, totalPage];
	}
	
	async x() {
		
	}
	
	async y() {
		
	}

}