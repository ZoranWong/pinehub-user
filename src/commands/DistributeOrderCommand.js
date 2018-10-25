import Command from './Command';
export default class DistributeOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
<<<<<<< HEAD
	async handle(stratTime="2018-09-17 00:00:00", endTime="2018-09-17 24:00:00", page = 1) {
		
//		let event = args.shift();
	    let [ list, totalNum, currentPage, totalPage] = await this.service('http.distributeOrder').list(stratTime, endTime, page);
	    //console.log('com-good',[ list, totalNum, currentPage, totalPage]);
=======
	async handle(stratTime, endTime, page = 1,limit= 15) {
		console.log('c-start11111111');
//		let event = args.shift();
	    let [ list, totalNum, currentPage, totalPage] = await this.service('http.distributeOrder').list(stratTime, endTime, page);
	    console.log('com-good',[ list, totalNum, currentPage, totalPage]);
		console.log('c-end111111111122');
>>>>>>> e8f0c4e4ab8342ab6e5c6a3adbcf46a3eb52f8bc
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