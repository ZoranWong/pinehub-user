import Command from './ShoppingCartCommand';
export default class ActivityShoppingCartReduceMerchandiseCommand extends Command {
	constructor(app) {
		super(app);
		this.model = 'model.activity.shoppingCarts';
	}
	async handle(merchandiseId, quality = 1, acitityId) {
		try {
			let acitityId = await this.service('mp.storage').get('activityId');
			let merchandise = await this.service('http.shoppingCart').activityShoppingCartReduceMerchandise(
				acitityId,
				merchandiseId,
				quality);	
			if(merchandise) {
				this.changeCartMerchandise(merchandise);
			}
		} catch(e) {
			console.log('抛出异常', e);
		}
	}

	static commandName() {
		return 'ACTIVITY_SHOPPINGCART_REDUCE_MERCHANDISE';
	}
}