import ApiService from './ApiService';
export default class ShoppingCartService extends ApiService {
	async list(route, parameters, limit = 15) {
		// 服务器交互代码
		let response = await this.httpGet(route, parameters);
		let shoppingCarts = response.data;
		let pagination = response.meta.pagination;
		let totalNum = pagination.total;
		let currentPage = pagination['current_page'];
		let totalPage = pagination['total_pages'];
		return [shoppingCarts, totalNum, currentPage, totalPage, limit];
	}

	// 获取购物车内所有产品
	async loadShoppingCart(route, page, limit = 300) {
		let parameters = {
			page: page,
			limit: limit
		}
		return await this.list(route, parameters);
	}

	async deleteShoppingCart(id) {
		let response = await this.httpDelete(`/shoppingcart`, [], id);
		return response.data;
	}

	// 获取预定商城购物车内全部产品
	async bookingMallShoppingCartLoadMerchandises(page) {
		let route = `shoppingcart/merchandises`;
		return this.loadShoppingCart(route, page);
	}

	// 新品预定获取购物车内全部产品
	async activityShoppingCartLoadMerchandises(id, page) {
		let route = `new/events/${id}/shoppingcart/merchandises`;
		return this.loadShoppingCart(route, page);
	}

	//商家下单购物车全部产品
	async purchaseShoppingCartLoadMerchandises(page) {
		let route = `/merchant/shoppingcart/merchandises`;
		return this.loadShoppingCart(route, page);
	}

	// 店铺获取购物车内全部产品
	async storeShoppingCartLoadMerchandises(id, page) {
		let route = `shop/${id}/shoppingcart/merchandises`;
		return this.loadShoppingCart(route, page);
	}

	// 新品预定增加到购物车
	async activityShoppingCartAddMerchandise(activityId, merchandiseId, quality) {
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality
		};
		let response = await this.httpPost(`/new/events/${activityId}/shoppingcart/merchandise `, merchandise);
		return response.data;
	}

	// 修改预定增加到购物车
	async activityShoppingCartChangeMerchandise(activityId, id, merchandiseId, quality) {
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality
		};
		let response = await this.httpPut(`/new/events/${activityId}/shoppingcart/${id}/merchandise `, merchandise);
		return response.data;
	}

	// 新品预定清空购物车
	async activityShoppingCartClearMerchandises(acitivityId) {
		let route = `/clear/new/events/${acitivityId}/shoppingcart/`;
		return this.clearShoppingCart(route);
	}

	async storeShoppingCartAddMerchandise(storeId, merchandiseId, quality) {
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality
		};
		let response = await this.httpPost(`/shop/${storeId}/shoppingcart/merchandise `, merchandise);
		return response.data;
	}

	async storeShoppingCartChangeMerchandise(storeId, id, merchandiseId, quality) {
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality
		};
		let response = await this.httpPut(`/shop/${storeId}/shoppingcart/${id}/merchandise `, merchandise);
		return response.data;
	}

	// 清空店铺购物车
	async storeShoppingCartClearMerchandises(storeId) {
		let route = `/clear/shop/${storeId}/shoppingcart/`;
		return this.clearShoppingCart(route);
	}

	// 【增加商品】添加购物车 商品id 商品数量 场景 场景id
	async bookingShoppingCartAddMerchandise(merchandiseId, quality) {
		let response = null;
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality
		};
		if(this.$application.needMock()) {
			response = await this.service('mock.addMerchandises').mock(merchandise);
		} else {
			// 服务器交互代码
			try {
				response = await this.httpPost(`shoppingcart/merchandise`, merchandise);
			} catch(e) {
				console.log('抛出异常', e);
				return false;
			}
		}
		return response.data;
	}

	// 【增加商品】添加购物车 商品id 商品数量 场景 场景id
	async bookingShoppingCartChangeMerchandise(id, merchandiseId, quality) {
		let response = null;
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality
		};
		if(this.$application.needMock()) {
			response = await this.service('mock.addMerchandises').mock(merchandise);
		} else {
			// 服务器交互代码
			try {
				response = await this.httpPut(`shoppingcart/${id}/merchandise`, merchandise);
			} catch(e) {
				console.log('抛出异常', e);
				return false;
			}
		}
		return response.data;
	}

	// 预定商城清空购物车
	async bookingShoppingCartClearMerchandises() {
		let route = `/clear/shoppingcart/`;
		return this.clearShoppingCart(route);
	}

	// 【增加商品】【订货】
	async purchaseShoppingCartAddMerchandise(batch, merchandiseId, quality) {
		let response = null;
		let merchandise = {
			batch: batch,
			merchandise_id: merchandiseId,
			quality: quality
		};
		if(this.$application.needMock()) {
			response = await this.service('mock.addMerchandises').mock(merchandise);
		} else {
			// 服务器交互代码
			try {
				response = await this.httpPost(`/merchant/shoppingcart/merchandise`, merchandise);
			} catch(e) {
				console.log('抛出异常', e);
				return false;
			}
		}
		return response.data;
	}

	// 【修改商品】【订货】
	async purchaseShoppingCartChangeMerchandise(storeId, batch, id, merchandiseId, quality) {
		let response = null;
		let merchandise = {
			batch: batch,
			merchandise_id: merchandiseId,
			quality: quality
		};
		if(this.$application.needMock()) {
			response = await this.service('mock.addMerchandises').mock(merchandise);
		} else {
			// 服务器交互代码
			try {
				response = await this.httpPut(`/merchant/${storeId}/shoppingcart/${id}/merchandise`, merchandise);
			} catch(e) {
				console.log('抛出异常', e);
				return false;
			}
		}
		return response.data;
	}

	// 【清空商品】【订货】
	async purchaseShoppingCartClearMerchandises() {
		let route = `/clear/merchant/shoppingcart/`;
		return this.clearShoppingCart(route);
	}

	// 清空购物车
	async clearShoppingCart(route) {
		let response = null;
		if(this.$application.needMock()) {
			response = await this.service('mock.reduceMerchandises').mock(route);
		} else {
			// 服务器交互代码
			try {
				response = await this.httpGet(route);
			} catch(e) {
				console.log('抛出异常', e);
			}
		}
		return response.data['delete_count'] > 0;
	}

	//[店铺] 保存常用购物车
	async saveAlwaysShoppingCart(name) {
		let response = null;
		let route = `/merchant/shoppingcart/save`;
		response = await this.httpPost(route, {
			name: name
		});
		return response.data;
	}

	//[店铺] 加载常用购物车
	async loadMerchantSavedShoppingCarts(limit = 15) {
		let response = null;
		let route = `/merchant/saved/shoppingcarts/`;
		response = await this.httpGet(route);
		let list = response.data;
		let pagination = response.meta.pagination;
		let totalNum = pagination.total;
		let currentPage = pagination['current_page'];
		let totalPage = pagination['total_pages'];
		return [list, totalNum, currentPage, totalPage, limit];
	}

	//[店铺] 导入常用购物车
	async importShoppingCart(shoppingCartId) {
		let response = null;
		let route = `/merchant/saved/shoppingcart/${shoppingCartId}/use/`;
		response = await this.httpGet(route);
		return response.data;
	}
}