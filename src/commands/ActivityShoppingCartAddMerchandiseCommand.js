import Command from './ShoppingCartCommand';
export default class ActivityShoppingCartAddMerchandiseCommand extends Command {
	constructor(app) {
		super(app);
		this.model = 'model.activity.shoppingCarts';
	}
	async handle(merchandiseId, quality = 1, acitityId) {
		try {
			let acitityId = await this.service('mp.storage').get('activityId');
			let merchandise = await this.service('http.shoppingCart').activityShoppingCartAddMerchandise(
				acitityId,
				merchandiseId,
				quality);
			this.changeCartMerchandise(merchandise);
		} catch(e) {
			console.log('抛出异常=====', e);
		}
	}

	static commandName() {
		return 'ACTIVITY_SHOPPINGCART_ADD_MERCHANDISE';
	}
}