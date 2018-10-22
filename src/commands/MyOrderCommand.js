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
	 //    console.log('com-good',[ list, totalNum, currentPage, totalPage]);
		// console.log('c-end');
		// console.log('nbnbb',this.store());
		this.store().dispatch({
			type: 'model.my.orders/allOrders',
			list: list,
			totalNum: totalNum,
			currentPage: currentPage,
			totalPage: totalPage,
			pageCount: limit
		});
		// console.log('2222222222222222@@@@@@@@@',this.store());
	}
	static commandName() {
		return 'my-orders';
	}
}