import Command from './Command';
export default class SelfextraOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	async handle(stratTime, endTime, page = 1) {
		console.log('c-start');
//		let event = args.shift();
	    let [ list, totalNum, currentPage, totalPage] = await this.service('http.selfextraOrder').list(stratTime, endTime, page);
	    console.log('com-good',[ list, totalNum, currentPage, totalPage]);
		console.log('c-end');
		this.store().dispatch({
			type: 'model.extra.orders/selfOrders',
			list: list,
			totalNum: totalNum,
			currentPage: currentPage,
			totalPage: totalPage,
			pageCount: limit
		});
	}
	static commandName() {
		return 'selfextra-orders';
	}
}