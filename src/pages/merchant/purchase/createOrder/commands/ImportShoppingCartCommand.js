import Command from '@/commands/Command';
export default class ImportShoppingCartCommand extends Command {
	async handle(shoppingCartId) {
		try {
			let result = await this.service('http.shoppingCart').importShoppingCart(shoppingCartId);
			if(result) {
				wx.showToast({
					title: '导入成功',
					icon: 'none',
					duration: 4000
				});
				this.$command('PURCHASE_SHOPPINGCART_LOAD_MERCHANDISES');
			}
			return true
		} catch(e) {
			console.log('抛出异常', e);
			throw e;
		}
	}

	static commandName() {
		return 'IMPORT_SHOPPING_CART';
	}
}
