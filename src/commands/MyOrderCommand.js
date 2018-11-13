import Command from './Command';
export default class MyOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	async handle(status, page = 1, limit = 15) {
		if(page > 1) {
			let currentPage = this.store().getters['model.my.orders/currentPage'];
			let totalNum = this.store().getters['model.my.orders/totalNum']
			console.log('NEXT_PAGE', currentPage, totalNum);
		}
		let [list, totalNum, currentPage, totalPage] = await this.service('http.orders').list(status, page, limit);
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