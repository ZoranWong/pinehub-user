import ApiService from './ApiService';
export default class MerchandisesService extends ApiService{
	constructor(application) {
		super(application);
	}
	async list(route,  page = 1, search = null, limit = 10) {
		let merchandises = null;
		let totalNum = 0;
		let currentPage = 0;
		let totalPage = 0;
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.services('mock.merchandises').mock(page, search, limit);
			console.log(response);
		}else{
			//服务器交互代码
			response = await this.httpGet(route, {page: page, limit: limit, searchJson: search});
		}
		console.log(response)
		merchandises = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		console.log('services',  totalNum, currentPage, totalPage, page);
		return [merchandises, totalNum, currentPage, totalPage, limit];
	}
	async activity(activityId, page = 1, search = null, limit = 10) {
		let route = `/new/activity/${activityId}/merchandises`;
		return await this.list(route, page, search, limit);
	}

	async today(storeId,  categoryId, page = 1, search = null, limit = 10) {
		let route = `/store/${storeId}/category/${categoryId}/merchandises`;
		return await this.list(route, page, search, limit);
	}

	async storeNewMerchandises(storeId, page = 1, search = null, limit = 10) {
		let route = `/store/${storeId}/new/merchandises`;
		return await this.list(route, page, search, limit);
	}


	// async uploadMaterial(appId, type, fileField, file, title = null, introduction = null) {
	// 	let response = null;
	// 	let request = new FormData();
	// 	request.append('app_id', appId);
	// 	request.append(fileField, file);
	// 	request.append('file_field', fileField);
	// 	if(title)
	// 		request.append('title', title);
	// 	if(introduction)
	// 		request.append('introduction', introduction);
	// 	if(this.$application.needMock()) {
	// 		response =  await this.services('mock.material.upload').mock(request);
	// 	}else{
	// 		//服务器交互代码
	// 		response = await this.httpPost(`${type}/material`, request);
	// 	}
	// 	return response.data;
	// }
}	