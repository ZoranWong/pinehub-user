import Command from './Command';
export default class MyOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	async handle(status = 'all', page = 1, limit = 15) {
		// console.log('c-start');
//		let event = args.shift();
	    let [ list, totalNum, currentPage, totalPage] = await this.service('http.myorders').list(status, page, limit);
		this.store().dispatch({
			type: 'model.my.orders/allOrders',
			list: list,
			totalNum: totalNum,
			currentPage: currentPage,
			totalPage: totalPage,
			pageCount: limit
		});
	}
	static commandName() {
		return 'my-orders';
	}
}