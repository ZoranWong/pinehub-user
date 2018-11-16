import Command from './ShoppingCartCommand';
export default class ActivityShoppingCartLoadMerchandisesCommand extends Command {
	constructor(app) {
		super(app);
		this.model = 'model.activity.shoppingCarts';
	}
	async handle(page = 1) {
		let acitityId = await this.service('mp.storage').get('activityId');
		try {
			let [merchandises, totalNum, currentPage, totalPage, limit] = await this.service('http.shoppingCart').activityShoppingCartLoadMerchandises(acitityId, page);
			console.log('活动购物车内全部商品', merchandises, totalNum, currentPage, totalPage, limit);
			this.addMerchandisesToModel(merchandises, totalNum, currentPage, totalPage, limit);
		} catch(e) {
			console.log('购物车+++++++++++++__________');
			console.log('异常抛出========+++++++', e);
		}
	}

	static commandName() {
		return 'ACTIVITY_SHOPPINGCART_LOAD_MERCHANDISES';
	}
}