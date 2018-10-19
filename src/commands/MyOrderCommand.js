import Command from './Command';
export default class MyOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	async handle(status = 'all', page = 1, limit = 15) {
		console.log('t-1', this.service('http.myorders'));
	    let [ list, totalNum, currentPage, totalPage] = await this.service('http.myorders').list(status, page, limit)
		console.log('t-2');
		
		this.store().dispatch({
			type: event,
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