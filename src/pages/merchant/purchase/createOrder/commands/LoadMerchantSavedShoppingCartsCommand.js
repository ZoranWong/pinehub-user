import Command from '@/commands/Command';
export default class LoadMerchantSavedShoppingCartsCommand extends Command {
	async handle(id, page = 1, limit = 15) {
		try {
			let [list, totalNum, currentPage, totalPage, pageCount] = await this.service('http.shoppingCart').loadMerchantSavedShoppingCarts();
			this.$store.dispatch('model.shoppingcart.always.use/setList', {
				list: list,
				totalNum: totalNum,
				currentPage: currentPage,
				totalPage: totalPage,
				pageCount: pageCount
			});
		} catch(e) {
			throw e;
		}
	}

	static commandName() {
		return 'LOAD_MERCHANT_SAVED_SHOPPING_CARTS'
	}
}
