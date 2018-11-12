import ApiService from './ApiService';
export default class MerchandisesService extends ApiService {
	constructor(application) {
		super(application);
	}

	async list(route, parameters) {
		//产品列表
		let merchandises = null;
		//总条数
		let totalNum = 0;
		//当前页数
		let currentPage = 0;
		//总页数
		let totalPage = 0;
		//结果
		let response = null;
		//limit
		let limit = 15;
		if(this.$application.needMock()) {
			response = await this.services('mock.merchandises').mock(page, search, limit);
			// console.log(response,"list");
		} else {
			//服务器交互代码
			response = await this.httpGet(route, parameters);
		}
		// console.log(response, "this.httpGet")
		merchandises = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		// console.log('services服务bnnnn', merchandises);
		return [merchandises, totalNum, currentPage, totalPage, limit];
	}

	//获取新品预定所有商品信息 parameters = []
	async activity(activityId, page) {
		console.log('到达指定服务里');
		let route = `/new/activity/${activityId}/merchandises`;
		let parameters = {
			page: page
		}
		return await this.list(route, parameters);
	}

	//获取今日店铺分类下的商品信息
	async today(storeId, categoryId, page = 1, search = null, limit = 10) {
		// let route = '/store/' + storeId + '/category/' + categoryId + '/merchandises';
		let route = `/store/${storeId}/category/${categoryId}/merchandises`;
		return await this.list(route, page, search, limit);
	}
	//获取预定商城的指定分类下的所有商品信息
	async bookingMerchandises(categoryId, page = 1, search = null, limit = 10) {
		let route = `/category/${categoryId}/merchandises`;
		return await this.list(route, page, search, limit);
	}

	async storeNewMerchandises(storeId, page = 1, search = null, limit = 10) {
		let route = `/store/${storeId}/new/merchandises`;
		return await this.list(route, page, search, limit);
	}



}