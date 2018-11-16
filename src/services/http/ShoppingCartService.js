import ApiService from './ApiService';
export default class ShoppingCartService extends ApiService {
	constructor(application) {
		super(application);
	}

	async list(route, parameters, limit = 15) {
		console.log('到达购物车列表请求页', route);
		//服务器交互代码
		let response = await this.httpGet(route, parameters);
		console.log(route, response);
		let merchandises = response.data;
		let pagination = response.meta.pagination;
		let totalNum = pagination.total;
		let currentPage = pagination['current_page'];
		let totalPage = pagination['total_pages'];
		console.log('购物车服务有数据返回', merchandises, totalNum, currentPage, totalPage, limit);
		return [merchandises, totalNum, currentPage, totalPage, limit];
	}

	//获取购物车内所有产品
	async loadShoppingCart(route, page) {
		console.log('到达购物车服务');
		let parameters = {
			page: page
		}
		return await this.list(route, parameters);
	}

	async deleteShoppingCart(id) {
		let response = await this.httpDelete(`/shoppingcart`, [], id);
		return response.data;
	}

	//获取预定商城购物车内全部产品
	async reservationShoppingCartLoadMerchandises(page) {
		let route = `shoppingcart/merchandises`;
		return this.loadShoppingCart(route, page);
	}

	//新品预定获取购物车内全部产品
	async activityShoppingCartLoadMerchandises(id, page) {
		console.log('活动购物车服务------------------------------');
		let route = `activity/${id}/shoppingcart/merchandises`;
		return this.loadShoppingCart(route, page);
	}
	//新品预定增加到购物车
	async activityShoppingCartAddMerchandise(activityId, merchandiseId, quality) {
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality
		};
		let response = await this.httpPost(`/activity/${activityId}/shoppingcart/merchandise `, merchandise);
		return response.data;
	}

	//修改预定增加到购物车
	async activityShoppingCartChangeMerchandise(activityId, id, merchandiseId, quality) {
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality,
		};
		let response = await this.httpPut(`/activity/${activityId}/shoppingcart/${id}/merchandise `, merchandise);
		return response.data;
	}

	//新品预定清空购物车
	async activityShoppingCartClearMerchandises(acitityId) {
		let route = `/clear/activity/${acitityId}/shoppingcart/`;
		return this.clearShoppingCart(route);
	}

	async storeShoppingCartAddMerchandise(storeId, merchandiseId, quality) {
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality
		};
		let response = await this.httpPost(`/activity/${storeId}/shoppingcart/merchandise `, merchandise);
		return response.data;
	}

	async storeShoppingCartChangeMerchandise(storeId, id, merchandiseId, quality) {
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality
		};
		let response = await this.httpPost(`/activity/${storeId}/shoppingcart/${id}/merchandise `, merchandise);
		return response.data;
	}

	//【增加商品】添加购物车 商品id 商品数量 场景 场景id
	async bookingShoppingCartAddMerchandise(merchandiseId, quality) {
		let response = null;
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality
		};
		if(this.$application.needMock()) {
			response = await this.services('mock.addMerchandises').mock(merchandise);
		} else {
			//服务器交互代码
			try {
				response = await this.httpPost(`shoppingcart/merchandise`, merchandise);
			} catch(e) {
				console.log('抛出异常', e);
				return false;
			}
		}
		return response.data;
	}

	//【增加商品】添加购物车 商品id 商品数量 场景 场景id
	async bookingShoppingCartChangeMerchandise(id, merchandiseId, quality) {
		let response = null;
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality,
		};
		if(this.$application.needMock()) {
			response = await this.services('mock.addMerchandises').mock(merchandise);
		} else {
			//服务器交互代码
			try {
				response = await this.httpPut(`shoppingcart/${id}/merchandise`, merchandise);
			} catch(e) {
				console.log('抛出异常', e);
				return false;
			}
		}
		return response.data;
	}
	
	//预定商城清空购物车
	async bookingShoppingCartClearMerchandises() {
		let route = `/clear/shoppingcart/`;
		return this.clearShoppingCart(route);
	}

	//清空购物车
	async clearShoppingCart(route) {
		let response = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.reduceMerchandises').mock(route);
		} else {
			//服务器交互代码
			try {
				response = await this.httpGet(route);
			} catch(e) {
				console.log('抛出异常', e);
			}
		}
		console.log('清空购物车', response.data['delete_count']);
		return response.data['delete_count'];
	}
}