import Command from './Command';
export default class MyOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	async handle(event, page, search = null, limit = 15) {
		console.log('aaa', event);
		console.log(this.service("myorder"));
		let [list, totalNum, currentPage, totalPage] = await this.service("myorder").list(page, search, limit);
		console.log(12321)
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