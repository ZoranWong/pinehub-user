import Command from './Command';
export default class GetActivityShoppingCartCommand extends Command {
	constructor(app) {
		super(app);
	}
	//获取购物车全部商品
	async handle() {
		let id = await this.service('mp.storage').get('activityId');
		console.log('活动ID并查看购物车商品', id);
		try {
			let [merchandises, totalNum, currentPage, totalPage, limit] = await this.service('http.shoppingCart').activity(id);

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
	static commandName() {
		return 'GET_ACTIVITY_SHOPPINGCART';
	}
}