import Command from '@/commands/Command';
export default class LoadStoreOrdersCommand extends Command {
	async handle(storeId, date, type, payType, page = 1, limit = 15) {
		try {
			let [list, totalNum, currentPage, totalPage, pageCount, totalAmount] = await this.service('http.orders').storeOrders(storeId, date, type, payType, page, limit);
			this.$store.dispatch('model.store.orders/setList', {
				list: list,
				totalNum: totalNum,
				currentPage: currentPage,
				totalPage: totalPage,
				pageCount: pageCount
			});
			this.$store.dispatch('model.store.orders/setTotalAmount', {
				totalAmount: totalAmount
			});
		} catch(e) {
			console.log('抛出异常', e);
			throw e;
		}
	}

	static commandName() {
		return 'LOAD_STORE_ORDERS'
	}
}