import Command from '@/commands/Command';
export default class DistributeOrderCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(stratTime, endTime, page = 1, limit = 15) {
		//	let event = args.shift();
		try {
			console.log('筛选------------------------------>')
			let [list, totalNum, currentPage, totalPage] = await this.service('http.distributeOrder').list(stratTime, endTime, page);
			console.log('com-good', [list, totalNum, currentPage, totalPage]);

			this.$store.dispatch('model.distribute.orders/setList', {
				list: list,
				totalNum: totalNum,
				currentPage: currentPage,
				totalPage: totalPage,
				pageCount: limit
			});
		} catch(e) {
			console.log('抛出异常', e);
			throw(e);
			return false;
		}

	}
	static commandName() {
		return 'distribute-orders';
	}
}