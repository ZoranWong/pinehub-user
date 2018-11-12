import Command from './Command';
export default class GatherOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	async handle(startTime, endTime, type, status, page = 1, limit = 15) {
		console.log('c-start11111111', page);
	    let [ list, totalNum, currentPage, totalPage] = await this.service('http.gatherOrder').list(startTime, endTime, type, status, page);
	    console.log('com-good',[ list, totalNum, currentPage, totalPage]);
		console.log('c-end1111111111', status);

		this.store().dispatch({
			type: 'model.gather.orders/setOrders',
			list: list,
			totalNum: totalNum,
			currentPage: currentPage,
			totalPage: totalPage,
			pageCount: limit,
			status: status
		});
	}
	static commandName() {
		return 'gather-orders';
	}
}