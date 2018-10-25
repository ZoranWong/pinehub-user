import Command from './Command';
export default class DistributeOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	async handle(stratTime="2018-09-17 00:00:00", endTime="2018-09-17 24:00:00", page = 1) {
		
//		let event = args.shift();
	    let [ list, totalNum, currentPage, totalPage] = await this.service('http.distributeOrder').list(stratTime, endTime, page);
	    //console.log('com-good',[ list, totalNum, currentPage, totalPage]);
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