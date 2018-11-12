import Command from './Command';
export default class MyOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	async handle(status, page = 1, limit = 15) {
//		let event = args.shift();
	    let [ list, totalNum, currentPage, totalPage] = await this.service('http.myorders').list(status, page, limit);
	    console.log('c-start00000000', list);
		this.store().dispatch({
			type: 'model.my.orders/setOrders',
			list: list,
			totalNum: totalNum,
			currentPage: currentPage,
			totalPage: totalPage,
			pageCount: limit,
			status: status
		});
	}
	static commandName() {
		return 'my-orders';
	}
}