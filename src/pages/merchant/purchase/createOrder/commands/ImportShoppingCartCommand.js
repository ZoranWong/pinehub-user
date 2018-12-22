import Command from '@/commands/Command';
export default class ImportShoppingCartCommand extends Command {
	async handle(shoppingCartId) {
		try {
			console.log('AAAABBBBCCCC-----1');
			let result = await this.service('http.shoppingCart').importShoppingCart(shoppingCartId);
			console.log('result',result);
			if(result) {
				console.log('AAAABBBBCCCC-----2');
				wx.showToast({
					title: '导入成功',
					icon: 'none',
					duration: 4000
				})
				console.log('AAAABBBBCCCC-----3');
				this.$command('PURCHASE_SHOPPINGCART_LOAD_MERCHANDISES');
				console.log('AAAABBBBCCCC-----4');
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