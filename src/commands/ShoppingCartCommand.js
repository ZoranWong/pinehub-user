import Command from './Command';
export default class ShoppingCartCommand extends Command {
	//购物车状态命令集 全部购物车操作都在此命令下
	constructor(app) {
		super(app);
		this.model = null;
	}
	//增加产品到购物车
	//服务方法名、商品id、数量、场景、场景id
	async add(methodType, merchandiseId, quality, scene, sceneId) {
		console.log('CD添加到购物车', methodType, merchandiseId, quality, scene, sceneId);
		try {
			let response = await this.service('http.shoppingCart')[methodType](merchandiseId, quality, scene, sceneId);
		} catch(e) {
			console.log('抛出异常', e);
		}
		console.log('添加到购物车的返回', response);
		//		return [response.data['id'], response.data['name'], response.data['quality'], response.data['sell_price'], response.data['message'], response.data['amount'], response.data['main_image']];
		this.store().dispatch('model.shoppingCarts/changeCart', {
			id: response.id,
			merchandiseId: response.merchandise_id,
			count: response.quality,
			name: response.name,
			sellPrice: response.sell_price,
			totalAmount: response.amount,
			thumbImage: response.main_image
		})
	}
	//减少产品到购物车
	async reduce(methodType, merchandiseId, quality, scene, sceneId) {
		console.log('CD取消到购物车', methodType, merchandiseId, quality, scene, sceneId);
		try {
			let response = await this.service('http.shoppingCart')[methodType](merchandiseId, quality, scene, sceneId);
		} catch(e) {
			console.log('抛出异常', e);
		}
		console.log('添加到购物车的返回', response);
	}
	//清空购物车内商品
	async clear(methodType, scene, sceneId) {
		console.log('清空购物车商品', methodType, scene, sceneId);
		try {
			let response = await this.service('http.shoppingCart')[methodType](scene, sceneId);
			//			this.store().dispatch('model.shoppingCarts/setList', {
			//				list: merchandises,
			//				totalNum: totalNum,
			//				currentPage: currentPage,
			//				totalPage: totalPage,
			//				pageCount: limit
			//			});
		} catch(e) {
			console.log('异常抛出', e);
		}
	}
	//获取购物车内所有产品
	async get(methodType, scene, sceneId) {
		console.log('活动ID并查看购物车商品', methodType, scene, sceneId);
		try {
			let [merchandises, totalNum, currentPage, totalPage, limit] = await this.service('http.shoppingCart')[methodType](scene, sceneId);
			console.log('活动购物车', merchandises, totalNum, currentPage, totalPage, limit);
			this.store().dispatch('model.shoppingCarts/setList', {
				list: merchandises,
				totalNum: totalNum,
				currentPage: currentPage,
				totalPage: totalPage,
				pageCount: limit
			});
		} catch(e) {
			console.log('异常抛出', e);
		}
	}
	//merchandiseId, quality = 1, type, id
	//操作（加、减、清空） 类型[场景]（活动、店铺） 类型id 产品id 数量（可不填）
	//type add reduce 选择操作种类 加入购物车 减少购物车 清空购物车
	//scene activity store 选择场景 是活动还是去店铺内购买
	//merchandiseId 场景的id 比如 活动的id或者商店的id
	//quality 操作的数目 增加减少的数目
	async handle(type, scene, merchandiseId = null, quality = 1) {

		let sceneId = null;
		let methodType = null;
		//判断此时为什么类型的操作 add 增加产品到购物车

		if(scene == 'activity') {
			sceneId = await this.service('mp.storage').get('activityId');
		}
		//判断加、减、清空，赋值为服务里的方法名
		if(type == 'add' || type == 'reduce') {
			if(type == 'add') {
				methodType = 'addMerchandises';
			} else if(type == 'reduce') {
				methodType = 'reduceMerchandises';
			}
			console.log('进来', type);
			this[type](methodType, merchandiseId, quality, scene, sceneId);
		} else if(type == 'clear') {
			methodType = 'clearShoppingCart'
			this[type](methodType, scene, sceneId);
		} else if(type == 'get') {
			methodType = 'clearShoppingCart';
			this[type](methodType, scene, sceneId);
		}
		//		let response = await this.service('http.merchandises').addMerchandises(merchandiseId, 1, scene, sceneId);
		//		//产品id
		//		let nowMerchandiseId = response.merchandise_id;
		//		//产品数量
		//		let nowMerchandiseQuality = response.quality;
		//		//无库存返回message
		//		let message = response.message;
		//		if(nowMerchandiseId) {
		//			this.store().dispatch('model.shoppingCarts/changeCart', {
		//				merchandiseId: nowMerchandiseId,
		//				count: nowMerchandiseQuality
		//			})
		//		} else if(message) {
		//			//console.log(id)
		//			this.service('popup').toast(message, 'none')
		//		}
	}

	changeShoppingCartMerchandise(merchandise) {
		this.store().dispatch(this.model + '/changeShoppingCartMerchandise', {
			'id': merchandise['id'],
			'merchandiseId': merchandise['merchandise_id'],
			'count': merchandise['quality'],
			'name': merchandise['name'],
			'sellPrice': merchandise['sell_price'],
			'totalAmount': merchandise['amount'],
			'thumbImage': merchandise['main_image'],
			'activityId': merchandise['activity_id']
		});
	}
	
	addMerchandiseToShoppingCart(merchandise) {
		this.store().dispatch(this.model + '/addMerchandiseToShoppingCart', {
			'id': merchandise['id'],
			'merchandiseId': merchandise['merchandise_id'],
			'count': merchandise['quality'],
			'name': merchandise['name'],
			'sellPrice': merchandise['sell_price'],
			'totalAmount': merchandise['amount'],
			'thumbImage': merchandise['main_image'],
			'activityId': merchandise['activity_id']
		});
	}
	
	deleteShoppingCart(id) {
		this.store().dispatch(this.model + '/deleteMerchandiseFromShoppingCart', {
			'id': id
		})
	}

	//currentPage,
	//		pageCount,
	//		totalNum,
	//		totalPage,
	//		list
	addMerchandisesToModel(merchandises, totalNum, currentPage, totalPage, limit) {
		this.store().dispatch(this.model + '/setList', {
			list: merchandises,
			totalNum: totalNum,
			currentPage: currentPage,
			totalPage: totalPage,
			pageCount: limit
		})
	}

	static commandName() {
		return 'SHOPPINGCART';
	}
}