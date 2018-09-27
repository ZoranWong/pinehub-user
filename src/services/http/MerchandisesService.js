import ApiService from './ApiService';
export default class MerchandisesService extends ApiService{
	constructor(application) {
		super(application);
	}
	async list(activityid, page = 1, search = null, limit = 10) {
		console.log('hhbb', this.$application.needMock())
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
			response = await this.httpGet(`/new/activity/${activityid}/merchandises`, {page: page, limit: limit, searchJson: search});
		}
		console.log(response)
		merchandises = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		return [merchandises, totalNum, currentPage, totalPage];
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