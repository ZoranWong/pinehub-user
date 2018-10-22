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
			// console.log(response,"list");
		}else{
			//服务器交互代码
			response = await this.httpGet(route, {page: page, limit: limit, searchJson: search});
		}
		// console.log(response, "this.httpGet")
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
	//添加购物车
	async addMerchandises(merchandiseId, storeId, quality) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.services('mock.addMerchandises').mock(merchandiseId, storeId, quality);
			// console.log(response, '添加购物车' ,response.data.name);
		}else{
			//服务器交互代码
			response = await this.httpPost( `/add/merchandises`, 
				{merchandise_id: merchandiseId, store_id:storeId, quality:quality});
			console.log( response, "服务器交互添加购物车")
		}
		return   [response.data['id'],  response.data['name'],
		       		response.data['quality'], response.data['sell_price'], response.data['message'],
		       		response.data['amount']]; 
	}
	//减少购物车
	async reduceMerchandises(merchandiseId, storeId, quality) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.services('mock.reduceMerchandises').mock(merchandiseId, storeId, quality);
			console.log(response, '减少购物车' ,response.data.name);
		}else{
			//服务器交互代码
			response = await this.httpPost( `/reduce/merchandises`, 
				{merchandise_id: merchandiseId, store_id:storeId, quality:quality});
			console.log( response, "服务器交互减少购物车")
		}
		return   [response.data['id'],  response.data['name'],
		       		response.data['quality'], response.data['sell_price'], response.data['message'],
		       		response.data['amount']]; 
	}  
    
    async search(name, page = 2){
    	let response = null;
    	if(this.$application.needMock()){
    		response  = await this.services('mock.search').mock(name, page);
    		console.log(response,'search')
    	}else{
    		//服务器交互代码
    		response = await this.httpGet(`/reserve/search/merchandises 
				`, {name:name, page: page })
    	}
    }
}	