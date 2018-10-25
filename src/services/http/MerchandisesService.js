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
			response = await this.httpGet(route, {page: page, limit: limit, name: search});
		}
		// console.log(response, "this.httpGet")
		merchandises = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		// console.log('services服务bnnnn', merchandises);
		return [merchandises, totalNum, currentPage, totalPage, limit ];
	}


	//获取新品预定所有商品信息

	async activity(activityId, page = 1, search = null, limit = 10) {
		let route = `/new/activity/${activityId}/merchandises`;
		return await this.list(route, page, search, limit);
	}




    //获取今日店铺分类下的商品信息
	async today(storeId, categoryId, page = 1, search = null, limit = 10) {
		// let route = '/store/' + storeId + '/category/' + categoryId + '/merchandises';
		let route = `/store/${storeId}/category/${categoryId}/merchandises`;
		return await this.list(route, page, search, limit);
	}
    //获取预定商城的指定分类下的所有商品信息
    async bookingMerchandises(categoryId, page = 1, search = null, limit = 10 ){
    	let route = `/category/${categoryId}/merchandises`;
    	return await this.list(route, page, search, limit);
    }

	async storeNewMerchandises(storeId, page = 1, search = null, limit = 10) {
		let route = `/store/${storeId}/new/merchandises`;
		return await this.list(route, page, search, limit);
	}

	//添加购物车
	async addMerchandises(merchandiseId, storeId = null, quality,  activityMerchandisesId = null) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.services('mock.addMerchandises').mock(merchandiseId, storeId, quality);
			console.log(response, '添加购物车' ,response.data);
		}else{
			//服务器交互代码
			response = await this.httpPost( `/add/merchandises`, 
				{merchandise_id: merchandiseId, store_id:storeId, quality:quality,
				 activity_merchandises_id: activityMerchandisesId });
			//console.log( response, "服务器交互添加购物车")
		}
		return   [response.data['id'],  response.data['name'],
		       		response.data['quality'], response.data['sell_price'], response.data['message'],
		       		response.data['amount'],response.data['main_image']]; 
	}
	//减少购物车
	async reduceMerchandises(merchandiseId, storeId = null, quality,  activityMerchandisesId = null) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.services('mock.reduceMerchandises').mock(merchandiseId, storeId, quality);
			//console.log(response, '减少购物车' ,response.data.name);
		}else{
			//服务器交互代码
			response = await this.httpPost( `/reduce/merchandises`, 
				{merchandise_id: merchandiseId, store_id:storeId, quality:quality,
				 activity_merchandises_id: activityMerchandisesId });
			//console.log( response, "服务器交互减少购物车")
		}
		return   [response.data['id'],  response.data['name'],
       		response.data['quality'], response.data['sell_price'], response.data['message'],
       		response.data['amount'],response.data['main_image']]; 
	}  

	//清空购物车
	async emptyMerchandises(storeId){
		let response = null;
		
		if(this.$application.needMock()) {			
			response = await this.services('mock.emptyMerchandises').mock(storeId);
			//console.log('empty response', response.data);
		} else {
			//服务器交互代码
			response = await this.httpGet(`/empty/merchandise/${storeId}`, {
				store_id: storeId
			});
		}
		return response.data['delete_count'];
	}	 


    
   




}	