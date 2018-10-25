import Service from '../Service';
export default class StoreCategoriesService extends Service {
	constructor($application) {
		super($application);
	}

	async storeCategories(page, limit = 15){
		let categories = null;
		let totalNum = 0;
		let currentPage = 0;
		let totalPage = 0;
		let response = null;

		if(this.$application.needMock()) {			
			response = await this.services('mock.storeCategories').mock(page, limit);
		} else {
			//服务器交互代码
			response = await this.httpGet(`/store/${id}/categories `, {
				page: page,
				limit: limit
			});
		}
		return [response.data, response.meta['total_pages'], limit, response.meta['total']];
	}	
}