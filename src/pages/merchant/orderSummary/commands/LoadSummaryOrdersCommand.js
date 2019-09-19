import Command from '@/commands/Command';
export default class LoadSummaryOrdersCommand extends Command {
	async handle(storeId, paidDate, type, status, page = 1, limit = 15) {
		try {
			let [list, totalNum, currentPage, totalPage, pageCount] = await this.service('http.orders').summaryOrders(storeId, paidDate, type, status, page, limit);
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
		return 'LOAD_SUMMARY_ORDERS'
	}
}