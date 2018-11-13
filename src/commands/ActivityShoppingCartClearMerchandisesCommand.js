import Command from './ShoppingCartCommand';
export default class ActivityShoppingCartClearMerchandisesCommand extends Command {
	constructor(app) {
		super(app);
		this.model = 'model.activity.shoppingCarts';
	}
	async handle(acitityId) {
		try {
			let acitityId = await this.service('mp.storage').get('activityId');
			let result = await this.service('http.shoppingCart').activityShoppingCartClearMerchandises(
				acitityId);
			if(result) {
				this.store().dispatch(this.model + '/reset', {
					activity: true
				});
			}
		} catch(e) {
			console.log('抛出异常', e);
		}
	}

	static commandName() {
		return 'ACTIVITY_SHOPPINGCART_CLEAR_MERCHANDISES';
	}
}