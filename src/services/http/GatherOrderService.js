import Service from '../Service';
export default class GatherOrderService extends Service {
	constructor($application) {
		super($application);
	}
	//获取订单列表
	async list(startTime, endTime, type, status, page) {
		//console.log('service--------------');
		let distributeorders = null;
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let gathorders = null;
		let response = null;
		if(this.$application.needMock()) {
			//console.log('service-mock----------');
			response = await this.services('mock.gatherOrder').mock(startTime, endTime, type, status, page);
			//console.log('response--------',response);
		} else {
			response = await this.httpGet(`/store/orders/summary`, {
				paid_start_time: startTime,
				paid_end_time:endTime,
				type: type,
				status:status,
				page:page
			});
		}
		console.log('getRes',response);
		gathorders = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
//		console.log('nefffffffff-----',[distributeorders, totalNum, currentPage, totalPage]);
//console.log('se--------------',[gathorders, totalNum, currentPage, totalPage]);
		return [gathorders, totalNum, currentPage, totalPage];
	}
	
	async x() {
		
	}
	
	async y() {
		
	}

}