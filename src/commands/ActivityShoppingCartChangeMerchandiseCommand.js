import Command from './ShoppingCartCommand';
export default class ActivityShoppingCartChangeMerchandiseCommand extends Command {
	constructor(app) {
		super(app);
		this.model = 'model.activity.shoppingCarts';
	}
	async handle(merchandiseId, id = null, quality = 1) {
		try {
			let acitityId = await this.service('mp.storage').get('activityId');
			let merchandise = null;
			if(id && quality === 0) {
				merchandise = await this.service('http.shoppingCart').deleteShoppingCart(id);
				this.deleteShoppingCart(id);
				return;
			} else if(id === null) {
				merchandise = await this.service('http.shoppingCart').activityShoppingCartAddMerchandise(
					acitityId,
					merchandiseId,
					quality);
				if(merchandise) {
					this.addMerchandiseToShoppingCart(merchandise);
				}
			} else if(id && quality > 0) {
				merchandise = await this.service('http.shoppingCart').activityShoppingCartChangeMerchandise(
					acitityId,
					id,
					merchandiseId,
					quality);
				if(merchandise) {
					this.changeShoppingCartMerchandise(merchandise);
				}
			}

		} catch(e) {
			console.log('抛出异常', e);
		}
	}

	static commandName() {
		return 'ACTIVITY_SHOPPINGCART_CHANGE_MERCHANDISE';
	}
}