import Command from '@/commands/Command';
export default class LoadStoreTicketsCommand extends Command {
	async handle(storeId, status = 'available', page = 1) {
		try {
			let [list, totalNum, currentPage, totalPage, limit] = await this.service('http.tickets').storeTickets(status, storeId, page);
			this.store().dispatch('model.storeMarket.tickets/setList', {
				list: list,
				totalNum: totalNum,
				currentPage: currentPage,
				totalPage: totalPage,
				pageCount: limit
			});
		} catch(e) {
			console.log('load tickets ==========', e);
		}
	}

	static commandName() {
		return 'LOAD_STORE_TICKETS';
	}
}
