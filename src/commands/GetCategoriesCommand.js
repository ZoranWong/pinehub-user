import Command from './Command';
export default class GetCategoriesCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(page = 1) {
		try {
			let service = this.service('http.categories');
			let [categories, totalPage, limit, totalCount] = await service.categories(page);
			this.$store.dispatch('model.categories/setList', {
				list: categories,
				currentPage: page,
				totalPage: totalPage,
				totalNum: totalCount,
				pageCount: limit,
			});
			console.log('预定商城分类>>>>>>>>>>>this', this);
		} catch(e) {
			console.log('抛出异常', e);
			throw(e);
			return false;
		}
	}
	static commandName() {
		return 'GET_BOOKING_MALL_CATEGORIES';
	}
}
