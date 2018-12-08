import Command from '@/commands/Command';
export default class ImportShoppingCartCommand extends Command {
	async handle(id, page = 1, limit = 15) {
		console.log('进入 IMPORT_SHOPPING_CART COMMAND');
		return false;
		try {
			let [list, totalNum, currentPage, totalPage, pageCount] = await this.service('http.shoppingCarts').importShoppingCart(id, page, limit);
			this.$store.dispatch('model.summary.orders/setList', {
				list: list,
				totalNum: totalNum,
				currentPage: currentPage,
				totalPage: totalPage,
				pageCount: pageCount
			});
		} catch(e) {
			console.log('抛出异常', e);
			throw e;
		}
	}

	static commandName() {
		return 'IMPORT_SHOPPING_CART'
	}
}