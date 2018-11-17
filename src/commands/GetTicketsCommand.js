import Command from './Command';
export default class GetTicketsCommand extends Command {
	constructor (app) {
		super(app);
	}

	async handle (type, status = 0, page = 1) {
		if (type == 'activity') {
			let activityId = await this.service('mp.storage').get('activityId');
			console.log('优惠券进来了', activityId)
			let [list, totalNum, currentPage, totalPage] = await this.activity(status, activityId, page);
		} else if (type == 'store') {

		} else {

		}
		this.store().dispatch('model.tickets/allTickets', {
			list: list,
			totalNum: totalNum,
			currentPage: currentPage,
			totalPage: totalPage,
			pageCount: limit
		});
	}

	// 活动
	async activity (status, activityId, page) {
		console.log('优惠券进来了<<<<A', status, activityId, page);
		try {
			return await this.service('http.tickets').activityCouponsList(status, activityId, page);
		} catch (e) {
			console.log('抛出异常', e);
			throw (e);
			return false;
		}
	}
	static commandName () {
		return 'GET_TICKETS';
	}
}
