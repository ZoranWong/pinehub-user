import Command from './Command';
export default class ReservationLoadingMerchandisesCommand extends Command {
	constructor(app) {
		super(app);
	}
	//获取到新品预定列表
	async handle() {
		try {
			let args = Array.prototype.slice.apply(arguments);
			let event = args.shift();
			let serviceMethod = args.shift();
			console.log('预定商品列表service', serviceMethod);
			let service = this.service('http.merchandises');
			let [merchandises, totalNum, currentPage, totalPage, limit] = await service[serviceMethod].apply(service, args);
			console.log(event, merchandises, totalNum, currentPage, totalPage, 'jjjj', serviceMethod);
			this.store().dispatch(event, {
				list: merchandises,
				totalNum: totalNum,
				currentPage: currentPage,
				totalPage: totalPage,
				pageCount: limit
			});
		} catch(e) {
			console.log('抛出错误', e);
			throw(e);
			return false;
		}

	}
	static commandName() {
		return 'RESERVATION_LOADING_MERCHANDISES';
	}
}