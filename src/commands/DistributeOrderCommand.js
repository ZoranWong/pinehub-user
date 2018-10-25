import Command from './Command';
export default class DistributeOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	async handle(stratTime, endTime, page = 1, limit = 15) {
		//		let event = args.shift();
		let [list, totalNum, currentPage, totalPage] = await this.service('http.distributeOrder').list(stratTime, endTime,
			page);
		console.log('com-good', [list, totalNum, currentPage, totalPage]);
		this.store().dispatch({
			type: 'model.distribute.orders/disOrders',
			list: list,
			totalNum: totalNum,
			currentPage: currentPage,
			totalPage: totalPage,
			pageCount: limit
		});
	}
	static commandName() {
		return 'distribute-orders';
	}
}
