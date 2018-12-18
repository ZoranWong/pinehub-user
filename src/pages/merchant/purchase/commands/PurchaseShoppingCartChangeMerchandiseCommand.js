import Command from '@/commands/ShoppingCartCommand';
export default class PurchaseShoppingCartChangeMerchandiseCommand extends Command {
	constructor(app) {
		super(app);
		this.model = 'model.purchase.shoppingCarts';
	}
	async handle(storeId,batch, merchandiseId, id = null, quality = 1) {
		try {
			let merchandise = null;
			if(id && quality === 0) {
				merchandise = await this.service('http.shoppingCart').deleteShoppingCart(id);
				if(merchandise) {
					this.deleteShoppingCart(id);
				}
			} else if(id === null) {
				merchandise = await this.service('http.shoppingCart').purchaseShoppingCartAddMerchandise(
					batch,
					merchandiseId,
					quality);
				if(merchandise) {
					this.addMerchandiseToShoppingCart(merchandise);
				}
			} else if(id && quality > 0) {
				merchandise = await this.service('http.shoppingCart').purchaseShoppingCartChangeMerchandise(
					storeId,
					batch,
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
		return 'PURCHASE_SHOPPINGCART_CHANGE_MERCHANDISE';
	}
}