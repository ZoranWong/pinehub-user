import Service from '../Service';
export default class MyStoreCategoriesService extends Service {
	constructor($application) {
		super($application);
	}
	//获取订单列表
	async list(storeId, page = 1, limit = 15) {
		let categories = null;
		let totalNum = null;
		let totalPage = null;
		let currentPage = null;
		let response = null;
		console.log('MyStoreCategoriesService--------MyStoreCategoriesService');
		if (this.$application.needMock()) {
			console.log('AAAAAAAAAAAA');
			response = await this.services('mock.myStoreCategories').mock(storeId, page, limit);
		} else {
			//服务器交互代码
			response = await this.httpGet(`store/${storeId}/categories`, {
				store_id: storeId,
				page: page
			});
		}
		categories = response.data;
		let pagination = response.meta.pagination;
		console.log('pagination------pagination',pagination);
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		return [categories, totalNum, currentPage, totalPage];
	}
}
